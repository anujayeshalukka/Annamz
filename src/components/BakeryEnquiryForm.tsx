import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronRight, ChevronLeft, Upload, Check, ShoppingCart, MessageCircle, Phone } from 'lucide-react'
import { CONTACT_INFO, getWhatsAppLink } from '../config/contact'
import { supabase } from '../lib/supabase'

interface Selection {
  quantity: number;
  eggless?: boolean;
  weight?: string;
  message?: string;
  referenceImage?: File | null;
}

const CATEGORIES = [
  { id: 'dry-cakes', name: 'Dry Cakes', items: ['Rich Chocolate Cake', 'Sponge Cake', 'Coffee Cake', 'Iced Lemon Cake', 'Carrot Dates Cake', 'Laizy Daizy Cake', 'Pineapple Cake'] },
  { id: 'cream-cakes', name: 'Cream Cakes', items: ['Chocolate Dry Fruit Cake', 'Red Velvet Cake', 'Football Theme Cake', 'Number Cake', 'White Designer Cake', 'Kuromi Cake', 'PUBG Cake', 'Candle Cake', 'Fluffy Pillow Cake', 'Mermaid Theme Cake', 'Dalgona Coffee Cake', 'Praline Cake'] },
  { id: 'dessert-cakes', name: 'Dessert Cakes', items: ['Tiramisu', 'Cheesecake', 'Biscoff Cake', 'Caramel Pudding'] },
  { id: 'brownies-snacks', name: 'Brownies & Snacks', items: ['Fudge Brownie', 'Double Chocolate Fudge Brownie', 'Blondie', 'Donuts', 'Pizza'] },
  { id: 'fruit-concentrates', name: 'Fruit Concentrates', items: ['Ginger Lime', 'Beetroot', 'Carrot'] },
  { id: 'pickles', name: 'Pickles', items: ['Meat Pickle', 'Fish Pickle', 'Lemon Dates Pickle'] },
  { id: 'masala-powders', name: 'Masala Powders', items: ['Garam Masala', 'Biriyani Masala', 'Sambar Masala'] },
]

interface BakeryEnquiryFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BakeryEnquiryForm({ isOpen, onClose }: BakeryEnquiryFormProps) {
  const [step, setStep] = useState(1)
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selections, setSelections] = useState<Record<string, Selection>>({})
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
    whatsappSame: true,
    whatsapp: '',
    email: '',
    deliveryType: 'Pickup',
    address: '',
    contactMethod: 'WhatsApp',
    notes: ''
  })
  const [submitted, setSubmitted] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)


  const toggleCategory = (catId: string) => {
    setSelectedCategories(prev => 
      prev.includes(catId) ? prev.filter(id => id !== catId) : [...prev, catId]
    )
  }

  const toggleProduct = (productName: string) => {
    setSelections(prev => {
      const newSelections = { ...prev }
      if (newSelections[productName]) {
        delete newSelections[productName]
      } else {
        newSelections[productName] = { 
          quantity: 1,
          weight: '1kg',
          eggless: false
        }
      }
      return newSelections
    })
  }

  const updateSelection = (productName: string, updates: Partial<Selection>) => {
    setSelections(prev => ({
      ...prev,
      [productName]: { ...prev[productName], ...updates }
    }))
  }

  const isCake = (productName: string) => {
    const cakeCategories = ['Dry Cakes', 'Cream Cakes', 'Dessert Cakes']
    const category = CATEGORIES.find(c => c.items.includes(productName))?.name
    return category ? cakeCategories.includes(category) : false
  }

  const handleNext = () => {
    if (step === 1 && selectedCategories.length === 0) return
    if (step === 2 && Object.keys(selections).length === 0) return
    setStep(prev => prev + 1)
  }

  const handleBack = () => setStep(prev => prev - 1)

  const resetForm = () => {
    setStep(1)
    setSelectedCategories([])
    setSelections({})
    setCustomerInfo({
      name: '',
      phone: '',
      whatsappSame: true,
      whatsapp: '',
      email: '',
      deliveryType: 'Pickup',
      address: '',
      contactMethod: 'WhatsApp',
      notes: ''
    })
    setSubmitted(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Generate WhatsApp Message
    let message = `Hello Annamz,\n\nI would like to enquire about the following:\n\n`
    
    Object.entries(selections).forEach(([name, data]) => {
      message += `• *${name}* (Qty: ${data.quantity})\n`
      if (isCake(name)) {
        message += `  Weight: ${data.weight}\n`
        message += `  Type: ${data.eggless ? 'Eggless' : 'With Egg'}\n`
        if (data.message) message += `  Message: ${data.message}\n`
      }
      message += `\n`
    })

    message += `*Customer Details:*\n`
    message += `Name: ${customerInfo.name}\n`
    message += `Phone: ${customerInfo.phone}\n`
    message += `Delivery: ${customerInfo.deliveryType}\n`
    if (customerInfo.deliveryType === 'Home Delivery') message += `Address: ${customerInfo.address}\n`
    message += `Preferred Contact: ${customerInfo.contactMethod}\n`
    if (customerInfo.notes) message += `Notes: ${customerInfo.notes}\n`

    // Save to Supabase
    try {
      const { error } = await supabase.from('bakery_enquiries').insert([{
        customer_name: customerInfo.name,
        customer_phone: customerInfo.phone,
        whatsapp_number: customerInfo.whatsappSame ? customerInfo.phone : customerInfo.whatsapp,
        delivery_type: customerInfo.deliveryType,
        address: customerInfo.address,
        contact_method: customerInfo.contactMethod,
        notes: customerInfo.notes,
        items: selections
      }])
      
      if (error) {
        console.error('Error saving enquiry to Supabase:', error)
      }
    } catch (err) {
      console.error('Failed to save to Supabase:', err)
    }

    const whatsappUrl = getWhatsAppLink(message)
    
    window.open(whatsappUrl, '_blank')
    setSubmitted(true)
  }

  const handleClose = () => {
    if (submitted) resetForm()
    onClose()
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
          className="absolute inset-0 bg-chocolate/40 backdrop-blur-sm"
        />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative bg-ivory w-full max-w-2xl max-h-[90vh] overflow-hidden rounded-3xl shadow-2xl flex flex-col"
        >
          {/* Header */}
          <div className="p-6 border-b border-gold/10 flex justify-between items-center bg-white/50">
            <div>
              <h2 className="text-2xl font-serif text-chocolate">Bakery Enquiry</h2>
              <p className="text-sm text-chocolate/60">Step {step} of 3</p>
            </div>
            <button onClick={handleClose} className="p-2 hover:bg-gold/10 rounded-full transition-colors">
              <X size={24} className="text-chocolate" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            {!submitted ? (
              <>
                {/* Step 1: Category Selection */}
                {step === 1 && (
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                    <h3 className="text-lg font-medium text-chocolate mb-4">What are you looking for today?</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {CATEGORIES.map(cat => (
                        <button
                          key={cat.id}
                          onClick={() => toggleCategory(cat.id)}
                          className={`p-4 rounded-2xl border-2 transition-all text-left flex items-center justify-between group bg-white hover:bg-white ${
                            selectedCategories.includes(cat.id) 
                              ? 'border-gold shadow-sm' 
                              : 'border-chocolate/10'
                          }`}
                        >
                          <span className={`font-medium ${selectedCategories.includes(cat.id) ? 'text-gold' : 'text-chocolate'}`}>
                            {cat.name}
                          </span>
                          <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                            selectedCategories.includes(cat.id) ? 'bg-gold border-gold' : 'border-chocolate/10'
                          }`}>
                            {selectedCategories.includes(cat.id) && <Check size={14} className="text-white" />}
                          </div>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Product Selection */}
                {step === 2 && (
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
                    {selectedCategories.map(catId => {
                      const category = CATEGORIES.find(c => c.id === catId)
                      if (!category) return null
                      return (
                        <div key={catId} className="space-y-4">
                          <h4 className="font-serif text-2xl text-chocolate border-l-4 border-gold pl-4 py-1 mb-6 bg-gold/5 rounded-r-lg">{category.name}</h4>
                          <div className="grid grid-cols-1 gap-3">
                            {category.items.map(product => (
                              <div key={product} className="space-y-4">
                                <button
                                  onClick={() => toggleProduct(product)}
                                  className={`w-full p-4 rounded-xl border transition-all flex items-center justify-between bg-white hover:bg-white ${
                                    selections[product] 
                                      ? 'border-gold' 
                                      : 'border-chocolate/10'
                                  }`}
                                >
                                  <div className="flex items-center space-x-3">
                                    <div className={`w-5 h-5 rounded border flex items-center justify-center ${
                                      selections[product] ? 'bg-gold border-gold' : 'border-chocolate/20'
                                    }`}>
                                      {selections[product] && <Check size={12} className="text-white" />}
                                    </div>
                                    <span className={selections[product] ? 'font-medium' : ''}>{product}</span>
                                  </div>
                                  {selections[product] && (
                                    <div className="flex items-center space-x-3" onClick={e => e.stopPropagation()}>
                                      <span className="text-xs text-chocolate/50">Qty:</span>
                                      <input 
                                        type="number" 
                                        min="1"
                                        value={selections[product].quantity}
                                        onChange={e => updateSelection(product, { quantity: parseInt(e.target.value) || 1 })}
                                        className="w-12 bg-white border border-gold/20 rounded px-1 py-0.5 text-center text-sm"
                                      />
                                    </div>
                                  )}
                                </button>

                                {/* Cake Customization Fields */}
                                {selections[product] && isCake(product) && (
                                  <motion.div 
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    className="ml-6 p-4 bg-chocolate/5 rounded-2xl space-y-4 text-sm"
                                  >
                                    <div className="grid grid-cols-2 gap-4">
                                      <div>
                                        <label className="block text-xs font-semibold uppercase tracking-wider mb-1 text-chocolate/60">Cake Type</label>
                                        <div className="flex bg-white rounded-lg p-1 border border-chocolate/10">
                                          <button 
                                            onClick={() => updateSelection(product, { eggless: false })}
                                            className={`flex-1 py-1 rounded-md transition-colors ${!selections[product].eggless ? 'bg-chocolate text-white' : 'text-chocolate/60 bg-white'}`}
                                          >With Egg</button>
                                          <button 
                                            onClick={() => updateSelection(product, { eggless: true })}
                                            className={`flex-1 py-1 rounded-md transition-colors ${selections[product].eggless ? 'bg-green-600 text-white' : 'text-chocolate/60 bg-white'}`}
                                          >Eggless</button>
                                        </div>
                                      </div>
                                      <div>
                                        <label className="block text-xs font-semibold uppercase tracking-wider mb-1 text-chocolate/60">Weight</label>
                                        <select 
                                          value={selections[product].weight}
                                          onChange={e => updateSelection(product, { weight: e.target.value })}
                                          className="w-full p-2 bg-white rounded-lg border border-chocolate/10 outline-none focus:border-gold"
                                        >
                                          <option>0.5kg</option>
                                          <option>1kg</option>
                                          <option>2kg</option>
                                          <option>Custom</option>
                                        </select>
                                      </div>
                                    </div>
                                    <div>
                                      <label className="block text-xs font-semibold uppercase tracking-wider mb-1 text-chocolate/60">Message on Cake</label>
                                      <input 
                                        type="text" 
                                        placeholder="e.g. Happy Birthday Anu"
                                        value={selections[product].message || ''}
                                        onChange={e => updateSelection(product, { message: e.target.value })}
                                        className="w-full p-2 bg-white rounded-lg border border-chocolate/10 outline-none focus:border-gold"
                                      />
                                    </div>
                                    <div>
                                      <label className="block text-xs font-semibold uppercase tracking-wider mb-1 text-chocolate/60">Reference Image (Optional)</label>
                                      <div 
                                        onClick={() => fileInputRef.current?.click()}
                                        className="w-full p-3 bg-white border-2 border-dashed border-chocolate/10 rounded-lg flex items-center justify-center space-x-2 cursor-pointer hover:border-gold/30 transition-colors"
                                      >
                                        <Upload size={16} className="text-chocolate/40" />
                                        <span className="text-chocolate/60 truncate max-w-[200px]">
                                          {selections[product].referenceImage ? selections[product].referenceImage.name : 'Upload reference photo'}
                                        </span>
                                        <input 
                                          type="file" 
                                          ref={fileInputRef}
                                          className="hidden"
                                          accept="image/*"
                                          onChange={e => updateSelection(product, { referenceImage: e.target.files?.[0] || null })}
                                        />
                                      </div>
                                    </div>
                                  </motion.div>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      )
                    })}
                  </motion.div>
                )}

                {/* Step 3: General Fields */}
                {step === 3 && (
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-chocolate mb-1">Customer Name *</label>
                          <input 
                            type="text" 
                            required
                            value={customerInfo.name}
                            onChange={e => setCustomerInfo({...customerInfo, name: e.target.value})}
                            className="w-full p-3 bg-white rounded-xl border border-chocolate/10 outline-none focus:border-gold shadow-sm"
                            placeholder="Your Name"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-chocolate mb-1">Phone Number *</label>
                          <input 
                            type="tel" 
                            required
                            value={customerInfo.phone}
                            onChange={e => setCustomerInfo({...customerInfo, phone: e.target.value})}
                            className="w-full p-3 bg-white rounded-xl border border-chocolate/10 outline-none focus:border-gold shadow-sm"
                            placeholder="e.g. 98765 43210"
                          />
                        </div>
                        <div className="flex items-center space-x-3">
                          <button 
                            type="button"
                            onClick={() => setCustomerInfo({...customerInfo, whatsappSame: !customerInfo.whatsappSame})}
                            className={`w-10 h-6 rounded-full transition-colors relative flex items-center ${customerInfo.whatsappSame ? 'bg-gold' : 'bg-chocolate/20'}`}
                          >
                            <div className={`w-4 h-4 bg-white rounded-full absolute transition-transform ${customerInfo.whatsappSame ? 'translate-x-5' : 'translate-x-1'}`} />
                          </button>
                          <span className="text-sm text-chocolate/70">WhatsApp same as phone</span>
                        </div>
                        {!customerInfo.whatsappSame && (
                          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
                            <label className="block text-sm font-medium text-chocolate mb-1">WhatsApp Number</label>
                            <input 
                              type="tel" 
                              value={customerInfo.whatsapp}
                              onChange={e => setCustomerInfo({...customerInfo, whatsapp: e.target.value})}
                              className="w-full p-3 bg-white rounded-xl border border-chocolate/10 outline-none focus:border-gold shadow-sm"
                              placeholder="WhatsApp number"
                            />
                          </motion.div>
                        )}
                      </div>

                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-chocolate mb-1">Delivery Type</label>
                          <div className="flex bg-white rounded-xl p-1 border border-chocolate/10 shadow-sm">
                            {['Pickup', 'Home Delivery'].map(t => (
                              <button
                                key={t}
                                type="button"
                                onClick={() => setCustomerInfo({...customerInfo, deliveryType: t})}
                                className={`flex-1 py-2 rounded-lg transition-all ${customerInfo.deliveryType === t ? 'bg-chocolate text-white shadow-md' : 'text-chocolate/60 bg-white'}`}
                              >
                                {t}
                              </button>
                            ))}
                          </div>
                        </div>
                        {customerInfo.deliveryType === 'Home Delivery' && (
                          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
                            <label className="block text-sm font-medium text-chocolate mb-1">Delivery Address</label>
                            <textarea 
                              value={customerInfo.address}
                              onChange={e => setCustomerInfo({...customerInfo, address: e.target.value})}
                              className="w-full p-3 bg-white rounded-xl border border-chocolate/10 outline-none focus:border-gold shadow-sm resize-none"
                              rows={3}
                              placeholder="House No, Street, Landmark..."
                            />
                          </motion.div>
                        )}
                        <div>
                          <label className="block text-sm font-medium text-chocolate mb-1">Preferred Contact Method</label>
                          <div className="grid grid-cols-2 gap-3">
                            {['WhatsApp', 'Call'].map(m => (
                              <button
                                key={m}
                                type="button"
                                onClick={() => setCustomerInfo({...customerInfo, contactMethod: m})}
                                className={`p-2 rounded-xl border flex items-center justify-center space-x-2 ${customerInfo.contactMethod === m ? 'border-gold bg-gold/5 text-gold' : 'border-chocolate/10 text-chocolate/60'}`}
                              >
                                {m === 'WhatsApp' ? <MessageCircle size={16} /> : <Phone size={16} />}
                                <span>{m}</span>
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-chocolate mb-1">Additional Notes / Custom Request</label>
                      <textarea 
                        value={customerInfo.notes}
                        onChange={e => setCustomerInfo({...customerInfo, notes: e.target.value})}
                        className="w-full p-3 bg-white rounded-xl border border-chocolate/10 outline-none focus:border-gold shadow-sm resize-none"
                        rows={2}
                        placeholder="Any dietary requirements or special instructions..."
                      />
                    </div>
                  </motion.div>
                )}
              </>
            ) : (
              /* Success Message */
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }} 
                animate={{ opacity: 1, scale: 1 }} 
                className="text-center py-12 px-6"
              >
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Check size={40} className="text-green-600" />
                </div>
                <h3 className="text-3xl font-serif text-chocolate mb-4">Enquiry Sent!</h3>
                <p className="text-chocolate/60 text-lg mb-8">
                  Thank you! We've received your enquiry and will contact you shortly to confirm your order.
                </p>
                <button 
                  onClick={handleClose}
                  className="btn-premium px-12"
                >
                  Close
                </button>
              </motion.div>
            )}
          </div>

          {/* Footer Navigation */}
          {!submitted && (
            <div className="p-6 border-t border-gold/10 bg-white/50 flex justify-between items-center">
              {step > 1 ? (
                <button 
                  onClick={handleBack}
                  className="flex items-center space-x-2 text-chocolate/60 hover:text-chocolate transition-colors px-4 py-2"
                >
                  <ChevronLeft size={20} />
                  <span>Back</span>
                </button>
              ) : (
                <div />
              )}

              <div className="flex space-x-4">
                {step < 3 ? (
                  <button 
                    onClick={handleNext}
                    disabled={(step === 1 && selectedCategories.length === 0) || (step === 2 && Object.keys(selections).length === 0)}
                    className="btn-premium flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed px-8"
                  >
                    <span>Continue</span>
                    <ChevronRight size={18} />
                  </button>
                ) : (
                  <button 
                    onClick={handleSubmit}
                    disabled={!customerInfo.name || !customerInfo.phone}
                    className="btn-premium flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed px-12"
                  >
                    <ShoppingCart size={18} />
                    <span>Send Enquiry</span>
                  </button>
                )}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
