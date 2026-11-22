import React, { useState } from 'react';
import { Product } from '../types';
import { 
  Box, 
  ShoppingCart, 
  Heart, 
  Scale, 
  Star, 
  Info, 
  Check, 
  Cpu, 
  HardDrive 
} from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onOpen3DView: (productId: string) => void;
  onOpenDetails: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  onToggleCompare: (product: Product) => void;
  isInWishlist: boolean;
  isInCompare: boolean;
  isInCart?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onOpen3DView,
  onOpenDetails,
  onAddToCart,
  onToggleWishlist,
  onToggleCompare,
  isInWishlist,
  isInCompare,
  isInCart = false
}) => {
  const [imgError, setImgError] = useState(false);
  const [addedAnim, setAddedAnim] = useState(false);

  // Format currency in INR
  const formatINR = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product);
    setAddedAnim(true);
    setTimeout(() => setAddedAnim(false), 1200);
  };

  return (
    <div 
      id={`product-card-${product.id}`}
      className="group relative flex flex-col rounded-2xl bg-slate-900/70 dark:bg-slate-900/60 border border-slate-800/80 hover:border-cyan-500/40 hover:shadow-xl hover:shadow-cyan-500/10 transition-all duration-300 overflow-hidden"
    >
      {/* Top Badges & Actions Overlay */}
      <div className="relative w-full pt-[75%] bg-slate-950/80 overflow-hidden">
        {/* Product Image */}
        {imgError ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-4 bg-slate-900 text-slate-500">
            <Box className="w-12 h-12 text-slate-600 mb-2" />
            <span className="text-xs font-medium">{product.name}</span>
            <span className="text-[10px] text-cyan-400 mt-1">3D Model Ready</span>
          </div>
        ) : (
          <img
            src={product.image}
            alt={product.name}
            onError={() => setImgError(true)}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          />
        )}

        {/* Tag (Flagship, Bestseller, etc.) */}
        {product.tag && (
          <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-cyan-500/90 text-slate-950 backdrop-blur-md shadow-sm">
            {product.tag}
          </div>
        )}

        {/* Action icons (Wishlist & Compare) */}
        <div className="absolute top-3 right-3 flex flex-col gap-1.5 z-10">
          <button
            id={`btn-wishlist-${product.id}`}
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onToggleWishlist(product);
            }}
            title={isInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
            className={`p-2 rounded-xl backdrop-blur-md border transition-all ${
              isInWishlist
                ? 'bg-rose-500 text-white border-rose-400 shadow-md shadow-rose-500/30'
                : 'bg-slate-950/70 border-slate-700/60 text-slate-300 hover:text-rose-400 hover:bg-slate-900'
            }`}
          >
            <Heart className={`w-4 h-4 ${isInWishlist ? 'fill-current' : ''}`} />
          </button>

          <button
            id={`btn-compare-${product.id}`}
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onToggleCompare(product);
            }}
            title={isInCompare ? 'Remove from Compare' : 'Compare Specification'}
            className={`p-2 rounded-xl backdrop-blur-md border transition-all ${
              isInCompare
                ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-md shadow-cyan-500/30'
                : 'bg-slate-950/70 border-slate-700/60 text-slate-300 hover:text-cyan-400 hover:bg-slate-900'
            }`}
          >
            <Scale className="w-4 h-4" />
          </button>
        </div>

        {/* CRITICAL 3D View Floating Quick Launcher on Image Hover */}
        <div className="absolute bottom-3 inset-x-3 opacity-95 group-hover:opacity-100 transition-opacity">
          <button
            id={`btn-card-3d-${product.id}`}
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onOpen3DView(product.id);
            }}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-600 text-white hover:brightness-110 shadow-lg shadow-purple-500/25 border border-purple-400/40 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <Box className="w-4 h-4 animate-pulse text-cyan-300" />
            <span className="tracking-wide">3D VIEW</span>
          </button>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between gap-3">
        <div>
          {/* Category & Brand */}
          <div className="flex items-center justify-between text-xs text-slate-400 font-mono mb-1">
            <span>{product.category}</span>
            <span className="text-cyan-400">{product.brand}</span>
          </div>

          {/* Product Title */}
          <h3 
            onClick={() => onOpenDetails(product)}
            className="font-bold text-slate-100 group-hover:text-cyan-300 transition-colors cursor-pointer text-sm sm:text-base line-clamp-1"
            title={product.name}
          >
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1.5 mt-1.5">
            <div className="flex items-center text-amber-400">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span className="text-xs font-bold ml-1 text-slate-200">{product.rating}</span>
            </div>
            <span className="text-[11px] text-slate-500">({product.reviewCount} reviews)</span>
          </div>

          {/* Key Specifications Pill List */}
          <div className="mt-3 flex flex-wrap gap-1.5">
            {product.specifications.processor && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-800/80 border border-slate-700/50 text-[10px] text-slate-300 font-mono">
                <Cpu className="w-2.5 h-2.5 text-cyan-400" />
                <span className="truncate max-w-[140px]">{product.specifications.processor.split('(')[0]}</span>
              </span>
            )}
            {product.specifications.ram && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-800/80 border border-slate-700/50 text-[10px] text-slate-300 font-mono">
                <HardDrive className="w-2.5 h-2.5 text-purple-400" />
                <span>{product.specifications.ram}</span>
              </span>
            )}
            {product.specifications.display && !product.specifications.processor && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-800/80 border border-slate-700/50 text-[10px] text-slate-300 font-mono">
                <span className="truncate max-w-[150px]">{product.specifications.display}</span>
              </span>
            )}
          </div>
        </div>

        {/* Pricing and Action Buttons */}
        <div className="pt-3 border-t border-slate-800/80 flex flex-col gap-3">
          <div className="flex items-baseline justify-between">
            <div className="flex items-baseline gap-2">
              <span className="text-lg sm:text-xl font-extrabold text-white font-heading">
                {formatINR(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-slate-500 line-through">
                  {formatINR(product.originalPrice)}
                </span>
              )}
            </div>
            <span className="text-[11px] text-emerald-400 font-medium">In Stock</span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {/* Details Button */}
            <button
              id={`btn-details-${product.id}`}
              type="button"
              onClick={() => onOpenDetails(product)}
              className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-semibold bg-slate-800/80 text-slate-200 hover:bg-slate-700/80 border border-slate-700/60 transition-colors"
            >
              <Info className="w-3.5 h-3.5 text-slate-400" />
              <span>Details</span>
            </button>

            {/* Add to Cart Button */}
            <button
              id={`btn-add-cart-${product.id}`}
              type="button"
              onClick={handleAddToCart}
              className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-semibold transition-all ${
                addedAnim
                  ? 'bg-emerald-500 text-slate-950 font-bold'
                  : isInCart
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 hover:bg-cyan-500/30'
                  : 'bg-cyan-500 text-slate-950 hover:bg-cyan-400 font-bold shadow-md shadow-cyan-500/20'
              }`}
            >
              {addedAnim ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Added!</span>
                </>
              ) : (
                <>
                  <ShoppingCart className="w-3.5 h-3.5" />
                  <span>{isInCart ? 'In Cart' : 'Add to Cart'}</span>
                </>
              )}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
