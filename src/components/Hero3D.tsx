import React, { useState } from 'react';
import { ThreeViewer } from '../3d/ThreeViewer';
import { Product } from '../types';
import { ArrowRight, Box, Cpu, Sparkles, ShieldCheck, Zap, RotateCcw } from 'lucide-react';

interface Hero3DProps {
  flagshipProduct: Product;
  onExploreProducts: () => void;
  onEnter3DLab: (productId?: string) => void;
  onOpenProductDetails: (product: Product) => void;
}

export const Hero3D: React.FC<Hero3DProps> = ({
  flagshipProduct,
  onExploreProducts,
  onEnter3DLab,
  onOpenProductDetails
}) => {
  const [selectedHeroModel, setSelectedHeroModel] = useState<string>(flagshipProduct.id);

  return (
    <section className="relative overflow-hidden pt-6 pb-16 lg:pt-10 lg:pb-24">
      {/* Ambient background glow orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-cyan-600/15 via-blue-600/10 to-purple-600/15 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Hero Content */}
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
            
            {/* Top Project Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs font-semibold text-cyan-300 backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>BCA FINAL-YEAR INNOVATION PROJECT</span>
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight font-heading leading-tight text-white">
              Explore Technology{' '}
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent">
                in 3D
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-300 max-w-xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Discover smartphones, laptops and electronics through an interactive 3D shopping experience. Rotate, zoom, and inspect exploded component architectures in real-time.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                id="btn-hero-explore-products"
                type="button"
                onClick={onExploreProducts}
                className="flex items-center gap-2.5 px-6 py-3.5 rounded-xl font-semibold text-sm bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 hover:brightness-110 shadow-lg shadow-cyan-500/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Explore Products</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                id="btn-hero-enter-3d-lab"
                type="button"
                onClick={() => onEnter3DLab(flagshipProduct.id)}
                className="flex items-center gap-2.5 px-6 py-3.5 rounded-xl font-semibold text-sm bg-slate-900/90 text-purple-300 border border-purple-500/40 hover:bg-purple-950/40 hover:border-purple-400 shadow-lg transition-all"
              >
                <Box className="w-4 h-4 text-purple-400 animate-pulse" />
                <span>Enter 3D Lab</span>
              </button>
            </div>

            {/* Trust and Feature Micro-Badges */}
            <div className="pt-4 grid grid-cols-3 gap-3 max-w-md mx-auto lg:mx-0 border-t border-slate-800/80">
              <div className="flex flex-col">
                <span className="text-xl sm:text-2xl font-bold text-white font-heading">60 FPS</span>
                <span className="text-xs text-slate-400">Three.js Engine</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xl sm:text-2xl font-bold text-cyan-400 font-heading">15+ Models</span>
                <span className="text-xs text-slate-400">Procedural & GLTF</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xl sm:text-2xl font-bold text-purple-400 font-heading">Exploded</span>
                <span className="text-xs text-slate-400">Component Layers</span>
              </div>
            </div>

          </div>

          {/* Right Hero 3D Interactive Stage */}
          <div className="lg:col-span-6 relative">
            
            {/* 3D Canvas Card */}
            <div className="relative rounded-3xl p-1 bg-gradient-to-b from-cyan-500/30 via-slate-800/40 to-purple-500/20 shadow-2xl shadow-cyan-500/10">
              <div className="relative rounded-[22px] overflow-hidden bg-slate-950 h-[420px] sm:h-[480px]">
                
                <ThreeViewer
                  product={flagshipProduct}
                  className="w-full h-full"
                  autoRotateDefault={true}
                  showControlsOverlay={true}
                />

                {/* Floating Futuristic HUD Badges around model */}
                <div className="absolute top-6 left-6 hidden sm:flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-950/85 backdrop-blur-md border border-cyan-500/30 text-xs text-cyan-200 shadow-lg pointer-events-none animate-bounce" style={{ animationDuration: '4s' }}>
                  <Cpu className="w-4 h-4 text-cyan-400" />
                  <div>
                    <div className="font-semibold">{flagshipProduct.specifications.processor || 'Flagship Architecture'}</div>
                    <div className="text-[10px] text-slate-400">Hardware Ray Tracing</div>
                  </div>
                </div>

                <div className="absolute top-24 right-6 hidden sm:flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-950/85 backdrop-blur-md border border-purple-500/30 text-xs text-purple-200 shadow-lg pointer-events-none animate-bounce" style={{ animationDuration: '5s' }}>
                  <Zap className="w-4 h-4 text-purple-400" />
                  <div>
                    <div className="font-semibold">{flagshipProduct.specifications.display || 'Pro Visual Display'}</div>
                    <div className="text-[10px] text-slate-400">Ultra-High Dynamic Range</div>
                  </div>
                </div>

                <div className="absolute bottom-16 left-6 hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-950/85 backdrop-blur-md border border-slate-700/60 text-xs text-slate-300 shadow-lg pointer-events-none">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-[11px] font-medium">Aerospace Grade Materials</span>
                </div>

              </div>
            </div>

            {/* Quick Hero Product Details Button Bar */}
            <div className="mt-3 flex items-center justify-between px-2">
              <div className="text-xs text-slate-400 font-mono">
                Interactive Model: <span className="text-white font-medium">{flagshipProduct.name}</span>
              </div>
              <button
                id="btn-hero-inspect-model"
                type="button"
                onClick={() => onOpenProductDetails(flagshipProduct)}
                className="text-xs text-cyan-400 hover:text-cyan-300 font-medium underline underline-offset-4"
              >
                View Full Specs →
              </button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
