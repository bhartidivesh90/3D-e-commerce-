import React from 'react';
import { Product } from '../types';
import { 
  X, 
  Heart, 
  Trash2, 
  ShoppingCart, 
  Box, 
  ArrowRight 
} from 'lucide-react';

interface WishlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistProducts: Product[];
  onRemoveFromWishlist: (productId: string) => void;
  onMoveToCart: (product: Product) => void;
  onOpen3DView: (productId: string) => void;
}

export const WishlistModal: React.FC<WishlistModalProps> = ({
  isOpen,
  onClose,
  wishlistProducts,
  onRemoveFromWishlist,
  onMoveToCart,
  onOpen3DView
}) => {
  if (!isOpen) return null;

  const formatINR = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div 
        id="wishlist-modal-container"
        className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden my-8 max-h-[85vh] flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/60">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400">
              <Heart className="w-5 h-5 fill-current" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white font-heading">
                My Saved Wishlist
              </h3>
              <p className="text-xs text-slate-400">
                {wishlistProducts.length} saved {wishlistProducts.length === 1 ? 'device' : 'devices'}
              </p>
            </div>
          </div>

          <button
            id="btn-close-wishlist"
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4">
          {wishlistProducts.length === 0 ? (
            <div className="py-16 text-center space-y-3">
              <Heart className="w-12 h-12 text-slate-700 mx-auto" />
              <h4 className="text-base font-bold text-slate-300">Your wishlist is empty</h4>
              <p className="text-xs text-slate-500 max-w-xs mx-auto">
                Save your favorite laptops, smartphones, or components to access them later.
              </p>
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs"
              >
                Browse Catalog
              </button>
            </div>
          ) : (
            <div className="divide-y divide-slate-800/80">
              {wishlistProducts.map((p) => (
                <div key={p.id} className="py-4 first:pt-0 last:pb-0 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3.5 min-w-0">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-16 h-16 rounded-xl object-cover bg-slate-950 border border-slate-800 shrink-0"
                    />
                    <div className="min-w-0">
                      <div className="text-[10px] font-mono text-cyan-400 uppercase">{p.category}</div>
                      <h4 className="text-sm font-bold text-white truncate">{p.name}</h4>
                      <div className="text-sm font-extrabold text-cyan-400 font-heading mt-0.5">
                        {formatINR(p.price)}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {/* 3D View */}
                    <button
                      id={`btn-wishlist-3d-${p.id}`}
                      type="button"
                      onClick={() => {
                        onClose();
                        onOpen3DView(p.id);
                      }}
                      className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-300 hover:bg-purple-500/20 text-xs font-semibold flex items-center gap-1.5"
                      title="Open in 3D"
                    >
                      <Box className="w-4 h-4 text-purple-400" />
                      <span className="hidden sm:inline">3D View</span>
                    </button>

                    {/* Move to Cart */}
                    <button
                      id={`btn-wishlist-cart-${p.id}`}
                      type="button"
                      onClick={() => {
                        onMoveToCart(p);
                        onRemoveFromWishlist(p.id);
                      }}
                      className="p-2.5 rounded-xl bg-cyan-500 text-slate-950 hover:bg-cyan-400 text-xs font-bold flex items-center gap-1.5"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      <span className="hidden sm:inline">Move to Cart</span>
                    </button>

                    {/* Remove */}
                    <button
                      id={`btn-wishlist-delete-${p.id}`}
                      type="button"
                      onClick={() => onRemoveFromWishlist(p.id)}
                      className="p-2 text-slate-500 hover:text-rose-400 transition-colors"
                      title="Remove"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
