import { useState } from 'react'
import { Plus, Trash2, Edit2, Save, X, Image as ImageIcon, LayoutGrid, List, Upload } from 'lucide-react'
import { motion } from 'framer-motion'
import logo from '../assets/images/logo.png'
import AdminLogin from './AdminLogin'
import { supabase } from '../lib/supabase'
import { useEffect } from 'react'

export interface Product {
  id: string | number;
  name: string;
  price: string;
  category: string;
  description: string;
  image: string;
  status: string;
  created_at?: string;
}

const CATEGORIES = ['Sarees', 'Gowns', 'Bridal', 'Casual', 'Accessories'];

export default function AdminPanel() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('admin_auth') === 'true';
  });

  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    name: '',
    price: '',
    category: 'Sarees',
    description: '',
    image: '',
    status: 'Available'
  });

  useEffect(() => {
    if (isAuthenticated) {
      fetchProducts();
    }
  }, [isAuthenticated]);

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddProduct = async () => {
    if (!newProduct.name || !newProduct.price) {
      alert('Please fill in both the Product Name and Price.');
      return;
    }
    
    try {
      setIsLoading(true);
      
      // 1. Upload image if it's a data URL (newly uploaded)
      let finalImageUrl = newProduct.image || '';
      
      if (finalImageUrl.startsWith('data:')) {
        const file = await (await fetch(finalImageUrl)).blob();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.png`;
        
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('product-images')
          .upload(fileName, file);
          
        if (uploadError) throw uploadError;
        
        const { data: urlData } = supabase.storage
          .from('product-images')
          .getPublicUrl(uploadData.path);
          
        finalImageUrl = urlData.publicUrl;
      }

      // 2. Insert into database
      const { error } = await supabase
        .from('products')
        .insert([{
          name: newProduct.name,
          price: newProduct.price,
          category: newProduct.category,
          description: newProduct.description,
          image: finalImageUrl,
          status: newProduct.status || 'Available'
        }]);

      if (error) throw error;
      
      await fetchProducts();
      setIsAdding(false);
      setNewProduct({ name: '', price: '', category: 'Sarees', description: '', image: '', status: 'Available' });
      alert('Product added successfully!');
    } catch (error: any) {
      console.error('Error adding product:', error);
      alert('Error adding product: ' + error.message);
    } finally {
      setIsLoading(false);
    }
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
      <aside className="w-64 bg-text-h text-white p-8 hidden lg:block">
        <img src={logo} alt="Annamz" className="h-12 brightness-0 invert mb-12" />
        <nav className="space-y-4">
          <a href="#" className="flex items-center space-x-3 text-gold bg-white/10 p-3 rounded-lg">
            <LayoutGrid size={20} />
            <span>Products</span>
          </a>
          <a href="/clothing" className="flex items-center space-x-3 text-gray-400 hover:text-white p-3 rounded-lg transition-colors">
            <List size={20} />
            <span>Store View</span>
          </a>
          <button 
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 text-gray-400 hover:text-red-400 p-3 rounded-lg transition-colors mt-auto"
          >
            <X size={20} />
            <span>Logout</span>
          </button>
        </nav>
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
            <p className="text-3xl font-serif text-text-h">{new Set(products.map(p => p.category)).size}</p>
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
                <th className="px-6 py-4 text-xs uppercase tracking-widest text-gray-400 font-semibold">Price</th>
                <th className="px-6 py-4 text-xs uppercase tracking-widest text-gray-400 font-semibold">Status</th>
                <th className="px-6 py-4 text-xs uppercase tracking-widest text-gray-400 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {products.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-400 italic">No products added yet. Click 'Add Product' to start.</td>
                </tr>
              ) : (
                products.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100">
                          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                        </div>
                        <span className="font-medium text-text-h">{product.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-gray-100 rounded-full text-xs text-gray-600">{product.category}</span>
                    </td>
                    <td className="px-6 py-4 font-serif">{product.price}</td>
                    <td className="px-6 py-4">
                      <span className="text-green-600 flex items-center space-x-2 text-sm">
                        <div className="w-2 h-2 rounded-full bg-green-500" />
                        <span>{product.status}</span>
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <button className="p-2 text-gray-400 hover:text-gold transition-colors"><Edit2 size={18} /></button>
                      <button onClick={() => handleDelete(product.id)} className="p-2 text-gray-400 hover:text-red-500 transition-colors"><Trash2 size={18} /></button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </main>

      {/* Add Modal */}
      {isAdding && (
        <div className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white w-full max-w-2xl rounded-3xl p-8 shadow-2xl"
          >
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-serif">Add New Product</h2>
              <button onClick={() => setIsAdding(false)} className="text-gray-400 hover:text-text-h"><X size={24} /></button>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="space-y-4">
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price / Rate</label>
                  <input 
                    type="text" 
                    value={newProduct.price}
                    onChange={e => setNewProduct({...newProduct, price: e.target.value})}
                    placeholder="₹12,500"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-gold outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select 
                    value={newProduct.category}
                    onChange={e => setNewProduct({...newProduct, category: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-gold outline-none transition-colors appearance-none"
                  >
                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>
              <div className="space-y-4">
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
                              onClick={(e) => {
                                e.stopPropagation();
                                document.getElementById('image-upload')?.click();
                              }}
                              className="p-2 bg-white rounded-full text-chocolate hover:bg-gold hover:text-white transition-all shadow-lg"
                              title="Change Image"
                            >
                              <Upload size={20} />
                            </button>
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                setNewProduct({ ...newProduct, image: '' });
                              }}
                              className="p-2 bg-white rounded-full text-red-500 hover:bg-red-500 hover:text-white transition-all shadow-lg"
                              title="Clear Image"
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
                    rows={4}
                    placeholder="Short description..."
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-gold outline-none transition-colors resize-none"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-4">
              <button onClick={() => setIsAdding(false)} className="px-6 py-3 rounded-xl text-gray-500 font-medium hover:bg-gray-100 transition-colors">Cancel</button>
              <button 
                onClick={() => {
                  console.log('Save button clicked');
                  handleAddProduct();
                }} 
                className="btn-premium px-8 flex items-center space-x-2"
              >
                <Save size={18} />
                <span>Save Product</span>
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}
