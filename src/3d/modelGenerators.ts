import * as THREE from 'three';
import { Product, ExplodedPart } from '../types';

export interface GeneratedModel {
  root: THREE.Group;
  parts: ExplodedPart[];
  materials: THREE.Material[];
  updateAnimation?: (delta: number) => void;
}

// Helpers for materials
function createPBRMaterial(color: number, roughness = 0.3, metalness = 0.8, emissive = 0x000000) {
  return new THREE.MeshStandardMaterial({
    color,
    roughness,
    metalness,
    emissive,
    side: THREE.DoubleSide
  });
}

/**
 * Creates dynamic 3D procedural models based on product specifications and category
 */
export function createProduct3DModel(product: Product, primaryColorHex?: number): GeneratedModel {
  const color = primaryColorHex ?? (product.colors[0]?.materialColor || 0x334155);

  switch (product.modelType) {
    case 'laptop':
      return createLaptopModel(product, color);
    case 'phone':
      return createPhoneModel(product, color);
    case 'gpu':
      return createGPUModel(product, color);
    case 'monitor':
      return createMonitorModel(product, color);
    case 'keyboard':
      return createKeyboardModel(product, color);
    case 'mouse':
      return createMouseModel(product, color);
    case 'headphones':
      return createHeadphonesModel(product, color);
    case 'tablet':
      return createTabletModel(product, color);
    default:
      return createLaptopModel(product, color);
  }
}

// ==========================================
// 1. LAPTOP MODEL (MacBook, ROG, Legion, XPS)
// ==========================================
export function createLaptopModel(product: Product, color: number): GeneratedModel {
  const root = new THREE.Group();
  const parts: ExplodedPart[] = [];
  const materials: THREE.Material[] = [];

  const isGaming = product.category === 'Gaming' || product.id.includes('rog') || product.id.includes('legion');
  const isMac = product.id.startsWith('mac');

  const baseWidth = isMac ? 3.4 : 3.6;
  const baseDepth = isMac ? 2.3 : 2.5;
  const baseHeight = isGaming ? 0.18 : 0.08;

  // Base Chassis Material
  const chassisMat = createPBRMaterial(color, isMac ? 0.35 : 0.4, isMac ? 0.85 : 0.7);
  materials.push(chassisMat);

  // 1. Base Chassis
  const baseGeo = new THREE.BoxGeometry(baseWidth, baseHeight, baseDepth);
  const baseMesh = new THREE.Mesh(baseGeo, chassisMat);
  baseMesh.castShadow = true;
  baseMesh.receiveShadow = true;
  baseMesh.position.set(0, 0, 0);

  // Rubber feet on bottom
  const footGeo = new THREE.CylinderGeometry(0.08, 0.08, 0.02, 16);
  const footMat = new THREE.MeshBasicMaterial({ color: 0x111111 });
  materials.push(footMat);
  const footOffsets = [
    [-baseWidth / 2 + 0.3, -baseHeight / 2 - 0.01, -baseDepth / 2 + 0.3],
    [baseWidth / 2 - 0.3, -baseHeight / 2 - 0.01, -baseDepth / 2 + 0.3],
    [-baseWidth / 2 + 0.3, -baseHeight / 2 - 0.01, baseDepth / 2 - 0.3],
    [baseWidth / 2 - 0.3, -baseHeight / 2 - 0.01, baseDepth / 2 - 0.3]
  ];
  footOffsets.forEach(pos => {
    const foot = new THREE.Mesh(footGeo, footMat);
    foot.position.set(pos[0], pos[1], pos[2]);
    baseMesh.add(foot);
  });

  // Gaming side/rear exhaust vents if gaming
  if (isGaming) {
    const ventMat = new THREE.MeshStandardMaterial({
      color: 0x0ea5e9,
      emissive: 0x0284c7,
      emissiveIntensity: 0.8
    });
    materials.push(ventMat);
    const ventGeo = new THREE.BoxGeometry(baseWidth * 0.7, baseHeight * 0.7, 0.05);
    const ventMesh = new THREE.Mesh(ventGeo, ventMat);
    ventMesh.position.set(0, 0, -baseDepth / 2 - 0.01);
    baseMesh.add(ventMesh);
  }

  // 2. Keyboard and Trackpad Layer
  const keyboardGroup = new THREE.Group();
  keyboardGroup.position.set(0, baseHeight / 2 + 0.01, 0);

  // Keyboard recess plate
  const recessGeo = new THREE.BoxGeometry(baseWidth * 0.78, 0.02, baseDepth * 0.44);
  const recessMat = createPBRMaterial(0x111827, 0.6, 0.2);
  materials.push(recessMat);
  const recessMesh = new THREE.Mesh(recessGeo, recessMat);
  recessMesh.position.set(0, 0, -0.2);
  keyboardGroup.add(recessMesh);

  // Keycaps grid
  const keyMat = new THREE.MeshStandardMaterial({
    color: isGaming ? 0x1e1b4b : 0x1f242d,
    roughness: 0.5,
    metalness: 0.3,
    emissive: isGaming ? 0x6366f1 : 0x000000,
    emissiveIntensity: isGaming ? 0.3 : 0
  });
  materials.push(keyMat);

  const keyRows = 5;
  const keyCols = 13;
  const keyW = (baseWidth * 0.72) / keyCols;
  const keyD = (baseDepth * 0.38) / keyRows;
  const keyGeo = new THREE.BoxGeometry(keyW * 0.85, 0.03, keyD * 0.85);

  for (let r = 0; r < keyRows; r++) {
    for (let c = 0; c < keyCols; c++) {
      const keyMesh = new THREE.Mesh(keyGeo, keyMat);
      const x = (c - (keyCols - 1) / 2) * keyW;
      const z = -0.2 + (r - (keyRows - 1) / 2) * keyD;
      keyMesh.position.set(x, 0.02, z);
      keyboardGroup.add(keyMesh);
    }
  }

  // Glass Trackpad
  const trackpadGeo = new THREE.BoxGeometry(baseWidth * 0.35, 0.01, baseDepth * 0.32);
  const trackpadMat = createPBRMaterial(color, 0.2, 0.4);
  materials.push(trackpadMat);
  const trackpadMesh = new THREE.Mesh(trackpadGeo, trackpadMat);
  trackpadMesh.position.set(0, 0, baseDepth * 0.26);
  keyboardGroup.add(trackpadMesh);

  // 3. Cylindrical Hinges
  const hingeGroup = new THREE.Group();
  hingeGroup.position.set(0, baseHeight / 2 + 0.02, -baseDepth / 2 + 0.06);
  const hingeGeo = new THREE.CylinderGeometry(0.04, 0.04, baseWidth * 0.6, 16);
  hingeGeo.rotateZ(Math.PI / 2);
  const hingeMat = createPBRMaterial(0x334155, 0.2, 0.9);
  materials.push(hingeMat);
  const hingeMesh = new THREE.Mesh(hingeGeo, hingeMat);
  hingeGroup.add(hingeMesh);

  // 4. Screen Display Lid (Pivoted back ~110 degrees)
  const screenLidGroup = new THREE.Group();
  screenLidGroup.position.set(0, baseHeight / 2 + 0.04, -baseDepth / 2 + 0.06);
  screenLidGroup.rotation.x = -Math.PI * 0.35; // Open angle

  // Display Outer Lid
  const lidThickness = 0.04;
  const lidGeo = new THREE.BoxGeometry(baseWidth, lidThickness, baseDepth);
  const lidMesh = new THREE.Mesh(lidGeo, chassisMat);
  lidMesh.position.set(0, 0, baseDepth / 2);
  lidMesh.castShadow = true;
  screenLidGroup.add(lidMesh);

  // Display Panel (Glowing Screen)
  const screenGeo = new THREE.PlaneGeometry(baseWidth * 0.92, baseDepth * 0.88);
  const screenMat = new THREE.MeshStandardMaterial({
    color: isGaming ? 0x0f172a : 0x0284c7,
    roughness: 0.1,
    metalness: 0.1,
    emissive: isGaming ? 0x38bdf8 : 0x38bdf8,
    emissiveIntensity: 0.5
  });
  materials.push(screenMat);
  const screenMesh = new THREE.Mesh(screenGeo, screenMat);
  screenMesh.rotation.x = Math.PI / 2;
  screenMesh.position.set(0, lidThickness / 2 + 0.005, baseDepth / 2);
  screenLidGroup.add(screenMesh);

  // Brand Logo on the back of lid
  const logoGeo = new THREE.CircleGeometry(0.12, 32);
  const logoMat = new THREE.MeshBasicMaterial({ color: isGaming ? 0x00f0ff : 0xffffff });
  materials.push(logoMat);
  const logoMesh = new THREE.Mesh(logoGeo, logoMat);
  logoMesh.rotation.x = -Math.PI / 2;
  logoMesh.position.set(0, -lidThickness / 2 - 0.005, baseDepth / 2);
  screenLidGroup.add(logoMesh);

  root.add(baseMesh);
  root.add(keyboardGroup);
  root.add(hingeGroup);
  root.add(screenLidGroup);

  // Exploded View definitions
  parts.push(
    {
      name: 'Unibody Base Chassis',
      mesh: baseMesh,
      originalPos: { x: 0, y: 0, z: 0 },
      explodedPos: { x: 0, y: -0.8, z: 0 }
    },
    {
      name: 'Keyboard & Trackpad Module',
      mesh: keyboardGroup,
      originalPos: { x: 0, y: baseHeight / 2 + 0.01, z: 0 },
      explodedPos: { x: 0, y: 0.2, z: 0 }
    },
    {
      name: 'Precision Hinge Mechanism',
      mesh: hingeGroup,
      originalPos: { x: 0, y: baseHeight / 2 + 0.02, z: -baseDepth / 2 + 0.06 },
      explodedPos: { x: 0, y: 0.9, z: -baseDepth / 2 + 0.06 }
    },
    {
      name: isMac ? 'Liquid Retina Display Lid' : 'OLED High-Refresh Display',
      mesh: screenLidGroup,
      originalPos: { x: 0, y: baseHeight / 2 + 0.04, z: -baseDepth / 2 + 0.06 },
      explodedPos: { x: 0, y: 1.8, z: -0.6 }
    }
  );

  return { root, parts, materials };
}

// ==========================================
// 2. SMARTPHONE MODEL (S26 Ultra, S26, iPhone 16 Pro, Pixel 9 Pro)
// ==========================================
export function createPhoneModel(product: Product, color: number): GeneratedModel {
  const root = new THREE.Group();
  const parts: ExplodedPart[] = [];
  const materials: THREE.Material[] = [];

  const isUltra = product.id.includes('ultra');
  const isIphone = product.id.includes('iphone');
  const isPixel = product.id.includes('pixel');

  const width = isUltra || isIphone ? 1.6 : 1.45;
  const height = isUltra || isIphone ? 3.3 : 3.0;
  const depth = 0.16;

  // Frame Material
  const frameMat = createPBRMaterial(color, 0.25, 0.85);
  materials.push(frameMat);

  // 1. Main Unibody Frame
  const frameGeo = new THREE.BoxGeometry(width, height, depth);
  const frameMesh = new THREE.Mesh(frameGeo, frameMat);
  frameMesh.castShadow = true;
  frameMesh.receiveShadow = true;

  // Side buttons
  const buttonMat = createPBRMaterial(color, 0.2, 0.9);
  materials.push(buttonMat);
  const powerBtnGeo = new THREE.BoxGeometry(0.04, 0.35, 0.04);
  const powerBtn = new THREE.Mesh(powerBtnGeo, buttonMat);
  powerBtn.position.set(width / 2 + 0.02, 0.3, 0);
  frameMesh.add(powerBtn);

  const volBtnGeo = new THREE.BoxGeometry(0.04, 0.6, 0.04);
  const volBtn = new THREE.Mesh(volBtnGeo, buttonMat);
  volBtn.position.set(-width / 2 - 0.02, 0.4, 0);
  frameMesh.add(volBtn);

  // S-Pen slot or Speaker cutout at bottom
  const portGeo = new THREE.BoxGeometry(0.3, 0.03, 0.04);
  const portMat = new THREE.MeshBasicMaterial({ color: 0x0a0a0a });
  materials.push(portMat);
  const portMesh = new THREE.Mesh(portGeo, portMat);
  portMesh.position.set(0, -height / 2 - 0.001, 0);
  frameMesh.add(portMesh);

  // 2. Front Display Panel (+Z direction)
  const displayGroup = new THREE.Group();
  displayGroup.position.set(0, 0, depth / 2 + 0.01);

  const screenGeo = new THREE.PlaneGeometry(width * 0.94, height * 0.95);
  const screenMat = new THREE.MeshStandardMaterial({
    color: 0x050b14,
    roughness: 0.1,
    metalness: 0.2,
    emissive: 0x0ea5e9,
    emissiveIntensity: 0.2
  });
  materials.push(screenMat);
  const screenMesh = new THREE.Mesh(screenGeo, screenMat);
  displayGroup.add(screenMesh);

  // Dynamic Island / Punch Hole Camera
  if (isIphone) {
    const pillGeo = new THREE.CapsuleGeometry(0.05, 0.18, 8, 16);
    pillGeo.rotateZ(Math.PI / 2);
    const pillMat = new THREE.MeshBasicMaterial({ color: 0x000000 });
    materials.push(pillMat);
    const pillMesh = new THREE.Mesh(pillGeo, pillMat);
    pillMesh.position.set(0, height * 0.42, 0.002);
    displayGroup.add(pillMesh);
  } else {
    // Single punch-hole
    const holeGeo = new THREE.CircleGeometry(0.04, 16);
    const holeMat = new THREE.MeshBasicMaterial({ color: 0x000000 });
    materials.push(holeMat);
    const holeMesh = new THREE.Mesh(holeGeo, holeMat);
    holeMesh.position.set(0, height * 0.43, 0.002);
    displayGroup.add(holeMesh);
  }

  // 3. Rear Panel (-Z direction)
  const rearGroup = new THREE.Group();
  rearGroup.position.set(0, 0, -depth / 2 - 0.01);

  const backGeo = new THREE.PlaneGeometry(width * 0.98, height * 0.98);
  const backMat = createPBRMaterial(color, 0.3, 0.7);
  materials.push(backMat);
  const backMesh = new THREE.Mesh(backGeo, backMat);
  backMesh.rotation.y = Math.PI; // faces backwards
  rearGroup.add(backMesh);

  // 4. Camera System
  const cameraGroup = new THREE.Group();
  cameraGroup.position.set(0, 0, -depth / 2 - 0.02);

  const lensGlassMat = new THREE.MeshStandardMaterial({
    color: 0x050811,
    roughness: 0.05,
    metalness: 0.9,
    emissive: 0x1e3a8a,
    emissiveIntensity: 0.4
  });
  materials.push(lensGlassMat);

  const ringMat = createPBRMaterial(0x94a3b8, 0.2, 0.95);
  materials.push(ringMat);

  if (isPixel) {
    // Pixel signature camera visor bar
    const visorGeo = new THREE.BoxGeometry(width * 0.98, 0.55, 0.12);
    const visorMesh = new THREE.Mesh(visorGeo, frameMat);
    visorMesh.position.set(0, height * 0.28, -0.06);
    cameraGroup.add(visorMesh);

    // Pill glass on visor
    const visorGlassGeo = new THREE.CapsuleGeometry(0.12, 0.6, 8, 16);
    visorGlassGeo.rotateZ(Math.PI / 2);
    const visorGlass = new THREE.Mesh(visorGlassGeo, lensGlassMat);
    visorGlass.position.set(-0.15, height * 0.28, -0.125);
    cameraGroup.add(visorGlass);
  } else if (isIphone) {
    // Triangular triple camera on raised plateau
    const islandGeo = new THREE.BoxGeometry(0.75, 0.8, 0.06);
    const islandMesh = new THREE.Mesh(islandGeo, frameMat);
    islandMesh.position.set(-width * 0.22, height * 0.3, -0.03);
    cameraGroup.add(islandMesh);

    const lensPositions = [
      [-width * 0.22 - 0.16, height * 0.3 + 0.18],
      [-width * 0.22 - 0.16, height * 0.3 - 0.18],
      [-width * 0.22 + 0.16, height * 0.3]
    ];
    lensPositions.forEach(pos => {
      const ringGeo = new THREE.CylinderGeometry(0.12, 0.12, 0.08, 24);
      ringGeo.rotateX(Math.PI / 2);
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.position.set(pos[0], pos[1], -0.08);

      const lensGeo = new THREE.CylinderGeometry(0.09, 0.09, 0.085, 24);
      lensGeo.rotateX(Math.PI / 2);
      const lens = new THREE.Mesh(lensGeo, lensGlassMat);
      lens.position.set(pos[0], pos[1], -0.085);

      cameraGroup.add(ring);
      cameraGroup.add(lens);
    });
  } else {
    // Samsung Vertical Array (S26 Ultra / S26)
    const lensCount = isUltra ? 4 : 3;
    for (let i = 0; i < lensCount; i++) {
      const y = height * 0.35 - i * 0.38;
      const x = -width * 0.28;

      const ringGeo = new THREE.CylinderGeometry(0.13, 0.13, 0.07, 24);
      ringGeo.rotateX(Math.PI / 2);
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.position.set(x, y, -0.04);

      const lensGeo = new THREE.CylinderGeometry(0.095, 0.095, 0.075, 24);
      lensGeo.rotateX(Math.PI / 2);
      const lens = new THREE.Mesh(lensGeo, lensGlassMat);
      lens.position.set(x, y, -0.045);

      cameraGroup.add(ring);
      cameraGroup.add(lens);
    }
  }

  root.add(frameMesh);
  root.add(displayGroup);
  root.add(rearGroup);
  root.add(cameraGroup);

  // Exploded View positions
  parts.push(
    {
      name: 'Titanium Armor Frame & Logic Board',
      mesh: frameMesh,
      originalPos: { x: 0, y: 0, z: 0 },
      explodedPos: { x: 0, y: 0, z: 0 }
    },
    {
      name: 'Dynamic AMOLED / Retina Display',
      mesh: displayGroup,
      originalPos: { x: 0, y: 0, z: depth / 2 + 0.01 },
      explodedPos: { x: 0, y: 0, z: 1.2 }
    },
    {
      name: 'Satin Matte Glass Rear Cover',
      mesh: rearGroup,
      originalPos: { x: 0, y: 0, z: -depth / 2 - 0.01 },
      explodedPos: { x: 0, y: 0, z: -0.9 }
    },
    {
      name: 'Ultra Computational Camera Optics',
      mesh: cameraGroup,
      originalPos: { x: 0, y: 0, z: -depth / 2 - 0.02 },
      explodedPos: { x: 0, y: 0, z: -1.7 }
    }
  );

  return { root, parts, materials };
}

// ==========================================
// 3. GPU MODEL (GeForce RTX 5090)
// ==========================================
export function createGPUModel(product: Product, color: number): GeneratedModel {
  const root = new THREE.Group();
  const parts: ExplodedPart[] = [];
  const materials: THREE.Material[] = [];

  const gpuWidth = 3.6;
  const gpuHeight = 1.6;
  const gpuDepth = 0.9;

  // 1. GPU PCB Board (Circuit Board)
  const pcbGeo = new THREE.BoxGeometry(gpuWidth * 0.95, gpuHeight * 0.9, 0.04);
  const pcbMat = new THREE.MeshStandardMaterial({
    color: 0x064e3b, // Dark green PCB
    roughness: 0.6,
    metalness: 0.3
  });
  materials.push(pcbMat);
  const pcbMesh = new THREE.Mesh(pcbGeo, pcbMat);

  // GPU Silicon Die in center
  const dieGeo = new THREE.BoxGeometry(0.7, 0.7, 0.06);
  const dieMat = createPBRMaterial(0x94a3b8, 0.1, 0.95);
  materials.push(dieMat);
  const dieMesh = new THREE.Mesh(dieGeo, dieMat);
  dieMesh.position.set(0, 0, 0.04);
  pcbMesh.add(dieMesh);

  // PCIe Gold Finger connector at bottom
  const pcieGeo = new THREE.BoxGeometry(gpuWidth * 0.5, 0.14, 0.03);
  const goldMat = new THREE.MeshStandardMaterial({
    color: 0xf59e0b,
    metalness: 0.9,
    roughness: 0.2
  });
  materials.push(goldMat);
  const pcieMesh = new THREE.Mesh(pcieGeo, goldMat);
  pcieMesh.position.set(-0.3, -gpuHeight * 0.45 - 0.07, 0);
  pcbMesh.add(pcieMesh);

  // 2. Dense Aluminum Fin Heatsink Stack
  const heatsinkGroup = new THREE.Group();
  heatsinkGroup.position.set(0, 0, 0.22);

  const finCount = 38;
  const finGeo = new THREE.BoxGeometry(0.04, gpuHeight * 0.85, gpuDepth * 0.45);
  const finMat = createPBRMaterial(0xd1d5db, 0.3, 0.9);
  materials.push(finMat);

  for (let i = 0; i < finCount; i++) {
    const fin = new THREE.Mesh(finGeo, finMat);
    const x = -gpuWidth * 0.42 + (i / (finCount - 1)) * (gpuWidth * 0.84);
    fin.position.set(x, 0, 0);
    heatsinkGroup.add(fin);
  }

  // Copper Heatpipes running through
  const pipeGeo = new THREE.CylinderGeometry(0.05, 0.05, gpuWidth * 0.88, 16);
  pipeGeo.rotateZ(Math.PI / 2);
  const copperMat = new THREE.MeshStandardMaterial({
    color: 0xb45309,
    metalness: 0.85,
    roughness: 0.3
  });
  materials.push(copperMat);
  const pipe1 = new THREE.Mesh(pipeGeo, copperMat);
  pipe1.position.set(0, 0.25, 0);
  const pipe2 = new THREE.Mesh(pipeGeo, copperMat);
  pipe2.position.set(0, -0.25, 0);
  heatsinkGroup.add(pipe1, pipe2);

  // 3. Shroud with Triple Axial Fans
  const shroudGroup = new THREE.Group();
  shroudGroup.position.set(0, 0, 0.55);

  const shroudGeo = new THREE.BoxGeometry(gpuWidth, gpuHeight, 0.15);
  const shroudMat = createPBRMaterial(0x18181b, 0.4, 0.7);
  materials.push(shroudMat);
  const shroudMesh = new THREE.Mesh(shroudGeo, shroudMat);
  shroudGroup.add(shroudMesh);

  // Side RGB Logo
  const logoGeo = new THREE.BoxGeometry(1.2, 0.1, 0.16);
  const rgbMat = new THREE.MeshStandardMaterial({
    color: 0x10b981,
    emissive: 0x10b981,
    emissiveIntensity: 0.9
  });
  materials.push(rgbMat);
  const logoMesh = new THREE.Mesh(logoGeo, rgbMat);
  logoMesh.position.set(0, gpuHeight / 2 - 0.02, 0);
  shroudGroup.add(logoMesh);

  // Triple Axial Fans
  const fanBlades: THREE.Group[] = [];
  const fanPositions = [-1.05, 0, 1.05];
  fanPositions.forEach(x => {
    const fanPivot = new THREE.Group();
    fanPivot.position.set(x, 0, 0.08);

    const hubGeo = new THREE.CylinderGeometry(0.2, 0.2, 0.06, 24);
    hubGeo.rotateX(Math.PI / 2);
    const hub = new THREE.Mesh(hubGeo, shroudMat);
    fanPivot.add(hub);

    const bladeGeo = new THREE.BoxGeometry(0.1, 0.42, 0.02);
    const bladeMat = createPBRMaterial(0x27272a, 0.3, 0.4);
    materials.push(bladeMat);

    for (let b = 0; b < 9; b++) {
      const blade = new THREE.Mesh(bladeGeo, bladeMat);
      blade.rotation.z = (b / 9) * Math.PI * 2;
      blade.position.set(
        Math.cos((b / 9) * Math.PI * 2) * 0.25,
        Math.sin((b / 9) * Math.PI * 2) * 0.25,
        0
      );
      blade.rotation.x = 0.4; // Pitch
      fanPivot.add(blade);
    }

    shroudGroup.add(fanPivot);
    fanBlades.push(fanPivot);
  });

  // 4. Aluminum Reinforced Backplate
  const backplateGeo = new THREE.BoxGeometry(gpuWidth * 0.98, gpuHeight * 0.92, 0.05);
  const backplateMat = createPBRMaterial(0x27272a, 0.35, 0.85);
  materials.push(backplateMat);
  const backplateMesh = new THREE.Mesh(backplateGeo, backplateMat);
  backplateMesh.position.set(0, 0, -0.15);

  root.add(pcbMesh);
  root.add(heatsinkGroup);
  root.add(shroudGroup);
  root.add(backplateMesh);

  // Exploded View positions
  parts.push(
    {
      name: 'Blackwell GPU Die & PCB Substrate',
      mesh: pcbMesh,
      originalPos: { x: 0, y: 0, z: 0 },
      explodedPos: { x: 0, y: 0, z: 0 }
    },
    {
      name: 'Vapor Chamber & Fin Stack Heatsink',
      mesh: heatsinkGroup,
      originalPos: { x: 0, y: 0, z: 0.22 },
      explodedPos: { x: 0, y: 0, z: 0.9 }
    },
    {
      name: 'Dual Axial Triple-Fan Aerodynamic Shroud',
      mesh: shroudGroup,
      originalPos: { x: 0, y: 0, z: 0.55 },
      explodedPos: { x: 0, y: 0, z: 1.8 }
    },
    {
      name: 'CNC Aluminum Reinforced Backplate',
      mesh: backplateMesh,
      originalPos: { x: 0, y: 0, z: -0.15 },
      explodedPos: { x: 0, y: 0, z: -0.9 }
    }
  );

  // Spin fans continuously
  const updateAnimation = (delta: number) => {
    fanBlades.forEach(f => {
      f.rotation.z += delta * 6;
    });
  };

  return { root, parts, materials, updateAnimation };
}

// ==========================================
// 4. MONITOR MODEL (Odyssey Neo G9 Curved)
// ==========================================
export function createMonitorModel(product: Product, color: number): GeneratedModel {
  const root = new THREE.Group();
  const parts: ExplodedPart[] = [];
  const materials: THREE.Material[] = [];

  // Ultrawide Curved Panel
  const panelGroup = new THREE.Group();
  panelGroup.position.set(0, 0.3, 0);

  // Curved Cylinder Segment for 1000R Display
  const radius = 5.0;
  const arc = Math.PI * 0.45; // Curved span
  const height = 1.4;
  const curveGeo = new THREE.CylinderGeometry(radius, radius, height, 48, 1, true, -arc / 2 + Math.PI / 2, arc);

  const screenMat = new THREE.MeshStandardMaterial({
    color: 0x0284c7,
    roughness: 0.1,
    metalness: 0.1,
    emissive: 0x0284c7,
    emissiveIntensity: 0.4,
    side: THREE.DoubleSide
  });
  materials.push(screenMat);
  const screenMesh = new THREE.Mesh(curveGeo, screenMat);
  screenMesh.position.set(0, 0, -radius + 0.5);
  panelGroup.add(screenMesh);

  // Rear White Casing
  const rearGeo = new THREE.CylinderGeometry(radius + 0.05, radius + 0.05, height + 0.05, 48, 1, true, -arc / 2 + Math.PI / 2, arc);
  const whiteMat = createPBRMaterial(0xf8fafc, 0.3, 0.4);
  materials.push(whiteMat);
  const rearMesh = new THREE.Mesh(rearGeo, whiteMat);
  rearMesh.position.set(0, 0, -radius + 0.5);
  panelGroup.add(rearMesh);

  // Core Lighting RGB Ring on Back
  const ringGeo = new THREE.TorusGeometry(0.35, 0.04, 16, 32);
  const rgbMat = new THREE.MeshStandardMaterial({
    color: 0x06b6d4,
    emissive: 0x06b6d4,
    emissiveIntensity: 1.0
  });
  materials.push(rgbMat);
  const ringMesh = new THREE.Mesh(ringGeo, rgbMat);
  ringMesh.position.set(0, 0, -0.2);
  panelGroup.add(ringMesh);

  // Heavy Metal Stand & Arm
  const standGroup = new THREE.Group();
  standGroup.position.set(0, 0, -0.4);

  // Upright column
  const armGeo = new THREE.BoxGeometry(0.18, 1.6, 0.18);
  const metalMat = createPBRMaterial(0x64748b, 0.25, 0.85);
  materials.push(metalMat);
  const armMesh = new THREE.Mesh(armGeo, metalMat);
  armMesh.position.set(0, 0.1, 0);
  standGroup.add(armMesh);

  // V-shaped wide desk feet
  const footGeo = new THREE.BoxGeometry(0.1, 0.04, 1.3);
  const leftFoot = new THREE.Mesh(footGeo, metalMat);
  leftFoot.rotation.y = -Math.PI * 0.25;
  leftFoot.position.set(-0.5, -0.7, 0.4);

  const rightFoot = new THREE.Mesh(footGeo, metalMat);
  rightFoot.rotation.y = Math.PI * 0.25;
  rightFoot.position.set(0.5, -0.7, 0.4);

  standGroup.add(leftFoot, rightFoot);

  root.add(panelGroup);
  root.add(standGroup);

  parts.push(
    {
      name: 'Dual UHD Quantum Mini-LED Curved Screen',
      mesh: panelGroup,
      originalPos: { x: 0, y: 0.3, z: 0 },
      explodedPos: { x: 0, y: 0.5, z: 0.9 }
    },
    {
      name: 'Ergonomic Articulated Stand & Core Lighting Hub',
      mesh: standGroup,
      originalPos: { x: 0, y: 0, z: -0.4 },
      explodedPos: { x: 0, y: -0.4, z: -1.0 }
    }
  );

  return { root, parts, materials };
}

// ==========================================
// 5. MECHANICAL KEYBOARD MODEL (Corsair K70 MAX)
// ==========================================
export function createKeyboardModel(product: Product, color: number): GeneratedModel {
  const root = new THREE.Group();
  const parts: ExplodedPart[] = [];
  const materials: THREE.Material[] = [];

  const kbWidth = 3.6;
  const kbHeight = 0.22;
  const kbDepth = 1.4;

  // 1. Brushed Aluminum Chassis Base
  const baseGeo = new THREE.BoxGeometry(kbWidth, kbHeight, kbDepth);
  const baseMat = createPBRMaterial(0x1e2229, 0.4, 0.7);
  materials.push(baseMat);
  const baseMesh = new THREE.Mesh(baseGeo, baseMat);

  // Knurled Aluminum Volume Roller at top right
  const rollerGeo = new THREE.CylinderGeometry(0.08, 0.08, 0.4, 24);
  rollerGeo.rotateZ(Math.PI / 2);
  const rollerMat = createPBRMaterial(0x94a3b8, 0.2, 0.9);
  materials.push(rollerMat);
  const roller = new THREE.Mesh(rollerGeo, rollerMat);
  roller.position.set(kbWidth / 2 - 0.35, kbHeight / 2 + 0.06, -kbDepth / 2 + 0.2);
  baseMesh.add(roller);

  // 2. Switch Mounting Plate with RGB Glow
  const plateGroup = new THREE.Group();
  plateGroup.position.set(0, kbHeight / 2 + 0.02, 0);

  const rgbUnderglow = new THREE.Mesh(
    new THREE.BoxGeometry(kbWidth * 0.95, 0.02, kbDepth * 0.88),
    new THREE.MeshStandardMaterial({
      color: 0x6366f1,
      emissive: 0x818cf8,
      emissiveIntensity: 0.8
    })
  );
  materials.push(rgbUnderglow.material as THREE.Material);
  plateGroup.add(rgbUnderglow);

  // 3. Keycaps Matrix (Exploded separately)
  const keycapsGroup = new THREE.Group();
  keycapsGroup.position.set(0, kbHeight / 2 + 0.08, 0);

  const rows = 5;
  const cols = 16;
  const kw = (kbWidth * 0.9) / cols;
  const kd = (kbDepth * 0.8) / rows;
  const capGeo = new THREE.BoxGeometry(kw * 0.86, 0.1, kd * 0.86);

  const capMatDark = createPBRMaterial(0x18181b, 0.5, 0.2);
  const capMatAccent = createPBRMaterial(0x3b82f6, 0.4, 0.3);
  materials.push(capMatDark, capMatAccent);

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const isAccent = (r === 0 && c === 0) || (r === rows - 1 && c === Math.floor(cols / 2));
      const cap = new THREE.Mesh(capGeo, isAccent ? capMatAccent : capMatDark);
      const x = (c - (cols - 1) / 2) * kw;
      const z = (r - (rows - 1) / 2) * kd;
      cap.position.set(x, 0, z);
      keycapsGroup.add(cap);
    }
  }

  root.add(baseMesh);
  root.add(plateGroup);
  root.add(keycapsGroup);

  // Slanted angle for realistic desktop ergonomics
  root.rotation.x = 0.18;

  parts.push(
    {
      name: 'Anodized Aluminum Unibody & Sound Dampener',
      mesh: baseMesh,
      originalPos: { x: 0, y: 0, z: 0 },
      explodedPos: { x: 0, y: -0.6, z: 0 }
    },
    {
      name: 'CORSAIR MGX Magnetic Switch Plate & Hall Effect PCB',
      mesh: plateGroup,
      originalPos: { x: 0, y: kbHeight / 2 + 0.02, z: 0 },
      explodedPos: { x: 0, y: 0.3, z: 0 }
    },
    {
      name: 'Double-Shot PBT Sculpted Keycap Matrix',
      mesh: keycapsGroup,
      originalPos: { x: 0, y: kbHeight / 2 + 0.08, z: 0 },
      explodedPos: { x: 0, y: 1.2, z: 0 }
    }
  );

  return { root, parts, materials };
}

// ==========================================
// 6. GAMING MOUSE MODEL (Logitech G Pro X Superlight 2)
// ==========================================
export function createMouseModel(product: Product, color: number): GeneratedModel {
  const root = new THREE.Group();
  const parts: ExplodedPart[] = [];
  const materials: THREE.Material[] = [];

  const bodyMat = createPBRMaterial(color, 0.3, 0.3);
  materials.push(bodyMat);

  // 1. Bottom Base with PTFE skates and HERO 2 Sensor
  const baseGroup = new THREE.Group();
  baseGroup.position.set(0, 0, 0);

  const baseGeo = new THREE.BoxGeometry(1.2, 0.12, 2.2);
  const baseMesh = new THREE.Mesh(baseGeo, bodyMat);
  baseGroup.add(baseMesh);

  // White PTFE feet
  const skateGeo = new THREE.BoxGeometry(0.9, 0.02, 0.3);
  const skateMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
  materials.push(skateMat);
  const frontSkate = new THREE.Mesh(skateGeo, skateMat);
  frontSkate.position.set(0, -0.065, 0.8);
  const rearSkate = new THREE.Mesh(skateGeo, skateMat);
  rearSkate.position.set(0, -0.065, -0.8);
  baseGroup.add(frontSkate, rearSkate);

  // 2. Palm Shell (Upper curved dome)
  const palmGroup = new THREE.Group();
  palmGroup.position.set(0, 0.25, -0.2);

  const palmGeo = new THREE.SphereGeometry(0.75, 32, 16);
  palmGeo.scale(0.85, 0.5, 1.2);
  const palmMesh = new THREE.Mesh(palmGeo, bodyMat);
  palmGroup.add(palmMesh);

  // 3. Left & Right Click Triggers and Scroll Wheel
  const buttonGroup = new THREE.Group();
  buttonGroup.position.set(0, 0.22, 0.7);

  // Left click
  const clickGeo = new THREE.BoxGeometry(0.48, 0.08, 0.9);
  const leftClick = new THREE.Mesh(clickGeo, bodyMat);
  leftClick.position.set(-0.28, 0, 0);

  // Right click
  const rightClick = new THREE.Mesh(clickGeo, bodyMat);
  rightClick.position.set(0.28, 0, 0);

  // Ridged Scroll Wheel
  const wheelGeo = new THREE.CylinderGeometry(0.15, 0.15, 0.12, 24);
  wheelGeo.rotateZ(Math.PI / 2);
  const wheelMat = createPBRMaterial(0x111827, 0.6, 0.1);
  materials.push(wheelMat);
  const wheel = new THREE.Mesh(wheelGeo, wheelMat);
  wheel.position.set(0, 0.08, 0);

  buttonGroup.add(leftClick, rightClick, wheel);

  root.add(baseGroup);
  root.add(palmGroup);
  root.add(buttonGroup);

  parts.push(
    {
      name: 'HERO 2 Sensor Sub-Chassis & Zero-Additive PTFE Skates',
      mesh: baseGroup,
      originalPos: { x: 0, y: 0, z: 0 },
      explodedPos: { x: 0, y: -0.6, z: 0 }
    },
    {
      name: 'Ultra-Lightweight 60g Ergonomic Shell',
      mesh: palmGroup,
      originalPos: { x: 0, y: 0.25, z: -0.2 },
      explodedPos: { x: 0, y: 0.8, z: -0.3 }
    },
    {
      name: 'LIGHTFORCE Optical-Mechanical Switch Triggers',
      mesh: buttonGroup,
      originalPos: { x: 0, y: 0.22, z: 0.7 },
      explodedPos: { x: 0, y: 0.9, z: 0.8 }
    }
  );

  return { root, parts, materials };
}

// ==========================================
// 7. HEADPHONES MODEL (Sony WH-1000XM5)
// ==========================================
export function createHeadphonesModel(product: Product, color: number): GeneratedModel {
  const root = new THREE.Group();
  const parts: ExplodedPart[] = [];
  const materials: THREE.Material[] = [];

  const darkMat = createPBRMaterial(color, 0.4, 0.5);
  materials.push(darkMat);

  // 1. Headband Arch
  const headbandGroup = new THREE.Group();
  headbandGroup.position.set(0, 0.8, 0);

  const curveGeo = new THREE.TorusGeometry(1.1, 0.08, 16, 32, Math.PI);
  const arch = new THREE.Mesh(curveGeo, darkMat);
  arch.rotation.z = 0;
  headbandGroup.add(arch);

  // 2. Left Acoustic Driver & Foam Cushion
  const leftGroup = new THREE.Group();
  leftGroup.position.set(-1.15, 0.2, 0);

  // Acoustic cup outer
  const cupGeo = new THREE.CylinderGeometry(0.48, 0.48, 0.22, 32);
  cupGeo.rotateZ(Math.PI / 2);
  const leftCup = new THREE.Mesh(cupGeo, darkMat);
  leftGroup.add(leftCup);

  // Soft leatherette cushion
  const cushionGeo = new THREE.CylinderGeometry(0.44, 0.44, 0.12, 32);
  cushionGeo.rotateZ(Math.PI / 2);
  const cushionMat = createPBRMaterial(0x1e2022, 0.8, 0.1);
  materials.push(cushionMat);
  const leftCushion = new THREE.Mesh(cushionGeo, cushionMat);
  leftCushion.position.set(0.12, 0, 0);
  leftGroup.add(leftCushion);

  // 3. Right Acoustic Driver & Foam Cushion
  const rightGroup = new THREE.Group();
  rightGroup.position.set(1.15, 0.2, 0);

  const rightCup = new THREE.Mesh(cupGeo, darkMat);
  rightGroup.add(rightCup);

  const rightCushion = new THREE.Mesh(cushionGeo, cushionMat);
  rightCushion.position.set(-0.12, 0, 0);
  rightGroup.add(rightCushion);

  root.add(headbandGroup);
  root.add(leftGroup);
  root.add(rightGroup);

  parts.push(
    {
      name: 'Memory Foam Padded Ergonomic Headband',
      mesh: headbandGroup,
      originalPos: { x: 0, y: 0.8, z: 0 },
      explodedPos: { x: 0, y: 1.4, z: 0 }
    },
    {
      name: 'Left 30mm Carbon Driver & ANC Processor',
      mesh: leftGroup,
      originalPos: { x: -1.15, y: 0.2, z: 0 },
      explodedPos: { x: -2.0, y: 0.2, z: 0 }
    },
    {
      name: 'Right Touch Control Pad & Acoustic Chamber',
      mesh: rightGroup,
      originalPos: { x: 1.15, y: 0.2, z: 0 },
      explodedPos: { x: 2.0, y: 0.2, z: 0 }
    }
  );

  return { root, parts, materials };
}

// ==========================================
// 8. TABLET MODEL (iPad Pro 13-inch M4 Ultra-Thin)
// ==========================================
export function createTabletModel(product: Product, color: number): GeneratedModel {
  const root = new THREE.Group();
  const parts: ExplodedPart[] = [];
  const materials: THREE.Material[] = [];

  const width = 2.4;
  const height = 3.2;
  const thickness = 0.06; // Ultra-thin 5.1mm representation

  // Aluminum Unibody Frame
  const chassisMat = createPBRMaterial(color, 0.35, 0.85);
  materials.push(chassisMat);

  // 1. Rear Chassis
  const backGeo = new THREE.BoxGeometry(width, height, thickness);
  const backMesh = new THREE.Mesh(backGeo, chassisMat);

  // Apple Logo on Back
  const logoGeo = new THREE.CircleGeometry(0.14, 32);
  const logoMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
  materials.push(logoMat);
  const logoMesh = new THREE.Mesh(logoGeo, logoMat);
  logoMesh.rotation.y = Math.PI;
  logoMesh.position.set(0, 0, -thickness / 2 - 0.002);
  backMesh.add(logoMesh);

  // 3-dot Smart Connector pins on back
  const pinGeo = new THREE.CircleGeometry(0.02, 16);
  const pinMat = new THREE.MeshBasicMaterial({ color: 0xf59e0b });
  materials.push(pinMat);
  [-0.1, 0, 0.1].forEach(offset => {
    const pin = new THREE.Mesh(pinGeo, pinMat);
    pin.rotation.y = Math.PI;
    pin.position.set(offset, -height * 0.4, -thickness / 2 - 0.002);
    backMesh.add(pin);
  });

  // 2. Camera Island on Back
  const camGroup = new THREE.Group();
  camGroup.position.set(-width * 0.35, height * 0.38, -thickness / 2 - 0.02);

  const camPlateGeo = new THREE.BoxGeometry(0.5, 0.5, 0.04);
  const camPlate = new THREE.Mesh(camPlateGeo, chassisMat);
  camGroup.add(camPlate);

  const lensGeo = new THREE.CylinderGeometry(0.08, 0.08, 0.05, 24);
  lensGeo.rotateX(Math.PI / 2);
  const lensMat = new THREE.MeshStandardMaterial({
    color: 0x050811,
    roughness: 0.1,
    metalness: 0.9,
    emissive: 0x1d4ed8,
    emissiveIntensity: 0.4
  });
  materials.push(lensMat);
  const lens = new THREE.Mesh(lensGeo, lensMat);
  lens.position.set(0, 0, -0.025);
  camGroup.add(lens);

  // 3. Ultra Retina XDR Tandem OLED Front Display
  const displayGroup = new THREE.Group();
  displayGroup.position.set(0, 0, thickness / 2 + 0.01);

  const screenGeo = new THREE.PlaneGeometry(width * 0.95, height * 0.96);
  const screenMat = new THREE.MeshStandardMaterial({
    color: 0x070d18,
    roughness: 0.1,
    metalness: 0.2,
    emissive: 0x38bdf8,
    emissiveIntensity: 0.3
  });
  materials.push(screenMat);
  const screenMesh = new THREE.Mesh(screenGeo, screenMat);
  displayGroup.add(screenMesh);

  root.add(backMesh);
  root.add(camGroup);
  root.add(displayGroup);

  parts.push(
    {
      name: '5.1mm Precision Aerospace Aluminum Chassis',
      mesh: backMesh,
      originalPos: { x: 0, y: 0, z: 0 },
      explodedPos: { x: 0, y: 0, z: -0.6 }
    },
    {
      name: '12MP Sensor, LiDAR Scanner & Flash Unit',
      mesh: camGroup,
      originalPos: { x: -width * 0.35, y: height * 0.38, z: -thickness / 2 - 0.02 },
      explodedPos: { x: -width * 0.35, y: height * 0.38, z: -1.3 }
    },
    {
      name: 'Ultra Retina XDR Tandem OLED Panel',
      mesh: displayGroup,
      originalPos: { x: 0, y: 0, z: thickness / 2 + 0.01 },
      explodedPos: { x: 0, y: 0, z: 1.2 }
    }
  );

  return { root, parts, materials };
}
