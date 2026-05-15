export const CONTACT_INFO = {
  phone: '(+91) 99950 90661',
  whatsapp: '919995090661',
  email: 'annamz.artistry@gmail.com',
  address: 'Vattamattathil House, Puthuvely P.O, Monipilly, Kottayam, PIN 686636',
}

export const getWhatsAppLink = (message: string) => {
  const encodedMessage = encodeURIComponent(message)
  return `https://wa.me/${CONTACT_INFO.whatsapp}?text=${encodedMessage}`
}
