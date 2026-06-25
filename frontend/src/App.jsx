import React, { useState, useEffect } from 'react';

// ==========================================
// 🛠️ CLOTHING & APPAREL PRODUCTION DATA STRUCTURES
// ==========================================
const CATEGORIES = [
  "Winter wear", "Mens clothing", "Womens fashion", "Kids collection",
  "Casual wear", "Sports & outdoor", "Traditional wear", "Shoes & boots", "More category"
];

const FLASH_DEALS = [
  { name: "Leather Jackets", disc: "-25%", img: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=200&q=80" },
  { name: "Denim Shirts", disc: "-15%", img: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=200&q=80" },
  { name: "Summer T-shirts", disc: "-40%", img: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=200&q=80" },
  { name: "Sports Hoodies", disc: "-20%", img: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=200&q=80" },
  { name: "Formal Suits", disc: "-25%", img: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=200&q=80" }
];

const HOME_OUTDOOR = [
  { name: "Winter Coats", price: "USD 29", img: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80", category: "Winter Apparel", description: "Heavy-duty windproof winter coat designed to provide maximum warmth in freezing temperatures.", material: "100% Polyester Cashmere Shell", design: "Long-line Overcoat", washCare: "Dry Clean Recommended" },
  { name: "Denim Jeans", price: "USD 19", img: "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=400&q=80", category: "Casual Wear", description: "Classic slim-fit stretchable denim jeans with a durable fabric weave for everyday comfort.", material: "98% Cotton, 2% Spandex", design: "Slim Fit 5-Pocket Style", washCare: "Machine Wash Cold" },
  { name: "Cotton Chinos", price: "USD 15", img: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=400&q=80", category: "Formal/Casual", description: "Premium lightweight cotton chinos offering a sharp tailored look suitable for office or casual outings.", material: "100% Breathable Twill Cotton", design: "Straight Fit Tailored", washCare: "Wash with Like Colors" },
  { name: "Puffer Vests", price: "USD 24", img: "https://images.unsplash.com/photo-1604644401890-0bd678c83788?auto=format&fit=crop&w=400&q=80", category: "Winter Apparel", description: "Sleeveless quilted puffer vest filled with lightweight synthetic down for perfect core layering.", material: "Nylon Shell with Down Alternative", design: "Quilted Sleeveless Vest", washCare: "Tumble Dry Low" },
  { name: "Knit Sweaters", price: "USD 18", img: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=500&auto=format&fit=crop&q=80", category: "Winter Apparel", description: "Cozy cable-knit sweater crafted with thick premium yarn to lock in warmth beautifully.", material: "70% Premium Wool, 30% Acrylic", design: "Classic Cable Knit Crewneck", washCare: "Hand Wash Only" },
  { name: "Woolen Scarves", price: "USD 5", img: "/public/image/scarves.jpg", category: "Accessories", description: "Ultra-soft long winter scarf providing excellent neck insulation with a premium hand-feel.", material: "100% Brushed Wool Blend", design: "Fringed Solid Minimalist", washCare: "Hand Wash Cold" },
  { name: "Track Pants", price: "USD 12", img: "https://images.unsplash.com/photo-1551854838-212c50b4c184?auto=format&fit=crop&w=400&q=80", category: "Activewear", description: "Flexible athletic track pants with an adjustable drawstring waist and secure side zip-pockets.", material: "Polyester Fleece Blend", design: "Tapered Sporty Fit", washCare: "Machine Washable" },
  { name: "Beanie Caps", price: "USD 4", img: "https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?auto=format&fit=crop&w=400&q=80", category: "Accessories", description: "Stretchable ribbed knit beanie cap designed to snugly cover ears and trap heat during cold days.", material: "100% Stretchable Acrylic", design: "Ribbed Cuffed Beanie", washCare: "Hand Wash Recommended" }
];
const CLOTHING_TRENDS = [
  { name: "Casual Blazers", price: "USD 45", img: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=400&q=80", category: "Formal Wear", description: "Unstructured casual blazer with a modern notch lapel, perfect for dynamic corporate-casual styles.", material: "Linen-Cotton Blend Blazer", design: "Modern Notch Lapel Slim Fit", washCare: "Dry Clean Only" },
  { name: "Cargo Shorts", price: "USD 14", img: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=500&auto=format&fit=crop&q=80", category: "Summer Apparel", description: "Rugged and durable cargo shorts featuring multiple secure utility pockets for your outdoor gear.", material: "Heavy Duty 100% Cotton Canvas", design: "Relaxed Fit Utility Cargo", washCare: "Machine Wash Warm" },
  { name: "Flannel Shirts", price: "USD 16", img: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=400&q=80", category: "Casual Wear", description: "Classic checkered flannel shirt with double chest pockets, brushed heavily for superior softness.", material: "100% Brushed Cotton Flannel", design: "Standard Fit Plaid Pattern", washCare: "Tumble Dry Medium" },
  { name: "Graphic Tees", price: "$8.99", img: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=400&q=80", category: "Casual Wear", description: "Trendy streetwear graphic t-shirt featuring high-density screen printing that will not fade easily.", material: "100% Combed Ringspun Cotton", design: "Crewneck Streetwear Style", washCare: "Wash Inside Out" },
  { name: "Linen Trousers", price: "USD 22", img: "https://images.unsplash.com/photo-1509551388413-e18d0ac5d495?auto=format&fit=crop&w=400&q=80", category: "Summer Apparel", description: "Ultra-breathable linen trousers crafted specifically to maintain a cool feel in hot climates.", material: "Pure French Flax Linen Blend", design: "Relaxed Straight-Leg Fit", washCare: "Air Dry Recommended" },
  { name: "Windbreakers", price: "USD 25", img: "https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=400&q=80", category: "Activewear", description: "Water-resistant lightweight windbreaker jacket equipped with an adjustable mesh hood.", material: "Ripstop Waterproof Nylon Shell", design: "Full-Zip Athletic Windbreaker", washCare: "Wipe with Damp Cloth" },
  { name: "Polo Shirts", price: "USD 14", img: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&w=400&q=80", category: "Casual Wear", description: "Timeless pique knit polo shirt featuring a structured collar and subtle elegant embroidery.", material: "Premium Pique Cotton Knit", design: "Smart Casual Classic Fit", washCare: "Do Not Bleach" },
  { name: "Anoraks", price: "USD 40", img: "https://images.unsplash.com/photo-1544923246-77307dd654cb?auto=format&fit=crop&w=400&q=80", category: "Winter Apparel", description: "Pullover-style utility anorak jacket with a large front kangaroo pouch for maximum function.", material: "Weather-Resistant Polyester Twill", design: "Half-Zip Pullover Anorak", washCare: "Machine Wash Cold" }
];
const RECOMMENDED = [
  { name: "T-shirts with multiple colors for men", price: "$10.30", img: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=200&q=80" },
  { name: "Jeans shorts for men blue color", price: "$10.30", img: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=200&q=80" },
  { name: "Brown winter coat medium size", price: "$12.50", img: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=200&q=80" },
  { name: "Jeans bag for travel for men", price: "$34.00", img: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=200&q=80" },
  { name: "Leather wallet premium tan", price: "$99.00", img: "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=200&q=80" },
  { name: "Oversized Hoodie Off-White", price: "$19.99", img: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=200&q=80" },
  { name: "Slim Fit Stretch Denim Pants", price: "$24.50", img: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=200&q=80" },
  { name: "Classic Cotton Socks 5-Pack", price: "$6.30", img: "https://images.unsplash.com/photo-1582966772680-860e372bb558?auto=format&fit=crop&w=200&q=80" },
  { name: "Windproof Hooded Parka Jacket", price: "$48.00", img: "https://images.unsplash.com/photo-1544923246-77307dd654cb?auto=format&fit=crop&w=200&q=80" },
  { name: "Casual Canvas Sneakers Black", price: "$15.90", img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=200&q=80" }
];

const EXTRA_SERVICES = [
  { title: "Source from Apparel Hubs", icon: "👚", img: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=300&q=80" },
  { title: "Customize Fabrics & Labels", icon: "🧵", img: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=300&q=80" },
  { title: "Fast delivery by air or sea cargo", icon: "✈️", img: "https://images.unsplash.com/photo-1544040743-44f33b98a82b?auto=format&fit=crop&w=300&q=80" },
  { title: "Quality assurance & inspections", icon: "🛡️", img: "https://images.unsplash.com/photo-1521791136066-8984c757ee10?auto=format&fit=crop&w=300&q=80" }
];

const REGIONS = [
  { flag: "🇦🇪", name: "Arabic Emirates", site: "shop.ae" },
  { flag: "🇦🇺", name: "Australia", site: "shop.au" },
  { flag: "🇺🇸", name: "United States", site: "shop.us" },
  { flag: "🇷🇺", name: "Russia", site: "shop.ru" },
  { flag: "🇮🇹", name: "Italy", site: "shop.it" },
  { flag: "🇩🇰", name: "Denmark", site: "shop.dk" },
  { flag: "🇫🇷", name: "France", site: "shop.fr" },
  { flag: "🇨🇳", name: "China", site: "shop.cn" }
];

const LISTING_ITEMS = [
  { id: 1, name: "Mens Premium Wool Winter Jacket Coat, Thick Warm Inner Lining", price: "$78.00", oldPrice: "$98.00", rating: 4.8, orders: "154 orders", shipping: "Free Shipping", desc: "High quality wool blend fabric, perfect double stitching with premium buttons. Fully customizable tags and logo print available.", img: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=250&q=80" },
  { id: 2, name: "Classic Slim Fit Indigo Denim Shirt Longsleeve Heavyweight Cotton", price: "$16.50", oldPrice: "$22.00", rating: 4.5, orders: "82 orders", shipping: "Free Shipping", desc: "100% breathable organic cotton material. Pre-washed style ensures no shrinkage after wash cycles.", img: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=250&q=80" },
  { id: 3, name: "Oversized Pullover Sweatshirt Heavy Fleece Unisex Winter Collection", price: "$19.99", oldPrice: "$25.00", rating: 4.7, orders: "90 orders", shipping: "Free Shipping", desc: "Dropped shoulder design with double layered spacious hood. Available in 12 organic pastel color shades.", img: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=250&q=80" },
  { id: 4, name: "Waterproof Casual Outdoor Parka Coat with Detachable Hood", price: "$40.00", oldPrice: "$55.00", rating: 4.9, orders: "230 orders", shipping: "Free Shipping", desc: "Windproof outer nylon shell with micro-fleece comfortable inside insulation grid layout.", img: "https://images.unsplash.com/photo-1544923246-77307dd654cb?auto=format&fit=crop&w=250&q=80" }
];

const CART_ITEMS = [
  { id: 1, name: "T-shirts with multiple colors, for men and lady", size: "Medium", color: "Blue", material: "Cotton", price: "$78.99", img: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=150&q=80", qty: 9 },
  { id: 2, name: "Mens Premium Wool Winter Jacket Coat Warm Lining", size: "Large", color: "Brown", material: "Wool Blend", price: "$39.00", img: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=150&q=80", qty: 3 },
  { id: 3, name: "Classic Slim Fit Indigo Denim Shirt Longsleeve", size: "Medium", color: "Indigo Blue", material: "Cotton", price: "$16.50", img: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=150&q=80", qty: 1 }
];

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState([]);
  // ====== States for the Admin Add Product form ======
  const [newProductName, setNewProductName] = useState('');
  const [newProductPrice, setNewProductPrice] = useState('');
  const [newProductImg, setNewProductImg] = useState('');
  const [newProductSection, setNewProductSection] = useState('home_outdoor');

  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isLoginView, setIsLoginView] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loggedInUser, setLoggedInUser] = useState(localStorage.getItem('userEmail') || null);

  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isLoginView ? 'login' : 'signup';
    try {
      
  const response = await fetch(`https://ecommerce-fullstack-design-production-4750.up.railway.app/api/${endpoint}`, {
        method: 'POST',
        mode: 'cors', 
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });
      
      const data = await response.json();
      if (response.ok) {
        alert(data.message);
        if (isLoginView) {
          setLoggedInUser(data.email);
          localStorage.setItem('userEmail', data.email);
          setShowAuthModal(false);
        } else {
          setIsLoginView(true);
        }
        setEmail('');
        setPassword('');
      } else {
        alert(data.message || "Kuch ghalat hua!");
      }
    } catch (err) {
      console.error("Full Error:", err);
      alert("Cannot connect to the server. Please check your network or backend console.");
    }
  };
const handleLogout = () => {
  localStorage.removeItem('userEmail');
  setLoggedInUser(null);
  alert("Logged out!");
};
const handleAddProduct = async (e) => {
  e.preventDefault();
  const productData = {
    name: newProductName,
    price: newProductPrice,
    image: newProductImg,
    section: newProductSection
  };

console.log("Sending this data to backend:", productData);

  try {
    const response = await fetch(`https://ecommerce-fullstack-design-production-4750.up.railway.app/api/${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'user-role': 'admin'
      },
      body: JSON.stringify(productData)
    });

    if (response.ok) {
      const savedProduct = await response.json();
      setProducts([...products, savedProduct]);
      alert("Product added successfully to database!");
      setNewProductName('');
      setNewProductPrice('');
      setNewProductImg('');
    } else {
      alert("Failed to add product. Admin access required.");
    }
  } catch (err) {
    console.error(err);
  }
};

const handleDeleteProduct = async (id) => {
  if (!window.confirm("Are you sure you want to delete this product?")) return;

  try {
    const response = await fetch(`https://ecommerce-fullstack-design-production-4750.up.railway.app/api/${endpoint}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
            'user-role': 'admin',
            'role': 'admin',
            'admin': 'true'
      }
    });

    if (response.ok) {
      setProducts(products.filter(item => item._id !== id));
      alert("Product deleted successfully!");
    } else {
      alert("Failed to delete product.");
    }
  } catch (err) {
    console.error(err);
  }
};

const addToCart = (item) => {
  setCart([...cart, item]);
};
const removeFromCart = (idx) => {
  setCart(cart.filter((_, i) => i !== idx));
};
const [endpoint, setEndpoint] = useState('products');
useEffect(() => {
  fetch(`https://ecommerce-fullstack-design-production-4750.up.railway.app/api/${endpoint}`)
    .then(res => res.json())
    .then(data => setProducts(data))
    .catch(err => console.log(err));
}, [endpoint]);

const dynamicHomeOutdoor = products.filter(item => item.section === 'home_outdoor');
const dynamicClothingTrends = products.filter(item => item.section === 'clothing_trends');

  return (
    <div className="bg-[#F7F8FA] min-h-screen text-[#1C1C1C] font-sans antialiased">
      
      {/* Figma Control Router Strip */}
      <div className="bg-slate-900 text-slate-300 text-xs py-2 sticky top-0 z-50 border-b border-slate-700 shadow-sm">
        <div className="container mx-auto px-4 flex justify-between items-center flex-wrap gap-2">
          <span className="font-bold text-amber-400">🎛️ FIGMA CLOTHING STORES ROUTER:</span>
          <div className="flex space-x-1">
            {[
          { id: 'home', label: '1. Home Dashboard' },
          { id: 'listing-grid', label: '2. Product Grid' },
          { id: 'listing-list', label: '3. Product List' },
          { id: 'detail', label: '4. Product Details' },
         { id: 'cart', label: '5. Shopping Cart View' },
       // Added Admin Panel button (only visible if logged in as admin)
          ...(loggedInUser === 'admin@gmail.com' ? [{ id: 'admin', label: '⚙️ 6. Admin Control Panel' }] : [])
        ].map((btn) => (
          <button 
          key={btn.id}
          onClick={() => setCurrentPage(btn.id)} 
          className={`px-2.5 py-0.5 rounded text-[11px] font-bold transition ${currentPage === btn.id ? 'bg-blue-600 text-white shadow' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}
        >
         {btn.label}
         </button>
         ))}
          </div>
        </div>
      </div>

      {/* Top Utility Bar */}
      <div className="bg-white border-b border-gray-200 text-xs text-gray-500 py-2">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex space-x-4">
            <span className="cursor-pointer hover:text-blue-600">English, USD ▾</span>
            <span className="cursor-pointer hover:text-blue-600">Ship to 🇺🇸 ▾</span>
          </div>
          <div className="flex space-x-4">
            <span>Help Center</span><span>Gift Boxes</span><span>Projects</span><span>Supplier Corner</span>
          </div>
        </div>
      </div>

      {/* Main Branding Header */}
      <header className="bg-white border-b border-gray-200 py-4">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div onClick={() => setCurrentPage('home')} className="flex items-center space-x-2 text-2xl font-black text-blue-600 cursor-pointer">
            <span className="bg-blue-600 text-white p-1.5 rounded-lg text-lg">👜</span>
            <span className="text-gray-900 font-bold">Brand</span>
          </div>
          
          <div className="flex w-full md:w-[50%] border-2 border-blue-600 rounded-lg overflow-hidden bg-white">
            <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search clothes, fabrics..." className="w-full px-3 py-2 outline-none text-sm text-gray-700" />
            <select className="border-l border-gray-200 px-3 text-xs bg-gray-50 outline-none hidden sm:block">
              <option>All category</option>
            </select>
            <button onClick={() => setCurrentPage('listing-grid')} className="bg-blue-600 text-white px-6 py-2 text-sm font-bold hover:bg-blue-700">Search</button>
          </div>

          <div className="flex items-center space-x-6 text-gray-400 text-xs">
            <div onClick={() => loggedInUser ? handleLogout() : setShowAuthModal(true)} className="flex flex-col items-center cursor-pointer hover:text-blue-600 text-center">
             <span>👤</span>
          <span className="max-w-[70px] truncate">{loggedInUser ? 'Logout' : 'Profile'}</span>
            </div>
            <div className="flex flex-col items-center cursor-pointer hover:text-blue-600"><span>💬</span><span>Message</span></div>
            <div className="flex flex-col items-center cursor-pointer hover:text-blue-600"><span>🧡</span><span>Orders</span></div>
            <div onClick={() => setCurrentPage('cart')} className="flex flex-col items-center cursor-pointer hover:text-blue-600 relative">
              <span>🛒</span><span>My cart</span>
              <span className="absolute -top-1 -right-2 bg-blue-600 text-white text-[9px] w-3.5 h-3.5 rounded-full flex items-center justify-center font-bold">3</span>
            </div>
          </div>
        </div>
      </header>
      {showAuthModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded-lg max-w-sm w-full shadow-xl relative text-left">
            <button onClick={() => setShowAuthModal(false)} className="absolute top-3 right-3 text-gray-500 font-bold">✕</button>
            <h2 className="text-xl font-bold text-center mb-4 text-gray-900">{isLoginView ? 'Login Account' : 'Register Account'}</h2>
            <form onSubmit={handleAuthSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold mb-1 text-gray-700">Email Address</label>
                <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border p-2 rounded text-sm bg-white text-black outline-none" placeholder="example@mail.com" />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1 text-gray-700">Password</label>
                <input required type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full border p-2 rounded text-sm bg-white text-black outline-none" placeholder="••••••••" />
              </div>
              <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded text-sm font-bold hover:bg-blue-700 transition">
                {isLoginView ? 'Sign In' : 'Sign Up'}
              </button>
            </form>
            <p className="text-xs text-center mt-4 text-gray-500">
              {isLoginView ? "Don't have an account? " : "Already have an account? "}
              <span onClick={() => setIsLoginView(!isLoginView)} className="text-blue-600 font-bold cursor-pointer underline">
                {isLoginView ? 'Register here' : 'Login here'}
              </span>
            </p>
          </div>
        </div>
      )}

      {/* Horizontal Category Nav */}
      <nav className="bg-white border-b border-gray-200 text-sm py-2.5">
        <div className="container mx-auto px-4 flex items-center space-x-6 overflow-x-auto whitespace-nowrap">
          <button className="font-bold text-gray-900 flex items-center space-x-1"><span>☰</span><span>All category</span></button>
          <span onClick={() => setCurrentPage('listing-grid')} className="cursor-pointer hover:text-blue-600 text-gray-700">Hot offers</span>
          <span className="text-gray-700">Gift boxes</span>
          <span className="text-gray-700">Projects</span>
          <span className="text-gray-700">Menu item</span>
          <span className="text-gray-700">Help ▾</span>
        </div>
      </nav>

      {/* ==========================================
          🌟 INTERACTIVE CURRENT VIEWPORT CONTROLLER
         ========================================== */}
      
      {/* 1. CLOTHING HOME DASHBOARD */}
      {currentPage === 'home' && (
        <div className="space-y-6 pt-4">
          
          <section className="container mx-auto px-4">
            <div className="bg-white border border-gray-200 rounded-lg p-3 grid grid-cols-1 lg:grid-cols-4 gap-4">
              <aside className="hidden lg:block space-y-1 text-sm text-gray-600">
                {CATEGORIES.map((cat, i) => (
                  <span key={i} onClick={() => setCurrentPage('listing-grid')} className={`block p-2 rounded cursor-pointer ${i === 1 ? 'bg-[#E5F1FF] text-blue-600 font-bold' : 'hover:bg-gray-50'}`}>{cat}</span>
                ))}
              </aside>
              
              <div className="lg:col-span-2 relative bg-[#F4EBE1] rounded-md p-10 flex flex-col justify-center items-start min-h-[320px]">
                <p className="text-lg text-gray-700">Latest trending</p>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Apparel & Garments</h2>
                <button onClick={() => setCurrentPage('listing-grid')} className="bg-white text-gray-900 font-bold text-xs px-4 py-2 rounded border hover:bg-gray-50">Source now</button>
                <div className="absolute right-4 bottom-4 w-44 h-44 hidden sm:block">
                  <img src="https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=200&q=80" alt="Garments" className="w-full h-full object-contain" />
                </div>
              </div>

              <div className="flex flex-col justify-between gap-2">
                <div className="bg-[#E3F2FD] p-3 rounded-md space-y-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-xl bg-blue-200 p-1 rounded-full">👤</span>
                    <p className="text-xs text-gray-800">Hi, user <br/><span className="text-gray-400">let's get started</span></p>
                  </div>
                  <button 
                   onClick={() => { setIsLoginView(false); setShowAuthModal(true); }} 
                  className="w-full bg-blue-600 text-white py-2 rounded font-bold text-sm mb-2 hover:bg-blue-700 transition"
                  >
                 Join now
                </button>

                <button 
                  onClick={() => { setIsLoginView(true); setShowAuthModal(true); }} 
                 className="w-full bg-white text-blue-600 border border-gray-300 py-2 rounded font-bold text-sm hover:bg-gray-50 transition"
                 >
                 Log in
                </button>
                </div>
                <div className="bg-[#F2994A] text-white p-3 rounded-md text-xs"><p>Get US $10 off with a new clothing factory</p></div>
                <div className="bg-[#27AE60] text-white p-3 rounded-md text-xs"><p>Send quotes with bulk apparel preferences</p></div>
              </div>
            </div>
          </section>

          {/* Deals and Countdown Row */}
          <section className="container mx-auto px-4">
            <div className="bg-white border border-gray-200 rounded-lg grid grid-cols-2 md:grid-cols-6 overflow-hidden">
              <div className="p-4 bg-white border-r border-gray-200 flex flex-col justify-center col-span-2 md:col-span-1">
                <h3 className="font-bold text-sm text-gray-900">Deals and offers</h3>
                <p className="text-xs text-gray-400 mb-2">Apparel & Fabrics</p>
                <div className="flex space-x-1 text-white font-bold text-xs">
                  <div className="bg-[#2D3748] px-1.5 py-1 rounded text-center"><p className="text-[11px]">04</p><span className="text-[7px] block opacity-70">Days</span></div>
                  <div className="bg-[#2D3748] px-1.5 py-1 rounded text-center"><p className="text-[11px]">13</p><span className="text-[7px] block opacity-70">Hour</span></div>
                  <div className="bg-[#2D3748] px-1.5 py-1 rounded text-center"><p className="text-[11px]">34</p><span className="text-[7px] block opacity-70">Min</span></div>
                  <div className="bg-[#2D3748] px-1.5 py-1 rounded text-center"><p className="text-[11px]">56</p><span className="text-[7px] block opacity-70">Sec</span></div>
                </div>
              </div>
              {FLASH_DEALS.map((item, idx) => (
                <div key={idx} onClick={() => setCurrentPage('detail')} className="p-3 border-r border-gray-100 flex flex-col items-center justify-between text-center bg-white cursor-pointer hover:bg-gray-50/50">
                  <img src={item.image || item.img} alt={item.name} className="h-16 w-16 object-contain rounded" />
                  <p className="text-xs text-gray-700 mt-2 truncate w-full">{item.name}</p>
                  <span className="text-[10px] font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded-full mt-1">{item.disc}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Home and Outdoor Apparel Layout */}
          <section className="container mx-auto px-4">
            <div className="bg-white border border-gray-200 rounded-lg grid grid-cols-1 lg:grid-cols-4 overflow-hidden">
              <div className="p-4 bg-cover bg-center flex flex-col justify-start relative min-h-[200px]" style={{ backgroundImage: `url("https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=300&q=80")` }}>
                <div className="absolute inset-0 bg-white/80"></div>
                <div className="z-10">
                  <h3 className="font-bold text-gray-900 text-sm max-w-[120px] mb-3">Home and outdoor winter collection</h3>
                  <button onClick={() => setCurrentPage('listing-grid')} className="bg-white text-gray-900 font-bold text-xs px-3 py-1.5 rounded border">Source now</button>
                </div>
              </div>
              <div className="lg:col-span-3 grid grid-cols-2 sm:grid-cols-4 border-l border-gray-100">
              {(dynamicHomeOutdoor.length > 0 ? dynamicHomeOutdoor : HOME_OUTDOOR).map((item, idx) => (
              <div key={idx} onClick={() => { setSelectedProduct(item); setCurrentPage('detail'); window.scrollTo(0, 0); }} className="p-3 border-b border-r border-gray-100 flex justify-between bg-white hover:bg-gray-50 cursor-pointer">
                    <div className="space-y-1">
                      <p className="text-xs font-medium text-gray-800">{item.name}</p>
                      <p className="text-[11px] text-gray-400">From <br/><span className="text-gray-900 font-semibold">{item.price}</span></p>
                    </div>
                    <img src={item.image || item.img} alt={item.name} className="w-12 h-12 object-cover rounded self-end ml-1" />
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Clothes and Wear Layout Block */}
          <section className="container mx-auto px-4">
            <div className="bg-white border border-gray-200 rounded-lg grid grid-cols-1 lg:grid-cols-4 overflow-hidden">
              <div className="p-4 bg-cover bg-center flex flex-col justify-start relative min-h-[200px]" style={{ backgroundImage: `url("https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=300&q=80")` }}>
                <div className="absolute inset-0 bg-blue-50/80"></div>
                <div className="z-10">
                  <h3 className="font-bold text-gray-900 text-sm max-w-[120px] mb-3">Consumer apparel and garments</h3>
                  <button onClick={() => setCurrentPage('listing-grid')} className="bg-white text-gray-900 font-bold text-xs px-3 py-1.5 rounded border">Source now</button>
                </div>
              </div>
              <div className="lg:col-span-3 grid grid-cols-2 sm:grid-cols-4 border-l border-gray-100">
                {(dynamicClothingTrends.length > 0 ? dynamicClothingTrends : CLOTHING_TRENDS).map((item, idx) => (
                  //  Iski jagah bas yeh line copy karke paste kar dein:
                  <div key={idx} onClick={() => { setSelectedProduct(item); setCurrentPage('detail'); window.scrollTo(0, 0); }}className="p-3 border-b border-r border-gray-100 flex justify-between bg-white hover:bg-gray-50 cursor-pointer">
                    <div className="space-y-1">
                      <p className="text-xs font-medium text-gray-800">{item.name}</p>
                      <p className="text-[11px] text-gray-400">From <br/><span className="text-gray-900 font-semibold">{item.price}</span></p>
                    </div>
                    <img src={item.image || item.img} alt={item.name} className="w-12 h-12 object-cover rounded self-end ml-1" />
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Recommended Garments items */}
          <section className="container mx-auto px-4">
            <h3 className="text-base font-bold text-gray-900 mb-3">Recommended clothing</h3>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {(products.length > 0 ? products : RECOMMENDED).map((item, idx) => (
                <div key={idx} onClick={() => { setSelectedProduct(item); setCurrentPage('detail'); }} className="bg-white border border-gray-200 rounded-md p-3 flex flex-col justify-between cursor-pointer hover:shadow-sm"> 
            
                  <div className="w-full h-28 flex items-center justify-center p-1 bg-gray-50 rounded"><img src={item.image || item.img} alt={item.name} className="max-h-full max-w-full object-cover rounded mix-blend-multiply" /></div>
                  <div className="space-y-1 mt-2">
                    <p className="text-xs font-bold text-gray-900">{item.price}</p>
                    <p className="text-[11px] text-gray-400 line-clamp-2 leading-tight">{item.name}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}

      {/* 2 & 3. DYNAMIC CLOTHING LISTINGS GRID/LIST */}
      {(currentPage === 'listing-grid' || currentPage === 'listing-list') && (
        <div className="container mx-auto px-4 py-4 grid grid-cols-1 lg:grid-cols-4 gap-4">
          
          <aside className="space-y-3 hidden lg:block text-xs text-gray-600">
            <div className="bg-white p-3 border border-gray-200 rounded-md space-y-4">
              <div>
                <h4 className="font-bold text-gray-900 mb-2 border-b pb-1">Clothing Category</h4>
                <ul className="space-y-1 text-gray-600">
                  <li className="text-blue-600 font-semibold cursor-pointer">Mens Outerwear</li>
                  <li className="hover:text-blue-600 cursor-pointer">Casual Wear</li>
                  <li className="hover:text-blue-600 cursor-pointer">Winter Collection</li>
                </ul>
              </div>
            </div>
          </aside>

          <main className="lg:col-span-3 space-y-3">
            <div className="bg-white p-3 border border-gray-200 rounded-md flex justify-between items-center text-xs text-gray-600">
              <p>Found <span className="font-bold text-gray-900">4,231 clothing items</span></p>
              <div className="border rounded flex bg-white overflow-hidden text-xs font-bold">
                <button onClick={() => setCurrentPage('listing-grid')} className={`p-1 px-2.5 ${currentPage === 'listing-grid' ? 'bg-gray-100 text-blue-600' : ''}`}>Grid</button>
                <button onClick={() => setCurrentPage('listing-list')} className={`p-1 px-2.5 ${currentPage === 'listing-list' ? 'bg-gray-100 text-blue-600' : ''}`}>List</button>
              </div>
            </div>

            {currentPage === 'listing-grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {(products.length > 0 ? products : LISTING_ITEMS).filter((item) => item.name.toLowerCase().includes(searchQuery.toLowerCase())).map((item) => (
                  <div key={item.id || item._id} onClick={() => { setSelectedProduct(item); setCurrentPage('detail'); }} className="bg-white border border-gray-200 rounded-md p-3 flex flex-col justify-between cursor-pointer hover:shadow-sm">
                    <div className="h-36 w-full flex items-center justify-center p-2 bg-gray-50 rounded mb-2"><img src={item.image || item.img} alt={item.name} className="max-h-full max-w-full object-cover rounded mix-blend-multiply" /></div>
                    <div className="space-y-1">
                      <p className="text-sm font-bold text-gray-900">{item.price}</p>
                      <h4 className="text-xs text-gray-700 font-medium line-clamp-2 leading-tight">{item.name}</h4>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-2">
                {(products.length > 0 ? products : LISTING_ITEMS).filter((item) => item.name.toLowerCase().includes(searchQuery.toLowerCase())).map((item) => (
                  <div key={item.id || item._id} onClick={() => { setSelectedProduct(item); setCurrentPage('detail'); }} className="bg-white border border-gray-200 rounded-md p-4 flex flex-col sm:flex-row gap-4 cursor-pointer hover:shadow-sm">
                    <div className="h-32 w-full sm:w-40 flex items-center justify-center bg-gray-50 rounded p-2 flex-shrink-0"><img src={item.image || item.img} alt={item.name} className="max-h-full max-w-full object-cover rounded mix-blend-multiply" /></div>
                    <div className="flex-1 space-y-1">
                      <h4 className="text-xs font-bold text-gray-900">{item.name}</h4>
                      <p className="text-sm font-bold text-gray-900">{item.price}</p>
                      <p className="text-[11px] text-gray-400 line-clamp-2">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </main>
        </div>
      )}

      {/* 4. ⭐ FIGMA MATCH: PRODUCT DETAILS (CLOTHING FOCUS) */}
{currentPage === 'detail' && (
  <div className="container mx-auto px-4 py-6 space-y-6">
    <div className="bg-white border border-gray-200 rounded-xl p-6 grid grid-cols-1 lg:grid-cols-9 gap-8">
      
      {/* Visual Stream Column Gallery */}
      <div className="lg:col-span-3 space-y-3">
        <div className="border border-gray-200 rounded-lg bg-[#F8F9FA] p-6 h-80 flex items-center justify-center shadow-2xs">
          <img src={selectedProduct?.image || selectedProduct?.img || "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=400&q=80"} alt="Core Specimen" className="max-h-full object-contain rounded mix-blend-multiply" />
        </div>
        <div className="flex gap-2 justify-center">
          {[1, 2, 3, 4].map((n) => (
            <div key={n} className={`border rounded-md p-1 w-14 h-14 bg-white flex items-center justify-center cursor-pointer hover:border-blue-500 transition ${n === 1 ? 'border-gray-900 ring-1 ring-gray-900' : 'border-gray-200'}`}>
              <img src={selectedProduct?.image || selectedProduct?.img || "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=100&q=80"} className="max-h-full max-w-full object-contain rounded" alt="thumbnail" />
            </div>
          ))}
        </div>
      </div>

      {/* Core Specifications Clothing Metadata */}
      <div className="lg:col-span-4 space-y-4 text-xs text-gray-600">
        <div className="flex items-center space-x-2">
          <span className="text-[11px] font-semibold text-[#00B517] bg-[#E6F7E8] px-2.5 py-0.5 rounded-md">✓ In stock</span>
          <span className="text-gray-400 text-[11px]">Category: {selectedProduct?.category || "Apparel"}</span>
        </div>
        
        <h2 className="text-lg font-bold text-[#1C1C1C] leading-snug">{selectedProduct?.name || "Mens Premium Clothing Item"}</h2>
        
        <div className="flex items-center space-x-4 text-[11px]">
          <div className="text-amber-500 font-bold flex items-center">★★★★★ <span className="text-orange-500 ml-1">4.8</span></div>
          <span className="text-gray-300">|</span>
          <span className="text-gray-500 flex items-center">💬 46 reviews</span>
          <span className="text-gray-300">|</span>
          <span className="text-gray-500 flex items-center">📦 340 bulk units sold</span>
        </div>

        {/* Cost Tiering Structure */}
        <div className="bg-[#FFF4E5] border border-[#FFE3BB] p-3.5 rounded-lg grid grid-cols-3 divide-x divide-[#FFE3BB]">
          <div className="px-2">
            <p className="text-red-600 text-base font-bold">{selectedProduct?.price || "$78.00"}</p>
            <p className="text-[10px] text-gray-500 font-medium">50-100 pcs</p>
          </div>
          <div className="px-4">
            <p className="text-[#1C1C1C] text-base font-bold">$65.00</p>
            <p className="text-[10px] text-gray-500 font-medium">100-500 pcs</p>
          </div>
          <div className="px-4">
            <p className="text-[#1C1C1C] text-base font-bold">$52.00</p>
            <p className="text-[10px] text-gray-500 font-medium">500+ pcs</p>
          </div>
        </div>

        {/* Specs Definition Table Matrix */}
        <div className="space-y-2 pt-2">
          <div className="grid grid-cols-3 py-1.5 border-b border-gray-100">
            <span className="text-gray-400 font-medium">Description:</span>
            <span className="col-span-2 text-gray-800">{selectedProduct?.description || selectedProduct?.desc || "High quality apparel crafted with premium materials."}</span>
          </div>
          <div className="grid grid-cols-3 py-1.5 border-b border-gray-100">
            <span className="text-gray-400 font-medium">Material:</span>
            <span className="col-span-2 text-gray-800">{selectedProduct?.material || "Premium Quality Fabric Blend"}</span>
          </div>
          <div className="grid grid-cols-3 py-1.5 border-b border-gray-100">
            <span className="text-gray-400 font-medium">Design:</span>
            <span className="col-span-2 text-gray-800">{selectedProduct?.design || "Modern / Casual Fit"}</span>
          </div>
          <div className="grid grid-cols-3 py-1.5 border-b border-gray-100">
            <span className="text-gray-400 font-medium">Wash Care:</span>
            <span className="col-span-2 text-gray-800">{selectedProduct?.washCare || "Hand Wash or Dry Clean Recommended"}</span>
          </div>
        </div>
      </div>
      
      {/* Seller Action Verification Card */}
      <div className="lg:col-span-2 bg-white border border-gray-200 rounded-lg p-4 shadow-3xs h-fit space-y-3 text-xs">
        <div className="flex items-center space-x-3 pb-2 border-b border-gray-100">
          <span className="bg-blue-100 text-blue-700 text-base font-black w-9 h-9 rounded-md flex items-center justify-center">R</span>
          <div>
            <p className="font-bold text-gray-900">Riaz Garments Ltd</p>
            <p className="text-[10px] text-gray-400">Verified Apparel Mill</p>
          </div>
        </div>
        <div className="space-y-1.5 text-gray-500 font-medium">
          <p className="flex items-center justify-between"><span>Country:</span> <span className="text-gray-800">🇺🇸 USA HQ</span></p>
          <p className="flex items-center justify-between"><span>Compliance:</span> <span className="text-gray-800">BCI Cotton Approved</span></p>
        </div>
        <button onClick={() => { addToCart(selectedProduct); setCurrentPage('cart'); }} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-md transition shadow-xs">Add to Cart</button>
        <button className="w-full bg-white border border-gray-200 text-blue-600 font-bold py-2 rounded-md hover:bg-gray-50 transition">Factory Profile</button>
      </div>

    </div>
  </div>
)}

      {/* 5. ⭐ FIGMA MATCH: SHOPPING CART COMPONENT VIEW */}
      {currentPage === 'cart' && (
        <div className="container mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-3 gap-6 text-xs">
          
          {/* Main Selected Items list */}
          <main className="lg:col-span-2 bg-white border border-gray-200 rounded-xl p-5 space-y-4 shadow-2xs">
            <h3 className="font-bold text-sm text-[#1C1C1C] border-b border-gray-100 pb-3">Shopping cart ({cart.length} items)</h3>
            
            {cart.map((item, idx) => (
              <div key={item.id || item._id || idx} className="flex gap-4 border-b border-gray-100 pb-4 last:border-0 last:pb-0 pt-2 first:pt-0">
                <div className="w-20 h-20 bg-[#F8F9FA] border border-gray-200 rounded-md p-1 flex-shrink-0 flex items-center justify-center"><img src={item.image || item.img} alt={item.name} className="max-h-full max-w-full object-cover rounded mix-blend-multiply" /></div>
                
                <div className="flex-1 space-y-1 text-gray-400 font-medium">
                  <h4 className="font-bold text-[#1C1C1C] text-xs leading-snug hover:text-blue-600 cursor-pointer transition">{item.name}</h4>
                  <div className="flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-gray-500 pt-0.5">
                    <span>Size: <strong className="text-gray-700 font-semibold">{item.size}</strong></span>
                    <span>Color: <strong className="text-gray-700 font-semibold">{item.color}</strong></span>
                    <span>Material: <strong className="text-gray-700 font-semibold">{item.material}</strong></span>
                  </div>
                  <div className="pt-2 flex space-x-2">
                    <button onClick={() => removeFromCart(idx)} className="border border-red-200 bg-red-50 text-red-600 font-bold px-2.5 py-0.5 rounded text-[10px] hover:bg-red-100 transition">Remove</button>
                    <button className="border border-gray-200 text-blue-600 font-bold px-2.5 py-0.5 rounded text-[10px] bg-white hover:bg-gray-50 transition">Save for later</button>
                  </div>
                </div>

                <div className="text-right flex flex-col justify-between items-end min-w-[70px]">
                  <p className="font-bold text-[#1C1C1C] text-sm">{item.price}</p>
                  <select className="border border-gray-200 p-1 px-1.5 rounded-md bg-[#F8F9FA] text-xs text-gray-700 font-bold outline-none cursor-pointer"><option>Qty: {item.qty}</option></select>
                </div>
              </div>
            ))}

            <div className="flex justify-between items-center border-t border-gray-100 pt-4 text-xs font-semibold">
              <button onClick={() => setCurrentPage('home')} className="bg-blue-600 text-white px-4 py-2 rounded-md shadow-xs font-bold hover:bg-blue-700 transition">← Back to shop</button>
              <button className="text-blue-600 hover:underline">Clear shopping cart</button>
            </div>
          </main>
          
          {/* Calculation Summary Blocks */}
          <aside className="space-y-4">
            <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-2xs space-y-4 font-semibold text-gray-500">
              <p className="text-[#1C1C1C] font-bold text-xs">Have a coupon?</p>
              <div className="flex border border-gray-200 rounded-md overflow-hidden focus-within:border-blue-500">
                <input type="text" placeholder="Coupon code" className="px-3 py-2 w-full outline-none font-normal text-gray-700 text-xs bg-white" />
                <button className="bg-[#F8F9FA] text-blue-600 px-4 border-l border-gray-200 font-bold hover:bg-gray-100 transition">Apply</button>
              </div>

              <div className="space-y-2 pt-2 border-t border-gray-100 text-gray-500 font-medium">
                <div className="flex justify-between"><span>Subtotal:</span><span className="text-gray-800 font-bold">$844.41</span></div>
                <div className="flex justify-between"><span>Factory Bulk Discount:</span><span className="text-red-500">-$45.00</span></div>
                <div className="flex justify-between"><span>Cargo Insurance:</span><span className="text-[#00B517] font-bold">+$12.00</span></div>
                <div className="flex justify-between border-t border-gray-100 pt-3 text-[#1C1C1C] text-sm font-black"><span>Total Cost:</span><span className="text-base">$811.41</span></div>
              </div>
              <button className="w-full bg-[#27AE60] hover:bg-[#219653] text-white font-bold py-2.5 rounded-lg shadow-sm text-center block text-xs uppercase tracking-wide transition">Proceed to checkout</button>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-4 flex items-start space-x-3 text-xs text-gray-400">
              <span className="text-xl bg-orange-100 text-orange-600 p-1 rounded-full">🛡️</span>
              <div>
                <p className="font-bold text-gray-900 text-[11px]">Secure Trade Assurance</p>
                <p className="leading-tight mt-0.5">Your bulk apparel orders are fully protected under multi-tier logistics escrow monitoring.</p>
              </div>
            </div>
          </aside>

        </div>
      )}

      {/* Global Footer Newsletter */}
      <section className="bg-[#EFF2F4] border-t border-gray-200 mt-12 py-8 text-center text-xs">
        <div className="container mx-auto px-4 max-w-sm space-y-2">
          <h4 className="font-bold text-sm text-gray-900">Subscribe on our clothing newsletter</h4>
          <p className="text-gray-400">Get weekly updates regarding fashion trends and factory catalog rollouts</p>
          <div className="flex gap-2 pt-1">
            <input type="email" placeholder="✉ Email" className="w-full p-2 border rounded bg-white outline-none" />
            <button className="bg-blue-600 text-white font-bold px-4 rounded shadow-xs">Subscribe</button>
          </div>
        </div>
      </section>

      {/* Corporate Global Footer */}
      <footer className="bg-white py-8 text-xs text-gray-400 border-t border-gray-200">
        <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-6 gap-6">
          <div className="col-span-2 space-y-2">
            <div className="text-blue-600 font-bold text-lg flex items-center space-x-1"><span>👜</span><span className="text-gray-900">Brand</span></div>
            <p className="leading-relaxed text-gray-400 max-w-xs">Global apparel distribution matrix sourcing engine.</p>
          </div>
          {["About", "Partnership", "Information", "For users"].map((title, i) => (
            <div key={i} className="space-y-1">
              <h5 className="font-bold text-gray-900 mb-1">{title}</h5>
              <p className="text-gray-400 hover:text-blue-600 cursor-pointer">About Us</p>
              <p className="text-gray-400 hover:text-blue-600 cursor-pointer">Find factory</p>
              <p className="text-gray-400 hover:text-blue-600 cursor-pointer">Categories</p>
            </div>
          ))}
        </div>
        <div className="container mx-auto px-4 border-t mt-6 pt-4 flex justify-between text-[11px] text-gray-400 font-medium">
          <p>© 2026 Apparel Sourcing Hub.</p>
          <p>English ▾</p>
        </div>
      </footer>
      {/* 6. ADMIN CONTROL PANEL VIEW */}
      {currentPage === 'admin' && loggedInUser === 'admin@gmail.com' && (
        <div className="container mx-auto px-4 py-8 max-w-4xl text-left">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 border-b pb-2">⚙️ Admin Control Panel (CRUD Mode)</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Column: Form to add product */}
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h3 className="font-bold text-lg mb-4 text-blue-600">Add New Apparel Item</h3>
              <form onSubmit={handleAddProduct} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold mb-1 text-gray-700">Product Name</label>
                  <input required type="text" value={newProductName} onChange={(e) => setNewProductName(e.target.value)} className="w-full border p-2 rounded text-sm bg-white text-black outline-none" placeholder="e.g., Knit Sweaters" />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1 text-gray-700">Price (e.g., USD 18)</label>
                  <input required type="text" value={newProductPrice} onChange={(e) => setNewProductPrice(e.target.value)} className="w-full border p-2 rounded text-sm bg-white text-black outline-none" placeholder="USD 18" />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1 text-gray-700">Image URL</label>
                  <input required type="text" value={newProductImg} onChange={(e) => setNewProductImg(e.target.value)} className="w-full border p-2 rounded text-sm bg-white text-black outline-none" placeholder="https://unsplash.com/..." />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1 text-gray-700">Layout Section Placement</label>
                  <select value={newProductSection} onChange={(e) => setNewProductSection(e.target.value)} className="w-full border p-2 rounded text-sm bg-white text-black outline-none">
                    <option value="home_outdoor">Home & Outdoor Winter Collection</option>
                    <option value="clothing_trends">Consumer Apparel & Garments</option>
                  </select>
                </div>
                <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded text-sm font-bold hover:bg-blue-700 transition">Save Product to DB</button>
              </form>
            </div>

            {/* Right Column: Manage & Delete products */}
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm overflow-y-auto max-h-[500px]">
              <h3 className="font-bold text-lg mb-4 text-red-600">Existing Products in Database</h3>
              {products.length === 0 ? (
                <p className="text-sm text-gray-400">No products found in MongoDB database.</p>
              ) : (
                <div className="space-y-3">
                  {products.map((item) => (
                    <div key={item._id} className="flex items-center justify-between p-2 border rounded-md hover:bg-gray-50">
                      <div className="flex items-center space-x-3">
                        <img src={item.image || item.img} alt={item.name} className="w-10 h-10 object-cover rounded" />
                        <div>
                          <p className="text-xs font-bold text-gray-800 truncate max-w-[180px]">{item.name}</p>
                          <p className="text-[10px] text-gray-400">{item.price}</p>
                        </div>
                      </div>
                      <button onClick={() => handleDeleteProduct(item._id)} className="bg-red-50 text-red-600 hover:bg-red-100 text-xs px-2 py-1 rounded font-bold transition">Delete</button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
} 
// Force deployment update