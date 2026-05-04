import { motion, AnimatePresence } from 'framer-motion'
import { X, ShoppingBag, Trash2, Minus, Plus, Send } from 'lucide-react'
import type { EnquiryItem } from '../../types/clothing'

export function EnquiryDrawer({ 
  isOpen, 
  onClose, 
  items, 
  onRemove, 
  onUpdateQty,
  onProceed
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  items: EnquiryItem[]; 
  onRemove: (id: string | number) => void;
  onUpdateQty: (id: string | number, d: number) => void;
  onProceed: () => void;
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100]"
          />
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-[101] shadow-2xl flex flex-col"
          >
            <div className="p-8 border-b border-gray-100 flex justify-between items-center">
              <div>
                <h2 className="text-3xl font-serif text-chocolate">Your Enquiry</h2>
                <p className="text-xs text-gray-400 uppercase tracking-widest mt-1">{items.length} items selected</p>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-8 space-y-8 thin-scrollbar">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6 text-gray-200">
                    <ShoppingBag size={40} />
                  </div>
                  <p className="text-gray-400 italic">Your enquiry list is empty.</p>
                  <button onClick={onClose} className="mt-4 text-gold hover:underline">Continue Browsing</button>
                </div>
              ) : (
                items.map(item => (
                  <div key={item.id} className="flex gap-4 group">
                    <div className="w-24 aspect-[3/4] rounded-xl overflow-hidden bg-gray-50 flex-shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="font-serif text-lg leading-tight">{item.name}</h4>
                        <button onClick={() => onRemove(item.id)} className="text-gray-300 hover:text-red-500 transition-colors">
                          <Trash2 size={16} />
                        </button>
                      </div>
                      <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-3">
                        {item.main_category} {item.fabric ? `• ${item.fabric}` : ''}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center border border-gray-100 rounded-lg overflow-hidden">
                          <button 
                            onClick={() => onUpdateQty(item.id, -1)}
                            className="p-1.5 hover:bg-gray-50 text-gray-400"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="px-3 text-sm font-medium">{item.quantity}</span>
                          <button 
                            onClick={() => onUpdateQty(item.id, 1)}
                            className="p-1.5 hover:bg-gray-50 text-gray-400"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        <p className="text-sm font-medium text-chocolate italic">
                          {item.price_type === 'On Request' ? 'P.O.R' : item.price}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {items.length > 0 && (
              <div className="p-8 border-t border-gray-100 bg-gray-50/50">
                <button 
                  onClick={onProceed}
                  className="w-full bg-chocolate text-white py-4 rounded-2xl font-medium flex items-center justify-center gap-3 shadow-xl hover:bg-gold transition-all"
                >
                  Proceed to Enquiry Form
                  <Send size={18} />
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
