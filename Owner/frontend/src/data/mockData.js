export const metrics = [
  {
    id: 1,
    title: "Total Sales",
    value: "$128,450",
    trend: "+14.2%",
    tone: "emerald"
  },
  {
    id: 2,
    title: "Items Low on Stock",
    value: "32",
    trend: "6 critical",
    tone: "amber"
  },
  {
    id: 3,
    title: "AI Actions Taken",
    value: "218",
    trend: "Today: 17",
    tone: "indigo"
  },
  {
    id: 4,
    title: "Auto Reorders Triggered",
    value: "41",
    trend: "This month",
    tone: "teal"
  }
];

export const sales30Days = [
  4200, 5100, 4800, 5300, 5900, 6100, 6400, 6300, 6800, 7200,
  7400, 7000, 7600, 8100, 7900, 8350, 8900, 9100, 9400, 9600,
  9900, 10100, 9800, 10300, 10600, 10900, 11200, 11400, 11800, 12100
];

const svgDataUri = (label, primary, secondary) => {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240">
      <defs>
        <linearGradient id="g" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stop-color="${primary}" />
          <stop offset="100%" stop-color="${secondary}" />
        </linearGradient>
      </defs>
      <rect width="320" height="240" rx="28" fill="url(#g)" />
      <circle cx="260" cy="52" r="38" fill="rgba(255,255,255,0.14)" />
      <circle cx="72" cy="184" r="52" fill="rgba(255,255,255,0.12)" />
      <text x="32" y="132" fill="white" font-size="28" font-family="Arial, sans-serif" font-weight="700">${label}</text>
      <text x="32" y="164" fill="rgba(255,255,255,0.8)" font-size="14" font-family="Arial, sans-serif">Premium catalog mockup</text>
    </svg>
  `;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
};

export const inventoryItems = [
  {
    id: "SKU-1001",
    name: "EcoBlend Coffee Beans",
    category: "Beverages",
    qty: 184,
    status: "In Stock",
    price: 18.5,
    rating: 4.8,
    salesVelocity: "High",
    supplier: "RoastLine Co.",
    supplierEmail: "orders@roastline.co",
    supplierPhone: "+1 555 210 4412",
    purchaseLink: "https://supplier.example.com/roastline-coffee",
    threshold: 40,
    image: svgDataUri("EcoBlend", "#0f766e", "#1d4ed8"),
    description: "A premium medium roast blend designed for morning espresso and batch brews.",
    aiReply:
      "AI insight: inventory is healthy. Keep current stock levels and monitor weekend sales for any reorder spike.",
    reviews: [
      { name: "Maya", rating: 5, comment: "Smooth flavor with a balanced aroma. Customers reorder it often." },
      { name: "Daniel", rating: 4, comment: "Good quality beans. Very consistent across batches." }
    ],
    attributes: ["Arabica blend", "Medium roast", "Fast-moving bestseller"]
  },
  {
    id: "SKU-1002",
    name: "Smart Thermal Mug",
    category: "Accessories",
    qty: 22,
    status: "Low",
    price: 29,
    rating: 4.6,
    salesVelocity: "Medium",
    supplier: "UrbanSip",
    supplierEmail: "sales@urbansip.example",
    supplierPhone: "+1 555 210 4488",
    purchaseLink: "https://supplier.example.com/urbansip-mug",
    threshold: 30,
    image: svgDataUri("Thermal Mug", "#7c3aed", "#0f766e"),
    description: "Double-wall insulated mug with temperature retention and spill-resistant lid.",
    aiReply:
      "AI insight: reorder soon. This item is trending upward and may hit low stock within 5 days.",
    reviews: [
      { name: "Priya", rating: 5, comment: "Looks premium and keeps drinks hot for hours." },
      { name: "Rohan", rating: 4, comment: "Useful product for gifting, strong customer feedback." }
    ],
    attributes: ["Thermal insulation", "Leak resistant", "Gift-ready packaging"]
  },
  {
    id: "SKU-1003",
    name: "Organic Matcha Pack",
    category: "Beverages",
    qty: 0,
    status: "Out of Stock",
    price: 24,
    rating: 4.9,
    salesVelocity: "Critical",
    supplier: "ZenLeaf Farms",
    supplierEmail: "orders@zenleaffarms.example",
    supplierPhone: "+1 555 210 4415",
    purchaseLink: "https://supplier.example.com/zenleaf-matcha",
    threshold: 35,
    image: svgDataUri("Matcha Pack", "#15803d", "#0f766e"),
    description: "Ceremonial-grade matcha for premium latte menus and wellness kits.",
    aiReply:
      "AI insight: urgent reorder recommended. Projected lost revenue from stockout is estimated at $1,400 over 7 days.",
    reviews: [
      { name: "Aarti", rating: 5, comment: "Very vibrant color and strong repeat purchase rate." },
      { name: "Kunal", rating: 5, comment: "High-end customer favorite, should stay stocked at all times." }
    ],
    attributes: ["Ceremonial grade", "High margin", "Urgent restock candidate"]
  },
  {
    id: "SKU-1004",
    name: "Bamboo Stirrer Set",
    category: "Kitchen",
    qty: 75,
    status: "In Stock",
    price: 7.5,
    rating: 4.3,
    salesVelocity: "Low",
    supplier: "EcoServe Tools",
    supplierEmail: "hello@ecoserve.tools",
    supplierPhone: "+1 555 210 4421",
    purchaseLink: "https://supplier.example.com/ecoserve-stirrers",
    threshold: 20,
    image: svgDataUri("Bamboo Set", "#92400e", "#0f766e"),
    description: "Reusable stirrer set for in-house beverage service and eco-conscious buyers.",
    aiReply: "AI insight: stable stock. No immediate action required, but keep a backup reorder draft ready.",
    reviews: [
      { name: "Neha", rating: 4, comment: "Simple and eco-friendly. Works well for café use." },
      { name: "Arjun", rating: 4, comment: "Customers like the sustainability angle and texture." }
    ],
    attributes: ["Eco-friendly", "Reusable", "Low-cost add-on"]
  },
  {
    id: "SKU-1005",
    name: "Vanilla Syrup Bottle",
    category: "Ingredients",
    qty: 17,
    status: "Low",
    price: 11.25,
    rating: 4.5,
    salesVelocity: "Medium",
    supplier: "SweetBase Labs",
    supplierEmail: "sales@sweetbase.labs",
    supplierPhone: "+1 555 210 4492",
    purchaseLink: "https://supplier.example.com/sweetbase-syrup",
    threshold: 25,
    image: svgDataUri("Vanilla Syrup", "#c2410c", "#7c3aed"),
    description: "Flavor syrup for desserts and beverages, frequently used in café orders.",
    aiReply:
      "AI insight: create reorder draft now. This item is critical to maintaining menu availability.",
    reviews: [
      { name: "Isha", rating: 5, comment: "Great flavor consistency and very popular with customers." },
      { name: "Mohit", rating: 4, comment: "Reliable supplier quality and good shelf life." }
    ],
    attributes: ["Café staple", "High utility", "Good shelf life"]
  },
  {
    id: "SKU-1006",
    name: "Reusable Tote Bag",
    category: "Merchandise",
    qty: 138,
    status: "In Stock",
    price: 9,
    rating: 4.7,
    salesVelocity: "High",
    supplier: "BrandLoop",
    supplierEmail: "orders@brandloop.example",
    supplierPhone: "+1 555 210 4455",
    purchaseLink: "https://supplier.example.com/brandloop-tote",
    threshold: 50,
    image: svgDataUri("Tote Bag", "#1d4ed8", "#0f766e"),
    description: "Branded tote bag for purchases, gifting, and promotional upsells.",
    aiReply: "AI insight: excellent stock position. Consider bundling with premium products to increase AOV.",
    reviews: [
      { name: "Sara", rating: 5, comment: "Looks premium and has strong customer appeal." },
      { name: "Dev", rating: 5, comment: "Durable and a great add-on to orders." }
    ],
    attributes: ["Promotional item", "Durable canvas", "Bundle-friendly"]
  },
  {
    id: "SKU-1007",
    name: "Cold Brew Filter Kit",
    category: "Kitchen",
    qty: 9,
    status: "Low",
    price: 21,
    rating: 4.4,
    salesVelocity: "Medium",
    supplier: "BrewCraft Pro",
    supplierEmail: "support@brewcraftpro.example",
    supplierPhone: "+1 555 210 4470",
    purchaseLink: "https://supplier.example.com/brewcraft-filter",
    threshold: 18,
    image: svgDataUri("Filter Kit", "#0f172a", "#0f766e"),
    description: "Compact filter kit for cold brew prep and home café setups.",
    aiReply:
      "AI insight: reorder suggested within 48 hours. Bundle with coffee beans for a better margin.",
    reviews: [
      { name: "Kabir", rating: 4, comment: "Customers love the convenience and packaging." },
      { name: "Anika", rating: 5, comment: "A clean, dependable product with strong upsell potential." }
    ],
    attributes: ["Home café use", "Upsell candidate", "Compact kit"]
  },
  {
    id: "SKU-1008",
    name: "Hazelnut Creamer",
    category: "Ingredients",
    qty: 0,
    status: "Out of Stock",
    price: 12.4,
    rating: 4.9,
    salesVelocity: "Critical",
    supplier: "CreamCo",
    supplierEmail: "orders@creamco.example",
    supplierPhone: "+1 555 210 4433",
    purchaseLink: "https://supplier.example.com/creamco-hazelnut-creamer",
    threshold: 30,
    image: svgDataUri("Creamer", "#8b5cf6", "#c2410c"),
    description: "Popular creamer used in lattes and specialty drinks for a sweet hazelnut profile.",
    aiReply:
      "AI insight: immediate reorder is necessary. Customer churn risk is high if this stays unavailable.",
    reviews: [
      { name: "Nisha", rating: 5, comment: "One of the highest-rated add-ins on the menu." },
      { name: "Farhan", rating: 5, comment: "Repeatedly requested by regular customers." }
    ],
    attributes: ["High repeat demand", "Menu-critical", "Stockout risk"]
  }
];

export const categories = ["All", "Beverages", "Accessories", "Kitchen", "Ingredients", "Merchandise"];

export const chatMessages = [
  {
    id: 1,
    sender: "user",
    text: "Give me a stock summary for this week."
  },
  {
    id: 2,
    sender: "ai",
    text: "You have 32 low-stock items. 6 are critical and may run out in under 3 days based on current velocity."
  },
  {
    id: 3,
    sender: "user",
    text: "Which product should I reorder first?"
  },
  {
    id: 4,
    sender: "ai",
    text: "Priority reorder: Organic Matcha Pack and Hazelnut Creamer. Combined projected revenue impact is approximately $4,200 this week."
  },
  {
    id: 5,
    sender: "user",
    text: "Create a reorder suggestion for all low stock kitchen items."
  },
  {
    id: 6,
    sender: "ai",
    text: "Recommended order: Cold Brew Filter Kit (40 units), Bamboo Stirrer Set (20 units). This maintains a 14-day safety stock."
  }
];

export const notifications = [
  "AI placed 2 reorder drafts",
  "New weekly analytics report ready",
  "3 products became low stock in the last hour"
];

export const suppliers = [
  {
    id: "SUP-01",
    name: "RoastLine Co.",
    email: "orders@roastline.co",
    phone: "+1 555 210 4412",
    website: "https://supplier.example.com/roastline-coffee",
    leadTime: "2 days",
    fillRate: 98,
    activeOrders: 4,
    rating: 4.9,
    products: ["EcoBlend Coffee Beans", "Holiday Roast Bundle"],
    category: "Beverages",
    status: "Preferred"
  },
  {
    id: "SUP-02",
    name: "ZenLeaf Farms",
    email: "orders@zenleaffarms.example",
    phone: "+1 555 210 4415",
    website: "https://supplier.example.com/zenleaf-matcha",
    leadTime: "4 days",
    fillRate: 94,
    activeOrders: 2,
    rating: 4.8,
    products: ["Organic Matcha Pack", "Ceremonial Matcha Tin"],
    category: "Beverages",
    status: "Watch"
  },
  {
    id: "SUP-03",
    name: "SweetBase Labs",
    email: "sales@sweetbase.labs",
    phone: "+1 555 210 4492",
    website: "https://supplier.example.com/sweetbase-syrup",
    leadTime: "3 days",
    fillRate: 96,
    activeOrders: 5,
    rating: 4.7,
    products: ["Vanilla Syrup Bottle", "Caramel Syrup Bottle"],
    category: "Ingredients",
    status: "Preferred"
  },
  {
    id: "SUP-04",
    name: "BrewCraft Pro",
    email: "support@brewcraftpro.example",
    phone: "+1 555 210 4470",
    website: "https://supplier.example.com/brewcraft-filter",
    leadTime: "5 days",
    fillRate: 91,
    activeOrders: 1,
    rating: 4.5,
    products: ["Cold Brew Filter Kit", "Pour Over Kit"],
    category: "Kitchen",
    status: "Active"
  }
];

export const reorderOpportunities = [
  {
    id: 1,
    name: "Organic Matcha Pack",
    qty: 0,
    suggestedOrder: 60,
    supplier: "ZenLeaf Farms",
    urgency: "Critical",
    margin: "High"
  },
  {
    id: 2,
    name: "Hazelnut Creamer",
    qty: 0,
    suggestedOrder: 50,
    supplier: "CreamCo",
    urgency: "Critical",
    margin: "High"
  },
  {
    id: 3,
    name: "Cold Brew Filter Kit",
    qty: 9,
    suggestedOrder: 40,
    supplier: "BrewCraft Pro",
    urgency: "Soon",
    margin: "Medium"
  }
];

export const orders = [
  {
    id: "ORD-9001",
    item: "Organic Matcha Pack",
    supplier: "ZenLeaf Farms",
    quantity: 60,
    total: 1440,
    status: "Draft",
    eta: "4 days",
    source: "AI generated",
    createdAt: "Today"
  },
  {
    id: "ORD-9002",
    item: "Hazelnut Creamer",
    supplier: "CreamCo",
    quantity: 50,
    total: 620,
    status: "Pending",
    eta: "3 days",
    source: "Owner review",
    createdAt: "Today"
  },
  {
    id: "ORD-9003",
    item: "Cold Brew Filter Kit",
    supplier: "BrewCraft Pro",
    quantity: 40,
    total: 840,
    status: "Approved",
    eta: "5 days",
    source: "Auto-approved",
    createdAt: "Yesterday"
  },
  {
    id: "ORD-9004",
    item: "Vanilla Syrup Bottle",
    supplier: "SweetBase Labs",
    quantity: 24,
    total: 270,
    status: "Shipped",
    eta: "In transit",
    source: "Supplier confirmed",
    createdAt: "2 days ago"
  }
];
