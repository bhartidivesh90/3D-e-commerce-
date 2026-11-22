import React, { useState } from 'react';
import { Product, Category } from '../types';
import { 
  X, 
  ShieldCheck, 
  Plus, 
  Trash2, 
  Edit3, 
  RotateCcw, 
  Box, 
  DollarSign, 
  Package, 
  Users, 
  Save, 
  Check, 
  Layers 
} from 'lucide-react';

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onAddProduct: (newProduct: Product) => void;
  onUpdateProduct: (updatedProduct: Product) => void;
  onDeleteProduct: (productId: string) => void;
  onResetProducts: () => void;
  cartCount: number;
  wishlistCount: number;
  compareCount: number;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  isOpen,
  onClose,
  products,
  onAddProduct,
  onUpdateProduct,
  onDeleteProduct,
  onResetProducts,
  cartCount,
  wishlistCount,
  compareCount
}) => {
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);

  // New Product Form State
  const [newProductData, setNewProductData] = useState<Partial<Product>>({
    id: '',
    name: '',
    brand: 'Custom Brand',
    category: 'Laptops',
    price: 99999,
    rating: 4.8,
    reviewCount: 45,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80',
    description: 'High-performance computing device with cutting-edge architecture.',
    features: ['High-efficiency multi-core processing', 'All-day battery longevity', 'Studio high-definition display'],
    specifications: {
      processor: 'Advanced 12-Core AI Silicon',
      ram: '16GB High-Speed Unified',
      storage: '512GB NVMe SSD',
      display: '15.6-inch Quad-HD OLED',
      battery: '70Wh Li-ion'
    },
    inStock: true,
    stockCount: 15,
    modelType: 'laptop',
    colors: [
      { name: 'Space Gray', hex: '#374151', materialColor: 0x374151 },
      { name: 'Silver', hex: '#d1d5db', materialColor: 0xd1d5db }
    ]
  });

  if (!isOpen) return null;

  const formatINR = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val);
  };

  const totalCatalogValue = products.reduce((acc, p) => acc + p.price * p.stockCount, 0);

  const handleSaveAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProductData.name || !newProductData.price) {
      alert('Please provide at least a Product Name and Price');
      return;
    }

    const autoId = newProductData.id?.trim() || 'prod-' + Date.now().toString().slice(-4);
    const completeProduct: Product = {
      ...(newProductData as Product),
      id: autoId,
      price: Number(newProductData.price),
      specifications: newProductData.specifications || {}
    };

    onAddProduct(completeProduct);
    setShowAddForm(false);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;
    onUpdateProduct(editingProduct);
    setEditingProduct(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div 
        id="admin-dashboard-container"
        className="relative w-full max-w-5xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/60">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-white font-heading">
                  TECHVERSE Admin Control Panel
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 font-semibold">
                  CRUD Manager
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Manage products, test additions with procedural 3D binding, and review live metrics
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              id="btn-admin-reset-default"
              type="button"
              onClick={() => {
                if (confirm('Reset catalog to the factory initial product database?')) {
                  onResetProducts();
                }
              }}
              className="text-xs text-slate-400 hover:text-rose-400 flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-700 hover:border-rose-500/40 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Factory DB</span>
            </button>
            <button
              id="btn-close-admin"
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1">
          
          {/* Metrics Tiles */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800">
              <span className="text-[11px] text-slate-400 font-mono">Catalog Items</span>
              <div className="text-2xl font-bold text-white font-heading mt-1">{products.length}</div>
              <span className="text-[10px] text-cyan-400">All 3D Enabled</span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800">
              <span className="text-[11px] text-slate-400 font-mono">Simulated Revenue</span>
              <div className="text-xl font-bold text-emerald-400 font-heading mt-1">₹4,28,900</div>
              <span className="text-[10px] text-slate-500">Prototype Ledger</span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800">
              <span className="text-[11px] text-slate-400 font-mono">Active Cart Items</span>
              <div className="text-2xl font-bold text-cyan-400 font-heading mt-1">{cartCount}</div>
              <span className="text-[10px] text-slate-500">In Current Session</span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800">
              <span className="text-[11px] text-slate-400 font-mono">Wishlisted / Compared</span>
              <div className="text-2xl font-bold text-purple-400 font-heading mt-1">
                {wishlistCount} / {compareCount}
              </div>
              <span className="text-[10px] text-slate-500">Engagement</span>
            </div>
          </div>

          {/* Action Bar */}
          <div className="flex items-center justify-between">
            <h4 className="text-base font-bold text-white font-heading">
              Product Inventory ({products.length})
            </h4>
            <button
              id="btn-admin-add-product"
              type="button"
              onClick={() => {
                setShowAddForm(!showAddForm);
                setEditingProduct(null);
              }}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-cyan-500 text-slate-950 hover:bg-cyan-400 shadow-md shadow-cyan-500/20 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>{showAddForm ? 'Cancel Form' : 'Add New Hardware'}</span>
            </button>
          </div>

          {/* Add Product Form */}
          {showAddForm && (
            <form onSubmit={handleSaveAdd} className="p-6 rounded-2xl bg-slate-950 border border-cyan-500/40 space-y-4 text-xs">
              <div className="flex items-center gap-2 text-cyan-400 font-bold font-mono">
                <Plus className="w-4 h-4" />
                <span>Add Product to Techverse Database</span>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-400 font-mono mb-1">Product ID (Unique)</label>
                  <input
                    type="text"
                    required
                    value={newProductData.id}
                    onChange={(e) => setNewProductData({ ...newProductData, id: e.target.value })}
                    placeholder="e.g. alienware18"
                    className="w-full p-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-slate-400 font-mono mb-1">Product Title</label>
                  <input
                    type="text"
                    required
                    value={newProductData.name}
                    onChange={(e) => setNewProductData({ ...newProductData, name: e.target.value })}
                    placeholder="e.g. Alienware m18 R2 Gaming Laptop"
                    className="w-full p-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 font-mono mb-1">Category</label>
                  <select
                    value={newProductData.category}
                    onChange={(e) => setNewProductData({ ...newProductData, category: e.target.value as Category })}
                    className="w-full p-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                  >
                    <option value="Smartphones">Smartphones</option>
                    <option value="Laptops">Laptops</option>
                    <option value="Tablets">Tablets</option>
                    <option value="Gaming">Gaming</option>
                    <option value="Computer Components">Computer Components</option>
                    <option value="Accessories">Accessories</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-400 font-mono mb-1">Price (₹ INR)</label>
                  <input
                    type="number"
                    required
                    value={newProductData.price}
                    onChange={(e) => setNewProductData({ ...newProductData, price: Number(e.target.value) })}
                    className="w-full p-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 font-mono mb-1">3D Model Procedural Type</label>
                  <select
                    value={newProductData.modelType}
                    onChange={(e) => setNewProductData({ ...newProductData, modelType: e.target.value as any })}
                    className="w-full p-2 rounded-xl bg-slate-900 border border-slate-700 text-cyan-300 font-mono font-semibold"
                  >
                    <option value="laptop">Laptop (Base, Keys, Screen, Hinges)</option>
                    <option value="phone">Phone (Frame, Display, Rear, Cameras)</option>
                    <option value="gpu">GPU (Fans, Heatsink, PCB, Backplate)</option>
                    <option value="monitor">Monitor (Curved Display, RGB Ring, Stand)</option>
                    <option value="keyboard">Keyboard (Keycaps, Switch Plate, Base)</option>
                    <option value="mouse">Mouse (Shell, Triggers, Sensor Base)</option>
                    <option value="headphones">Headphones (Headband, Cups, Cushions)</option>
                    <option value="tablet">Tablet (Thin Slab, Camera, OLED)</option>
                  </select>
                </div>
                <div className="sm:col-span-3">
                  <label className="block text-slate-400 font-mono mb-1">Description</label>
                  <input
                    type="text"
                    value={newProductData.description}
                    onChange={(e) => setNewProductData({ ...newProductData, description: e.target.value })}
                    className="w-full p-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold hover:bg-cyan-400"
                >
                  Save to Catalog
                </button>
              </div>
            </form>
          )}

          {/* Edit Product Inline Form */}
          {editingProduct && (
            <form onSubmit={handleSaveEdit} className="p-6 rounded-2xl bg-slate-950 border border-purple-500/50 space-y-4 text-xs">
              <div className="flex items-center gap-2 text-purple-400 font-bold font-mono">
                <Edit3 className="w-4 h-4" />
                <span>Editing: {editingProduct.name}</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="block text-slate-400 font-mono mb-1">Name</label>
                  <input
                    type="text"
                    value={editingProduct.name}
                    onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                    className="w-full p-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 font-mono mb-1">Price (₹)</label>
                  <input
                    type="number"
                    value={editingProduct.price}
                    onChange={(e) => setEditingProduct({ ...editingProduct, price: Number(e.target.value) })}
                    className="w-full p-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 font-mono mb-1">Stock Count</label>
                  <input
                    type="number"
                    value={editingProduct.stockCount}
                    onChange={(e) => setEditingProduct({ ...editingProduct, stockCount: Number(e.target.value) })}
                    className="w-full p-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 font-mono mb-1">3D Model Type</label>
                  <select
                    value={editingProduct.modelType}
                    onChange={(e) => setEditingProduct({ ...editingProduct, modelType: e.target.value as any })}
                    className="w-full p-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                  >
                    <option value="laptop">Laptop</option>
                    <option value="phone">Phone</option>
                    <option value="gpu">GPU</option>
                    <option value="monitor">Monitor</option>
                    <option value="keyboard">Keyboard</option>
                    <option value="mouse">Mouse</option>
                    <option value="headphones">Headphones</option>
                    <option value="tablet">Tablet</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-purple-500 text-white font-bold"
                >
                  Save Changes
                </button>
              </div>
            </form>
          )}

          {/* Product List Table */}
          <div className="rounded-2xl border border-slate-800 bg-slate-950/60 overflow-hidden">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-950 text-slate-400 font-mono">
                  <th className="p-3">Device</th>
                  <th className="p-3">Category</th>
                  <th className="p-3">Price</th>
                  <th className="p-3">3D Generator</th>
                  <th className="p-3">Stock</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80 text-slate-200">
                {products.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-900/50">
                    <td className="p-3 flex items-center gap-2.5">
                      <img
                        src={p.image}
                        alt=""
                        className="w-8 h-8 rounded-lg object-cover bg-slate-900 shrink-0"
                      />
                      <span className="font-semibold text-white truncate max-w-[200px]">{p.name}</span>
                    </td>
                    <td className="p-3 text-slate-400">{p.category}</td>
                    <td className="p-3 font-mono font-bold text-cyan-400">{formatINR(p.price)}</td>
                    <td className="p-3 font-mono text-purple-300 capitalize">{p.modelType}</td>
                    <td className="p-3">{p.stockCount} units</td>
                    <td className="p-3 text-right space-x-2">
                      <button
                        type="button"
                        onClick={() => {
                          setEditingProduct(p);
                          setShowAddForm(false);
                        }}
                        className="p-1.5 text-slate-400 hover:text-white"
                        title="Edit"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          if (confirm(`Delete product ${p.name}?`)) {
                            onDeleteProduct(p.id);
                          }
                        }}
                        className="p-1.5 text-slate-400 hover:text-rose-400"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>

      </div>
    </div>
  );
};
