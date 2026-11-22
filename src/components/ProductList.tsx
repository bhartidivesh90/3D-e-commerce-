import React, { useState, useMemo } from 'react';
import { Product, Category } from '../types';
import { ProductCard } from './ProductCard';
import { 
  Filter, 
  ArrowUpDown, 
  RotateCcw, 
  Search, 
  Smartphone, 
  Laptop, 
  Tablet, 
  Gamepad2, 
  Cpu, 
  Headphones, 
  Layers
} from 'lucide-react';

interface ProductListProps {
  products: Product[];
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  onOpen3DView: (productId: string) => void;
  onOpenDetails: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  onToggleCompare: (product: Product) => void;
  wishlistIds: string[];
  compareIds: string[];
  cartIds: string[];
}

export const ProductList: React.FC<ProductListProps> = ({
  products,
  searchQuery,
  onSearchChange,
  selectedCategory,
  onSelectCategory,
  onOpen3DView,
  onOpenDetails,
  onAddToCart,
  onToggleWishlist,
  onToggleCompare,
  wishlistIds,
  compareIds,
  cartIds
}) => {
  const [selectedBrand, setSelectedBrand] = useState<string>('All');
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating' | 'newest'>('featured');

  const categories: { name: string; icon: React.ReactNode }[] = [
    { name: 'All', icon: <Layers className="w-3.5 h-3.5" /> },
    { name: 'Smartphones', icon: <Smartphone className="w-3.5 h-3.5" /> },
    { name: 'Laptops', icon: <Laptop className="w-3.5 h-3.5" /> },
    { name: 'Tablets', icon: <Tablet className="w-3.5 h-3.5" /> },
    { name: 'Gaming', icon: <Gamepad2 className="w-3.5 h-3.5" /> },
    { name: 'Computer Components', icon: <Cpu className="w-3.5 h-3.5" /> },
    { name: 'Accessories', icon: <Headphones className="w-3.5 h-3.5" /> }
  ];

  const brands = ['All', 'Apple', 'Samsung', 'ASUS', 'Lenovo', 'Dell', 'Google', 'NVIDIA', 'Corsair', 'Logitech', 'Sony'];

  const priceRanges = [
    { label: 'All Prices', value: 'All' },
    { label: 'Under ₹25,000', value: 'under-25k' },
    { label: '₹25,000–₹50,000', value: '25k-50k' },
    { label: '₹50,000–₹1,00,000', value: '50k-100k' },
    { label: 'Above ₹1,00,000', value: 'above-100k' }
  ];

  // Filtering logic
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = p.name.toLowerCase().includes(q);
        const matchesBrand = p.brand.toLowerCase().includes(q);
        const matchesCategory = p.category.toLowerCase().includes(q);
        const matchesSpecs = Object.values(p.specifications).some(
          (val) => val && val.toLowerCase().includes(q)
        );
        if (!matchesName && !matchesBrand && !matchesCategory && !matchesSpecs) {
          return false;
        }
      }

      // Category
      if (selectedCategory !== 'All' && p.category !== selectedCategory) {
        return false;
      }

      // Brand
      if (selectedBrand !== 'All' && p.brand !== selectedBrand) {
        return false;
      }

      // Price Range
      if (selectedPriceRange === 'under-25k' && p.price >= 25000) return false;
      if (selectedPriceRange === '25k-50k' && (p.price < 25000 || p.price > 50000)) return false;
      if (selectedPriceRange === '50k-100k' && (p.price < 50000 || p.price > 100000)) return false;
      if (selectedPriceRange === 'above-100k' && p.price < 100000) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'newest') return (b.tag === 'New' ? 1 : 0) - (a.tag === 'New' ? 1 : 0);
      return 0; // Default featured
    });
  }, [products, searchQuery, selectedCategory, selectedBrand, selectedPriceRange, sortBy]);

  const handleResetFilters = () => {
    onSearchChange('');
    onSelectCategory('All');
    setSelectedBrand('All');
    setSelectedPriceRange('All');
    setSortBy('featured');
  };

  const hasActiveFilters =
    searchQuery !== '' ||
    selectedCategory !== 'All' ||
    selectedBrand !== 'All' ||
    selectedPriceRange !== 'All' ||
    sortBy !== 'featured';

  return (
    <section id="products-catalog" className="py-12 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-mono uppercase text-cyan-400 font-semibold tracking-wider">
              HARDWARE CATALOG
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-heading text-white mt-1">
              Engineered for Performance
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              Explore flagship consumer electronics with full interactive 3D inspection.
            </p>
          </div>

          {/* Results Counter & Sort Selector */}
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-xs font-mono text-slate-400">
              Showing <strong className="text-cyan-400">{filteredProducts.length}</strong> of {products.length} devices
            </span>

            <div className="flex items-center gap-2">
              <ArrowUpDown className="w-4 h-4 text-slate-400" />
              <select
                id="select-sort-by"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-slate-900 border border-slate-700 text-slate-200 text-xs rounded-xl px-3 py-2 focus:border-cyan-500 focus:outline-none cursor-pointer"
              >
                <option value="featured">Featured Order</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="newest">New Releases</option>
              </select>
            </div>
          </div>
        </div>

        {/* Category Horizontal Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 scrollbar-thin">
          {categories.map((cat) => (
            <button
              key={cat.name}
              id={`filter-category-${cat.name.toLowerCase().replace(/\s+/g, '-')}`}
              type="button"
              onClick={() => onSelectCategory(cat.name)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat.name
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/25 ring-2 ring-cyan-400/40'
                  : 'bg-slate-900/80 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800'
              }`}
            >
              {cat.icon}
              <span>{cat.name}</span>
            </button>
          ))}
        </div>

        {/* Brand & Price Filter Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900/50 border border-slate-800/80 backdrop-blur-md mb-8">
          
          <div className="flex flex-wrap items-center gap-3">
            {/* Brand Filter */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-slate-400">Brand:</span>
              <select
                id="filter-brand-select"
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="bg-slate-950 border border-slate-800 text-slate-200 text-xs rounded-xl px-3 py-1.5 focus:border-cyan-500 focus:outline-none"
              >
                {brands.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </div>

            {/* Price Filter */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-slate-400">Budget:</span>
              <select
                id="filter-price-select"
                value={selectedPriceRange}
                onChange={(e) => setSelectedPriceRange(e.target.value)}
                className="bg-slate-950 border border-slate-800 text-slate-200 text-xs rounded-xl px-3 py-1.5 focus:border-cyan-500 focus:outline-none"
              >
                {priceRanges.map((pr) => (
                  <option key={pr.value} value={pr.value}>
                    {pr.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Reset Filters */}
          {hasActiveFilters && (
            <button
              id="btn-reset-filters"
              type="button"
              onClick={handleResetFilters}
              className="flex items-center gap-1.5 text-xs text-rose-400 hover:text-rose-300 font-semibold px-3 py-1.5 rounded-lg hover:bg-rose-500/10 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset All Filters</span>
            </button>
          )}

        </div>

        {/* Product Cards Grid */}
        {filteredProducts.length === 0 ? (
          <div className="py-16 text-center bg-slate-900/40 rounded-3xl border border-slate-800 p-8">
            <Search className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            <h4 className="text-lg font-bold text-slate-200">No electronics match your query</h4>
            <p className="text-sm text-slate-400 max-w-sm mx-auto mt-1 mb-4">
              Try adjusting your category, price range, or searching for broader terms like "Samsung", "M4", or "Gaming".
            </p>
            <button
              id="btn-no-results-reset"
              type="button"
              onClick={handleResetFilters}
              className="px-4 py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onOpen3DView={onOpen3DView}
                onOpenDetails={onOpenDetails}
                onAddToCart={onAddToCart}
                onToggleWishlist={onToggleWishlist}
                onToggleCompare={onToggleCompare}
                isInWishlist={wishlistIds.includes(product.id)}
                isInCompare={compareIds.includes(product.id)}
                isInCart={cartIds.includes(product.id)}
              />
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
