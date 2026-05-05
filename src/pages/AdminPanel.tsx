import { useState, useEffect } from 'react'
import { Plus, Trash2, Edit2, Save, X, LayoutGrid, List, Upload } from 'lucide-react'
import { motion } from 'framer-motion'
import logo from '../assets/logo.png'
import AdminLogin from './AdminLogin'
import { supabase } from '../lib/supabase'

// Shared Types & Constants
import type { Product } from '../types/clothing'
import { CLOTHING_CATEGORIES } from '../constants/clothing'

const MAIN_CATEGORIES = Object.keys(CLOTHING_CATEGORIES);

const CATEGORY_BUCKETS: Record<string, string> = {
  'Sarees': 'saree',
  'Salwar Suits': 'salwar',
  'Kurta & Frock Collection': 'kurta',
  'Footwear': 'jutti'
};

export default function AdminPanel() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | number | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('admin_auth') === 'true';
  });
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 10;

  const emptyProduct: Partial<Product> = {
    name: '',
    price: '',
    price_type: 'Fixed',
    main_category: 'Sarees',
    subcategory: '',
    fabric: 'Chikankari',
    description: '',
    image: '',
    status: 'Available',
    age_group: '',
    sizes: [],
    colors: []
  };

  const [newProduct, setNewProduct] = useState<Partial<Product>>(emptyProduct);
  const [rawSizes, setRawSizes] = useState('');
  const [rawColors, setRawColors] = useState('');

  useEffect(() => {
    if (isAuthenticated) {
      fetchProducts();
    }
  }, [isAuthenticated]);

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleEdit = (product: Product) => {
    setEditingId(product.id);
    setNewProduct({ ...product });
    setRawSizes(product.sizes?.join(', ') || '');
    setRawColors(product.colors?.join(', ') || '');
    setIsAdding(true);
  };

  const handleSaveProduct = async () => {
    if (!newProduct.name || !newProduct.price) {
      alert('Please fill in both the Product Name and Price.');
      return;
    }
    
    try {
      let finalImageUrl = newProduct.image || '';
      
      // Only upload if it's a new base64 image
      if (finalImageUrl.startsWith('data:')) {
        const file = await (await fetch(finalImageUrl)).blob();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.png`;
        const bucketName = CATEGORY_BUCKETS[newProduct.main_category || 'Sarees'] || 'images';
        
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from(bucketName)
          .upload(fileName, file);
          
        if (uploadError) throw uploadError;
        
        const { data: urlData } = supabase.storage
          .from(bucketName)
          .getPublicUrl(uploadData.path);
          
        finalImageUrl = urlData.publicUrl;
      }

      const productData = {
        name: newProduct.name,
        price: newProduct.price_type === 'On Request' ? 'Price on request' : newProduct.price,
        price_type: newProduct.price_type,
        main_category: newProduct.main_category,
        subcategory: newProduct.subcategory || null,
        fabric: newProduct.fabric,
        description: newProduct.description,
        image: finalImageUrl,
        status: newProduct.status || 'Available',
        age_group: newProduct.age_group || null,
        sizes: newProduct.sizes,
        colors: newProduct.colors,
        category: `${newProduct.main_category}${newProduct.subcategory ? ` (${newProduct.subcategory})` : ''}${newProduct.fabric ? ` - ${newProduct.fabric}` : ''}`
      };

      if (editingId) {
        // Update existing
        const { error } = await supabase
          .from('products')
          .update(productData)
          .eq('id', editingId);
        if (error) throw error;
        alert('Product updated successfully!');
      } else {
        // Insert new
        const { error } = await supabase
          .from('products')
          .insert([productData]);
        if (error) throw error;
        alert('Product added successfully!');
      }
      
      await fetchProducts();
      closeModal();
    } catch (error: any) {
      console.error('Error saving product:', error);
      alert('Error saving product: ' + error.message);
    }
  };

  const closeModal = () => {
    setIsAdding(false);
    setEditingId(null);
    setNewProduct(emptyProduct);
    setRawSizes('');
    setRawColors('');
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewProduct({ ...newProduct, image: reader.result as string });
        e.target.value = '';
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDelete = async (id: string | number) => {
    if (confirm('Delete this product?')) {
      try {
        const { error } = await supabase
          .from('products')
          .delete()
          .eq('id', id);

        if (error) throw error;
        setProducts(products.filter(p => p.id !== id));
      } catch (error: any) {
        alert('Error deleting product: ' + error.message);
      }
    }
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem('admin_auth', 'true');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('admin_auth');
  };

  if (!isAuthenticated) {
    return <AdminLogin onLogin={handleLogin} />;
  }

  return (
    <div className="bg-gray-50 min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-text-h text-white p-8 hidden lg:flex flex-col">
        <img src={logo} alt="Annamz" className="h-16 w-auto object-contain mb-12" />
        <nav className="space-y-1 flex-1 overflow-y-auto no-scrollbar">
          <button 
            onClick={() => setSelectedCategory('All')}
            className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${selectedCategory === 'All' ? 'text-gold bg-white/10' : 'text-gray-400 hover:text-white'}`}
          >
            <LayoutGrid size={20} />
            <span>All Products</span>
          </button>

          <div className="pt-6 pb-2">
            <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold px-3 mb-4">Categories</p>
            <div className="space-y-1">
              {MAIN_CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => { setSelectedCategory(cat); setCurrentPage(1); }}
                  className={`w-full text-left px-3 py-2.5 rounded-lg text-sm transition-colors flex items-center justify-between group ${selectedCategory === cat ? 'text-gold bg-white/10 font-bold' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                >
                  <span>{cat}</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full ${selectedCategory === cat ? 'bg-gold text-white' : 'bg-white/10 text-gray-500 group-hover:text-white'}`}>
                    {products.filter(p => p.main_category === cat).length}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="pt-6 border-t border-white/10 mt-6">
            <a href="/clothing" className="flex items-center space-x-3 text-gray-400 hover:text-white p-3 rounded-lg transition-colors">
              <List size={20} />
              <span>Store View</span>
            </a>
          </div>
        </nav>
        
        <button 
          onClick={handleLogout}
          className="w-full flex items-center space-x-3 text-gray-400 hover:text-red-400 p-3 rounded-lg transition-colors mt-auto border-t border-white/10 pt-6"
        >
          <X size={20} />
          <span>Logout</span>
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 md:p-12">
        <header className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-3xl font-serif text-text-h">Inventory Management</h1>
            <p className="text-gray-500">Clothing Division</p>
          </div>
          <button 
            onClick={() => setIsAdding(true)}
            className="btn-premium flex items-center space-x-2"
          >
            <Plus size={20} />
            <span>Add Product</span>
          </button>
        </header>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <p className="text-gray-500 text-sm mb-1">Total Items</p>
            <p className="text-3xl font-serif text-text-h">{products.length}</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <p className="text-gray-500 text-sm mb-1">Categories</p>
            <p className="text-3xl font-serif text-text-h">{new Set(products.map(p => p.main_category)).size}</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <p className="text-gray-500 text-sm mb-1">Status</p>
            <p className="text-3xl font-serif text-text-h">Active</p>
          </div>
        </div>

        {/* Product Grid */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 text-xs uppercase tracking-widest text-gray-400 font-semibold">Product</th>
                <th className="px-6 py-4 text-xs uppercase tracking-widest text-gray-400 font-semibold">Category</th>
                <th className="px-6 py-4 text-xs uppercase tracking-widest text-gray-400 font-semibold">Fabric / Type</th>
                <th className="px-6 py-4 text-xs uppercase tracking-widest text-gray-400 font-semibold">Price</th>
                <th className="px-6 py-4 text-xs uppercase tracking-widest text-gray-400 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {(() => {
                const filtered = products.filter(p => selectedCategory === 'All' || p.main_category === selectedCategory);
                const paginated = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);
                
                if (filtered.length === 0) {
                  return (
                    <tr>
                      <td colSpan={5} className="px-6 py-12 text-center text-gray-400 italic">No products found in this category.</td>
                    </tr>
                  );
                }

                return paginated.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100">
                          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                        </div>
                        <span className="font-medium text-text-h line-clamp-2 max-w-xs">{product.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-gray-100 rounded-full text-xs text-gray-600">{product.main_category}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-chocolate/5 text-chocolate rounded-full text-[10px] font-bold uppercase tracking-widest">
                        {product.fabric || product.subcategory || '-'}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-serif">{product.price}</td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <button 
                        onClick={() => handleEdit(product)}
                        className="p-2 text-gray-400 hover:text-gold transition-colors"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button onClick={() => handleDelete(product.id)} className="p-2 text-gray-400 hover:text-red-500 transition-colors"><Trash2 size={18} /></button>
                    </td>
                  </tr>
                ));
              })()}
            </tbody>
          </table>
        </div>

        {/* Pagination UI */}
        {(() => {
          const filtered = products.filter(p => selectedCategory === 'All' || p.main_category === selectedCategory);
          const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
          
          if (totalPages <= 1) return null;

          return (
            <div className="flex flex-col md:flex-row justify-between items-center mt-8 gap-4">
              <p className="text-gray-500 text-sm">
                Showing <span className="font-bold text-text-h">{(currentPage - 1) * ITEMS_PER_PAGE + 1}</span> to <span className="font-bold text-text-h">{Math.min(currentPage * ITEMS_PER_PAGE, filtered.length)}</span> of <span className="font-bold text-text-h">{filtered.length}</span> products
              </p>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 rounded-xl border border-gray-200 text-sm font-medium disabled:opacity-30 hover:border-gold hover:text-gold transition-all"
                >
                  Previous
                </button>
                <div className="flex gap-1">
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`w-10 h-10 rounded-xl text-sm font-bold transition-all ${currentPage === i + 1 ? 'bg-gold text-white shadow-lg shadow-gold/20' : 'text-gray-400 hover:bg-gray-100'}`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
                <button 
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 rounded-xl border border-gray-200 text-sm font-medium disabled:opacity-30 hover:border-gold hover:text-gold transition-all"
                >
                  Next
                </button>
              </div>
            </div>
          );
        })()}
      </main>

      {/* Add/Edit Modal */}
      {isAdding && (
        <div className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white w-full max-w-3xl rounded-3xl p-8 shadow-2xl"
          >
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-serif">{editingId ? 'Edit Product' : 'Add New Product'}</h2>
              <button onClick={closeModal} className="text-gray-400 hover:text-text-h"><X size={24} /></button>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              {/* Column 1 */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Main Category</label>
                  <select 
                    value={newProduct.main_category}
                    onChange={e => {
                      const cat = e.target.value;
                      const sub = CLOTHING_CATEGORIES[cat as keyof typeof CLOTHING_CATEGORIES]?.subcategories[0] || '';
                      const fab = CLOTHING_CATEGORIES[cat as keyof typeof CLOTHING_CATEGORIES]?.fabrics[0] || '';
                      setNewProduct({...newProduct, main_category: cat, subcategory: sub, fabric: fab});
                    }}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-gold outline-none transition-colors appearance-none"
                  >
                    {MAIN_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                  <input 
                    type="text" 
                    value={newProduct.name}
                    onChange={e => setNewProduct({...newProduct, name: e.target.value})}
                    placeholder="e.g. Silk Radiance Saree"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-gold outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Fabric</label>
                  <select 
                    value={newProduct.fabric}
                    onChange={e => setNewProduct({...newProduct, fabric: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-gold outline-none transition-colors appearance-none"
                  >
                    <option value="">None</option>
                    {CLOTHING_CATEGORIES[newProduct.main_category as keyof typeof CLOTHING_CATEGORIES]?.fabrics.map(f => <option key={f} value={f}>{f}</option>)}
                  </select>
                </div>

                {newProduct.main_category === 'Salwar Suits' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Suit Type</label>
                    <div className="flex gap-6">
                      {['Stitched', 'Unstitched'].map(type => (
                        <label key={type} className="flex items-center space-x-2 cursor-pointer group">
                          <input 
                            type="radio" 
                            name="suit-type"
                            value={type}
                            checked={newProduct.subcategory === type}
                            onChange={() => setNewProduct({ ...newProduct, subcategory: type })}
                            className="w-4 h-4 text-gold border-gray-300 focus:ring-gold transition-colors"
                          />
                          <span className={`text-sm transition-colors ${newProduct.subcategory === type ? 'text-chocolate font-bold' : 'text-gray-500 group-hover:text-gold'}`}>
                            {type}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Price Type</label>
                    <select 
                      value={newProduct.price_type}
                      onChange={e => setNewProduct({...newProduct, price_type: e.target.value as 'Fixed' | 'On Request'})}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-gold outline-none transition-colors appearance-none"
                    >
                      <option value="Fixed">Fixed Price</option>
                      <option value="On Request">Price on Request</option>
                    </select>
                  </div>
                  {newProduct.price_type === 'Fixed' && (
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹)</label>
                      <input 
                        type="text" 
                        value={newProduct.price}
                        onChange={e => setNewProduct({...newProduct, price: e.target.value})}
                        placeholder="e.g. 5900"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-gold outline-none transition-colors"
                      />
                    </div>
                  )}
                </div>

                {CLOTHING_CATEGORIES[newProduct.main_category as keyof typeof CLOTHING_CATEGORIES]?.hasAgeGroup && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Age Group (Years)</label>
                    <input 
                      type="text" 
                      value={newProduct.age_group}
                      onChange={e => setNewProduct({...newProduct, age_group: e.target.value})}
                      placeholder="e.g. 1-2 or 4-5"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-gold outline-none transition-colors"
                    />
                  </div>
                )}
              </div>

              {/* Column 2 */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Colour Options (Comma separated)</label>
                  <input 
                    type="text" 
                    value={rawColors}
                    onChange={e => {
                      setRawColors(e.target.value);
                      setNewProduct({...newProduct, colors: e.target.value.split(',').map(c => c.trim()).filter(c => c !== '')});
                    }}
                    placeholder="Red, Blue, Green"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-gold outline-none transition-all"
                  />
                </div>

                {CLOTHING_CATEGORIES[newProduct.main_category as keyof typeof CLOTHING_CATEGORIES]?.hasSizes && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {newProduct.main_category === 'Footwear' ? 'Select Sizes' : 'Available Sizes (Comma separated)'}
                    </label>
                    
                    {newProduct.main_category === 'Footwear' ? (
                      <div className="flex flex-wrap gap-2">
                        {['35', '36', '37', '38', '39', '40', '41', '42'].map(size => {
                          const isSelected = newProduct.sizes?.includes(size);
                          return (
                            <button
                              key={size}
                              type="button"
                              onClick={() => {
                                const currentSizes = newProduct.sizes || [];
                                const updatedSizes = isSelected 
                                  ? currentSizes.filter(s => s !== size)
                                  : [...currentSizes, size].sort();
                                setNewProduct({ ...newProduct, sizes: updatedSizes });
                                setRawSizes(updatedSizes.join(', '));
                              }}
                              className={`w-10 h-10 rounded-lg border text-sm font-medium transition-all ${isSelected ? 'bg-gold text-white border-gold shadow-lg shadow-gold/20 scale-105' : 'border-gray-200 text-gray-400 hover:border-gold hover:text-gold'}`}
                            >
                              {size}
                            </button>
                          );
                        })}
                      </div>
                    ) : (
                      <input 
                        type="text" 
                        value={rawSizes}
                        onChange={e => {
                          setRawSizes(e.target.value);
                          setNewProduct({...newProduct, sizes: e.target.value.split(',').map(s => s.trim()).filter(s => s !== '')});
                        }}
                        placeholder="S, M, L, XL"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-gold outline-none transition-all"
                      />
                    )}
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Product Image</label>
                  <div className="relative group">
                    <div 
                      onClick={() => !newProduct.image && document.getElementById('image-upload')?.click()}
                      className={`w-full aspect-video rounded-xl border-2 border-dashed transition-all flex flex-col items-center justify-center overflow-hidden ${newProduct.image ? 'border-gold bg-gold/5' : 'border-gray-200 hover:border-gold hover:bg-gold/5 cursor-pointer'}`}
                    >
                      {newProduct.image ? (
                        <div className="relative w-full h-full">
                          <img src={newProduct.image} alt="Preview" className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                            <button 
                              onClick={(e) => { e.stopPropagation(); document.getElementById('image-upload')?.click(); }}
                              className="p-2 bg-white rounded-full text-chocolate hover:bg-gold hover:text-white transition-all shadow-lg"
                            >
                              <Upload size={20} />
                            </button>
                            <button 
                              onClick={(e) => { e.stopPropagation(); setNewProduct({ ...newProduct, image: '' }); }}
                              className="p-2 bg-white rounded-full text-red-500 hover:bg-red-500 hover:text-white transition-all shadow-lg"
                            >
                              <Trash2 size={20} />
                            </button>
                          </div>
                        </div>
                      ) : (
                        <>
                          <Upload className="text-gray-300 group-hover:text-gold transition-colors mb-2" size={32} />
                          <p className="text-xs text-gray-400 group-hover:text-gold transition-colors">Click to upload from device</p>
                        </>
                      )}
                    </div>
                    <input 
                      id="image-upload"
                      type="file" 
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea 
                    value={newProduct.description}
                    onChange={e => setNewProduct({...newProduct, description: e.target.value})}
                    rows={3}
                    placeholder="Short description..."
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-gold outline-none transition-all resize-none"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-4">
              <button onClick={closeModal} className="px-6 py-3 rounded-xl text-gray-500 font-medium hover:bg-gray-100 transition-colors">Cancel</button>
              <button 
                onClick={handleSaveProduct} 
                className="btn-premium px-8 flex items-center space-x-2"
              >
                <Save size={18} />
                <span>{editingId ? 'Update Product' : 'Save Product'}</span>
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}
