export const CONTACT_INFO = {
  phone: '(+91) 99950 90661',
  whatsapp: '919995090661',
  email: 'annamz.artistry@gmail.com',
  address: 'Annamz Boutique, Artisan Square, Gourmet District, PIN 682001',
  instagram: 'AnnamzOfficial',
  instagramUrl: 'https://www.instagram.com/AnnamzOfficial',
}

export const getWhatsAppLink = (message: string) => {
  const encodedMessage = encodeURIComponent(message)
  return `https://wa.me/${CONTACT_INFO.whatsapp}?text=${encodedMessage}`
}
