import React, { useState } from 'react';
import { CartItem } from '../types';
import confetti from 'canvas-confetti';
import { 
  X, 
  ShoppingCart, 
  Trash2, 
  Plus, 
  Minus, 
  ArrowRight, 
  ShieldCheck, 
  CheckCircle2, 
  CreditCard, 
  Truck 
} from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
  onOpen3DView: (productId: string) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onOpen3DView
}) => {
  const [couponCode, setCouponCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState('');

  if (!isOpen) return null;

  const formatINR = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val);
  };

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );
  const discount = discountApplied ? subtotal * 0.1 : 0;
  const tax = (subtotal - discount) * 0.18; // 18% GST standard electronics
  const total = subtotal - discount + tax;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponCode.trim().toUpperCase() === 'TECHVERSE10' || couponCode.trim().toUpperCase() === 'BCA2026') {
      setDiscountApplied(true);
    } else {
      alert('Invalid Promo Code. Try "TECHVERSE10" for 10% off!');
    }
  };

  const handlePlaceOrder = () => {
    const newOrderId = 'TV-' + Math.floor(100000 + Math.random() * 900000);
    setOrderId(newOrderId);
    setOrderComplete(true);

    // Trigger celebratory confetti
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });

    setTimeout(() => {
      onClearCart();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/80 backdrop-blur-md">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div 
          id="cart-drawer-panel"
          className="w-screen max-w-md bg-slate-900 border-l border-slate-800 shadow-2xl flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-slate-800 bg-slate-950/50">
            <div className="flex items-center gap-2.5">
              <ShoppingCart className="w-5 h-5 text-cyan-400" />
              <h3 className="text-lg font-bold text-white font-heading">Shopping Cart</h3>
              <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-mono">
                {cartItems.reduce((acc, item) => acc + item.quantity, 0)} items
              </span>
            </div>

            <button
              id="btn-close-cart-drawer"
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Content */}
          <div className="p-6 flex-1 overflow-y-auto space-y-4">
            {orderComplete ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-bold text-white font-heading">Order Placed Successfully!</h4>
                <p className="text-xs text-slate-400 max-w-xs mx-auto">
                  Thank you for testing the TECHVERSE electronics prototype. Your simulated order ID is <strong className="text-cyan-400">{orderId}</strong>.
                </p>
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 text-left space-y-1">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Payment:</span>
                    <span className="font-semibold text-emerald-400">Verified (Simulated)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Delivery:</span>
                    <span>2-Day Priority Express</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setOrderComplete(false);
                    setIsCheckingOut(false);
                    onClose();
                  }}
                  className="w-full py-3 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs"
                >
                  Continue Browsing
                </button>
              </div>
            ) : cartItems.length === 0 ? (
              <div className="py-16 text-center space-y-3">
                <ShoppingCart className="w-12 h-12 text-slate-700 mx-auto" />
                <h4 className="text-base font-bold text-slate-300">Your cart is empty</h4>
                <p className="text-xs text-slate-500 max-w-xs mx-auto">
                  Explore smartphones, laptops, or accessories and add them to your cart.
                </p>
                <button
                  type="button"
                  onClick={onClose}
                  className="mt-2 px-4 py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={`${item.product.id}-${item.selectedColor || ''}`}
                    className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800/90 flex gap-3 items-center"
                  >
                    {/* Thumbnail */}
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-16 h-16 rounded-xl object-cover bg-slate-900 border border-slate-800 shrink-0"
                    />

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <h5 className="text-xs font-bold text-white truncate">
                        {item.product.name}
                      </h5>
                      {item.selectedColor && (
                        <div className="text-[10px] text-slate-400 font-mono">
                          Color: {item.selectedColor}
                        </div>
                      )}
                      <div className="text-xs font-extrabold text-cyan-400 font-heading mt-0.5">
                        {formatINR(item.product.price)}
                      </div>

                      {/* Quantity buttons */}
                      <div className="flex items-center gap-2 mt-2">
                        <div className="flex items-center rounded-lg bg-slate-900 border border-slate-700 overflow-hidden">
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                            className="p-1 text-slate-400 hover:text-white"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2 text-xs font-bold text-slate-200">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                            className="p-1 text-slate-400 hover:text-white"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        {/* Quick 3D Launcher in Cart */}
                        <button
                          type="button"
                          onClick={() => {
                            onClose();
                            onOpen3DView(item.product.id);
                          }}
                          className="text-[10px] text-purple-400 hover:text-purple-300 underline font-mono"
                        >
                          View in 3D
                        </button>
                      </div>
                    </div>

                    {/* Remove button */}
                    <button
                      type="button"
                      onClick={() => onRemoveItem(item.product.id)}
                      className="p-2 text-slate-500 hover:text-rose-400 transition-colors shrink-0"
                      title="Remove"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}

                {/* Coupon Code Section */}
                <form onSubmit={handleApplyCoupon} className="pt-2 flex gap-2">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Coupon (e.g. TECHVERSE10)"
                    className="flex-1 px-3 py-2 text-xs bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-cyan-500 uppercase font-mono"
                  />
                  <button
                    type="submit"
                    className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 rounded-xl"
                  >
                    Apply
                  </button>
                </form>
                {discountApplied && (
                  <div className="text-xs text-emerald-400 flex items-center gap-1 font-mono">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    10% Special Discount Applied!
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Footer Subtotal and Checkout Button */}
          {cartItems.length > 0 && !orderComplete && (
            <div className="p-6 border-t border-slate-800 bg-slate-950/70 space-y-4">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-400">
                  <span>Subtotal:</span>
                  <span className="text-slate-200 font-semibold">{formatINR(subtotal)}</span>
                </div>
                {discountApplied && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Discount (10%):</span>
                    <span>-{formatINR(discount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-slate-400">
                  <span>GST Tax (18%):</span>
                  <span className="text-slate-200 font-semibold">{formatINR(tax)}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Shipping:</span>
                  <span className="text-emerald-400 font-semibold">FREE Express</span>
                </div>
                <div className="flex justify-between text-base font-extrabold text-white pt-2 border-t border-slate-800">
                  <span>Total Amount:</span>
                  <span className="text-cyan-400 font-heading">{formatINR(total)}</span>
                </div>
              </div>

              <button
                id="btn-cart-checkout"
                type="button"
                onClick={handlePlaceOrder}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl font-bold text-sm bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 hover:brightness-110 shadow-lg shadow-cyan-500/25 transition-all"
              >
                <CreditCard className="w-4 h-4" />
                <span>Simulate Instant Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] text-slate-500 font-mono text-center">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span>BCA Academic Prototype • No real money charged</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
