// ==============================
// TECHVERSE PRODUCT DATABASE
// EDIT PRODUCTS HERE
// ==============================

import { Product } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'mac15',
    name: 'Apple MacBook Air 15-inch M4',
    brand: 'Apple',
    category: 'Laptops',
    price: 134900,
    originalPrice: 144900,
    rating: 4.9,
    reviewCount: 342,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1000&q=80',
    description: 'The world’s best thin and light laptop is now supercharged by the Apple M4 chip. Delivering up to 24 hours of battery life and an expansive 15.3-inch Liquid Retina display.',
    features: [
      'Next-generation 10-core M4 chip with 38 TOPS Neural Engine',
      '15.3-inch Liquid Retina display with 500 nits brightness',
      'Fanless, completely silent unibody design',
      'Up to 24 hours of battery life',
      'MagSafe 3 charging port + Dual Thunderbolt 4 ports'
    ],
    specifications: {
      processor: 'Apple M4 (10-Core CPU, 10-Core GPU)',
      display: '15.3-inch Liquid Retina (2880 x 1864)',
      ram: '16GB Unified Memory',
      storage: '512GB High-Speed NVMe SSD',
      battery: '66.5Wh Lithium Polymer (24 hrs)',
      camera: '1080p FaceTime HD camera with Center Stage',
      gpu: '10-Core Apple GPU with Ray Tracing',
      weight: '1.51 kg',
      connectivity: 'Wi-Fi 6E (802.11ax), Bluetooth 5.3'
    },
    inStock: true,
    stockCount: 18,
    modelType: 'laptop',
    colors: [
      { name: 'Midnight', hex: '#1e2530', materialColor: 0x1a222d },
      { name: 'Starlight', hex: '#f0e5d8', materialColor: 0xe6dacb },
      { name: 'Space Gray', hex: '#7d7e80', materialColor: 0x6e7073 },
      { name: 'Silver', hex: '#e3e4e6', materialColor: 0xd8dadc }
    ],
    tag: 'Flagship'
  },
  {
    id: 'mac13',
    name: 'Apple MacBook Air 13-inch M4',
    brand: 'Apple',
    category: 'Laptops',
    price: 109900,
    originalPrice: 119900,
    rating: 4.8,
    reviewCount: 512,
    image: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=1000&q=80',
    description: 'Ultra-portable powerhouse with the speed of M4. Fits effortlessly into any backpack with blistering single-core performance and stunning visual fidelity.',
    features: [
      'Apple M4 chip with 10-core CPU and hardware-accelerated ray tracing',
      '13.6-inch Liquid Retina display with True Tone technology',
      'Weighs only 1.24 kg for ultimate go-anywhere capability',
      'Four-speaker sound system with Spatial Audio support',
      'Touch ID fingerprint sensor on Magic Keyboard'
    ],
    specifications: {
      processor: 'Apple M4 (10-Core CPU, 8-Core GPU)',
      display: '13.6-inch Liquid Retina (2560 x 1664)',
      ram: '16GB Unified Memory',
      storage: '256GB High-Speed SSD',
      battery: '52.6Wh Lithium Polymer (18 hrs)',
      camera: '1080p FaceTime HD',
      gpu: '8-Core Apple GPU',
      weight: '1.24 kg',
      connectivity: 'Wi-Fi 6E, Bluetooth 5.3'
    },
    inStock: true,
    stockCount: 25,
    modelType: 'laptop',
    colors: [
      { name: 'Midnight', hex: '#1e2530', materialColor: 0x1a222d },
      { name: 'Starlight', hex: '#f0e5d8', materialColor: 0xe6dacb },
      { name: 'Silver', hex: '#e3e4e6', materialColor: 0xd8dadc }
    ],
    tag: 'Bestseller'
  },
  {
    id: 's26ultra',
    name: 'Samsung Galaxy S26 Ultra',
    brand: 'Samsung',
    category: 'Smartphones',
    price: 139999,
    originalPrice: 149999,
    rating: 4.9,
    reviewCount: 418,
    image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=1000&q=80',
    description: 'The pinnacle of mobile engineering. Crafted with an aerospace-grade titanium frame, 200MP Quad-Telephoto computational camera, integrated S-Pen, and Snapdragon 8 Gen 5.',
    features: [
      'Snapdragon 8 Gen 5 for Galaxy (3nm Extreme Edition)',
      '6.8-inch Dynamic AMOLED 2X, 1-120Hz LTPO, 3000 nits peak',
      '200MP Main + 50MP 5x Periscope + 50MP 3x + 50MP Ultra-Wide',
      'Integrated Bluetooth S-Pen stylus with air gestures',
      '5500mAh battery with 65W Super Fast Charging 2.0'
    ],
    specifications: {
      processor: 'Qualcomm Snapdragon 8 Gen 5 (4.3 GHz)',
      display: '6.8-inch Dynamic AMOLED 2X QHD+ (3120 x 1440)',
      ram: '16GB LPDDR5X',
      storage: '512GB UFS 4.1',
      battery: '5500mAh with 65W wired, 25W wireless',
      camera: '200MP OIS + 50MP Periscope 5x + 50MP 3x + 50MP UW',
      gpu: 'Adreno 840 (Hardware Ray Tracing)',
      weight: '232 g',
      connectivity: '5G Sub-6/mmWave, Wi-Fi 7, UWB, Bluetooth 5.4'
    },
    inStock: true,
    stockCount: 14,
    modelType: 'phone',
    colors: [
      { name: 'Titanium Gray', hex: '#5b5d61', materialColor: 0x4f5256 },
      { name: 'Titanium Black', hex: '#222326', materialColor: 0x1f2022 },
      { name: 'Titanium Violet', hex: '#584d6b', materialColor: 0x4b3f60 },
      { name: 'Titanium Amber', hex: '#caa574', materialColor: 0xbf9862 }
    ],
    tag: 'Flagship'
  },
  {
    id: 's26',
    name: 'Samsung Galaxy S26',
    brand: 'Samsung',
    category: 'Smartphones',
    price: 79999,
    originalPrice: 84999,
    rating: 4.7,
    reviewCount: 289,
    image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=1000&q=80',
    description: 'Compact brilliance. An ergonomic flagship smartphone with symmetrical bezels, vivid 120Hz AMOLED display, AI photography engine, and all-day power.',
    features: [
      'Ergonomic 6.2-inch flat Armor Aluminum 2.0 unibody',
      'Dynamic AMOLED 2X with Vision Booster technology',
      'Triple camera system with ProVisual AI Engine',
      '4000mAh battery with optimized thermal vapor chamber',
      'IP68 water and dust resistance'
    ],
    specifications: {
      processor: 'Snapdragon 8 Gen 5 / Exynos 2600',
      display: '6.2-inch FHD+ Dynamic AMOLED 2X (2340 x 1080)',
      ram: '12GB LPDDR5X',
      storage: '256GB UFS 4.0',
      battery: '4000mAh with 45W Fast Charging',
      camera: '50MP OIS Main + 12MP Ultra-Wide + 10MP 3x Telephoto',
      gpu: 'Adreno 840',
      weight: '167 g',
      connectivity: '5G, Wi-Fi 7, Bluetooth 5.3'
    },
    inStock: true,
    stockCount: 30,
    modelType: 'phone',
    colors: [
      { name: 'Onyx Black', hex: '#202124', materialColor: 0x18191c },
      { name: 'Marble Gray', hex: '#d9dce1', materialColor: 0xd0d3d8 },
      { name: 'Cobalt Violet', hex: '#4f4b66', materialColor: 0x47425e },
      { name: 'Amber Yellow', hex: '#f2e5b8', materialColor: 0xebdca5 }
    ],
    tag: 'Trending'
  },
  {
    id: 'iphone16pm',
    name: 'Apple iPhone 16 Pro Max',
    brand: 'Apple',
    category: 'Smartphones',
    price: 144900,
    originalPrice: 159900,
    rating: 4.9,
    reviewCount: 630,
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=1000&q=80',
    description: 'Forged in Grade 5 Titanium with larger 6.9-inch Super Retina XDR display, dedicated capacitive Camera Control button, and the revolutionary A18 Pro silicon.',
    features: [
      'A18 Pro chip with 6-core GPU and hardware ray tracing',
      'Dedicated Camera Control haptic sensor on sapphire crystal',
      '48MP Fusion camera with 4K 120 fps Dolby Vision recording',
      '5x Tetraprism Telephoto optical zoom camera',
      'Longest battery life ever on any iPhone'
    ],
    specifications: {
      processor: 'Apple A18 Pro (3nm second-generation)',
      display: '6.9-inch Super Retina XDR OLED (2868 x 1320)',
      ram: '8GB Unified Memory',
      storage: '256GB NVMe',
      battery: '4685mAh with MagSafe & Qi2 wireless',
      camera: '48MP Fusion + 48MP Ultra Wide + 12MP 5x Telephoto',
      gpu: 'Apple 6-Core Pro GPU',
      weight: '227 g',
      connectivity: '5G, Wi-Fi 7, Bluetooth 5.3, Second-gen UWB'
    },
    inStock: true,
    stockCount: 12,
    modelType: 'phone',
    colors: [
      { name: 'Desert Titanium', hex: '#c5b49d', materialColor: 0xb9a68e },
      { name: 'Natural Titanium', hex: '#99948e', materialColor: 0x8a847e },
      { name: 'White Titanium', hex: '#f2f2f0', materialColor: 0xe8e8e6 },
      { name: 'Black Titanium', hex: '#31302e', materialColor: 0x242422 }
    ],
    tag: 'Flagship'
  },
  {
    id: 'pixel9pro',
    name: 'Google Pixel 9 Pro',
    brand: 'Google',
    category: 'Smartphones',
    price: 106999,
    originalPrice: 112999,
    rating: 4.8,
    reviewCount: 194,
    image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=1000&q=80',
    description: 'Engineered by Google with custom Tensor G4 chip, iconic dual-finish camera visor bar, Gemini Nano multimodal AI integration, and the finest computational photography.',
    features: [
      'Google Tensor G4 processor with Titan M2 security coprocessor',
      'Iconic horizontal sculpted camera visor bar',
      '6.3-inch Super Actua LTPO OLED with 3000 nits peak',
      'Gemini Live AI multimodal assistant built into OS',
      '7 years of guaranteed Android OS and security upgrades'
    ],
    specifications: {
      processor: 'Google Tensor G4 (4nm Octa-core)',
      display: '6.3-inch Super Actua OLED (2856 x 1280, 120Hz)',
      ram: '16GB LPDDR5X',
      storage: '256GB UFS 3.1',
      battery: '4700mAh with 30W Fast Charging',
      camera: '50MP Octa PD Main + 48MP UW Macro + 48MP 5x Quad PD',
      gpu: 'Mali-G715 MC7',
      weight: '199 g',
      connectivity: 'Wi-Fi 7, 5G Sub6/mmWave, Satellite SOS'
    },
    inStock: true,
    stockCount: 16,
    modelType: 'phone',
    colors: [
      { name: 'Obsidian', hex: '#26292b', materialColor: 0x1e2022 },
      { name: 'Porcelain', hex: '#f0ede6', materialColor: 0xe5e1d9 },
      { name: 'Hazel', hex: '#7c857f', materialColor: 0x6e7771 },
      { name: 'Rose Quartz', hex: '#eed0cb', materialColor: 0xdfbfba }
    ],
    tag: 'New'
  },
  {
    id: 'rogscar16',
    name: 'ASUS ROG Strix SCAR 16',
    brand: 'ASUS',
    category: 'Gaming',
    price: 289990,
    originalPrice: 319990,
    rating: 4.9,
    reviewCount: 156,
    image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=1000&q=80',
    description: 'Dominate esports tournaments with Intel Core i9 14900HX, NVIDIA GeForce RTX 4090, 240Hz Mini LED Nebula HDR display, and Conductonaut liquid metal cooling.',
    features: [
      'Intel Core i9-14900HX 24-core processor (up to 5.8 GHz)',
      'NVIDIA GeForce RTX 4090 Laptop GPU (175W Max TGP)',
      'ROG Nebula HDR 16-inch 2.5K 240Hz Mini LED panel (1100 nits)',
      'Tri-Fan technology with full-surround heatsink and liquid metal',
      'Per-key RGB mechanical chiclet keyboard'
    ],
    specifications: {
      processor: 'Intel Core i9-14900HX (24 Cores, 32 Threads)',
      display: '16-inch QHD+ 16:10 Mini LED (2560 x 1600, 240Hz, 3ms)',
      ram: '32GB DDR5-5600MHz (expandable to 64GB)',
      storage: '2TB PCIe 4.0 NVMe M.2 Performance SSD (RAID 0)',
      battery: '90Wh with 330W ROG Power Adapter',
      camera: '720p HD with IR Windows Hello',
      gpu: 'NVIDIA GeForce RTX 4090 Laptop (16GB GDDR6)',
      weight: '2.65 kg',
      connectivity: 'Wi-Fi 6E, 2.5G LAN, Thunderbolt 4, HDMI 2.1'
    },
    inStock: true,
    stockCount: 8,
    modelType: 'laptop',
    colors: [
      { name: 'Eclipse Gray / Cyberpunk RGB', hex: '#23272d', materialColor: 0x1a1d22 }
    ],
    tag: 'Flagship'
  },
  {
    id: 'legion7i',
    name: 'Lenovo Legion Pro 7i Gen 9',
    brand: 'Lenovo',
    category: 'Gaming',
    price: 249990,
    originalPrice: 269990,
    rating: 4.8,
    reviewCount: 122,
    image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=1000&q=80',
    description: 'AI-tuned battle-station laptop powered by Lenovo LA-2 AI chip, RTX 4080 graphics, Coldfront Vapor chamber thermal management, and Legion TrueStrike keyboard.',
    features: [
      'Lenovo Legion Coldfront: Vapor cooling with dual hybrid fans',
      'AI-tuned system performance with LA-2 AI hardware chip',
      '16-inch PureSight Gaming display with 240Hz refresh rate',
      'Legion TrueStrike keyboard with 100% anti-ghosting',
      'Rapid Charge Pro (0 to 80% in 30 minutes)'
    ],
    specifications: {
      processor: 'Intel Core i9-14900HX (24 Cores, 5.8 GHz)',
      display: '16-inch WQXGA IPS (2560 x 1600, 240Hz, 500 nits, G-Sync)',
      ram: '32GB DDR5-5600MHz',
      storage: '1TB M.2 2280 PCIe Gen 4 SSD',
      battery: '99.9Wh with Super Rapid Charge',
      camera: '1080p FHD with E-shutter',
      gpu: 'NVIDIA GeForce RTX 4080 (12GB GDDR6, 175W)',
      weight: '2.62 kg',
      connectivity: 'Wi-Fi 6E, Bluetooth 5.2, RJ-45 LAN'
    },
    inStock: true,
    stockCount: 10,
    modelType: 'laptop',
    colors: [
      { name: 'Onyx Grey', hex: '#2a2b2f', materialColor: 0x222326 }
    ],
    tag: 'Trending'
  },
  {
    id: 'dellxps16',
    name: 'Dell XPS 16 OLED',
    brand: 'Dell',
    category: 'Laptops',
    price: 219900,
    originalPrice: 239900,
    rating: 4.7,
    reviewCount: 98,
    image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=1000&q=80',
    description: 'Futuristic CNC machined aluminum laptop with borderless InfinityEdge 4K+ OLED touchscreen, invisible seamless glass trackpad, and touch function row.',
    features: [
      'Seamless glass palm rest with integrated zero-lattice keyboard',
      'Capacitive touch function row with LED backlighting',
      '16.3-inch 4K+ OLED InfinityEdge display with 100% DCI-P3',
      'Intel Core Ultra 9 with dedicated Intel AI Boost NPU',
      'Studio sound quad-speaker system with Waves MaxxAudio'
    ],
    specifications: {
      processor: 'Intel Core Ultra 9 185H (16 Cores, 5.1 GHz)',
      display: '16.3-inch 4K+ OLED (3840 x 2400) Touch, 400 nits, 90Hz',
      ram: '32GB LPDDR5x 7467MHz Dual Channel',
      storage: '1TB PCIe Gen 4 SSD',
      battery: '99.5Wh with 130W Type-C adapter',
      camera: '1080p at 30 fps FHD RGB-IR with dual array mics',
      gpu: 'NVIDIA GeForce RTX 4070 (8GB GDDR6, 60W)',
      weight: '2.13 kg',
      connectivity: 'Wi-Fi 7, Bluetooth 5.4, 3x Thunderbolt 4'
    },
    inStock: true,
    stockCount: 11,
    modelType: 'laptop',
    colors: [
      { name: 'Platinum', hex: '#d6d9dc', materialColor: 0xc8cbcf },
      { name: 'Graphite', hex: '#37393d', materialColor: 0x2d2f33 }
    ],
    tag: 'New'
  },
  {
    id: 'rtx5090',
    name: 'NVIDIA GeForce RTX 5090 Founders Edition',
    brand: 'NVIDIA',
    category: 'Computer Components',
    price: 199990,
    originalPrice: 219990,
    rating: 5.0,
    reviewCount: 88,
    image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=1000&q=80',
    description: 'The world’s most powerful graphics card. Powered by the next-gen Blackwell architecture, featuring 32GB of blazing GDDR7 memory, DLSS 4, and unprecedented AI compute.',
    features: [
      'Next-generation Blackwell architecture with 24,576 CUDA cores',
      '32GB ultra-high speed GDDR7 VRAM on 512-bit memory bus',
      'Flow-through dual axial dual-slot fan cooling system',
      '5th Generation Tensor Cores & 4th Generation RT Cores',
      'Full DisplayPort 2.1 UHBR20 support for 8K 165Hz gaming'
    ],
    specifications: {
      processor: 'NVIDIA GB202 Blackwell GPU (3nm)',
      gpu: '24,576 CUDA Cores, 2.9 GHz Boost Clock',
      ram: '32GB GDDR7 (1,792 GB/s Bandwidth)',
      storage: '512-bit Memory Interface',
      dimensions: '304 mm x 137 mm (3-Slot Dual Axial)',
      connectivity: '3x DisplayPort 2.1a, 1x HDMI 2.1b',
      weight: '2.18 kg',
      battery: '600W TGP (16-pin 12V-2x6 power connector)'
    },
    inStock: true,
    stockCount: 5,
    modelType: 'gpu',
    colors: [
      { name: 'Matte Gunmetal / Titanium Black', hex: '#2b2d31', materialColor: 0x1f2124 }
    ],
    tag: 'Flagship'
  },
  {
    id: 'odysseyg9',
    name: 'Samsung Odyssey Neo G9 57-inch Dual 4K',
    brand: 'Samsung',
    category: 'Gaming',
    price: 189999,
    originalPrice: 224999,
    rating: 4.8,
    reviewCount: 76,
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=1000&q=80',
    description: 'The world’s first Dual UHD 57-inch curved gaming monitor. Quantum Mini-LED technology with 2,392 dimming zones, 240Hz refresh rate, 1ms response time, and 1000R curvature.',
    features: [
      '57-inch Dual UHD resolution (7680 x 2160, equivalent to dual 4K)',
      '1000R extreme curvature matches the human field of view',
      'Quantum Matrix Technology with Quantum Mini-LEDs',
      '240Hz refresh rate with AMD FreeSync Premium Pro',
      'CoreSync & Core Lighting+ rear ambient illumination'
    ],
    specifications: {
      display: '57-inch Dual UHD Quantum Mini-LED (7680 x 2160)',
      refreshRate: '240Hz, 1ms (GtG) response time',
      dimensions: '1327 x 601 x 499 mm with stand',
      connectivity: 'DisplayPort 2.1, 3x HDMI 2.1, USB Hub',
      weight: '19.0 kg with stand',
      processor: 'Neural Quantum Processor Neo'
    },
    inStock: true,
    stockCount: 6,
    modelType: 'monitor',
    colors: [
      { name: 'Futuristic White / Core Lighting', hex: '#f4f5f7', materialColor: 0xeaecee }
    ],
    tag: 'Flagship'
  },
  {
    id: 'k70max',
    name: 'Corsair K70 MAX RGB Magnetic-Mechanical Keyboard',
    brand: 'Corsair',
    category: 'Accessories',
    price: 22999,
    originalPrice: 26999,
    rating: 4.9,
    reviewCount: 310,
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=1000&q=80',
    description: 'Magnetic-mechanical gaming keyboard with adjustable CORSAIR MGX switches. Set actuation distance per key from 0.4mm to 3.6mm with Rapid Trigger mode.',
    features: [
      'CORSAIR MGX Magnetic-Mechanical switches with Hall Effect sensors',
      'Rapid Trigger technology for instantaneous key resets',
      'Two actuation points per single keypress for combo mechanics',
      'Sound-dampening acoustic dual layers with memory foam wrist rest',
      '8,000Hz hyper-polling powered by AXON processing technology'
    ],
    specifications: {
      connectivity: 'Detachable Braided USB Type-C',
      weight: '1.39 kg',
      dimensions: '442 x 166 x 39.2 mm',
      processor: 'CORSAIR AXON 8000Hz SoC',
      display: 'Rotary multi-function volume roller & media controls'
    },
    inStock: true,
    stockCount: 40,
    modelType: 'keyboard',
    colors: [
      { name: 'Space Gray Anodized Aluminum', hex: '#323438', materialColor: 0x27292d }
    ],
    tag: 'Bestseller'
  },
  {
    id: 'gprox2',
    name: 'Logitech G PRO X Superlight 2 Wireless Gaming Mouse',
    brand: 'Logitech',
    category: 'Accessories',
    price: 15995,
    originalPrice: 17995,
    rating: 4.9,
    reviewCount: 840,
    image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=1000&q=80',
    description: 'The champion mouse of competitive esports. Weighing only 60 grams, featuring LIGHTFORCE hybrid optical-mechanical switches and the HERO 2 sensor with 32,000 DPI.',
    features: [
      'Ultra-lightweight 60g symmetrical design without honeycomb holes',
      'HERO 2 sensor: sub-micron tracking up to 32,000 DPI, 500+ IPS',
      'LIGHTFORCE hybrid optical-mechanical switches',
      'LIGHTSPEED wireless technology with 4000Hz polling rate',
      '95 hours of continuous battery life with USB-C fast charge'
    ],
    specifications: {
      battery: 'Up to 95 hours continuous motion',
      weight: '60 grams',
      connectivity: 'LIGHTSPEED 2.4GHz Wireless / USB-C wired',
      dimensions: '125.0 x 63.5 x 40.0 mm',
      processor: '32-bit ARM microprocessor'
    },
    inStock: true,
    stockCount: 50,
    modelType: 'mouse',
    colors: [
      { name: 'Matte Black', hex: '#1a1a1a', materialColor: 0x141414 },
      { name: 'Crisp White', hex: '#ffffff', materialColor: 0xf5f5f5 },
      { name: 'Magenta Pink', hex: '#e81d76', materialColor: 0xd9166a }
    ],
    tag: 'Bestseller'
  },
  {
    id: 'sonyxm5',
    name: 'Sony WH-1000XM5 Wireless Noise-Cancelling Headphones',
    brand: 'Sony',
    category: 'Accessories',
    price: 29990,
    originalPrice: 34990,
    rating: 4.9,
    reviewCount: 920,
    image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=1000&q=80',
    description: 'Industry-leading noise cancellation powered by two processors and 8 microphones. Specially engineered 30mm carbon fiber driver unit delivers transcendent acoustics.',
    features: [
      'Auto NC Optimizer dynamically adapts noise cancellation to environment',
      'Specially designed 30mm driver unit with soft TPU edge',
      'Multipoint connection: seamlessly switch between two devices',
      'Up to 30 hours battery life (3 minutes charge gives 3 hours)',
      'Touch sensor controls and Speak-to-Chat auto pause'
    ],
    specifications: {
      battery: '30 hours with ANC on, 40 hours with ANC off',
      weight: '250 g',
      connectivity: 'Bluetooth 5.2, LDAC, AAC, SBC, 3.5mm jack',
      dimensions: 'Fold-flat acoustic casing with soft fit leather'
    },
    inStock: true,
    stockCount: 35,
    modelType: 'headphones',
    colors: [
      { name: 'Black', hex: '#1f2022', materialColor: 0x17181a },
      { name: 'Silver / Light Gray', hex: '#d2d3d5', materialColor: 0xc4c5c7 },
      { name: 'Midnight Blue', hex: '#1c2738', materialColor: 0x162030 }
    ],
    tag: 'Trending'
  },
  {
    id: 'ipadpro13',
    name: 'Apple iPad Pro 13-inch M4 Ultra-Thin',
    brand: 'Apple',
    category: 'Tablets',
    price: 129900,
    originalPrice: 139900,
    rating: 4.9,
    reviewCount: 260,
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=1000&q=80',
    description: 'The thinnest Apple product ever made at just 5.1mm. Featuring groundbreaking Ultra Retina XDR Tandem OLED display and the breakthrough Apple M4 processor.',
    features: [
      '5.1 mm ultra-thin design — the thinnest Apple product ever',
      'Breakthrough Tandem OLED Ultra Retina XDR display with 1600 nits peak',
      'Apple M4 chip with 38 TOPS Neural Engine for on-device AI',
      'Supports Apple Pencil Pro with squeeze gestures and barrel roll',
      'Landscape 12MP Ultra Wide front camera with Center Stage'
    ],
    specifications: {
      processor: 'Apple M4 (9-Core or 10-Core CPU, 10-Core GPU)',
      display: '13-inch Ultra Retina XDR Tandem OLED (2752 x 2064, 120Hz ProMotion)',
      ram: '16GB Unified Memory',
      storage: '512GB NVMe SSD',
      battery: '38.99Wh Lithium Polymer (10 hrs)',
      camera: '12MP Wide back camera with LiDAR scanner + 12MP Landscape Front',
      gpu: '10-Core Apple GPU with Ray Tracing',
      weight: '579 g',
      dimensions: '281.6 x 215.5 x 5.1 mm'
    },
    inStock: true,
    stockCount: 20,
    modelType: 'tablet',
    colors: [
      { name: 'Space Black', hex: '#262628', materialColor: 0x1c1c1e },
      { name: 'Silver', hex: '#e3e4e6', materialColor: 0xd6d7da }
    ],
    tag: 'Flagship'
  }
];

const STORAGE_KEY = 'techverse_products';

export function getStoredProducts(): Product[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (err) {
    console.warn('Failed to parse stored products, falling back to initial database', err);
  }
  return INITIAL_PRODUCTS;
}

export function saveStoredProducts(products: Product[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
  } catch (err) {
    console.error('Failed to save products to localStorage', err);
  }
}

export function resetStoredProducts(): Product[] {
  localStorage.removeItem(STORAGE_KEY);
  return INITIAL_PRODUCTS;
}
