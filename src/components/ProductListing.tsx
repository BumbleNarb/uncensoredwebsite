import { useState, useEffect } from 'react';
import { ChevronDown, SlidersHorizontal, X } from 'lucide-react';
import jerseyImage from 'figma:asset/84ec7fe1f2ca663c21b9764132b4f3ce61f0a448.png';
import { useCart } from '../context/CartContext';
import { projectId, publicAnonKey } from '../utils/supabase/info';

interface ProductListingProps {
  category: string;
}

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  colors?: string[];
  sizes?: string[];
  category?: string;
  description?: string;
}

export function ProductListing({ category }: ProductListingProps) {
  const [selectedSize, setSelectedSize] = useState('All');
  const [selectedPrice, setSelectedPrice] = useState('All');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const categoryTitle = category.charAt(0).toUpperCase() + category.slice(1);

  useEffect(() => {
    fetchProducts();
  }, [category]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-32210018/products/${category}`,
        {
          headers: {
            Authorization: `Bearer ${publicAnonKey}`,
          },
        }
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      
      const data = await response.json();
      setProducts(data.products || []);
    } catch (error) {
      console.error('Error fetching products:', error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  // Filter products based on selected filters
  const filteredProducts = products.filter((product) => {
    // Size filter
    if (selectedSize !== 'All') {
      if (!product.sizes || !product.sizes.includes(selectedSize)) {
        return false;
      }
    }

    // Price filter
    if (selectedPrice !== 'All') {
      const price = product.price;
      if (selectedPrice === 'Under RM 100' && price >= 100) return false;
      if (selectedPrice === 'RM 100-150' && (price < 100 || price > 150)) return false;
      if (selectedPrice === 'RM 150-200' && (price < 150 || price > 200)) return false;
      if (selectedPrice === 'Over RM 200' && price <= 200) return false;
    }

    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      {/* Filters Bar */}
      <div className="flex items-center gap-4 mb-8 pb-4 border-b border-gray-200">
        <FilterDropdown
          label="Size"
          value={selectedSize}
          onChange={setSelectedSize}
          options={['All', 'XS', 'S', 'M', 'L', 'XL', '2XL', '3XL', '4XL']}
        />

        <FilterDropdown
          label="Price"
          value={selectedPrice}
          onChange={setSelectedPrice}
          options={['All', 'Under RM 100', 'RM 100-150', 'RM 150-200', 'Over RM 200']}
        />
      </div>

      {/* Product Grid */}
      {loading ? (
        <div className="text-center py-20">
          <p className="text-gray-500">Loading products...</p>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-500">No products found matching your filters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product}
              onClick={() => setSelectedProduct(product)}
            />
          ))}
        </div>
      )}

      {/* Product Details Modal */}
      {selectedProduct && (
        <ProductDetailsModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
}

interface FilterDropdownProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
}

function FilterDropdown({ label, value, onChange, options }: FilterDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
      >
        <span className="text-sm text-gray-700">{label}</span>
        <ChevronDown className="w-4 h-4 text-gray-500" />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-20">
            {options.map((option) => (
              <button
                key={option}
                onClick={() => {
                  onChange(option);
                  setIsOpen(false);
                }}
                className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors"
              >
                {option}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

interface ProductCardProps {
  product: Product;
  onClick: () => void;
}

function ProductCard({ product, onClick }: ProductCardProps) {
  return (
    <div 
      className="group cursor-pointer"
      onClick={onClick}
    >
      {/* Product Image */}
      <div className="relative aspect-[3/4] bg-gray-100 mb-3 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Product Name */}
      <h3 className="text-sm mb-2 text-gray-900">
        {product.name}
      </h3>

      {/* Price */}
      <p className="font-medium text-gray-900">
        RM {product.price.toFixed(2)}
      </p>
    </div>
  );
}

interface ProductDetailsModalProps {
  product: Product;
  onClose: () => void;
}

function ProductDetailsModal({ product, onClose }: ProductDetailsModalProps) {
  const [selectedSize, setSelectedSize] = useState('');
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    if (!selectedSize) {
      return;
    }

    addToCart({
      id: `${product.id}-${selectedSize}`,
      name: product.name,
      price: product.price,
      size: selectedSize,
      image: product.image,
    });

    onClose();
  };

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 z-50"
        onClick={onClose}
      />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-lg shadow-2xl z-50 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
        >
          <X className="w-5 h-5 text-gray-500" />
        </button>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Image */}
          <div className="relative aspect-[3/4] bg-gray-100 overflow-hidden rounded-lg">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Details */}
          <div>
            <h2 className="text-2xl mb-3 text-gray-900">
              {product.name}
            </h2>

            <p className="text-3xl font-medium text-gray-900 mb-6">
              RM {product.price.toFixed(2)}
            </p>

            {/* Colors */}
            {product.colors && product.colors.length > 0 && (
              <div className="mb-6">
                <h3 className="text-sm font-medium mb-3">Available Colors</h3>
                <div className="flex items-center gap-2">
                  {product.colors.map((color, index) => (
                    <div
                      key={index}
                      className="w-8 h-8 rounded-full border-2 border-gray-300"
                      style={{ backgroundColor: color }}
                      title={color}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Sizes */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="mb-6">
                <h3 className="text-sm font-medium mb-3">Select Size</h3>
                <div className="grid grid-cols-4 gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-3 border rounded-lg transition-colors ${
                        selectedSize === size
                          ? 'border-black bg-black text-white'
                          : 'border-gray-300 hover:border-black'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Description */}
            {product.description && (
              <div className="mb-6">
                <h3 className="text-sm font-medium mb-2">Description</h3>
                <p className="text-sm text-gray-600">{product.description}</p>
              </div>
            )}

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              disabled={!selectedSize && product.sizes && product.sizes.length > 0}
              className="w-full bg-black text-white py-4 rounded-lg hover:bg-gray-800 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </>
  );
}