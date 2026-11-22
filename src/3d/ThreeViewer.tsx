import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { Product } from '../types';
import { createProduct3DModel, GeneratedModel } from './modelGenerators';
import { RotateCw, Maximize2, Zap, Layers, Sun, ShieldAlert, Sparkles } from 'lucide-react';

interface ThreeViewerProps {
  product: Product;
  selectedColorHex?: number;
  autoRotateDefault?: boolean;
  explodedDefault?: boolean;
  onExplodeToggle?: (exploded: boolean) => void;
  className?: string;
  showControlsOverlay?: boolean;
}

export const ThreeViewer: React.FC<ThreeViewerProps> = ({
  product,
  selectedColorHex,
  autoRotateDefault = true,
  explodedDefault = false,
  onExplodeToggle,
  className = 'w-full h-full min-h-[380px]',
  showControlsOverlay = true
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isExploded, setIsExploded] = useState(explodedDefault);
  const [autoRotate, setAutoRotate] = useState(autoRotateDefault);
  const [wireframe, setWireframe] = useState(false);
  const [lightingMode, setLightingMode] = useState<'studio' | 'neon' | 'sun'>('studio');
  const [hasError, setHasError] = useState(false);
  const [activePartName, setActivePartName] = useState<string | null>(null);

  // References to keep animation state smooth across renders
  const stateRef = useRef<{
    renderer?: THREE.WebGLRenderer;
    scene?: THREE.Scene;
    camera?: THREE.PerspectiveCamera;
    modelGroup?: THREE.Group;
    currentModel?: GeneratedModel;
    lightsGroup?: THREE.Group;
    ambientLight?: THREE.HemisphereLight;
    dirLight1?: THREE.DirectionalLight;
    dirLight2?: THREE.DirectionalLight;
    animFrameId?: number;
    explodeProgress: number; // 0 (assembled) to 1 (exploded)
    targetExplodeProgress: number;
    isDragging: boolean;
    prevMousePos: { x: number; y: number };
    targetRotation: { x: number; y: number };
    currentRotation: { x: number; y: number };
    cameraDistance: number;
    targetDistance: number;
  }>({
    explodeProgress: explodedDefault ? 1 : 0,
    targetExplodeProgress: explodedDefault ? 1 : 0,
    isDragging: false,
    prevMousePos: { x: 0, y: 0 },
    targetRotation: { x: 0.25, y: -0.4 },
    currentRotation: { x: 0.25, y: -0.4 },
    cameraDistance: 6.2,
    targetDistance: 6.2
  });

  // Handle external or internal explode state
  const handleToggleExplode = useCallback(() => {
    const next = !isExploded;
    setIsExploded(next);
    stateRef.current.targetExplodeProgress = next ? 1 : 0;
    if (onExplodeToggle) {
      onExplodeToggle(next);
    }
  }, [isExploded, onExplodeToggle]);

  const handleReset = useCallback(() => {
    stateRef.current.targetRotation = { x: 0.25, y: -0.4 };
    stateRef.current.targetDistance = 6.2;
    stateRef.current.targetExplodeProgress = 0;
    setIsExploded(false);
    setAutoRotate(true);
    if (onExplodeToggle) onExplodeToggle(false);
  }, [onExplodeToggle]);

  // Synchronize lighting modes
  useEffect(() => {
    const s = stateRef.current;
    if (!s.ambientLight || !s.dirLight1 || !s.dirLight2) return;

    if (lightingMode === 'studio') {
      s.ambientLight.color.setHex(0xe2e8f0);
      s.ambientLight.groundColor.setHex(0x1e293b);
      s.ambientLight.intensity = 1.4;
      s.dirLight1.color.setHex(0xffffff);
      s.dirLight1.intensity = 2.2;
      s.dirLight2.color.setHex(0x38bdf8);
      s.dirLight2.intensity = 1.2;
    } else if (lightingMode === 'neon') {
      s.ambientLight.color.setHex(0x1e1b4b);
      s.ambientLight.groundColor.setHex(0x0f172a);
      s.ambientLight.intensity = 0.8;
      s.dirLight1.color.setHex(0x06b6d4); // Cyan
      s.dirLight1.intensity = 3.0;
      s.dirLight2.color.setHex(0xa855f7); // Purple
      s.dirLight2.intensity = 2.5;
    } else {
      // Sun
      s.ambientLight.color.setHex(0xfef08a);
      s.ambientLight.groundColor.setHex(0x334155);
      s.ambientLight.intensity = 1.2;
      s.dirLight1.color.setHex(0xffedd5);
      s.dirLight1.intensity = 2.8;
      s.dirLight2.color.setHex(0xf97316);
      s.dirLight2.intensity = 1.0;
    }
  }, [lightingMode]);

  // Synchronize wireframe toggle
  useEffect(() => {
    const model = stateRef.current.currentModel;
    if (model) {
      model.materials.forEach(mat => {
        if ('wireframe' in mat) {
          (mat as THREE.MeshStandardMaterial).wireframe = wireframe;
        }
      });
    }
  }, [wireframe]);

  // Main Three.js initialization and scene management
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check WebGL availability
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) {
        setHasError(true);
        return;
      }
    } catch {
      setHasError(true);
      return;
    }

    // 1. Scene Setup
    const scene = new THREE.Scene();
    stateRef.current.scene = scene;

    // 2. Camera Setup
    const width = container.clientWidth || 600;
    const height = container.clientHeight || 450;
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 0, stateRef.current.cameraDistance);
    stateRef.current.camera = camera;

    // 3. Renderer Setup
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;

    container.innerHTML = '';
    container.appendChild(renderer.domElement);
    stateRef.current.renderer = renderer;

    // 4. Subtle Sci-Fi Grid Plane
    const grid = new THREE.GridHelper(12, 24, 0x0ea5e9, 0x1e293b);
    grid.position.y = -1.6;
    grid.material.opacity = 0.22;
    grid.material.transparent = true;
    scene.add(grid);

    // 5. Lights
    const ambientLight = new THREE.HemisphereLight(0xe2e8f0, 0x1e293b, 1.4);
    scene.add(ambientLight);
    stateRef.current.ambientLight = ambientLight;

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 2.2);
    dirLight1.position.set(5, 8, 5);
    dirLight1.castShadow = true;
    dirLight1.shadow.mapSize.width = 1024;
    dirLight1.shadow.mapSize.height = 1024;
    dirLight1.shadow.bias = -0.0005;
    scene.add(dirLight1);
    stateRef.current.dirLight1 = dirLight1;

    const dirLight2 = new THREE.DirectionalLight(0x38bdf8, 1.2);
    dirLight2.position.set(-5, -2, -4);
    scene.add(dirLight2);
    stateRef.current.dirLight2 = dirLight2;

    // 6. Model Root Group
    const modelGroup = new THREE.Group();
    scene.add(modelGroup);
    stateRef.current.modelGroup = modelGroup;

    // 7. Load Product Model
    function loadProductModel() {
      // If student later provides a real GLTF model URL
      if (product.modelUrl) {
        // Architecture prepared for GLTFLoader
        console.log('GLTF loader placeholder ready for:', product.modelUrl);
      }

      // Procedural 3D model generator
      const generated = createProduct3DModel(product, selectedColorHex);
      stateRef.current.currentModel = generated;
      modelGroup.clear();
      modelGroup.add(generated.root);

      // Apply initial wireframe if active
      if (wireframe) {
        generated.materials.forEach(m => {
          if ('wireframe' in m) (m as THREE.MeshStandardMaterial).wireframe = true;
        });
      }
    }

    loadProductModel();

    // 8. Interaction Handlers (Mouse & Touch)
    const onPointerDown = (e: PointerEvent) => {
      stateRef.current.isDragging = true;
      stateRef.current.prevMousePos = { x: e.clientX, y: e.clientY };
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!stateRef.current.isDragging) return;
      const dx = e.clientX - stateRef.current.prevMousePos.x;
      const dy = e.clientY - stateRef.current.prevMousePos.y;

      stateRef.current.targetRotation.y += dx * 0.008;
      stateRef.current.targetRotation.x = Math.max(
        -Math.PI * 0.45,
        Math.min(Math.PI * 0.45, stateRef.current.targetRotation.x + dy * 0.008)
      );

      stateRef.current.prevMousePos = { x: e.clientX, y: e.clientY };
    };

    const onPointerUp = () => {
      stateRef.current.isDragging = false;
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const zoomSpeed = 0.003;
      stateRef.current.targetDistance = Math.max(
        2.5,
        Math.min(10.0, stateRef.current.targetDistance + e.deltaY * zoomSpeed)
      );
    };

    // Mobile Pinch-to-zoom
    let initialPinchDist = 0;
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 2) {
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        initialPinchDist = Math.hypot(dx, dy);
      }
    };
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 2) {
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        const dist = Math.hypot(dx, dy);
        const factor = (initialPinchDist - dist) * 0.01;
        stateRef.current.targetDistance = Math.max(
          2.5,
          Math.min(10.0, stateRef.current.targetDistance + factor)
        );
        initialPinchDist = dist;
      }
    };

    const domElement = renderer.domElement;
    domElement.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
    domElement.addEventListener('wheel', onWheel, { passive: false });
    domElement.addEventListener('touchstart', onTouchStart, { passive: true });
    domElement.addEventListener('touchmove', onTouchMove, { passive: true });

    // 9. Resize Handling via ResizeObserver
    const resizeObserver = new ResizeObserver(entries => {
      if (!entries[0]) return;
      const { width: w, height: h } = entries[0].contentRect;
      if (w > 0 && h > 0) {
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      }
    });
    resizeObserver.observe(container);

    // 10. Smooth Render Loop
    let clock = new THREE.Clock();

    const animate = () => {
      stateRef.current.animFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();

      const s = stateRef.current;

      // Auto rotation when not user-dragging
      if (autoRotate && !s.isDragging) {
        s.targetRotation.y += delta * 0.45;
      }

      // Smooth camera orbit interpolation
      s.currentRotation.x += (s.targetRotation.x - s.currentRotation.x) * 0.1;
      s.currentRotation.y += (s.targetRotation.y - s.currentRotation.y) * 0.1;
      s.cameraDistance += (s.targetDistance - s.cameraDistance) * 0.1;

      // Position camera spherically
      const r = s.cameraDistance;
      const phi = Math.PI / 2 - s.currentRotation.x;
      const theta = s.currentRotation.y;

      camera.position.x = r * Math.sin(phi) * Math.sin(theta);
      camera.position.y = r * Math.cos(phi);
      camera.position.z = r * Math.sin(phi) * Math.cos(theta);
      camera.lookAt(0, 0, 0);

      // Exploded View Interpolation
      s.explodeProgress += (s.targetExplodeProgress - s.explodeProgress) * 0.08;

      if (s.currentModel?.parts) {
        s.currentModel.parts.forEach(part => {
          const t = s.explodeProgress;
          part.mesh.position.x = part.originalPos.x + (part.explodedPos.x - part.originalPos.x) * t;
          part.mesh.position.y = part.originalPos.y + (part.explodedPos.y - part.originalPos.y) * t;
          part.mesh.position.z = part.originalPos.z + (part.explodedPos.z - part.originalPos.z) * t;
        });
      }

      // Internal model animations (e.g. GPU spinning fans)
      if (s.currentModel?.updateAnimation) {
        s.currentModel.updateAnimation(delta);
      }

      renderer.render(scene, camera);
    };

    animate();

    // 11. Cleanup
    return () => {
      if (stateRef.current.animFrameId) {
        cancelAnimationFrame(stateRef.current.animFrameId);
      }
      domElement.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      domElement.removeEventListener('wheel', onWheel);
      domElement.removeEventListener('touchstart', onTouchStart);
      domElement.removeEventListener('touchmove', onTouchMove);
      resizeObserver.disconnect();

      // Dispose materials & meshes
      if (stateRef.current.currentModel) {
        stateRef.current.currentModel.materials.forEach(m => m.dispose());
      }
      renderer.dispose();
      if (container.contains(domElement)) {
        container.removeChild(domElement);
      }
    };
  }, [product, selectedColorHex, autoRotate]);

  if (hasError) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center bg-slate-900/50 border border-slate-800 rounded-2xl min-h-[350px]">
        <ShieldAlert className="w-12 h-12 text-rose-400 mb-3" />
        <h4 className="text-lg font-semibold text-slate-200">3D Engine Offline</h4>
        <p className="text-sm text-slate-400 max-w-sm mt-1">
          3D engine could not be loaded. Please check your internet connection or browser WebGL support.
        </p>
      </div>
    );
  }

  return (
    <div className={`relative group select-none overflow-hidden rounded-2xl bg-gradient-to-b from-slate-900/40 via-slate-950/60 to-slate-900/80 border border-slate-800/80 ${className}`}>
      {/* Three.js Canvas Container */}
      <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Floating Futuristic HUD Overlay */}
      {showControlsOverlay && (
        <>
          {/* Top Info Badge */}
          <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/80 backdrop-blur-md border border-cyan-500/30 text-xs text-cyan-300 shadow-lg pointer-events-none">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="font-mono tracking-wider font-semibold">TECHVERSE 3D CORE</span>
            <span className="text-slate-500">•</span>
            <span className="text-slate-300 font-medium capitalize">{product.modelType}</span>
          </div>

          {/* Top Right Quick Controls */}
          <div className="absolute top-4 right-4 flex items-center gap-1.5">
            {/* Auto Rotate Toggle */}
            <button
              id={`btn-autorotate-${product.id}`}
              type="button"
              onClick={() => setAutoRotate(!autoRotate)}
              title={autoRotate ? 'Pause Rotation' : 'Enable Auto-Rotate'}
              className={`p-2 rounded-xl backdrop-blur-md border transition-all ${
                autoRotate
                  ? 'bg-cyan-500/20 border-cyan-500/40 text-cyan-300 shadow-cyan-500/20 shadow-md'
                  : 'bg-slate-900/80 border-slate-700/60 text-slate-400 hover:text-slate-200'
              }`}
            >
              <RotateCw className={`w-4 h-4 ${autoRotate ? 'animate-spin' : ''}`} />
            </button>

            {/* Wireframe Toggle */}
            <button
              id={`btn-wireframe-${product.id}`}
              type="button"
              onClick={() => setWireframe(!wireframe)}
              title={wireframe ? 'Solid Surface' : 'Wireframe Mode'}
              className={`p-2 rounded-xl backdrop-blur-md border transition-all ${
                wireframe
                  ? 'bg-purple-500/20 border-purple-500/40 text-purple-300'
                  : 'bg-slate-900/80 border-slate-700/60 text-slate-400 hover:text-slate-200'
              }`}
            >
              <Layers className="w-4 h-4" />
            </button>

            {/* Lighting Mode Cycler */}
            <button
              id={`btn-lighting-${product.id}`}
              type="button"
              onClick={() => {
                setLightingMode(prev => (prev === 'studio' ? 'neon' : prev === 'neon' ? 'sun' : 'studio'));
              }}
              title={`Lighting: ${lightingMode}`}
              className="p-2 rounded-xl bg-slate-900/80 backdrop-blur-md border border-slate-700/60 text-slate-400 hover:text-cyan-300 transition-all"
            >
              {lightingMode === 'studio' ? (
                <Sun className="w-4 h-4 text-amber-300" />
              ) : lightingMode === 'neon' ? (
                <Sparkles className="w-4 h-4 text-cyan-400" />
              ) : (
                <Zap className="w-4 h-4 text-orange-400" />
              )}
            </button>

            {/* Camera Reset */}
            <button
              id={`btn-reset-cam-${product.id}`}
              type="button"
              onClick={handleReset}
              title="Reset View"
              className="p-2 rounded-xl bg-slate-900/80 backdrop-blur-md border border-slate-700/60 text-slate-400 hover:text-slate-200 transition-all"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
          </div>

          {/* Bottom Controls Bar: Explode View & Gesture Guide */}
          <div className="absolute bottom-4 inset-x-4 flex items-center justify-between pointer-events-none">
            {/* Gesture Hint */}
            <div className="hidden sm:flex items-center gap-3 px-3 py-1.5 rounded-lg bg-slate-950/70 backdrop-blur-md border border-slate-800 text-[11px] text-slate-400">
              <span>🖱️ Drag to rotate</span>
              <span>•</span>
              <span>Scroll to zoom</span>
            </div>

            {/* Exploded View Action Button */}
            <button
              id={`btn-explode-${product.id}`}
              type="button"
              onClick={handleToggleExplode}
              className={`pointer-events-auto ml-auto flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold backdrop-blur-md border transition-all shadow-lg ${
                isExploded
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white border-cyan-400 shadow-cyan-500/25 ring-2 ring-cyan-400/40 animate-pulse'
                  : 'bg-slate-900/90 text-cyan-300 border-cyan-500/40 hover:bg-cyan-500/10 hover:border-cyan-400'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>{isExploded ? 'Assemble' : 'Explode View'}</span>
            </button>
          </div>

          {/* Parts breakdown ticker when exploded */}
          {isExploded && stateRef.current.currentModel?.parts && (
            <div className="absolute bottom-16 left-4 right-4 flex flex-wrap gap-1.5 pointer-events-none">
              {stateRef.current.currentModel.parts.map((p, idx) => (
                <div
                  key={idx}
                  className="px-2.5 py-1 rounded-md bg-slate-950/85 backdrop-blur-md border border-cyan-500/30 text-[11px] text-cyan-200 font-medium shadow-sm"
                >
                  {p.name}
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};
