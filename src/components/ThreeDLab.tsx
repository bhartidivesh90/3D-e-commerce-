import React, { useState, useEffect } from 'react';
import { Product } from '../types';
import { ThreeViewer } from '../3d/ThreeViewer';
import { 
  Box, 
  Layers, 
  RotateCw, 
  Maximize2, 
  ShoppingCart, 
  Heart, 
  Cpu, 
  Monitor, 
  Zap, 
  ShieldCheck, 
  Sparkles,
  ChevronRight,
  Check
} from 'lucide-react';

interface ThreeDLabProps {
  products: Product[];
  selectedProductId: string;
  onSelectProduct: (productId: string) => void;
  onAddToCart: (product: Product, colorName?: string) => void;
  onToggleWishlist: (product: Product) => void;
  isInWishlist: boolean;
}

export const ThreeDLab: React.FC<ThreeDLabProps> = ({
  products,
  selectedProductId,
  onSelectProduct,
  onAddToCart,
  onToggleWishlist,
  isInWishlist
}) => {
  const currentProduct = products.find(p => p.id === selectedProductId) || products[0];

  const [selectedColorIdx, setSelectedColorIdx] = useState<number>(0);
  const [isExploded, setIsExploded] = useState<boolean>(false);
  const [addedAnim, setAddedAnim] = useState<boolean>(false);

  // Reset color index when product changes
  useEffect(() => {
    setSelectedColorIdx(0);
    setIsExploded(false);
  }, [selectedProductId]);

  const selectedColor = currentProduct?.colors[selectedColorIdx] || currentProduct?.colors[0];

  const formatINR = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val);
  };

  const handleAddToCart = () => {
    if (!currentProduct) return;
    onAddToCart(currentProduct, selectedColor?.name);
    setAddedAnim(true);
    setTimeout(() => setAddedAnim(false), 1400);
  };

  if (!currentProduct) {
    return (
      <section id="threeDLab" className="py-16 text-center text-slate-400">
        <p>Product not found.</p>
      </section>
    );
  }

  return (
    <section 
      id="threeDLab" 
      className="py-12 lg:py-20 relative scroll-mt-20 border-y border-slate-800/80 bg-slate-950"
    >
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[500px] h-[500px] bg-purple-600/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-xs font-semibold text-purple-300 mb-2">
              <Box className="w-3.5 h-3.5 text-purple-400" />
              <span>INTERACTIVE HARDWARE LAB</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-heading text-white">
              3D Product Lab
            </h2>
            <p className="text-sm sm:text-base text-slate-400 mt-1 max-w-xl">
              Inspect real-time 3D geometry, test architectural finishes, and trigger exploded multi-component views.
            </p>
          </div>

          {/* Quick Product Selector Dropdown */}
          <div className="flex items-center gap-2">
            <label htmlFor="viewer-product-select" className="text-xs font-mono text-slate-400 shrink-0">
              Select Device:
            </label>
            <select
              id="viewer-product-select"
              value={currentProduct.id}
              onChange={(e) => onSelectProduct(e.target.value)}
              className="bg-slate-900 border border-slate-700 text-slate-100 text-xs sm:text-sm rounded-xl px-3.5 py-2.5 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 max-w-xs cursor-pointer shadow-md"
            >
              {products.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} ({p.category})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* 3D Lab Main Layout: Left Controls + Right Canvas */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Side: Product Details & Controls */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6 bg-slate-900/60 backdrop-blur-md p-6 sm:p-7 rounded-3xl border border-slate-800/90 shadow-xl">
            
            <div className="space-y-4">
              
              {/* Product Badge and Category */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded-md bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                  {currentProduct.category}
                </span>
                <span className="text-xs font-mono text-slate-400">
                  ID: <span className="text-slate-200">{currentProduct.id}</span>
                </span>
              </div>

              {/* Title & Price */}
              <div>
                <h3 className="text-2xl font-extrabold text-white font-heading">
                  {currentProduct.name}
                </h3>
                <div className="flex items-baseline gap-3 mt-2">
                  <span className="text-2xl sm:text-3xl font-extrabold text-cyan-400 font-heading">
                    {formatINR(currentProduct.price)}
                  </span>
                  {currentProduct.originalPrice && (
                    <span className="text-sm text-slate-500 line-through">
                      {formatINR(currentProduct.originalPrice)}
                    </span>
                  )}
                </div>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {currentProduct.description}
              </p>

              {/* Color Finish Selector */}
              {currentProduct.colors && currentProduct.colors.length > 0 && (
                <div className="pt-2">
                  <label className="block text-xs font-mono text-slate-400 mb-2">
                    Chassis Finish:{' '}
                    <span className="text-slate-100 font-semibold">{selectedColor?.name}</span>
                  </label>
                  <div className="flex flex-wrap gap-2.5">
                    {currentProduct.colors.map((c, idx) => (
                      <button
                        key={c.name}
                        id={`btn-color-${c.name.toLowerCase().replace(/\s+/g, '-')}`}
                        type="button"
                        onClick={() => setSelectedColorIdx(idx)}
                        title={c.name}
                        className={`w-8 h-8 rounded-full border-2 transition-all flex items-center justify-center ${
                          selectedColorIdx === idx
                            ? 'border-cyan-400 scale-110 shadow-lg shadow-cyan-500/30 ring-2 ring-cyan-500/40'
                            : 'border-slate-700 hover:border-slate-500'
                        }`}
                        style={{ backgroundColor: c.hex }}
                      >
                        {selectedColorIdx === idx && (
                          <div className="w-2 h-2 rounded-full bg-white shadow-sm" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Hardware Specifications Snapshot */}
              <div className="pt-3 border-t border-slate-800/80 space-y-2">
                <span className="text-xs font-mono text-slate-400 block mb-1">
                  Architecture Specifications:
                </span>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {currentProduct.specifications.processor && (
                    <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800">
                      <div className="text-[10px] text-slate-400 font-mono flex items-center gap-1">
                        <Cpu className="w-3 h-3 text-cyan-400" />
                        Processor
                      </div>
                      <div className="text-slate-200 font-semibold truncate mt-0.5">
                        {currentProduct.specifications.processor}
                      </div>
                    </div>
                  )}
                  {currentProduct.specifications.ram && (
                    <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800">
                      <div className="text-[10px] text-slate-400 font-mono flex items-center gap-1">
                        <Zap className="w-3 h-3 text-purple-400" />
                        Memory
                      </div>
                      <div className="text-slate-200 font-semibold truncate mt-0.5">
                        {currentProduct.specifications.ram}
                      </div>
                    </div>
                  )}
                  {currentProduct.specifications.display && (
                    <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800">
                      <div className="text-[10px] text-slate-400 font-mono flex items-center gap-1">
                        <Monitor className="w-3 h-3 text-blue-400" />
                        Display
                      </div>
                      <div className="text-slate-200 font-semibold truncate mt-0.5">
                        {currentProduct.specifications.display}
                      </div>
                    </div>
                  )}
                  {currentProduct.specifications.storage && (
                    <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800">
                      <div className="text-[10px] text-slate-400 font-mono flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3 text-emerald-400" />
                        Storage
                      </div>
                      <div className="text-slate-200 font-semibold truncate mt-0.5">
                        {currentProduct.specifications.storage}
                      </div>
                    </div>
                  )}
                </div>
              </div>

            </div>

            {/* Bottom Actions: Add to Cart & Wishlist */}
            <div className="pt-4 border-t border-slate-800/80 flex items-center gap-3">
              <button
                id="btn-3d-add-to-cart"
                type="button"
                onClick={handleAddToCart}
                className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-bold transition-all shadow-lg ${
                  addedAnim
                    ? 'bg-emerald-500 text-slate-950'
                    : 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 hover:brightness-110 shadow-cyan-500/20'
                }`}
              >
                {addedAnim ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Added to Cart!</span>
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-4 h-4" />
                    <span>Add to Cart ({formatINR(currentProduct.price)})</span>
                  </>
                )}
              </button>

              <button
                id="btn-3d-toggle-wishlist"
                type="button"
                onClick={() => onToggleWishlist(currentProduct)}
                title={isInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
                className={`p-3 rounded-xl border transition-all ${
                  isInWishlist
                    ? 'bg-rose-500 text-white border-rose-400 shadow-md shadow-rose-500/30'
                    : 'bg-slate-900 border-slate-700 text-slate-300 hover:text-rose-400'
                }`}
              >
                <Heart className={`w-5 h-5 ${isInWishlist ? 'fill-current' : ''}`} />
              </button>
            </div>

          </div>

          {/* Right Side: High Definition Three.js Canvas */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="relative flex-1 min-h-[440px] sm:min-h-[520px] rounded-3xl overflow-hidden border border-slate-800/90 shadow-2xl bg-slate-950">
              <ThreeViewer
                key={`${currentProduct.id}-${selectedColor?.materialColor}`}
                product={currentProduct}
                selectedColorHex={selectedColor?.materialColor}
                autoRotateDefault={true}
                explodedDefault={isExploded}
                onExplodeToggle={(exp) => setIsExploded(exp)}
                className="w-full h-full"
                showControlsOverlay={true}
              />
            </div>

            {/* Quick Helper under canvas */}
            <div className="mt-3 flex items-center justify-between text-xs text-slate-400 font-mono px-2">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>WebGL 2.0 • Hardware Accelerated</span>
              </div>
              <div>
                Click <span className="text-cyan-400 font-semibold">Explode View</span> on canvas to disassemble
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
