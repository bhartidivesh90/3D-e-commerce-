import React, { useState } from 'react';
import { 
  Box, 
  Search, 
  ShoppingCart, 
  Heart, 
  Scale, 
  User, 
  Sun, 
  Moon, 
  Menu, 
  X, 
  Bot, 
  ShieldCheck, 
  SlidersHorizontal
} from 'lucide-react';

interface NavbarProps {
  currentTab: string;
  onNavigate: (tab: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  cartCount: number;
  wishlistCount: number;
  compareCount: number;
  isDark: boolean;
  onToggleTheme: () => void;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenCompare: () => void;
  onOpenAccount: () => void;
  onOpenAdmin: () => void;
  onOpenAI: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onNavigate,
  searchQuery,
  onSearchChange,
  cartCount,
  wishlistCount,
  compareCount,
  isDark,
  onToggleTheme,
  onOpenCart,
  onOpenWishlist,
  onOpenCompare,
  onOpenAccount,
  onOpenAdmin,
  onOpenAI
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const handleNavClick = (tab: string) => {
    onNavigate(tab);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-slate-950/80 dark:bg-slate-950/85 border-b border-slate-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 gap-4">
          
          {/* Brand Logo */}
          <div 
            id="brand-logo"
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2.5 cursor-pointer group shrink-0"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-purple-600 p-0.5 flex items-center justify-center shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Box className="w-5 h-5 text-cyan-400 group-hover:rotate-12 transition-transform" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-extrabold tracking-tight font-heading bg-gradient-to-r from-white via-cyan-100 to-cyan-400 bg-clip-text text-transparent">
                  TECHVERSE
                </span>
                <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-semibold">
                  3D
                </span>
              </div>
              <span className="hidden sm:block text-[10px] text-slate-400 font-mono tracking-wider -mt-0.5">
                ELECTRONICS LAB & STORE
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            <button
              id="nav-home"
              type="button"
              onClick={() => handleNavClick('home')}
              className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                currentTab === 'home'
                  ? 'text-cyan-400 bg-cyan-500/10 border border-cyan-500/30 shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              Home
            </button>
            <button
              id="nav-products"
              type="button"
              onClick={() => handleNavClick('products')}
              className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                currentTab === 'products'
                  ? 'text-cyan-400 bg-cyan-500/10 border border-cyan-500/30 shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              Products
            </button>
            <button
              id="nav-categories"
              type="button"
              onClick={() => handleNavClick('categories')}
              className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                currentTab === 'categories'
                  ? 'text-cyan-400 bg-cyan-500/10 border border-cyan-500/30 shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              Categories
            </button>
            <button
              id="nav-3d-lab"
              type="button"
              onClick={() => handleNavClick('3dlab')}
              className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-1.5 ${
                currentTab === '3dlab'
                  ? 'text-purple-300 bg-purple-500/15 border border-purple-500/40 shadow-sm'
                  : 'text-purple-400 hover:text-purple-300 hover:bg-purple-950/30 border border-purple-500/20'
              }`}
            >
              <Box className="w-4 h-4 animate-pulse" />
              <span>3D Lab</span>
            </button>
          </nav>

          {/* Search Bar */}
          <div className="hidden md:flex items-center flex-1 max-w-xs xl:max-w-sm relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
            <input
              id="nav-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search Samsung, MacBook, RTX 5090..."
              className="w-full pl-9.5 pr-4 py-2 bg-slate-900/90 border border-slate-700/70 focus:border-cyan-500 rounded-xl text-xs sm:text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all"
            />
            {searchQuery && (
              <button
                id="nav-search-clear"
                type="button"
                onClick={() => onSearchChange('')}
                className="absolute right-3 text-xs text-slate-400 hover:text-white"
              >
                ✕
              </button>
            )}
          </div>

          {/* Right Action Icons & Toggles */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            
            {/* Ask AI Assistant Button */}
            <button
              id="nav-btn-ai-assistant"
              type="button"
              onClick={onOpenAI}
              className="relative flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-300 border border-cyan-500/40 hover:border-cyan-400 transition-all shadow-sm group"
              title="Ask TECHVERSE AI Assistant"
            >
              <Bot className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
              <span className="hidden sm:inline">Ask AI</span>
            </button>

            {/* Compare Toggle */}
            <button
              id="nav-btn-compare"
              type="button"
              onClick={onOpenCompare}
              className="relative p-2.5 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800/60 border border-transparent hover:border-slate-700 transition-all"
              title="Product Comparison"
            >
              <Scale className="w-4.5 h-4.5" />
              {compareCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-cyan-500 text-black text-[11px] font-bold flex items-center justify-center animate-bounce">
                  {compareCount}
                </span>
              )}
            </button>

            {/* Wishlist Toggle */}
            <button
              id="nav-btn-wishlist"
              type="button"
              onClick={onOpenWishlist}
              className="relative p-2.5 rounded-xl text-slate-300 hover:text-rose-400 hover:bg-slate-800/60 border border-transparent hover:border-slate-700 transition-all"
              title="Wishlist"
            >
              <Heart className="w-4.5 h-4.5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-rose-500 text-white text-[11px] font-bold flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart Button */}
            <button
              id="nav-btn-cart"
              type="button"
              onClick={onOpenCart}
              className="relative flex items-center gap-2 px-3 py-2 rounded-xl bg-cyan-500 text-slate-950 font-semibold text-xs sm:text-sm hover:bg-cyan-400 transition-all shadow-lg shadow-cyan-500/20"
              title="Shopping Cart"
            >
              <ShoppingCart className="w-4 h-4" />
              <span className="font-bold">{cartCount}</span>
            </button>

            {/* Theme Toggle (Light / Dark) */}
            <button
              id="nav-btn-theme-toggle"
              type="button"
              onClick={onToggleTheme}
              className="p-2.5 rounded-xl text-slate-400 hover:text-amber-400 hover:bg-slate-800/60 border border-transparent hover:border-slate-700 transition-all"
              title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {isDark ? <Sun className="w-4.5 h-4.5" /> : <Moon className="w-4.5 h-4.5" />}
            </button>

            {/* Account Profile Modal */}
            <button
              id="nav-btn-account"
              type="button"
              onClick={onOpenAccount}
              className="p-2.5 rounded-xl text-slate-300 hover:text-cyan-400 hover:bg-slate-800/60 border border-transparent hover:border-slate-700 transition-all"
              title="Prototype Account"
            >
              <User className="w-4.5 h-4.5" />
            </button>

            {/* Admin Dashboard */}
            <button
              id="nav-btn-admin"
              type="button"
              onClick={onOpenAdmin}
              className="hidden sm:flex p-2.5 rounded-xl text-slate-400 hover:text-purple-400 hover:bg-slate-800/60 border border-transparent hover:border-slate-700 transition-all"
              title="Admin Dashboard"
            >
              <ShieldCheck className="w-4.5 h-4.5" />
            </button>

            {/* Mobile Menu Toggle */}
            <button
              id="nav-btn-mobile-menu"
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/60 transition-all"
              title="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar if active */}
        <div className="md:hidden pb-3 pt-1">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
            <input
              id="nav-search-input-mobile"
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search products, brands, specs..."
              className="w-full pl-9.5 pr-4 py-2 bg-slate-900/90 border border-slate-700/70 focus:border-cyan-500 rounded-xl text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Mobile Drawer Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-slate-800/80 space-y-2">
            <button
              id="nav-mobile-home"
              type="button"
              onClick={() => handleNavClick('home')}
              className="w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium text-slate-200 hover:bg-slate-800/60 flex items-center justify-between"
            >
              <span>Home</span>
            </button>
            <button
              id="nav-mobile-products"
              type="button"
              onClick={() => handleNavClick('products')}
              className="w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium text-slate-200 hover:bg-slate-800/60 flex items-center justify-between"
            >
              <span>Products Catalog</span>
            </button>
            <button
              id="nav-mobile-categories"
              type="button"
              onClick={() => handleNavClick('categories')}
              className="w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium text-slate-200 hover:bg-slate-800/60 flex items-center justify-between"
            >
              <span>Categories</span>
            </button>
            <button
              id="nav-mobile-3dlab"
              type="button"
              onClick={() => handleNavClick('3dlab')}
              className="w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold text-purple-400 bg-purple-950/20 border border-purple-500/20 flex items-center justify-between"
            >
              <span className="flex items-center gap-2">
                <Box className="w-4 h-4" />
                3D Product Lab
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-purple-500/30 text-purple-200">Interactive</span>
            </button>
            <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between px-2">
              <button
                id="nav-mobile-admin"
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdmin();
                }}
                className="flex items-center gap-2 text-xs font-medium text-slate-400 hover:text-white py-2 px-3 rounded-lg"
              >
                <ShieldCheck className="w-4 h-4 text-purple-400" />
                <span>Admin Dashboard</span>
              </button>
              <button
                id="nav-mobile-account"
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAccount();
                }}
                className="flex items-center gap-2 text-xs font-medium text-slate-400 hover:text-white py-2 px-3 rounded-lg"
              >
                <User className="w-4 h-4 text-cyan-400" />
                <span>My Account</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </header>
  );
};
