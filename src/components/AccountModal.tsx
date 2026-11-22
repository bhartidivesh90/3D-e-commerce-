import React, { useState, useEffect } from 'react';
import { UserProfile, Order, Product } from '../types';
import { 
  X, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Package, 
  Heart, 
  ShoppingCart, 
  Save, 
  Check, 
  Clock, 
  Box, 
  ShieldAlert 
} from 'lucide-react';

interface AccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartCount: number;
  wishlistCount: number;
  recentProducts: Product[];
  onOpen3DView: (productId: string) => void;
}

const DEFAULT_PROFILE: UserProfile = {
  name: 'BCA Final-Year Scholar',
  email: 'student@techverse.ac.in',
  phone: '+91 98765 43210',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
  address: 'Tech Innovation Hub, Block 4, Cyber City',
  city: 'Bengaluru, Karnataka',
  pincode: '560100'
};

const SAMPLE_ORDERS: Order[] = [
  {
    id: 'TV-849201',
    date: '18 September 2026',
    items: [
      { productName: 'Apple MacBook Air 15-inch M4', quantity: 1, price: 134900 },
      { productName: 'Sony WH-1000XM5 Headphones', quantity: 1, price: 29990 }
    ],
    total: 164890,
    status: 'Delivered'
  },
  {
    id: 'TV-712390',
    date: '12 September 2026',
    items: [
      { productName: 'Logitech G PRO X Superlight 2', quantity: 1, price: 15995 }
    ],
    total: 15995,
    status: 'In Transit'
  }
];

export const AccountModal: React.FC<AccountModalProps> = ({
  isOpen,
  onClose,
  cartCount,
  wishlistCount,
  recentProducts,
  onOpen3DView
}) => {
  const [profile, setProfile] = useState<UserProfile>(DEFAULT_PROFILE);
  const [isEditing, setIsEditing] = useState(false);
  const [savedMessage, setSavedMessage] = useState(false);

  // Load from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('techverse_user_profile');
      if (saved) {
        setProfile(JSON.parse(saved));
      }
    } catch (e) {
      console.warn('Failed to load profile', e);
    }
  }, []);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      localStorage.setItem('techverse_user_profile', JSON.stringify(profile));
      setIsEditing(false);
      setSavedMessage(true);
      setTimeout(() => setSavedMessage(false), 2000);
    } catch (e) {
      console.error('Failed to save profile', e);
    }
  };

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
        id="account-modal-container"
        className="relative w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/60">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
              <User className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-white font-heading">
                  User Account Portal
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 font-semibold">
                  Prototype Account
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Front-end profile and mock order history backed by local persistence
              </p>
            </div>
          </div>

          <button
            id="btn-close-account"
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1">
          
          {/* Notice Banner */}
          <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-slate-400">
            <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0" />
            <span>
              <strong>Note:</strong> This is an academic frontend prototype. Real authentication, OAuth, payment processing, and remote user databases require backend integration.
            </span>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-3 gap-3">
            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-400 font-mono">Cart Items</span>
                <div className="text-xl font-bold text-cyan-400 font-heading mt-0.5">{cartCount}</div>
              </div>
              <ShoppingCart className="w-5 h-5 text-cyan-500/40" />
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-400 font-mono">Wishlist</span>
                <div className="text-xl font-bold text-rose-400 font-heading mt-0.5">{wishlistCount}</div>
              </div>
              <Heart className="w-5 h-5 text-rose-500/40" />
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-400 font-mono">Past Orders</span>
                <div className="text-xl font-bold text-purple-400 font-heading mt-0.5">{SAMPLE_ORDERS.length}</div>
              </div>
              <Package className="w-5 h-5 text-purple-500/40" />
            </div>
          </div>

          {/* Profile Details (Editable) */}
          <div className="p-6 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-white font-heading">
                Contact & Shipping Credentials
              </h4>
              <button
                type="button"
                onClick={() => setIsEditing(!isEditing)}
                className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold"
              >
                {isEditing ? 'Cancel Edit' : 'Edit Information'}
              </button>
            </div>

            {isEditing ? (
              <form onSubmit={handleSave} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-400 font-mono mb-1">Full Name</label>
                    <input
                      type="text"
                      value={profile.name}
                      onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                      className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white focus:border-cyan-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 font-mono mb-1">Email Address</label>
                    <input
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                      className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white focus:border-cyan-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 font-mono mb-1">Phone Number</label>
                    <input
                      type="text"
                      value={profile.phone}
                      onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                      className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white focus:border-cyan-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 font-mono mb-1">City & State</label>
                    <input
                      type="text"
                      value={profile.city}
                      onChange={(e) => setProfile({ ...profile, city: e.target.value })}
                      className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white focus:border-cyan-500 focus:outline-none"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-slate-400 font-mono mb-1">Shipping Address</label>
                    <input
                      type="text"
                      value={profile.address}
                      onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                      className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white focus:border-cyan-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    type="submit"
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-bold hover:bg-cyan-400 transition-colors"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save to localStorage</span>
                  </button>
                </div>
              </form>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="flex items-center gap-3">
                  <User className="w-4 h-4 text-slate-500" />
                  <div>
                    <span className="text-[10px] text-slate-400 font-mono block">Name</span>
                    <span className="text-white font-medium">{profile.name}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-slate-500" />
                  <div>
                    <span className="text-[10px] text-slate-400 font-mono block">Email</span>
                    <span className="text-white font-medium">{profile.email}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-slate-500" />
                  <div>
                    <span className="text-[10px] text-slate-400 font-mono block">Phone</span>
                    <span className="text-white font-medium">{profile.phone}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-slate-500" />
                  <div>
                    <span className="text-[10px] text-slate-400 font-mono block">Address</span>
                    <span className="text-white font-medium">{profile.address}, {profile.city}</span>
                  </div>
                </div>
              </div>
            )}

            {savedMessage && (
              <div className="text-xs text-emerald-400 flex items-center gap-1 font-mono">
                <Check className="w-3.5 h-3.5" />
                Profile updated successfully in browser storage!
              </div>
            )}
          </div>

          {/* Orders Simulation Table */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white font-heading">
              Simulated Order History
            </h4>
            <div className="space-y-3">
              {SAMPLE_ORDERS.map((ord) => (
                <div
                  key={ord.id}
                  className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 text-xs space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-cyan-400 font-bold">{ord.id}</span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                      ord.status === 'Delivered'
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                        : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                    }`}>
                      {ord.status}
                    </span>
                  </div>
                  <div className="text-slate-400 text-[11px]">{ord.date}</div>
                  <div className="divide-y divide-slate-800/60">
                    {ord.items.map((it, idx) => (
                      <div key={idx} className="py-1 flex justify-between text-slate-300">
                        <span>{it.quantity}x {it.productName}</span>
                        <span className="font-mono">{formatINR(it.price * it.quantity)}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between pt-1 border-t border-slate-800 font-bold text-white">
                    <span>Total Paid:</span>
                    <span className="text-cyan-400 font-heading">{formatINR(ord.total)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recently Viewed Products */}
          {recentProducts.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-white font-heading">
                Recently Inspected in 3D
              </h4>
              <div className="flex gap-3 overflow-x-auto pb-2">
                {recentProducts.map((p) => (
                  <div
                    key={p.id}
                    onClick={() => {
                      onClose();
                      onOpen3DView(p.id);
                    }}
                    className="w-36 p-2 rounded-xl bg-slate-950 border border-slate-800 hover:border-cyan-500/40 cursor-pointer shrink-0 transition-all"
                  >
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-full aspect-video object-cover rounded-lg mb-1.5"
                    />
                    <div className="text-[11px] font-bold text-white truncate">{p.name}</div>
                    <div className="text-[10px] text-cyan-400 font-mono mt-0.5">{formatINR(p.price)}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
