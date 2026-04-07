import { useState, useEffect } from 'react';
import { projectId, publicAnonKey } from '../utils/supabase/info';
import { Header } from '../components/Header';
import { Upload, Trash2 } from 'lucide-react';

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

export function AdminPage() {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    colors: '',
    sizes: '',
    category: 'essentials',
    description: '',
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [selectedProducts, setSelectedProducts] = useState<Set<string>>(new Set());

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoadingProducts(true);
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-32210018/products`,
        {
          headers: {
            Authorization: `Bearer ${publicAnonKey}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setProducts(data.products || []);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoadingProducts(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      // First, upload the image
      let imageUrl = '';
      if (imageFile) {
        const formDataForImage = new FormData();
        formDataForImage.append('file', imageFile);

        const uploadResponse = await fetch(
          `https://${projectId}.supabase.co/functions/v1/make-server-32210018/upload-image`,
          {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${publicAnonKey}`,
            },
            body: formDataForImage,
          }
        );

        if (!uploadResponse.ok) {
          throw new Error('Failed to upload image');
        }

        const uploadData = await uploadResponse.json();
        imageUrl = uploadData.url;
      } else {
        setMessage('✗ Please select an image to upload.');
        setLoading(false);
        return;
      }

      // Then create the product
      const product = {
        name: formData.name,
        price: parseFloat(formData.price),
        image: imageUrl,
        colors: formData.colors.split(',').map(c => c.trim()).filter(c => c),
        sizes: formData.sizes.split(',').map(s => s.trim()).filter(s => s),
        category: formData.category,
        description: formData.description,
      };

      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-32210018/products`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify(product),
        }
      );

      if (response.ok) {
        setMessage('✓ Product added successfully!');
        setFormData({
          name: '',
          price: '',
          colors: '',
          sizes: '',
          category: 'essentials',
          description: '',
        });
        setImageFile(null);
        setImagePreview('');
        // Refresh products list
        fetchProducts();
      } else {
        setMessage('✗ Failed to add product. Please try again.');
      }
    } catch (error) {
      console.error('Error adding product:', error);
      setMessage('✗ Error adding product. Check console for details.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteSelected = async () => {
    if (selectedProducts.size === 0) return;

    if (!confirm(`Delete ${selectedProducts.size} product(s)?`)) return;

    try {
      setLoading(true);
      const deletePromises = Array.from(selectedProducts).map(id =>
        fetch(
          `https://${projectId}.supabase.co/functions/v1/make-server-32210018/products/${id}`,
          {
            method: 'DELETE',
            headers: {
              Authorization: `Bearer ${publicAnonKey}`,
            },
          }
        )
      );

      await Promise.all(deletePromises);
      setMessage(`✓ Successfully deleted ${selectedProducts.size} product(s)!`);
      setSelectedProducts(new Set());
      fetchProducts();
    } catch (error) {
      console.error('Error deleting products:', error);
      setMessage('✗ Error deleting products. Check console for details.');
    } finally {
      setLoading(false);
    }
  };

  const toggleProductSelection = (id: string) => {
    const newSelection = new Set(selectedProducts);
    if (newSelection.has(id)) {
      newSelection.delete(id);
    } else {
      newSelection.add(id);
    }
    setSelectedProducts(newSelection);
  };

  const toggleSelectAll = () => {
    if (selectedProducts.size === products.length) {
      setSelectedProducts(new Set());
    } else {
      setSelectedProducts(new Set(products.map(p => p.id)));
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="pt-[73px]">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <h1 className="text-4xl mb-8 text-gray-900">Product Management</h1>

          {message && (
            <div
              className={`mb-6 p-4 rounded-lg ${
                message.startsWith('✓')
                  ? 'bg-green-50 text-green-800'
                  : 'bg-red-50 text-red-800'
              }`}
            >
              {message}
            </div>
          )}

          {/* Add Product Form */}
          <div className="bg-gray-50 p-6 rounded-lg mb-12">
            <h2 className="text-2xl mb-6 text-gray-900">Add New Product</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Left Column */}
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Product Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                      placeholder="e.g., Classic White T-Shirt"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Price (RM) *</label>
                    <input
                      type="number"
                      required
                      step="0.01"
                      value={formData.price}
                      onChange={(e) =>
                        setFormData({ ...formData, price: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                      placeholder="e.g., 89.00"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Category *</label>
                    <select
                      value={formData.category}
                      onChange={(e) =>
                        setFormData({ ...formData, category: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                    >
                      <option value="essentials">Essentials</option>
                      <option value="men">Men</option>
                      <option value="women">Women</option>
                      <option value="others">Others</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Colors (comma-separated hex codes)
                    </label>
                    <input
                      type="text"
                      value={formData.colors}
                      onChange={(e) =>
                        setFormData({ ...formData, colors: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                      placeholder="e.g., #FFFFFF, #000000, #808080"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Sizes (comma-separated)
                    </label>
                    <input
                      type="text"
                      value={formData.sizes}
                      onChange={(e) =>
                        setFormData({ ...formData, sizes: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                      placeholder="e.g., XS, S, M, L, XL"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Description
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({ ...formData, description: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                      rows={3}
                      placeholder="Product description..."
                    />
                  </div>
                </div>

                {/* Right Column - Image Upload */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Product Image *
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                    {imagePreview ? (
                      <div className="space-y-4">
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="w-full h-64 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setImageFile(null);
                            setImagePreview('');
                          }}
                          className="text-sm text-red-600 hover:text-red-700"
                        >
                          Remove Image
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <Upload className="w-12 h-12 text-gray-400 mx-auto" />
                        <div>
                          <label className="cursor-pointer">
                            <span className="text-black hover:text-gray-700 font-medium">
                              Click to upload
                            </span>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleImageChange}
                              className="hidden"
                              required
                            />
                          </label>
                          <p className="text-xs text-gray-500 mt-2">
                            PNG, JPG, WEBP up to 10MB
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                {loading ? 'Adding Product...' : 'Add Product'}
              </button>
            </form>
          </div>

          {/* Current Listings */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl text-gray-900">Current Listings</h2>
              {selectedProducts.size > 0 && (
                <button
                  onClick={handleDeleteSelected}
                  className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete Selected ({selectedProducts.size})
                </button>
              )}
            </div>

            {loadingProducts ? (
              <div className="text-center py-12">
                <p className="text-gray-500">Loading products...</p>
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <p className="text-gray-500">No products yet. Add your first product above!</p>
              </div>
            ) : (
              <>
                <div className="mb-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedProducts.size === products.length}
                      onChange={toggleSelectAll}
                      className="w-4 h-4"
                    />
                    <span className="text-sm text-gray-700">Select All</span>
                  </label>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {products.map((product) => (
                    <div
                      key={product.id}
                      className={`border rounded-lg overflow-hidden transition-all ${
                        selectedProducts.has(product.id)
                          ? 'ring-2 ring-black'
                          : 'hover:shadow-lg'
                      }`}
                    >
                      <div className="relative">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-64 object-cover"
                        />
                        <div className="absolute top-2 left-2">
                          <input
                            type="checkbox"
                            checked={selectedProducts.has(product.id)}
                            onChange={() => toggleProductSelection(product.id)}
                            className="w-5 h-5 cursor-pointer"
                          />
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="font-medium mb-1">{product.name}</h3>
                        <p className="text-sm text-gray-600 mb-2">
                          RM {product.price.toFixed(2)}
                        </p>
                        <p className="text-xs text-gray-500 capitalize">
                          {product.category}
                        </p>
                        {product.sizes && product.sizes.length > 0 && (
                          <p className="text-xs text-gray-500 mt-1">
                            Sizes: {product.sizes.join(', ')}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}