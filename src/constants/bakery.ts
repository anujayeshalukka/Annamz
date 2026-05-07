const IMAGE_BASE_URL = 'https://zjemljuanmretlnmjdah.supabase.co/storage/v1/object/public/images/'

export const BAKERY_PRODUCTS = [ 
  // Dry Cakes
  { id: 1, name: "Rich Chocolate Cake", category: "Dry Cakes", price: "On Request", image: IMAGE_BASE_URL + 'cake1.avif', description: "Moist dark chocolate with a velvety finish." },
  { id: 2, name: "Sponge Cake", category: "Dry Cakes", price: "On Request", image: IMAGE_BASE_URL + 'cake2.jpg', description: "Light, airy, and perfect for tea time." },
  { id: 3, name: "Coffee Cake", category: "Dry Cakes", price: "On Request", image: IMAGE_BASE_URL + 'cake3.jpg', description: "Infused with premium Arabica beans." },
  { id: 4, name: "Iced Lemon Cake", category: "Dry Cakes", price: "On Request", image: IMAGE_BASE_URL + 'cake4.avif', description: "Zesty citrus glaze on a buttery base." },
  { id: 5, name: "Carrot Dates Cake", category: "Dry Cakes", price: "On Request", image: IMAGE_BASE_URL + 'cake5.jpg', description: "Healthy goodness with natural sweetness." },
  { id: 6, name: "Laizy Daizy Cake", category: "Dry Cakes", price: "On Request", image: IMAGE_BASE_URL + 'cake6.avif', description: "Classic coconut-topped nostalgic delight." },
  { id: 7, name: "Tropical Fruit Cake", category: "Dry Cakes", price: "On Request", image: IMAGE_BASE_URL + 'cake7.jpg', description: "Fresh tropical flavor in every bite." },

  // Cream Cakes
  { id: 8, name: "Chocolate Dry Fruit Cake", category: "Cream Cakes", price: "On Request", image: IMAGE_BASE_URL + 'cake8.jpg', description: "Nutty crunch meets rich cocoa cream." },
  { id: 9, name: "Red Velvet Cake", category: "Cream Cakes", price: "On Request", image: IMAGE_BASE_URL + 'cake9.avif', description: "Sophisticated cocoa flavor with cream cheese." },
  { id: 10, name: "Football Theme Cake", category: "Cream Cakes", price: "On Request", image: IMAGE_BASE_URL + 'cake10.jpg', description: "Custom designed for the sports enthusiast." },
  { id: 11, name: "Number Cake", category: "Cream Cakes", price: "On Request", image: IMAGE_BASE_URL + 'cake11.jpg', description: "Personalized celebration for every milestone." },
  { id: 12, name: "White Designer Cake", category: "Cream Cakes", price: "On Request", image: IMAGE_BASE_URL + 'cake12.avif', description: "Elegant artistry for special occasions." },
  { id: 13, name: "Kuromi Cake", category: "Cream Cakes", price: "On Request", image: IMAGE_BASE_URL + 'cake13.webp', description: "Trendy character-themed purple delight." },
  { id: 14, name: "PUBG Cake", category: "Cream Cakes", price: "On Request", image: IMAGE_BASE_URL + 'cake14.webp', description: "Winner winner chicken dinner for gamers." },
  { id: 15, name: "Candle Cake", category: "Cream Cakes", price: "On Request", image: IMAGE_BASE_URL + 'cake15.jpg', description: "Unique aesthetic that lights up the party." },
  { id: 16, name: "Fluffy Pillow Cake", category: "Cream Cakes", price: "On Request", image: IMAGE_BASE_URL + 'cake16.jpg', description: "Soft, dreamy textures for luxury gifting." },
  { id: 17, name: "Mermaid Theme Cake", category: "Cream Cakes", price: "On Request", image: IMAGE_BASE_URL + 'cake17.jpg', description: "Enchanting sea-inspired colors and motifs." },
  { id: 18, name: "Dalgona Coffee Cake", category: "Cream Cakes", price: "On Request", image: IMAGE_BASE_URL + 'cake18.avif', description: "Trendy whipped coffee flavor profile." },
  { id: 19, name: "Praline Cake", category: "Cream Cakes", price: "On Request", image: IMAGE_BASE_URL + 'cake19.webp', description: "Caramelized nuts in a silky cream base." },

  // Dessert Cakes
  { id: 20, name: "Tiramisu", category: "Dessert Cakes", price: "On Request", image: IMAGE_BASE_URL + 'cake20.avif', description: "Authentic Italian coffee-soaked elegance." },
  { id: 21, name: "Cheesecake", category: "Dessert Cakes", price: "On Request", image: IMAGE_BASE_URL + 'cake21.avif', description: "Creamy, dense, and perfectly balanced." },
  { id: 22, name: "Biscoff Cake", category: "Dessert Cakes", price: "On Request", image: IMAGE_BASE_URL + 'cake22.avif', description: "Irresistible cookie butter indulgence." },
  { id: 23, name: "Caramel Pudding", category: "Dessert Cakes", price: "On Request", image: IMAGE_BASE_URL + 'cake23.avif', description: "Silky smooth melt-in-your-mouth classic." },

  // Brownies & Snacks
  { id: 24, name: "Fudge Brownie", category: "Brownies & Snacks", price: "On Request", image: IMAGE_BASE_URL + 'id24.jpg', description: "Gooey, chocolatey, and intensely rich." },
  { id: 25, name: "Double Chocolate Fudge Brownie", category: "Brownies & Snacks", price: "On Request", image: IMAGE_BASE_URL + 'id25.jpg', description: "Extra cocoa for the ultimate chocoholic." },
  { id: 26, name: "Blondie", category: "Brownies & Snacks", price: "On Request", image: IMAGE_BASE_URL + 'id26.jpg', description: "White chocolate and brown sugar magic." },
  { id: 27, name: "Donuts", category: "Brownies & Snacks", price: "On Request", image: IMAGE_BASE_URL + 'id27.jpg', description: "Assorted glazes and fluffy dough." },
  { id: 28, name: "Pizza", category: "Brownies & Snacks", price: "On Request", image: IMAGE_BASE_URL + 'id28.avif', description: "Freshly baked artisan crust and toppings." },
  { id: 29, name: "Pineapple Cake", category: "Dry Cakes", price: "On Request", image: IMAGE_BASE_URL + 'cake21.avif', description: "Sweet and tangy pineapple delight." },
  { id: 30, name: "Ginger Lime", category: "Fruit Concentrates", price: "On Request", image: IMAGE_BASE_URL + 'id29.jpg', description: "Zesty and refreshing." },
  { id: 31, name: "Beetroot", category: "Fruit Concentrates", price: "On Request", image: IMAGE_BASE_URL + 'id30.jpg', description: "Earthly and sweet concentrate." },
  { id: 32, name: "Carrot", category: "Fruit Concentrates", price: "On Request", image: IMAGE_BASE_URL + 'id31.jpg', description: "Naturally sweet carrot essence." },
  { id: 33, name: "Meat Pickle", category: "Pickles", price: "On Request", image: IMAGE_BASE_URL + 'id32.webp', description: "Spicy and savory meat pickle." },
  { id: 34, name: "Fish Pickle", category: "Pickles", price: "On Request", image: IMAGE_BASE_URL + 'id33.webp', description: "Traditional fish pickle with bold flavors." },
  { id: 35, name: "Lemon Dates Pickle", category: "Pickles", price: "On Request", image: IMAGE_BASE_URL + 'id34.jpg', description: "Sweet and sour lemon date combination." },
  { id: 36, name: "Garam Masala", category: "Masala Powders", price: "On Request", image: IMAGE_BASE_URL + 'id35.jpg', description: "Authentic blend of aromatic spices." },
  { id: 37, name: "Biriyani Masala", category: "Masala Powders", price: "On Request", image: IMAGE_BASE_URL + 'id36.webp', description: "The secret to a perfect biriyani." },
  { id: 38, name: "Sambar Masala", category: "Masala Powders", price: "On Request", image: IMAGE_BASE_URL + 'id37.jpg', description: "Traditional South Indian spice mix." },
];
