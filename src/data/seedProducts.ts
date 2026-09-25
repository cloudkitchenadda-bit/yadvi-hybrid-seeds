export interface SeedProduct {
  id: string;
  name: string;
  varietyType: string;
  sku: string;
  category: 'Chilli' | 'Okra' | 'Dolichos' | 'Pulses' | 'Vegetables' | 'Field Crops';
  image: string;
  stockBags: number;
  packageSizes: string[];
  germinationRate: string;
  purity: string;
  maturityDays: string;
  cropSeason: string;
  availability: 'In Stock' | 'Limited Stock' | 'Pre-Booking';
  description: string;
  keyFeatures: string[];
  resistance: string;
}

export const SEED_PRODUCTS: SeedProduct[] = [
  {
    id: 'prod-01',
    name: 'Krishna-5 F1 Hybrid Chilli',
    varietyType: 'F1 Hybrid Chilli',
    sku: 'YHS-CHL-K5',
    category: 'Chilli',
    image: '/seeds/seed_12.jpeg',
    stockBags: 1420,
    packageSizes: ['10g Packet', '50g Pouch', '100g Pouch'],
    germinationRate: '85% Min',
    purity: '98% Min',
    maturityDays: '65 - 70 Days',
    cropSeason: 'Kharif & Rabi',
    availability: 'In Stock',
    description: 'High-yielding pungent hybrid chilli with erect plant habit, deep glossy red fruits, and outstanding heat tolerance. Excellent keeping quality for distant transport.',
    keyFeatures: ['Glossy dark green to deep red fruits', 'High pungency with firm skin', 'Prolific bearer with continuous flushes', 'Excellent export grade quality'],
    resistance: 'High tolerance to Leaf Curl Virus (LCV) & Thrips'
  },
  {
    id: 'prod-02',
    name: 'Divya-27 F1 Hybrid Chilli',
    varietyType: 'F1 Hybrid Chilli',
    sku: 'YHS-CHL-D27',
    category: 'Chilli',
    image: '/seeds/seed_21.jpeg',
    stockBags: 890,
    packageSizes: ['10g Packet', '50g Pouch', '100g Pouch'],
    germinationRate: '88% Min',
    purity: '98% Min',
    maturityDays: '70 - 75 Days',
    cropSeason: 'All Season Suitable',
    availability: 'In Stock',
    description: 'Specialty light-green elongated hybrid chilli highly favored by wholesale vegetable mandis. Heavy first flush with dense fruit set.',
    keyFeatures: ['Attractive parrot green color', 'Fruit length 11-13 cm, smooth surface', 'Uniform girth and straight pods', 'High market acceptance'],
    resistance: 'Tolerant to Powdery Mildew and Anthracnose'
  },
  {
    id: 'prod-03',
    name: 'YH-222 F1 Hybrid Okra',
    varietyType: 'F1 Hybrid Bhendi',
    sku: 'YHS-OKR-222',
    category: 'Okra',
    image: '/seeds/seed_07.jpeg',
    stockBags: 2150,
    packageSizes: ['100g Pouch', '250g Pouch', '500g Pouch', '1kg Tin'],
    germinationRate: '90% Min',
    purity: '99% Min',
    maturityDays: '42 - 45 Days',
    cropSeason: 'Summer & Kharif',
    availability: 'In Stock',
    description: 'Premium dark-green 5-ridged tender okra with short internodes and heavy branching. Produces tender pods free from fibrous texture even at higher picking intervals.',
    keyFeatures: ['Lush dark green 5-ridged pods', 'Short internodal spacing', 'Tender, non-spiny, easily hand-picked', 'Excellent shelf life in transit'],
    resistance: 'Intermediate resistance to YVMV and Enation Leaf Curl Virus (ELCV)'
  },
  {
    id: 'prod-04',
    name: 'Leon F1 Hybrid Okra',
    varietyType: 'F1 Hybrid Bhendi',
    sku: 'YHS-OKR-LEON',
    category: 'Okra',
    image: '/seeds/seed_10.jpeg',
    stockBags: 1780,
    packageSizes: ['100g Pouch', '250g Pouch', '500g Pouch'],
    germinationRate: '92% Min',
    purity: '99% Min',
    maturityDays: '40 - 44 Days',
    cropSeason: 'All Round Year',
    availability: 'In Stock',
    description: 'High performance hybrid bhendi engineered for exceptional early yield and dense pod density. Known for deep green luster and high market rate.',
    keyFeatures: ['Very early first harvest (40-44 days)', 'Uniform slim pods 12-14 cm', 'Heavy side tillers with multiple pickings', 'Maintains vibrant green after harvest'],
    resistance: 'Strong field tolerance to Yellow Vein Mosaic Virus'
  },
  {
    id: 'prod-05',
    name: 'Lakshmi Research Dolichos',
    varietyType: 'Research Dolichos Bean',
    sku: 'YHS-DOL-LAK',
    category: 'Dolichos',
    image: '/seeds/seed_02.jpeg',
    stockBags: 1200,
    packageSizes: ['500g Bag', '1kg Bag', '5kg Bag'],
    germinationRate: '85% Min',
    purity: '98% Min',
    maturityDays: '75 - 85 Days',
    cropSeason: 'Rabi & Late Kharif',
    availability: 'In Stock',
    description: 'Famous pole type Dolichos (Chikkudu) renowned for broad light green fleshy pods with distinctive pleasant aroma that commands premium pricing.',
    keyFeatures: ['Broad, flat, fleshy aromatic pods', 'Profuse flowering clusters', 'Delicious buttery taste', 'Sought after across South & Central India'],
    resistance: 'Tolerant to Pod Borer and Rust'
  },
  {
    id: 'prod-06',
    name: 'YHS Special Black Gram (మినుము)',
    varietyType: 'High Yielding Pulse Seed',
    sku: 'YHS-PLS-BG01',
    category: 'Pulses',
    image: '/seeds/seed_01.jpeg',
    stockBags: 3400,
    packageSizes: ['2kg Bag', '5kg Bag', '25kg Seed Bag'],
    germinationRate: '85% Min',
    purity: '98% Min',
    maturityDays: '70 - 75 Days',
    cropSeason: 'Kharif & Rabi Rice Fallows',
    availability: 'In Stock',
    description: 'Selected elite black gram seed with bold black grains, synchronous maturity, and high protein content. Ideal for both upland and post-rice fallow conditions.',
    keyFeatures: ['Bold, shining black grains', 'Uniform pods and synchronous maturity', 'Non-shattering type', 'High dal recovery percentage'],
    resistance: 'Highly resistant to Mungbean Yellow Mosaic Virus (MYMV)'
  },
  {
    id: 'prod-07',
    name: 'YHS-678 High Yield Maize',
    varietyType: 'Single Cross Hybrid Corn',
    sku: 'YHS-CORN-678',
    category: 'Field Crops',
    image: '/seeds/seed_04.jpeg',
    stockBags: 2850,
    packageSizes: ['4kg Bag', '25kg Commercial Bag'],
    germinationRate: '90% Min',
    purity: '99% Min',
    maturityDays: '105 - 110 Days',
    cropSeason: 'Kharif, Rabi & Spring',
    availability: 'In Stock',
    description: 'Vigorous single cross maize with thick sturdy stalks, excellent tip filling, and heavy orange-yellow flint kernels. Outstanding drought tolerance.',
    keyFeatures: ['Semi-erect leaves for high planting density', 'Attractive golden orange flint grain', 'Very tight husk cover prevents cob rot', 'Excellent stay-green character at maturity'],
    resistance: 'Tolerant to Turcicum Leaf Blight & Downy Mildew'
  },
  {
    id: 'prod-08',
    name: 'YHS-9303 Super Fine Paddy',
    varietyType: 'Hybrid Rice Seed',
    sku: 'YHS-RICE-9303',
    category: 'Field Crops',
    image: '/seeds/seed_16.jpeg',
    stockBags: 4100,
    packageSizes: ['3kg Bag', '10kg Bag', '30kg Bag'],
    germinationRate: '85% Min',
    purity: '98% Min',
    maturityDays: '125 - 130 Days',
    cropSeason: 'Kharif & Boro',
    availability: 'In Stock',
    description: 'Slender aromatic long grain hybrid paddy with high tillering ability and strong resistance to lodging. High head rice recovery on milling.',
    keyFeatures: ['Slender extra-long grains', 'Erect flag leaf and heavy panicles', 'Low percentage of chalky grains', 'High mill output with aroma'],
    resistance: 'Resistant to Bacterial Leaf Blight (BLB) and Brown Planthopper (BPH)'
  },
  {
    id: 'prod-09',
    name: 'YHS-310 BG-II Hybrid Cotton',
    varietyType: 'Bollgard II Cotton Seed',
    sku: 'YHS-COT-310',
    category: 'Field Crops',
    image: '/seeds/seed_22.jpeg',
    stockBags: 1600,
    packageSizes: ['475g Packet (450g BGII + 25g Non-Bt)'],
    germinationRate: '80% Min',
    purity: '98% Min',
    maturityDays: '150 - 160 Days',
    cropSeason: 'Kharif Rainfed & Irrigated',
    availability: 'Limited Stock',
    description: 'High ginning out-turn hybrid cotton with medium to large bolls, easy fluffing, and long staple fiber quality.',
    keyFeatures: ['Boll weight 5.0 - 5.5 grams', 'Easy manual picking with wide opening', 'Staple length 30-32 mm with high strength', 'Broad adaptable canopy'],
    resistance: 'Resistant to American Bollworm and Spotted Bollworm'
  },
  {
    id: 'prod-10',
    name: 'YHS-500 Bold Groundnut Seed',
    varietyType: 'Certified Peanut Seed',
    sku: 'YHS-GNT-500',
    category: 'Pulses',
    image: '/seeds/seed_26.jpeg',
    stockBags: 2200,
    packageSizes: ['10kg Bag', '30kg Bag'],
    germinationRate: '80% Min',
    purity: '97% Min',
    maturityDays: '100 - 105 Days',
    cropSeason: 'Kharif & Rabi',
    availability: 'In Stock',
    description: 'Spanish bunch type groundnut featuring 2-seeded smooth pods with rose-pink bold kernels and high oil percentage.',
    keyFeatures: ['High shelling turnout (72-74%)', 'Oil content 48-50%', 'Dormancy 10-15 days preventing in-situ sprout', 'Sturdy pod peg attachment'],
    resistance: 'Tolerant to Tikka disease and Collar Rot'
  },
  {
    id: 'prod-11',
    name: 'Swarna F1 Hybrid Tomato',
    varietyType: 'Determinate Red Tomato',
    sku: 'YHS-TOM-SW',
    category: 'Vegetables',
    image: '/seeds/seed_28.jpeg',
    stockBags: 1450,
    packageSizes: ['10g Pouch', '50g Pouch'],
    germinationRate: '85% Min',
    purity: '98% Min',
    maturityDays: '60 - 65 Days',
    cropSeason: 'All Year Round',
    availability: 'In Stock',
    description: 'Square round firm fruits with deep crimson internal color, thick pericarp, and superior shipping endurance.',
    keyFeatures: ['Uniform 90-100g fruit weight', 'Exceptional firmness for long distance transport', 'Excellent red color development', 'High TSS suited for fresh & processing'],
    resistance: 'Resistant to Tomato Yellow Leaf Curl Virus (TYLCV) & Fusarium Wilt'
  },
  {
    id: 'prod-12',
    name: 'Sagar F1 Hybrid Watermelon',
    varietyType: 'Icebox Dark Green Hybrid',
    sku: 'YHS-MEL-SAG',
    category: 'Vegetables',
    image: '/seeds/seed_32.jpeg',
    stockBags: 920,
    packageSizes: ['50g Pouch', '100g Pouch'],
    germinationRate: '88% Min',
    purity: '99% Min',
    maturityDays: '75 - 80 Days',
    cropSeason: 'Spring & Summer',
    availability: 'In Stock',
    description: 'Oval dark green rind with dark stripes. Deep granular red flesh with high sugar content (Brix 12-13%). Small seeds.',
    keyFeatures: ['High sugar sweetness (12.5% Brix)', 'Crisp granular red flesh', 'Firm rind resists cracking in summer transit', 'Average fruit weight 8 - 11 kg'],
    resistance: 'Tolerant to Anthracnose & Downy Mildew'
  }
];

export const PRODUCT_CATEGORIES = [
  'All Products',
  'Chilli',
  'Okra',
  'Dolichos',
  'Pulses',
  'Vegetables',
  'Field Crops'
] as const;
