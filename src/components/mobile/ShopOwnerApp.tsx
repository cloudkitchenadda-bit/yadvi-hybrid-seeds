import React, { useState } from 'react';
import { useAppState } from '../../context/AppStateContext';
import { SeedProduct } from '../../data/seedProducts';
import { DeviceFrame } from './DeviceFrame';
import confetti from 'canvas-confetti';
import {
  Home,
  Sprout,
  ShoppingCart,
  Truck,
  User,
  Search,
  Plus,
  Minus,
  Trash2,
  CheckCircle,
  Package,
  ArrowRight,
  ShieldCheck,
  MapPin,
  Clock,
  Sparkles,
  ChevronRight,
  Share2,
  LogOut
} from 'lucide-react';

export const ShopOwnerApp: React.FC = () => {
  const {
    products,
    cart,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    placeOrder,
    orders,
    shipments,
    selectedOrderForTrack,
    setSelectedOrderForTrack,
    setCurrentRole,
    authenticatedUser,
    handleLogout
  } = useAppState();

  const currentShopName = authenticatedUser?.metadata?.shop_name || 'My Shop';
  const currentDealerCode = authenticatedUser?.metadata?.dealer_code || 'YHS-DLR-XXX';
  const currentOwnerName = authenticatedUser?.full_name || 'Shop Owner';

  const [activeNav, setActiveNav] = useState<'home' | 'products' | 'cart' | 'orders' | 'tracking' | 'profile'>('home');
  const [selectedProduct, setSelectedProduct] = useState<SeedProduct | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [orderPlacedSuccess, setOrderPlacedSuccess] = useState<any | null>(null);

  // Filter products for Shop Owner
  const filteredProducts = products.filter((p) => {
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesSearch =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.sku.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const shopOrders = orders.filter((o) => o.shopName.includes(currentShopName) || true); // Backend should already filter it, but we can keep logic.
  const totalCartBags = cart.reduce((sum, item) => sum + item.quantityBags, 0);

  const handlePlaceOrder = async () => {
    if (cart.length === 0) return;

    // Trigger confetti celebration
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch (e) {
      // ignore in headless
    }

    try {
      const createdOrder = await placeOrder('Direct booking from Shop Owner App');
      setOrderPlacedSuccess(createdOrder);
      setSelectedOrderForTrack(createdOrder);
    } catch (err) {
      console.error('Error placing order:', err);
    }
  };

  return (
    <DeviceFrame appName="Yadvi Seeds - Dealer App">
      {/* Top Mobile App Header */}
      <header className="bg-[#0b3b2c] text-white px-4 py-3.5 flex items-center justify-between sticky top-0 z-20 shadow-md">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-700/80 p-1 flex items-center justify-center border border-emerald-500/30">
            <Sprout className="w-5 h-5 text-emerald-300" />
          </div>
          <div>
            <div className="font-bold text-xs leading-none">{currentShopName}</div>
            <div className="text-[10px] text-emerald-200/80 mt-0.5">Dealer Code: {currentDealerCode}</div>
          </div>
        </div>

        {/* Cart Quick Shortcut */}
        <button
          onClick={() => setActiveNav('cart')}
          className="relative p-2 rounded-xl bg-emerald-900/60 hover:bg-emerald-900 text-emerald-100 transition"
        >
          <ShoppingCart className="w-4 h-4" />
          {cart.length > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-amber-500 text-slate-950 font-black text-[9px] flex items-center justify-center">
              {cart.length}
            </span>
          )}
        </button>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 pb-20 overflow-y-auto">
        {/* ================= TAB 1: HOME ================= */}
        {activeNav === 'home' && (
          <div className="p-4 space-y-4">
            {/* Promotional Yadvi Banner */}
            <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-[#0b3b2c] to-[#07241b] text-white p-4.5 shadow-md border border-emerald-700/30">
              <div className="relative z-10 space-y-1.5 max-w-[70%]">
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/30 text-emerald-200 text-[9px] font-bold uppercase tracking-wider">
                  Kharif Season High Yield
                </span>
                <h2 className="text-base font-black leading-tight">Yadvi Hybrid Seeds Guarantee</h2>
                <p className="text-[11px] text-emerald-100/80 leading-relaxed">
                  90%+ certified germination with robust resistance against leaf curls & sucking pests.
                </p>
                <button
                  onClick={() => setActiveNav('products')}
                  className="mt-2 px-3 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-xs flex items-center gap-1.5 shadow"
                >
                  <span>Order Seeds Now</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Decorative graphic */}
              <div className="absolute -right-4 -bottom-4 w-32 h-32 opacity-20 pointer-events-none">
                <Sprout className="w-full h-full text-emerald-300" />
              </div>
            </div>

            {/* Quick Action Cards */}
            <div className="grid grid-cols-3 gap-2.5 text-center">
              <button
                onClick={() => setActiveNav('products')}
                className="p-3 bg-white rounded-xl border border-slate-200/80 shadow-xs hover:border-emerald-500 transition flex flex-col items-center justify-center gap-1.5"
              >
                <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center">
                  <Sprout className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-bold text-slate-800">Seed Catalog</span>
              </button>

              <button
                onClick={() => setActiveNav('orders')}
                className="p-3 bg-white rounded-xl border border-slate-200/80 shadow-xs hover:border-emerald-500 transition flex flex-col items-center justify-center gap-1.5"
              >
                <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-700 flex items-center justify-center">
                  <Package className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-bold text-slate-800">My Orders</span>
              </button>

              <button
                onClick={() => setActiveNav('tracking')}
                className="p-3 bg-white rounded-xl border border-slate-200/80 shadow-xs hover:border-emerald-500 transition flex flex-col items-center justify-center gap-1.5"
              >
                <div className="w-8 h-8 rounded-full bg-purple-50 text-purple-700 flex items-center justify-center">
                  <Truck className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-bold text-slate-800">LR Tracking</span>
              </button>
            </div>

            {/* Order & Shipment Status Widget */}
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-3.5 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-slate-900">Current Consignments</span>
                <button
                  onClick={() => setActiveNav('tracking')}
                  className="text-[11px] font-bold text-emerald-700 hover:underline"
                >
                  Track All →
                </button>
              </div>

              {shipments[0] && (
                <div className="p-3 bg-emerald-50/60 rounded-xl border border-emerald-200/80 flex items-center justify-between">
                  <div>
                    <div className="text-[10px] font-mono font-bold text-emerald-800">{shipments[0].lrNumber}</div>
                    <div className="font-bold text-xs text-slate-900">{shipments[0].shopName}</div>
                    <div className="text-[10px] text-slate-500">Status: <b>{shipments[0].status}</b></div>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-600 text-white font-bold">
                    In Transit
                  </span>
                </div>
              )}
            </div>

            {/* Popular Seeds Highlight with Real Packet Images */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-xs text-slate-900">Popular In Your Territory</h3>
                <button
                  onClick={() => setActiveNav('products')}
                  className="text-[11px] font-bold text-emerald-700 hover:underline"
                >
                  View All
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {products.slice(0, 4).map((p) => (
                  <div
                    key={p.id}
                    onClick={() => {
                      setSelectedProduct(p);
                      setActiveNav('products');
                    }}
                    className="bg-white rounded-xl border border-slate-200 p-2.5 shadow-xs flex flex-col justify-between cursor-pointer hover:border-emerald-500 transition"
                  >
                    <div className="h-32 bg-slate-100 rounded-lg p-1.5 flex items-center justify-center">
                      <img src={p.image} alt={p.name} className="max-h-full object-contain drop-shadow" />
                    </div>
                    <div className="mt-2">
                      <div className="font-bold text-[11px] text-slate-900 leading-tight truncate">{p.name}</div>
                      <div className="text-[9px] text-slate-400 font-mono mt-0.5">{p.sku}</div>
                      <div className="text-[10px] font-bold text-emerald-700 mt-1">Stock: {p.stockBags} Bags</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 2: PRODUCTS ================= */}
        {activeNav === 'products' && (
          <div className="p-4 space-y-4">
            {/* Search */}
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                placeholder="Search seed variety or SKU..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-emerald-600 shadow-xs"
              />
            </div>

            {/* Category Filter Horizontal Scroll */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
              {['All', 'Chilli', 'Okra', 'Dolichos', 'Pulses', 'Field Crops'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition ${
                    selectedCategory === cat
                      ? 'bg-emerald-800 text-white shadow-xs'
                      : 'bg-white border border-slate-200 text-slate-600'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Products List */}
            <div className="space-y-3">
              {filteredProducts.map((p) => (
                <div
                  key={p.id}
                  className="bg-white rounded-2xl border border-slate-200 p-3.5 shadow-xs flex gap-3 hover:border-emerald-400 transition"
                >
                  {/* Real Seed Packet Photo */}
                  <div
                    onClick={() => setSelectedProduct(p)}
                    className="w-24 h-28 bg-slate-100 rounded-xl p-1.5 flex items-center justify-center shrink-0 border border-slate-200 cursor-pointer"
                  >
                    <img src={p.image} alt={p.name} className="max-h-full object-contain drop-shadow" />
                  </div>

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-[9px] font-mono font-bold text-emerald-800 bg-emerald-50 px-1.5 py-0.2 rounded">
                          {p.sku}
                        </span>
                        <span className="text-[9px] font-bold text-emerald-700">{p.availability}</span>
                      </div>
                      <h4
                        onClick={() => setSelectedProduct(p)}
                        className="font-bold text-xs text-slate-900 mt-1 cursor-pointer hover:text-emerald-800 leading-snug"
                      >
                        {p.name}
                      </h4>
                      <p className="text-[10px] text-slate-500 line-clamp-2 mt-0.5 leading-relaxed">
                        {p.description}
                      </p>
                    </div>

                    <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-[10px] font-bold text-slate-700">Stock: {p.stockBags} Bags</span>
                      <button
                        onClick={() => {
                          addToCart(p, p.packageSizes[0] || 'Standard Pouch', 5);
                          alert(`Added 5 bags of ${p.name} to cart!`);
                        }}
                        className="px-3 py-1 bg-emerald-800 hover:bg-emerald-900 text-white rounded-lg text-[10px] font-bold transition flex items-center gap-1 shadow-xs cursor-pointer"
                      >
                        <Plus className="w-3 h-3" />
                        <span>Add to Cart</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= TAB 3: CART ================= */}
        {activeNav === 'cart' && (
          <div className="p-4 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm text-slate-900">Seed Indent / Order Cart</h3>
              <span className="text-xs font-bold text-emerald-800">{cart.length} Items Selected</span>
            </div>

            {orderPlacedSuccess ? (
              /* Order Confirmation matching requirements */
              <div className="bg-white rounded-2xl border border-emerald-300 p-6 text-center space-y-4 shadow-md animate-scale-in">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-600 block">
                    Submission Confirmed
                  </span>
                  <h4 className="text-lg font-black text-slate-900 mt-0.5">ORDER PLACED SUCCESSFULLY</h4>
                  <p className="text-xs text-slate-500 mt-1">
                    Order <b>{orderPlacedSuccess.orderNumber}</b> dispatched to Yadvi Central Fulfillment.
                  </p>
                </div>

                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-xs text-left space-y-1.5 font-mono">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Order ID:</span>
                    <span className="font-bold text-emerald-800">{orderPlacedSuccess.orderNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Shop:</span>
                    <span className="font-bold text-slate-800">{orderPlacedSuccess.shopName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Total Seed Bags:</span>
                    <span className="font-bold text-slate-800">{orderPlacedSuccess.totalQuantityBags} Bags</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Status:</span>
                    <span className="text-emerald-700 font-bold">New (Synced)</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <button
                    onClick={() => {
                      setOrderPlacedSuccess(null);
                      setActiveNav('tracking');
                    }}
                    className="w-full py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white font-bold rounded-xl text-xs shadow transition cursor-pointer"
                  >
                    Track Shipment Status →
                  </button>
                  <button
                    onClick={() => {
                      setOrderPlacedSuccess(null);
                      setActiveNav('products');
                    }}
                    className="w-full py-2 bg-slate-100 text-slate-700 font-bold rounded-xl text-xs hover:bg-slate-200 transition"
                  >
                    Order More Seeds
                  </button>
                </div>
              </div>
            ) : cart.length === 0 ? (
              <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center space-y-3">
                <ShoppingCart className="w-12 h-12 text-slate-300 mx-auto" />
                <h4 className="font-bold text-sm text-slate-800">Your Cart is Empty</h4>
                <p className="text-xs text-slate-400">Browse the catalog to add Yadvi hybrid seed varieties.</p>
                <button
                  onClick={() => setActiveNav('products')}
                  className="mt-2 px-4 py-2 bg-emerald-800 text-white font-bold rounded-xl text-xs shadow"
                >
                  Browse Catalogue
                </button>
              </div>
            ) : (
              <>
                <div className="space-y-2.5">
                  {cart.map((item) => (
                    <div
                      key={item.product.id}
                      className="bg-white rounded-xl border border-slate-200 p-3 shadow-xs flex items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-lg bg-slate-100 p-1 flex items-center justify-center shrink-0 border border-slate-200">
                          <img src={item.product.image} alt={item.product.name} className="max-h-full object-contain" />
                        </div>
                        <div>
                          <div className="font-bold text-xs text-slate-900 truncate max-w-[140px]">
                            {item.product.name}
                          </div>
                          <div className="text-[10px] text-slate-400 font-mono">
                            {item.packageSize}
                          </div>
                        </div>
                      </div>

                      {/* Quantity Controls (NO PRICE) */}
                      <div className="flex items-center gap-2">
                        <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-slate-50">
                          <button
                            onClick={() => updateCartQuantity(item.product.id, item.quantityBags - 1)}
                            className="p-1 hover:bg-slate-200 text-slate-600"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2 text-xs font-bold font-mono text-slate-900">
                            {item.quantityBags}
                          </span>
                          <button
                            onClick={() => updateCartQuantity(item.product.id, item.quantityBags + 1)}
                            className="p-1 hover:bg-slate-200 text-slate-600"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="p-1 text-slate-400 hover:text-red-500"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Order Summary (Strictly Bags, NO Price) */}
                <div className="bg-white rounded-xl border border-slate-200 p-4 space-y-2 text-xs">
                  <div className="font-bold text-slate-900 border-b border-slate-100 pb-2">Indent Summary</div>
                  <div className="flex justify-between text-slate-600">
                    <span>Total Varieties:</span>
                    <span className="font-bold text-slate-900">{cart.length} Varieties</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Total Consignment Volume:</span>
                    <span className="font-mono font-bold text-emerald-800 text-sm">{totalCartBags} Bags</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Destination Shop:</span>
                    <span className="font-bold text-slate-900">{currentShopName}</span>
                  </div>

                  <div className="pt-2 border-t border-slate-100">
                    <button
                      onClick={handlePlaceOrder}
                      className="w-full py-3 bg-emerald-800 hover:bg-emerald-900 text-white font-bold rounded-xl text-xs shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <CheckCircle className="w-4 h-4 text-emerald-300" />
                      <span>Place Seed Order ({totalCartBags} Bags)</span>
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        )}

        {/* ================= TAB 4: MY ORDERS ================= */}
        {activeNav === 'orders' && (
          <div className="p-4 space-y-3">
            <h3 className="font-bold text-sm text-slate-900">My Seed Orders ({shopOrders.length})</h3>

            <div className="space-y-3">
              {shopOrders.map((ord) => (
                <div
                  key={ord.id}
                  onClick={() => {
                    setSelectedOrderForTrack(ord);
                    setActiveNav('tracking');
                  }}
                  className="bg-white rounded-xl border border-slate-200 p-3.5 shadow-xs space-y-2 cursor-pointer hover:border-emerald-500 transition"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-black text-xs text-emerald-800">{ord.orderNumber}</span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        ord.status === 'New'
                          ? 'bg-amber-100 text-amber-800'
                          : ord.status === 'Dispatched' || ord.status === 'In Transit'
                          ? 'bg-blue-100 text-blue-800'
                          : ord.status === 'Delivered'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {ord.status}
                    </span>
                  </div>

                  <div className="text-xs text-slate-600 flex justify-between">
                    <span>{ord.totalItemsCount} Seed Varieties</span>
                    <span className="font-mono font-bold text-slate-900">{ord.totalQuantityBags} Bags</span>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400">
                    <span>{ord.orderDate}</span>
                    <span className="font-bold text-emerald-700 flex items-center gap-0.5">
                      Track LR <ChevronRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= TAB 5: TRACKING ================= */}
        {activeNav === 'tracking' && (
          <div className="p-4 space-y-4">
            <h3 className="font-bold text-sm text-slate-900">Consignment Live Status</h3>

            {selectedOrderForTrack ? (
              <div className="space-y-4">
                <div className="bg-[#0b3b2c] p-4 rounded-2xl text-white shadow">
                  <div className="text-[10px] text-emerald-200 font-mono">ORDER #{selectedOrderForTrack.orderNumber}</div>
                  <div className="font-bold text-sm mt-0.5">{selectedOrderForTrack.shopName}</div>
                  <div className="text-xs text-emerald-100/80 mt-1">
                    Volume: <b>{selectedOrderForTrack.totalQuantityBags} Bags</b>
                  </div>
                  {selectedOrderForTrack.lrNumber && (
                    <div className="mt-2 pt-2 border-t border-emerald-800/80 flex items-center justify-between text-xs">
                      <span>LR Docket:</span>
                      <span className="font-mono font-bold text-emerald-200">{selectedOrderForTrack.lrNumber}</span>
                    </div>
                  )}
                </div>

                {/* Tracking Stepper */}
                <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-4">
                  <div className="font-bold text-xs text-slate-800">Transit Milestones</div>

                  <div className="relative pl-5 space-y-5 before:content-[''] before:absolute before:left-2 before:top-1.5 before:bottom-1.5 before:w-0.5 before:bg-slate-200">
                    <div className="relative">
                      <span className="absolute -left-5 top-0.5 w-4 h-4 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[9px]">
                        ✓
                      </span>
                      <div className="font-bold text-xs text-slate-900">Order Received & Confirmed</div>
                      <div className="text-[10px] text-slate-500">Processed at Gannavaram Central Seed Plant</div>
                    </div>

                    <div className="relative">
                      <span
                        className={`absolute -left-5 top-0.5 w-4 h-4 rounded-full flex items-center justify-center text-[9px] ${
                          selectedOrderForTrack.status !== 'New' && selectedOrderForTrack.status !== 'Confirmed'
                            ? 'bg-emerald-600 text-white'
                            : 'bg-slate-200 text-slate-400'
                        }`}
                      >
                        {selectedOrderForTrack.status !== 'New' && selectedOrderForTrack.status !== 'Confirmed' ? '✓' : '2'}
                      </span>
                      <div className="font-bold text-xs text-slate-900">Moisture-Proof Packaging & Batch Tagging</div>
                      <div className="text-[10px] text-slate-500">ISTA certified testing verified</div>
                    </div>

                    <div className="relative">
                      <span
                        className={`absolute -left-5 top-0.5 w-4 h-4 rounded-full flex items-center justify-center text-[9px] ${
                          selectedOrderForTrack.lrNumber ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-400'
                        }`}
                      >
                        {selectedOrderForTrack.lrNumber ? '✓' : '3'}
                      </span>
                      <div className="font-bold text-xs text-slate-900">Transporter Dispatched (LR Issued)</div>
                      <div className="text-[10px] text-slate-500">
                        {selectedOrderForTrack.lrNumber ? `Docket ${selectedOrderForTrack.lrNumber}` : 'Awaiting transporter assignment'}
                      </div>
                    </div>

                    <div className="relative">
                      <span
                        className={`absolute -left-5 top-0.5 w-4 h-4 rounded-full flex items-center justify-center text-[9px] ${
                          selectedOrderForTrack.status === 'Delivered'
                            ? 'bg-emerald-600 text-white'
                            : 'bg-slate-200 text-slate-400'
                        }`}
                      >
                        {selectedOrderForTrack.status === 'Delivered' ? '✓' : '4'}
                      </span>
                      <div className="font-bold text-xs text-slate-900">Delivered to Dealer</div>
                      <div className="text-[10px] text-slate-500">Direct shop handover</div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-10 text-slate-400 text-xs">
                Select an order to view its live tracking timeline.
              </div>
            )}
          </div>
        )}

        {/* ================= TAB 6: PROFILE ================= */}
        {activeNav === 'profile' && (
          <div className="p-4 space-y-4 text-xs text-slate-700">
            <div className="bg-white rounded-2xl border border-slate-200 p-4 flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-800 font-black text-base flex items-center justify-center">
                {currentOwnerName.charAt(0)}
              </div>
              <div>
                <h4 className="font-bold text-sm text-slate-900">{currentOwnerName}</h4>
                <div className="text-slate-500 text-[11px]">{currentShopName}</div>
                <div className="text-emerald-700 font-mono text-[10px] mt-0.5">{authenticatedUser?.phone || '+91 00000 00000'}</div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-3">
              <div className="font-bold text-slate-900">Distributor Credentials</div>
              <div className="space-y-2 text-slate-600">
                <div className="flex justify-between">
                  <span>Seed License:</span>
                  <span className="font-mono font-bold text-slate-900">AP/GNT/SEED/2022/441</span>
                </div>
                <div className="flex justify-between">
                  <span>GSTIN:</span>
                  <span className="font-mono font-bold text-slate-900">37AABCU9603R1ZM</span>
                </div>
                <div className="flex justify-between">
                  <span>Territory Officer:</span>
                  <span className="font-bold text-emerald-800">Suresh Babu (+91 98765 43211)</span>
                </div>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="w-full mt-4 py-3 bg-red-50 text-red-600 hover:bg-red-100 font-bold rounded-xl text-xs shadow transition flex items-center justify-center gap-2 cursor-pointer border border-red-200"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        )}
      </div>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-sm w-full overflow-hidden border border-slate-200 animate-scale-in">
            <div className="relative h-64 bg-slate-100 p-4 flex items-center justify-center">
              <img src={selectedProduct.image} alt={selectedProduct.name} className="max-h-full object-contain drop-shadow-lg" />
              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute top-3 right-3 p-1 rounded-full bg-white/80 text-slate-700 hover:bg-white shadow"
              >
                ✕
              </button>
            </div>

            <div className="p-4 space-y-3 text-xs">
              <div>
                <span className="text-[10px] font-mono font-bold text-emerald-700 uppercase">{selectedProduct.sku}</span>
                <h3 className="font-bold text-sm text-slate-900">{selectedProduct.name}</h3>
                <p className="text-[11px] text-slate-500 mt-1">{selectedProduct.description}</p>
              </div>

              <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200 space-y-1 text-[11px]">
                <div className="flex justify-between">
                  <span className="text-slate-500">Germination:</span>
                  <span className="font-bold text-emerald-800">{selectedProduct.germinationRate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Maturity:</span>
                  <span className="font-bold text-slate-800">{selectedProduct.maturityDays}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Available Stock:</span>
                  <span className="font-mono font-bold text-slate-900">{selectedProduct.stockBags} Bags</span>
                </div>
              </div>

              <button
                onClick={() => {
                  addToCart(selectedProduct, selectedProduct.packageSizes[0] || 'Pouch', 5);
                  setSelectedProduct(null);
                  setActiveNav('cart');
                }}
                className="w-full py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white font-bold rounded-xl text-xs shadow transition flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add 5 Bags to Cart</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Navigation Bar */}
      <nav className="bg-white border-t border-slate-200 px-3 py-2 flex items-center justify-around absolute bottom-0 left-0 right-0 z-30 shadow-lg select-none">
        <button
          onClick={() => setActiveNav('home')}
          className={`flex flex-col items-center gap-0.5 text-[10px] font-bold transition ${
            activeNav === 'home' ? 'text-emerald-800' : 'text-slate-400 hover:text-slate-700'
          }`}
        >
          <Home className="w-4 h-4" />
          <span>Home</span>
        </button>

        <button
          onClick={() => setActiveNav('products')}
          className={`flex flex-col items-center gap-0.5 text-[10px] font-bold transition ${
            activeNav === 'products' ? 'text-emerald-800' : 'text-slate-400 hover:text-slate-700'
          }`}
        >
          <Sprout className="w-4 h-4" />
          <span>Products</span>
        </button>

        <button
          onClick={() => setActiveNav('cart')}
          className={`relative flex flex-col items-center gap-0.5 text-[10px] font-bold transition ${
            activeNav === 'cart' ? 'text-emerald-800' : 'text-slate-400 hover:text-slate-700'
          }`}
        >
          <ShoppingCart className="w-4 h-4" />
          <span>Cart</span>
          {cart.length > 0 && (
            <span className="absolute -top-1 right-2 w-3.5 h-3.5 bg-amber-500 text-slate-950 font-black text-[8px] rounded-full flex items-center justify-center">
              {cart.length}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveNav('orders')}
          className={`flex flex-col items-center gap-0.5 text-[10px] font-bold transition ${
            activeNav === 'orders' ? 'text-emerald-800' : 'text-slate-400 hover:text-slate-700'
          }`}
        >
          <Package className="w-4 h-4" />
          <span>Orders</span>
        </button>

        <button
          onClick={() => setActiveNav('tracking')}
          className={`flex flex-col items-center gap-0.5 text-[10px] font-bold transition ${
            activeNav === 'tracking' ? 'text-emerald-800' : 'text-slate-400 hover:text-slate-700'
          }`}
        >
          <Truck className="w-4 h-4" />
          <span>Tracking</span>
        </button>

        <button
          onClick={() => setActiveNav('profile')}
          className={`flex flex-col items-center gap-0.5 text-[10px] font-bold transition ${
            activeNav === 'profile' ? 'text-emerald-800' : 'text-slate-400 hover:text-slate-700'
          }`}
        >
          <User className="w-4 h-4" />
          <span>Profile</span>
        </button>
      </nav>
    </DeviceFrame>
  );
};
