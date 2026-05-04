import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, CheckCircle2, Send } from 'lucide-react'
import { getWhatsAppLink } from '../../config/contact'
import type { EnquiryItem } from '../../types/clothing'

export function EnquiryForm({
  isOpen,
  onClose,
  items,
  onSubmit
}: {
  isOpen: boolean;
  onClose: () => void;
  items: EnquiryItem[];
  onSubmit: (details: any) => void;
}) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    whatsapp: '',
    email: '',
    deliveryOption: 'Pickup',
    address: '',
    notes: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Format WhatsApp Message
    const itemsText = items.map((item, idx) => {
      const shortId = item.id.toString().split('-')[0].toUpperCase();
      const idText = `ID: #${shortId}\n`;
      const sizeText = item.sizes && item.sizes.length > 0 ? `Size: ${item.sizes[0]}\n` : '';
      const subText = item.subcategory ? `Type/Style: ${item.subcategory}\n` : '';
      const fabricText = item.fabric ? `Fabric: ${item.fabric}\n` : '';
      const ageText = item.age_group ? `Age Group: ${item.age_group}\n` : '';

      return `${idx + 1}. ${item.name}
Category: ${item.main_category}
${idText}${sizeText}${subText}${fabricText}${ageText}Quantity: ${item.quantity}`;
    }).join('\n\n');

    const message = `Hello Annamz Clothing,

I would like to enquire about the following products:

${itemsText}

Customer Name: ${formData.name}
Phone: ${formData.phone}
WhatsApp: ${formData.whatsapp}
Delivery Option: ${formData.deliveryOption}
${formData.deliveryOption === 'Home Delivery' ? `Address: ${formData.address}` : ''}
${formData.notes ? `Additional Notes: ${formData.notes}` : ''}

Please share the details. Thank you.`;

    // Simulate database save or just redirect to WhatsApp
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => {
        window.open(getWhatsAppLink(message), '_blank');
        onSubmit(formData);
        onClose();
        setIsSuccess(false);
      }, 1500);
    }, 1000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-md"
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="bg-white w-full max-w-2xl rounded-[2.5rem] overflow-hidden shadow-2xl relative z-[121]"
          >
            {isSuccess ? (
              <div className="p-16 text-center flex flex-col items-center justify-center">
                <div className="w-24 h-24 bg-green-50 text-green-500 rounded-full flex items-center justify-center mb-8">
                  <CheckCircle2 size={48} />
                </div>
                <h2 className="text-4xl font-serif text-chocolate mb-4">Request Sent!</h2>
                <p className="text-gray-500 italic">Opening WhatsApp to connect with our stylist...</p>
              </div>
            ) : (
              <div className="flex flex-col h-[90vh] md:h-auto max-h-[90vh]">
                <div className="p-8 md:p-12 border-b border-gray-100 flex justify-between items-center">
                  <div>
                    <h2 className="text-4xl font-serif text-chocolate leading-none">Submit Enquiry</h2>
                    <p className="text-xs text-gray-400 uppercase tracking-widest mt-3">Finalize your selection</p>
                  </div>
                  <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <X size={28} />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-8 md:p-12 thin-scrollbar space-y-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-gray-400 ml-1">Full Name</label>
                      <input 
                        required
                        type="text" 
                        value={formData.name}
                        onChange={e => setFormData({...formData, name: e.target.value})}
                        className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-none focus:ring-2 ring-gold/20 outline-none transition-all font-medium"
                        placeholder="Your name"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-gray-400 ml-1">Phone Number</label>
                      <input 
                        required
                        type="tel" 
                        value={formData.phone}
                        onChange={e => setFormData({...formData, phone: e.target.value})}
                        className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-none focus:ring-2 ring-gold/20 outline-none transition-all font-medium"
                        placeholder="+91"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-gray-400 ml-1">WhatsApp Number</label>
                      <input 
                        required
                        type="tel" 
                        value={formData.whatsapp}
                        onChange={e => setFormData({...formData, whatsapp: e.target.value})}
                        className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-none focus:ring-2 ring-gold/20 outline-none transition-all font-medium"
                        placeholder="Same as phone?"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-gray-400 ml-1">Email (Optional)</label>
                      <input 
                        type="email" 
                        value={formData.email}
                        onChange={e => setFormData({...formData, email: e.target.value})}
                        className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-none focus:ring-2 ring-gold/20 outline-none transition-all font-medium"
                        placeholder="email@example.com"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <label className="text-[10px] uppercase tracking-widest text-gray-400 ml-1">Delivery Preference</label>
                    <div className="flex gap-4">
                      {['Pickup', 'Home Delivery'].map(opt => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => setFormData({...formData, deliveryOption: opt})}
                          className={`flex-1 py-4 rounded-2xl font-medium transition-all border ${
                            formData.deliveryOption === opt ? 'bg-chocolate text-white border-chocolate shadow-lg' : 'bg-gray-50 text-gray-400 border-transparent hover:bg-gray-100'
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>

                  {formData.deliveryOption === 'Home Delivery' && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-gray-400 ml-1">Delivery Address</label>
                      <textarea 
                        required
                        rows={3}
                        value={formData.address}
                        onChange={e => setFormData({...formData, address: e.target.value})}
                        className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-none focus:ring-2 ring-gold/20 outline-none transition-all font-medium resize-none"
                        placeholder="Full delivery address..."
                      />
                    </motion.div>
                  )}

                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-gray-400 ml-1">Additional Notes</label>
                    <textarea 
                      rows={2}
                      value={formData.notes}
                      onChange={e => setFormData({...formData, notes: e.target.value})}
                      className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-none focus:ring-2 ring-gold/20 outline-none transition-all font-medium resize-none"
                      placeholder="Special requests, size details, etc."
                    />
                  </div>

                  <div className="pt-4">
                    <button 
                      disabled={isSubmitting}
                      className="w-full bg-chocolate text-white py-5 rounded-[1.5rem] font-bold text-lg flex items-center justify-center gap-3 shadow-2xl hover:bg-gold transition-all disabled:opacity-50"
                    >
                      {isSubmitting ? 'Processing...' : 'Send Enquiry via WhatsApp'}
                      <Send size={20} />
                    </button>
                    <p className="text-center text-[10px] text-gray-400 mt-4 uppercase tracking-widest">
                      Our stylist will get back to you shortly with availability and pricing.
                    </p>
                  </div>
                </form>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
