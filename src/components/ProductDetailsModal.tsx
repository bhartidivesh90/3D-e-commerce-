import React, { useState } from 'react';
import { Product } from '../types';
import { 
  X, 
  Box, 
  ShoppingCart, 
  Heart, 
  Scale, 
  Star, 
  Check, 
  Shield, 
  Truck, 
  RotateCw, 
  Cpu, 
  HardDrive, 
  Battery, 
  Maximize2 
} from 'lucide-react';

interface ProductDetailsModalProps {
  product: Product | null;
  onClose: () => void;
  onOpen3DView: (productId: string) => void;
  onAddToCart: (product: Product, colorName?: string) => void;
  onToggleWishlist: (product: Product) => void;
  onToggleCompare: (product: Product) => void;
  isInWishlist: boolean;
  isInCompare: boolean;
}

export const ProductDetailsModal: React.FC<ProductDetailsModalProps> = ({
  product,
  onClose,
  onOpen3DView,
  onAddToCart,
  onToggleWishlist,
  onToggleCompare,
  isInWishlist,
  isInCompare
}) => {
  const [selectedColorIdx, setSelectedColorIdx] = useState(0);
  const [addedAnim, setAddedAnim] = useState(false);

  if (!product) return null;

  const formatINR = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val);
  };

  const selectedColor = product.colors[selectedColorIdx] || product.colors[0];

  const handleAddToCart = () => {
    onAddToCart(product, selectedColor?.name);
    setAddedAnim(true);
    setTimeout(() => setAddedAnim(false), 1400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-slate-950/80 backdrop-blur-md">
      <div 
        id={`product-details-modal-${product.id}`}
        className="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col"
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/50">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-semibold px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
              {product.category}
            </span>
            <span className="text-xs text-slate-400 font-mono">
              SKU: <span className="text-slate-200 uppercase">{product.id}</span>
            </span>
          </div>

          <button
            id="btn-close-details-modal"
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Modal Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Image & 3D Launcher Callout */}
            <div className="md:col-span-6 space-y-4">
              <div className="relative rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 aspect-square">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />

                {/* 3D Lab Direct Jump Button on Image */}
                <div className="absolute bottom-4 inset-x-4">
                  <button
                    id="btn-details-open-3d-banner"
                    type="button"
                    onClick={() => {
                      onClose();
                      onOpen3DView(product.id);
                    }}
                    className="w-full flex items-center justify-center gap-2.5 py-3 px-4 rounded-xl text-xs font-bold bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-600 text-white hover:brightness-110 shadow-xl shadow-purple-500/30 border border-purple-400/50 transition-all hover:scale-[1.02]"
                  >
                    <Box className="w-4 h-4 text-cyan-300 animate-pulse" />
                    <span>OPEN IN 3D PRODUCT LAB</span>
                  </button>
                </div>
              </div>

              {/* Color Finish Selector */}
              {product.colors && product.colors.length > 0 && (
                <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800">
                  <div className="text-xs font-mono text-slate-400 mb-2">
                    Select Color Finish:{' '}
                    <span className="text-white font-semibold">{selectedColor?.name}</span>
                  </div>
                  <div className="flex flex-wrap gap-2.5">
                    {product.colors.map((c, idx) => (
                      <button
                        key={c.name}
                        type="button"
                        onClick={() => setSelectedColorIdx(idx)}
                        className={`w-8 h-8 rounded-full border-2 transition-all flex items-center justify-center ${
                          selectedColorIdx === idx
                            ? 'border-cyan-400 scale-110 shadow-md ring-2 ring-cyan-500/40'
                            : 'border-slate-700 hover:border-slate-500'
                        }`}
                        style={{ backgroundColor: c.hex }}
                        title={c.name}
                      >
                        {selectedColorIdx === idx && (
                          <div className="w-2 h-2 rounded-full bg-white shadow-sm" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Service Guarantees */}
              <div className="grid grid-cols-3 gap-2 pt-2 text-center text-[11px] text-slate-400">
                <div className="p-2.5 rounded-xl bg-slate-950/40 border border-slate-800 flex flex-col items-center gap-1">
                  <Truck className="w-4 h-4 text-cyan-400" />
                  <span>Free Express</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-950/40 border border-slate-800 flex flex-col items-center gap-1">
                  <Shield className="w-4 h-4 text-emerald-400" />
                  <span>2-Yr Warranty</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-950/40 border border-slate-800 flex flex-col items-center gap-1">
                  <RotateCw className="w-4 h-4 text-purple-400" />
                  <span>7-Day Return</span>
                </div>
              </div>
            </div>

            {/* Right Column: Title, Specs, Features & Add to Cart */}
            <div className="md:col-span-6 space-y-6">
              <div>
                <div className="flex items-center justify-between text-xs text-slate-400 font-mono mb-1">
                  <span>Brand: {product.brand}</span>
                  <span className="text-emerald-400 font-semibold">In Stock ({product.stockCount} left)</span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-heading">
                  {product.name}
                </h2>

                {/* Rating */}
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex items-center text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="text-sm font-bold text-slate-200">{product.rating}</span>
                  <span className="text-xs text-slate-500">({product.reviewCount} verified reviews)</span>
                </div>

                {/* Pricing */}
                <div className="flex items-baseline gap-3 mt-4">
                  <span className="text-3xl font-extrabold text-cyan-400 font-heading">
                    {formatINR(product.price)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-base text-slate-500 line-through">
                      {formatINR(product.originalPrice)}
                    </span>
                  )}
                  <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                    Save {formatINR((product.originalPrice || product.price) - product.price)}
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-slate-300 leading-relaxed">
                {product.description}
              </p>

              {/* Key Features Bullet List */}
              <div className="space-y-2">
                <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block">
                  Highlighted Features:
                </span>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {product.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-4 border-t border-slate-800">
                <button
                  id="btn-details-add-to-cart"
                  type="button"
                  onClick={handleAddToCart}
                  className={`w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl font-bold text-sm transition-all shadow-lg ${
                    addedAnim
                      ? 'bg-emerald-500 text-slate-950'
                      : 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 hover:brightness-110 shadow-cyan-500/25'
                  }`}
                >
                  {addedAnim ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Added to Shopping Cart!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="w-4 h-4" />
                      <span>Add to Cart ({formatINR(product.price)})</span>
                    </>
                  )}
                </button>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    id="btn-details-wishlist"
                    type="button"
                    onClick={() => onToggleWishlist(product)}
                    className={`flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-semibold border transition-all ${
                      isInWishlist
                        ? 'bg-rose-500 text-white border-rose-400'
                        : 'bg-slate-800 text-slate-300 border-slate-700 hover:text-rose-400'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${isInWishlist ? 'fill-current' : ''}`} />
                    <span>{isInWishlist ? 'Wishlisted' : 'Add to Wishlist'}</span>
                  </button>

                  <button
                    id="btn-details-compare"
                    type="button"
                    onClick={() => onToggleCompare(product)}
                    className={`flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-semibold border transition-all ${
                      isInCompare
                        ? 'bg-cyan-500 text-slate-950 border-cyan-400'
                        : 'bg-slate-800 text-slate-300 border-slate-700 hover:text-cyan-400'
                    }`}
                  >
                    <Scale className="w-4 h-4" />
                    <span>{isInCompare ? 'In Compare' : 'Compare'}</span>
                  </button>
                </div>
              </div>

            </div>

          </div>

          {/* Full Specifications Table */}
          <div className="pt-6 border-t border-slate-800 space-y-4">
            <h4 className="text-base font-bold text-white font-heading">
              Technical Specifications
            </h4>
            <div className="rounded-2xl overflow-hidden border border-slate-800 bg-slate-950/60">
              <div className="divide-y divide-slate-800">
                {Object.entries(product.specifications).map(([key, val]) => {
                  if (!val) return null;
                  return (
                    <div key={key} className="grid grid-cols-1 sm:grid-cols-3 p-3 text-xs">
                      <span className="font-mono text-slate-400 capitalize">
                        {key.replace(/([A-Z])/g, ' $1')}
                      </span>
                      <span className="sm:col-span-2 text-slate-200 font-medium">
                        {val}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
