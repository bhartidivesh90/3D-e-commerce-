import React from 'react';
import { Product } from '../types';
import { 
  X, 
  Box, 
  Scale, 
  Trash2, 
  Star, 
  Check, 
  Plus, 
  ShoppingCart 
} from 'lucide-react';

interface CompareModalProps {
  isOpen: boolean;
  onClose: () => void;
  compareProducts: Product[];
  onRemoveFromCompare: (productId: string) => void;
  onClearCompare: () => void;
  onOpen3DView: (productId: string) => void;
  onAddToCart: (product: Product) => void;
}

export const CompareModal: React.FC<CompareModalProps> = ({
  isOpen,
  onClose,
  compareProducts,
  onRemoveFromCompare,
  onClearCompare,
  onOpen3DView,
  onAddToCart
}) => {
  if (!isOpen) return null;

  const formatINR = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val);
  };

  const specRows = [
    { label: 'Category', key: 'category' },
    { label: 'Price', key: 'price', format: (p: Product) => formatINR(p.price) },
    { label: 'Rating', key: 'rating', format: (p: Product) => `★ ${p.rating} (${p.reviewCount})` },
    { label: 'Processor', key: 'processor', path: 'specifications.processor' },
    { label: 'RAM / Memory', key: 'ram', path: 'specifications.ram' },
    { label: 'Storage', key: 'storage', path: 'specifications.storage' },
    { label: 'Display', key: 'display', path: 'specifications.display' },
    { label: 'Battery / Power', key: 'battery', path: 'specifications.battery' },
    { label: 'Camera / Optics', key: 'camera', path: 'specifications.camera' },
    { label: 'GPU / Graphics', key: 'gpu', path: 'specifications.gpu' },
    { label: 'Weight', key: 'weight', path: 'specifications.weight' },
    { label: 'Connectivity', key: 'connectivity', path: 'specifications.connectivity' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div 
        id="compare-modal-container"
        className="relative w-full max-w-5xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/60">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white font-heading">
                Side-by-Side Product Comparison
              </h3>
              <p className="text-xs text-slate-400">
                Comparing {compareProducts.length} of max 3 products
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {compareProducts.length > 0 && (
              <button
                id="btn-clear-compare"
                type="button"
                onClick={onClearCompare}
                className="text-xs text-rose-400 hover:text-rose-300 font-medium px-3 py-1.5 rounded-lg hover:bg-rose-500/10 transition-colors"
              >
                Clear All
              </button>
            )}
            <button
              id="btn-close-compare"
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1">
          {compareProducts.length === 0 ? (
            <div className="py-16 text-center space-y-3">
              <Scale className="w-12 h-12 text-slate-600 mx-auto" />
              <h4 className="text-base font-bold text-slate-200">No products in comparison queue</h4>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Click the comparison icon (⚖) on any product card to compare up to 3 devices side-by-side with full specifications and 3D viewers.
              </p>
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs"
              >
                Browse Products
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[650px]">
                <thead>
                  <tr className="border-b border-slate-800">
                    <th className="p-4 w-1/4 text-xs font-mono text-slate-400 uppercase tracking-wider">
                      Specification
                    </th>
                    {compareProducts.map((p) => (
                      <th key={p.id} className="p-4 w-1/4 align-top">
                        <div className="space-y-2">
                          <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-950 border border-slate-800">
                            <img
                              src={p.image}
                              alt={p.name}
                              className="w-full h-full object-cover"
                            />
                            <button
                              id={`btn-compare-remove-${p.id}`}
                              type="button"
                              onClick={() => onRemoveFromCompare(p.id)}
                              className="absolute top-2 right-2 p-1.5 rounded-lg bg-slate-950/80 text-slate-400 hover:text-rose-400 transition-colors"
                              title="Remove"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          
                          <div className="font-bold text-white text-sm line-clamp-1">{p.name}</div>
                          <div className="text-cyan-400 font-extrabold text-base font-heading">
                            {formatINR(p.price)}
                          </div>

                          {/* 3D View Button for Each Product */}
                          <button
                            id={`btn-compare-3d-${p.id}`}
                            type="button"
                            onClick={() => {
                              onClose();
                              onOpen3DView(p.id);
                            }}
                            className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-bold bg-gradient-to-r from-purple-600 to-cyan-600 text-white hover:brightness-110 shadow-md border border-purple-500/30 transition-all"
                          >
                            <Box className="w-3.5 h-3.5 text-cyan-300 animate-pulse" />
                            <span>3D VIEW</span>
                          </button>

                          {/* Quick Add to Cart */}
                          <button
                            id={`btn-compare-cart-${p.id}`}
                            type="button"
                            onClick={() => onAddToCart(p)}
                            className="w-full flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-xl text-xs font-semibold bg-slate-800 text-slate-200 hover:bg-slate-700 transition-colors"
                          >
                            <ShoppingCart className="w-3 h-3 text-cyan-400" />
                            <span>Add to Cart</span>
                          </button>
                        </div>
                      </th>
                    ))}

                    {/* Placeholder slot if less than 3 */}
                    {[...Array(3 - compareProducts.length)].map((_, i) => (
                      <th key={`slot-${i}`} className="p-4 w-1/4 align-top">
                        <div className="border-2 border-dashed border-slate-800 rounded-2xl h-48 flex flex-col items-center justify-center text-center p-4 text-slate-500">
                          <Plus className="w-6 h-6 mb-1" />
                          <span className="text-xs font-medium">Add Product</span>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-800/60 text-xs">
                  {specRows.map((row) => (
                    <tr key={row.label} className="hover:bg-slate-800/30 transition-colors">
                      <td className="p-3.5 font-mono text-slate-400 font-medium">
                        {row.label}
                      </td>
                      {compareProducts.map((p) => {
                        let val: any = '-';
                        if (row.format) {
                          val = row.format(p);
                        } else if (row.path) {
                          const parts = row.path.split('.');
                          val = (p as any)[parts[0]]?.[parts[1]] || '-';
                        } else {
                          val = (p as any)[row.key] || '-';
                        }

                        return (
                          <td key={`${p.id}-${row.label}`} className="p-3.5 text-slate-200 font-medium">
                            {val}
                          </td>
                        );
                      })}
                      {[...Array(3 - compareProducts.length)].map((_, i) => (
                        <td key={`empty-${row.label}-${i}`} className="p-3.5 text-slate-600">
                          -
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
