import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Phone, Mail, MessageCircle, Clock, Globe, Check } from 'lucide-react'
import { CONTACT_INFO, getWhatsAppLink } from '../../config/contact'
import { COUNTRY_CODES } from '../../constants/countries'

export function ContactPage() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    countryCode: '+91',
    message: ''
  });

  const handleWhatsApp = () => {
    const message = "Hello Annamz, I would like to enquire about your latest collection.";
    window.open(getWhatsAppLink(message), '_blank');
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }

    const phoneRegex = /^[6-9]\d{9}$/;
    if (formData.phone && !phoneRegex.test(formData.phone)) {
      newErrors.phone = 'Invalid phone number (10 digits)';
    }

    if (!formData.message.trim()) newErrors.message = 'Message is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);

    const submissionData = new FormData();
    submissionData.append("access_key", "c0317e0b-8514-46c2-8419-74d47e4369e4");
    submissionData.append("name", formData.name);
    submissionData.append("email", formData.email);
    submissionData.append("phone", formData.phone ? `${formData.countryCode} ${formData.phone}` : 'N/A');
    submissionData.append("message", formData.message);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: submissionData
      });

      const data = await response.json();

      if (data.success) {
        setIsSuccess(true);
      } else {
        alert(data.message || "Something went wrong. Please try again.");
      }
    } catch (error) {
      alert("Error submitting form. Please check your connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-24 min-h-screen bg-ivory">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=2000" 
            alt="Boutique" 
            className="w-full h-full object-cover brightness-50"
          />
        </div>
        <div className="relative z-10 text-center text-white px-6">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs md:text-sm uppercase tracking-[0.4em] mb-4 font-bold text-gold"
          >
            Get in Touch
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-7xl font-serif leading-tight"
          >
            Connect with <br />Annamz
          </motion.h1>
        </div>
      </section>

      <section className="container mx-auto px-6 py-24">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Details */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="space-y-12"
          >
            <div className="space-y-6">
              <h2 className="text-3xl md:text-5xl font-serif text-chocolate">Contact Information</h2>
              <p className="text-gray-500 leading-relaxed max-w-md">
                We would love to hear from you. Visit our boutique or reach out via any of the channels below for personalized assistance.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-8">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center text-gold shrink-0">
                  <Phone size={20} />
                </div>
                <div>
                  <h3 className="text-xs uppercase tracking-widest text-gray-400 font-bold mb-1">Call Us</h3>
                  <p className="text-chocolate font-medium">{CONTACT_INFO.phone}</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center text-gold shrink-0">
                  <Mail size={20} />
                </div>
                <div>
                  <h3 className="text-xs uppercase tracking-widest text-gray-400 font-bold mb-1">Email Us</h3>
                  <p className="text-chocolate font-medium">{CONTACT_INFO.email}</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center text-gold shrink-0">
                  <Clock size={20} />
                </div>
                <div>
                  <h3 className="text-xs uppercase tracking-widest text-gray-400 font-bold mb-1">Visit Timings</h3>
                  <p className="text-chocolate font-medium">Mon - Sat: 10AM - 8PM</p>
                  <p className="text-gray-400 text-xs">Sunday: Closed</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center text-gold shrink-0">
                  <Globe size={20} />
                </div>
                <div>
                  <h3 className="text-xs uppercase tracking-widest text-gray-400 font-bold mb-1">Follow Us</h3>
                  <p className="text-chocolate font-medium">@AnnamzOfficial</p>
                </div>
              </div>
            </div>

            <div className="p-8 bg-chocolate text-ivory rounded-[2rem] flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gold rounded-full flex items-center justify-center text-white">
                  <MessageCircle size={24} />
                </div>
                <div>
                  <h4 className="font-serif text-lg">Instant Support</h4>
                  <p className="text-xs text-ivory/60">Chat with us on WhatsApp</p>
                </div>
              </div>
              <button 
                onClick={handleWhatsApp}
                className="btn-premium px-8 py-3 whitespace-nowrap"
              >
                Message Now
              </button>
            </div>
          </motion.div>

          {/* Contact Form Container */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-xl border border-gray-100 min-h-[500px] flex flex-col"
          >
            <AnimatePresence mode="wait">
              {!isSuccess ? (
                <motion.div 
                  key="form"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-8"
                >
                  <div>
                    <h2 className="text-3xl font-serif text-chocolate mb-2">Send us a Message</h2>
                    <p className="text-gray-500 text-sm">We'll get back to you as soon as possible.</p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <input type="hidden" name="to_email" value="annamz.artistry@gmail.com" />
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold ml-1">Full Name</label>
                        <input 
                          type="text" 
                          name="name"
                          required
                          value={formData.name}
                          onChange={e => {
                            setFormData({...formData, name: e.target.value});
                            if (errors.name) setErrors({...errors, name: ''});
                          }}
                          className={`w-full px-6 py-4 bg-gray-50 border transition-all rounded-2xl outline-none ${errors.name ? 'border-red-400' : 'border-transparent focus:border-gold/30 focus:bg-white'}`}
                          placeholder="Jane Doe"
                        />
                        {errors.name && <p className="text-[10px] text-red-500 mt-1 ml-1">{errors.name}</p>}
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold ml-1">Email Address</label>
                        <input 
                          type="email" 
                          name="email"
                          required
                          value={formData.email}
                          onChange={e => {
                            setFormData({...formData, email: e.target.value});
                            if (errors.email) setErrors({...errors, email: ''});
                          }}
                          className={`w-full px-6 py-4 bg-gray-50 border transition-all rounded-2xl outline-none ${errors.email ? 'border-red-400' : 'border-transparent focus:border-gold/30 focus:bg-white'}`}
                          placeholder="jane@example.com"
                        />
                        {errors.email && <p className="text-[10px] text-red-500 mt-1 ml-1">{errors.email}</p>}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold ml-1">Phone Number (Optional)</label>
                      <div className="flex gap-2">
                        <select 
                          value={formData.countryCode}
                          onChange={e => setFormData({...formData, countryCode: e.target.value})}
                          className="px-4 py-4 bg-gray-50 border border-transparent rounded-2xl outline-none transition-all text-sm font-medium text-gray-500"
                        >
                          {COUNTRY_CODES.map(c => (
                            <option key={c.code} value={c.code}>{c.flag} {c.code}</option>
                          ))}
                        </select>
                        <input 
                          type="tel" 
                          name="phone"
                          value={formData.phone}
                          onChange={e => {
                            const val = e.target.value.replace(/\D/g, '').slice(0, 10);
                            setFormData({...formData, phone: val});
                            if (errors.phone) setErrors({...errors, phone: ''});
                          }}
                          className={`w-full px-6 py-4 bg-gray-50 border transition-all rounded-2xl outline-none ${errors.phone ? 'border-red-400' : 'border-transparent focus:border-gold/30 focus:bg-white'}`}
                          placeholder="98765 43210"
                        />
                      </div>
                      {errors.phone && <p className="text-[10px] text-red-500 mt-1 ml-1">{errors.phone}</p>}
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold ml-1">Your Message</label>
                      <textarea 
                        name="message"
                        required
                        rows={4}
                        value={formData.message}
                        onChange={e => {
                          setFormData({...formData, message: e.target.value});
                          if (errors.message) setErrors({...errors, message: ''});
                        }}
                        className={`w-full px-6 py-4 bg-gray-50 border transition-all rounded-2xl outline-none resize-none ${errors.message ? 'border-red-400' : 'border-transparent focus:border-gold/30 focus:bg-white'}`}
                        placeholder="How can we help you today?"
                      />
                      {errors.message && <p className="text-[10px] text-red-500 mt-1 ml-1">{errors.message}</p>}
                    </div>

                    <button 
                      type="submit"
                      disabled={isSubmitting}
                      className="btn-premium w-full py-4 text-sm tracking-widest uppercase font-bold shadow-xl shadow-gold/20 flex items-center justify-center gap-3 disabled:opacity-70"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Sending...
                        </>
                      ) : (
                        'Send Message'
                      )}
                    </button>
                  </form>
                </motion.div>
              ) : (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  className="flex-grow flex flex-col items-center justify-center text-center space-y-6"
                >
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-2">
                    <Check size={40} />
                  </div>
                  <h3 className="text-3xl font-serif text-chocolate">Message Sent!</h3>
                  <p className="text-gray-500 leading-relaxed max-w-xs mx-auto">
                    Thank you for reaching out. We have received your message and will get back to you at <strong>annamz.artistry@gmail.com</strong> soon.
                  </p>
                  <button 
                    onClick={() => setIsSuccess(false)}
                    className="text-gold font-bold text-xs uppercase tracking-widest hover:text-chocolate transition-colors"
                  >
                    Send another message
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
