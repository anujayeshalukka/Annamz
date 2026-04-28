export const CONTACT_INFO = {
  phone: '+91 99950 90661',
  whatsapp: '919995090661',
  email: 'info@annamz.com', // Placeholder if not provided
  address: '123 Baker Street, Artisan Square, Gourmet District, PIN 682001', // Keep existing if not changed
}

export const getWhatsAppLink = (message: string) => {
  const encodedMessage = encodeURIComponent(message)
  return `https://wa.me/${CONTACT_INFO.whatsapp}?text=${encodedMessage}`
}
