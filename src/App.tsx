import React, { useState, useEffect } from 'react';
import { Product, CartItem } from './types';
import { INITIAL_PRODUCTS } from './data/products';
import { Navbar } from './components/Navbar';
import { Hero3D } from './components/Hero3D';
import { ThreeDLab } from './components/ThreeDLab';
import { ProductList } from './components/ProductList';
import { ProductDetailsModal } from './components/ProductDetailsModal';
import { CompareModal } from './components/CompareModal';
import { CartDrawer } from './components/CartDrawer';
import { WishlistModal } from './components/WishlistModal';
import { AccountModal } from './components/AccountModal';
import { AdminDashboard } from './components/AdminDashboard';
import { AIAssistantModal } from './components/AIAssistantModal';
import { Footer } from './components/Footer';
import { 
  Box, 
  Sparkles, 
  Smartphone, 
  Laptop, 
  Tablet, 
  Gamepad2, 
  Cpu, 
  Headphones, 
  ArrowRight, 
  CheckCircle2, 
  Info 
} from 'lucide-react';

export default function App() {
  // Products Catalog with LocalStorage persistence for Admin additions/edits
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('techverse_products');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.warn('Failed to parse saved products', e);
    }
    return INITIAL_PRODUCTS;
  });

  // Cart State (stored in localStorage)
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('techverse_cart');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return [];
  });

  // Wishlist State (stored in localStorage)
  const [wishlistIds, setWishlistIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('techverse_wishlist');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return ['macbook-air-m4', 'galaxy-s25-ultra'];
  });

  // Compare State (stored in localStorage)
  const [compareIds, setCompareIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('techverse_compare');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return ['macbook-air-m4', 'dell-xps-16'];
  });

  // Recently Viewed for 3D & Account (localStorage)
  const [recentViewedIds, setRecentViewedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('techverse_recents');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return ['macbook-air-m4', 'galaxy-s25-ultra', 'rtx-5090'];
  });

  // Theme State
  const [isDark, setIsDark] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('techverse_theme');
      if (saved) return saved === 'dark';
    } catch (e) {}
    return true; // Futuristic dark by default
  });

  // Navigation & Search State
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // 3D Lab Active Selected Product
  const [selected3DProductId, setSelected3DProductId] = useState<string>('macbook-air-m4');

  // Modals Open/Close State
  const [selectedProductDetails, setSelectedProductDetails] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isAIOpen, setIsAIOpen] = useState(false);

  // Toast Notification State
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 2800);
  };

  // Sync products to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('techverse_products', JSON.stringify(products));
    } catch (e) {}
  }, [products]);

  // Sync cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('techverse_cart', JSON.stringify(cart));
    } catch (e) {}
  }, [cart]);

  // Sync wishlist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('techverse_wishlist', JSON.stringify(wishlistIds));
    } catch (e) {}
  }, [wishlistIds]);

  // Sync compare to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('techverse_compare', JSON.stringify(compareIds));
    } catch (e) {}
  }, [compareIds]);

  // Sync recents to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('techverse_recents', JSON.stringify(recentViewedIds));
    } catch (e) {}
  }, [recentViewedIds]);

  // Apply Theme class to document element
  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      localStorage.setItem('techverse_theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('techverse_theme', 'light');
    }
  }, [isDark]);

  const handleToggleTheme = () => {
    setIsDark(!isDark);
  };

  // CRITICAL 3D View Trigger Flow
  const handleOpen3DView = (productId: string) => {
    setSelected3DProductId(productId);
    
    // Add to recently viewed
    setRecentViewedIds((prev) => {
      const next = [productId, ...prev.filter((id) => id !== productId)].slice(0, 6);
      return next;
    });

    const targetProduct = products.find((p) => p.id === productId);
    showToast(`Loading 3D model: ${targetProduct?.name || 'Device'}`);

    // If on products or categories tab, switch to home where the 3D lab is located or scroll
    const labElement = document.getElementById('threeDLab');
    if (labElement) {
      labElement.scrollIntoView({ behavior: 'smooth' });
    } else {
      setCurrentTab('home');
      setTimeout(() => {
        const el = document.getElementById('threeDLab');
        el?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  // Cart operations
  const handleAddToCart = (product: Product, colorName?: string) => {
    setCart((prev) => {
      const color = colorName || product.colors[0]?.name;
      const existing = prev.find(
        (it) => it.product.id === product.id && it.selectedColor === color
      );
      if (existing) {
        return prev.map((it) =>
          it.product.id === product.id && it.selectedColor === color
            ? { ...it, quantity: it.quantity + 1 }
            : it
        );
      }
      return [...prev, { product, quantity: 1, selectedColor: color }];
    });
    showToast(`Added ${product.name} to Cart`);
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((it) => (it.product.id === productId ? { ...it, quantity } : it))
    );
  };

  const handleRemoveFromCart = (productId: string) => {
    setCart((prev) => prev.filter((it) => it.product.id !== productId));
    showToast('Item removed from cart');
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // Wishlist operations
  const handleToggleWishlist = (product: Product) => {
    if (wishlistIds.includes(product.id)) {
      setWishlistIds((prev) => prev.filter((id) => id !== product.id));
      showToast(`Removed ${product.name} from Wishlist`);
    } else {
      setWishlistIds((prev) => [...prev, product.id]);
      showToast(`Saved ${product.name} to Wishlist`);
    }
  };

  // Compare operations (max 3)
  const handleToggleCompare = (product: Product) => {
    if (compareIds.includes(product.id)) {
      setCompareIds((prev) => prev.filter((id) => id !== product.id));
      showToast(`Removed ${product.name} from Comparison`);
    } else {
      if (compareIds.length >= 3) {
        showToast('Maximum 3 devices can be compared simultaneously.');
        setIsCompareOpen(true);
        return;
      }
      setCompareIds((prev) => [...prev, product.id]);
      showToast(`Added ${product.name} to Comparison table`);
    }
  };

  // Admin operations
  const handleAddProduct = (newProd: Product) => {
    setProducts((prev) => [newProd, ...prev]);
    showToast(`Added ${newProd.name} to store!`);
  };

  const handleUpdateProduct = (updated: Product) => {
    setProducts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
    showToast(`Updated ${updated.name}`);
  };

  const handleDeleteProduct = (productId: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== productId));
    showToast('Product removed from catalog');
  };

  const handleResetProducts = () => {
    setProducts(INITIAL_PRODUCTS);
    localStorage.removeItem('techverse_products');
    showToast('Factory database restored');
  };

  // Navigation handlers
  const handleNavigate = (tab: string) => {
    setCurrentTab(tab);
    if (tab === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (tab === 'products') {
      setSelectedCategory('All');
      setTimeout(() => {
        document.getElementById('products-catalog')?.scrollIntoView({ behavior: 'smooth' });
      }, 50);
    } else if (tab === 'categories') {
      setTimeout(() => {
        document.getElementById('categories-section')?.scrollIntoView({ behavior: 'smooth' });
      }, 50);
    } else if (tab === '3dlab') {
      setTimeout(() => {
        document.getElementById('threeDLab')?.scrollIntoView({ behavior: 'smooth' });
      }, 50);
    }
  };

  const flagship = products.find((p) => p.id === 'macbook-air-m4') || products[0];
  const compareProductsList = products.filter((p) => compareIds.includes(p.id));
  const wishlistProductsList = products.filter((p) => wishlistIds.includes(p.id));
  const recentProductsList = products.filter((p) => recentViewedIds.includes(p.id));
  const totalCartCount = cart.reduce((acc, it) => acc + it.quantity, 0);

  const categoryCards = [
    { title: 'Smartphones', count: products.filter(p => p.category === 'Smartphones').length, icon: <Smartphone className="w-6 h-6" />, desc: 'Quad-optic flagship cameras & AI chipsets' },
    { title: 'Laptops', count: products.filter(p => p.category === 'Laptops').length, icon: <Laptop className="w-6 h-6" />, desc: 'Ultra-thin notebooks & mobile workstations' },
    { title: 'Tablets', count: products.filter(p => p.category === 'Tablets').length, icon: <Tablet className="w-6 h-6" />, desc: 'Precision stylus displays & thin aluminum slates' },
    { title: 'Gaming', count: products.filter(p => p.category === 'Gaming').length, icon: <Gamepad2 className="w-6 h-6" />, desc: 'High-refresh monitors & esports peripherals' },
    { title: 'Computer Components', count: products.filter(p => p.category === 'Computer Components').length, icon: <Cpu className="w-6 h-6" />, desc: 'Next-gen GPUs & high-performance processors' },
    { title: 'Accessories', count: products.filter(p => p.category === 'Accessories').length, icon: <Headphones className="w-6 h-6" />, desc: 'Active noise cancellation & wireless gear' }
  ];

  return (
    <div className={`min-h-screen ${isDark ? 'bg-slate-950 text-slate-100' : 'bg-slate-900 text-slate-100'} transition-colors font-sans antialiased selection:bg-cyan-500 selection:text-slate-950`}>
      
      {/* Top Academic Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-950 to-purple-950 border-b border-indigo-800/40 text-[11px] py-1.5 px-4 text-center text-cyan-200 flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
        <span>
          <strong>TECHVERSE:</strong> BCA Final-Year Project • Interactive 3D Electronics E-Commerce Platform
        </span>
        <button
          type="button"
          onClick={() => setIsAdminOpen(true)}
          className="underline ml-2 text-white hover:text-cyan-300 font-semibold"
        >
          Open Admin CRUD Panel →
        </button>
      </div>

      {/* Sticky Main Navigation */}
      <Navbar
        currentTab={currentTab}
        onNavigate={handleNavigate}
        searchQuery={searchQuery}
        onSearchChange={(q) => {
          setSearchQuery(q);
          if (q) {
            document.getElementById('products-catalog')?.scrollIntoView({ behavior: 'smooth' });
          }
        }}
        cartCount={totalCartCount}
        wishlistCount={wishlistIds.length}
        compareCount={compareIds.length}
        isDark={isDark}
        onToggleTheme={handleToggleTheme}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenCompare={() => setIsCompareOpen(true)}
        onOpenAccount={() => setIsAccountOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
        onOpenAI={() => setIsAIOpen(true)}
      />

      {/* Toast Notification Container */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-2xl bg-slate-900 border border-cyan-500/50 text-white text-xs font-semibold shadow-2xl shadow-cyan-500/20 animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-cyan-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Page Body */}
      <main>
        {/* 1. Hero 3D Section */}
        <Hero3D
          flagshipProduct={flagship}
          onExploreProducts={() => {
            document.getElementById('products-catalog')?.scrollIntoView({ behavior: 'smooth' });
          }}
          onEnter3DLab={(productId) => {
            if (productId) setSelected3DProductId(productId);
            document.getElementById('threeDLab')?.scrollIntoView({ behavior: 'smooth' });
          }}
          onOpenProductDetails={(prod) => setSelectedProductDetails(prod)}
        />

        {/* 2. Interactive Category Explorer Cards */}
        <section id="categories-section" className="py-12 scroll-mt-20 border-t border-slate-800/80 bg-slate-950/40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-2">
              <div>
                <span className="text-xs font-mono uppercase text-purple-400 font-semibold">
                  TAXONOMY
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-heading mt-1">
                  Product Categories
                </h3>
              </div>
              <p className="text-xs text-slate-400 max-w-xs">
                Select any hardware category to filter specifications and models in real-time.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 sm:gap-4">
              {categoryCards.map((cat) => (
                <div
                  key={cat.title}
                  id={`cat-card-${cat.title.toLowerCase().replace(/\s+/g, '-')}`}
                  onClick={() => {
                    setSelectedCategory(cat.title);
                    document.getElementById('products-catalog')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="group p-4 rounded-2xl bg-slate-900/60 hover:bg-slate-900 border border-slate-800 hover:border-cyan-500/50 cursor-pointer transition-all flex flex-col justify-between gap-3 hover:-translate-y-1 hover:shadow-lg hover:shadow-cyan-500/10"
                >
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                    {cat.icon}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {cat.title}
                    </h4>
                    <span className="text-[11px] text-slate-400 font-mono">
                      {cat.count} devices
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 3. Dedicated 3D Product Lab (#threeDLab) */}
        <ThreeDLab
          products={products}
          selectedProductId={selected3DProductId}
          onSelectProduct={(id) => setSelected3DProductId(id)}
          onAddToCart={handleAddToCart}
          onToggleWishlist={handleToggleWishlist}
          isInWishlist={wishlistIds.includes(selected3DProductId)}
        />

        {/* 4. Complete Hardware Catalog Grid with Search & Filters */}
        <ProductList
          products={products}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          onOpen3DView={handleOpen3DView}
          onOpenDetails={(p) => setSelectedProductDetails(p)}
          onAddToCart={handleAddToCart}
          onToggleWishlist={handleToggleWishlist}
          onToggleCompare={handleToggleCompare}
          wishlistIds={wishlistIds}
          compareIds={compareIds}
          cartIds={cart.map((c) => c.product.id)}
        />
      </main>

      {/* Modals & Drawers */}
      <ProductDetailsModal
        product={selectedProductDetails}
        onClose={() => setSelectedProductDetails(null)}
        onOpen3DView={handleOpen3DView}
        onAddToCart={handleAddToCart}
        onToggleWishlist={handleToggleWishlist}
        onToggleCompare={handleToggleCompare}
        isInWishlist={selectedProductDetails ? wishlistIds.includes(selectedProductDetails.id) : false}
        isInCompare={selectedProductDetails ? compareIds.includes(selectedProductDetails.id) : false}
      />

      <CompareModal
        isOpen={isCompareOpen}
        onClose={() => setIsCompareOpen(false)}
        compareProducts={compareProductsList}
        onRemoveFromCompare={(id) => setCompareIds((prev) => prev.filter((pid) => pid !== id))}
        onClearCompare={() => setCompareIds([])}
        onOpen3DView={handleOpen3DView}
        onAddToCart={handleAddToCart}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
        onOpen3DView={handleOpen3DView}
      />

      <WishlistModal
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistProducts={wishlistProductsList}
        onRemoveFromWishlist={(id) => setWishlistIds((prev) => prev.filter((pid) => pid !== id))}
        onMoveToCart={handleAddToCart}
        onOpen3DView={handleOpen3DView}
      />

      <AccountModal
        isOpen={isAccountOpen}
        onClose={() => setIsAccountOpen(false)}
        cartCount={totalCartCount}
        wishlistCount={wishlistIds.length}
        recentProducts={recentProductsList}
        onOpen3DView={handleOpen3DView}
      />

      <AdminDashboard
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        products={products}
        onAddProduct={handleAddProduct}
        onUpdateProduct={handleUpdateProduct}
        onDeleteProduct={handleDeleteProduct}
        onResetProducts={handleResetProducts}
        cartCount={totalCartCount}
        wishlistCount={wishlistIds.length}
        compareCount={compareIds.length}
      />

      <AIAssistantModal
        isOpen={isAIOpen}
        onClose={() => setIsAIOpen(false)}
        products={products}
        onOpen3DView={handleOpen3DView}
        onAddToCart={handleAddToCart}
      />

      {/* Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpen3DLab={() => handleNavigate('3dlab')}
        onOpenAdmin={() => setIsAdminOpen(true)}
        onOpenAI={() => setIsAIOpen(true)}
      />
    </div>
  );
}
