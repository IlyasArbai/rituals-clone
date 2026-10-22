import "dotenv/config";
import bcrypt from "bcryptjs";
import { prisma } from "../src/utils/prisma.js";
import { ProductCategory } from "./generated/client.ts";

const products = [
  // BODY CARE
  {
    name: "Velvet Shea Body Lotion",
    category: ProductCategory.BODY_CARE,
    description:
      "A rich, silky lotion that leaves skin feeling soft and nourished.",
    price: 19.99,
    oldPrice: 24.99,
    image:
      "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=800&q=80",
    size: "250ml",
    ingredients: ["Shea Butter", "Aloe Vera", "Vitamin E"],
    benefits: ["Hydration", "Soft Skin"],
    scent: { type: "floral", intensity: "light" },
    howToUse: "Apply to clean skin and massage gently.",
    details: ["Suitable for daily use"],
  },
  {
    name: "Coconut Glow Body Scrub",
    category: ProductCategory.BODY_CARE,
    description: "A creamy exfoliating scrub for smoother-feeling skin.",
    price: 16.5,
    image:
      "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=800&q=80",
    size: "200g",
    ingredients: ["Coconut Oil", "Sugar", "Vitamin E"],
    benefits: ["Exfoliation", "Smooth Skin"],
    scent: { type: "tropical", intensity: "medium" },
    howToUse: "Massage onto damp skin in circular motions, then rinse.",
    details: ["Use gently", "Avoid irritated skin"],
  },
  {
    name: "Golden Hour Body Oil",
    category: ProductCategory.BODY_CARE,
    description: "A lightweight body oil for a luminous, silky finish.",
    price: 22.0,
    oldPrice: 27.5,
    image:
      "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=800&q=80",
    size: "100ml",
    ingredients: ["Jojoba Oil", "Sweet Almond Oil", "Vitamin E"],
    benefits: ["Softness", "Radiance"],
    scent: { type: "warm", intensity: "light" },
    howToUse: "Smooth a few drops over clean, slightly damp skin.",
    details: ["External use only"],
  },
  {
    name: "Cloud Nine Body Butter",
    category: ProductCategory.BODY_CARE,
    description: "A rich body butter for a comforting moisturizing ritual.",
    price: 24.99,
    image:
      "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80",
    size: "200ml",
    ingredients: ["Shea Butter", "Cocoa Butter", "Glycerin"],
    benefits: ["Moisturizing", "Soft Skin"],
    scent: { type: "vanilla", intensity: "medium" },
    howToUse: "Massage into dry areas whenever needed.",
    details: ["Ideal for elbows and knees"],
  },
  {
    name: "Silk Touch Hand Cream",
    category: ProductCategory.BODY_CARE,
    description: "A compact daily hand cream for soft, comfortable hands.",
    price: 8.9,
    image:
      "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?auto=format&fit=crop&w=800&q=80",
    size: "75ml",
    ingredients: ["Glycerin", "Shea Butter", "Panthenol"],
    benefits: ["Hand Hydration", "Softness"],
    scent: { type: "clean", intensity: "light" },
    howToUse: "Apply to hands and massage until absorbed.",
    details: ["Suitable for everyday use"],
  },
  {
    name: "Morning Bloom Shower Gel",
    category: ProductCategory.BODY_CARE,
    description: "A refreshing wash to bring a little luxury to your morning.",
    price: 12.5,
    oldPrice: 15.0,
    image:
      "https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?auto=format&fit=crop&w=800&q=80",
    size: "300ml",
    ingredients: ["Glycerin", "Aloe Vera", "Cleansing Agents"],
    benefits: ["Cleansing", "Refreshing"],
    scent: { type: "floral", intensity: "medium" },
    howToUse: "Lather onto wet skin and rinse thoroughly.",
    details: ["For external use"],
  },

  // FACE BEAUTY
  {
    name: "Pure Balance Face Cleanser",
    category: ProductCategory.FACE_BEAUTY,
    description: "A gentle daily cleanser that removes dirt and excess oil.",
    price: 14.99,
    oldPrice: 18.99,
    image:
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80",
    size: "150ml",
    skinType: "All skin types",
    ingredients: ["Aloe Vera", "Glycerin"],
    benefits: ["Cleansing", "Refreshing"],
    scent: null,
    howToUse: "Massage onto damp skin and rinse thoroughly.",
    details: ["For daily use"],
  },
  {
    name: "Dew Drop Hydrating Serum",
    category: ProductCategory.FACE_BEAUTY,
    description: "A lightweight serum designed to leave skin feeling hydrated.",
    price: 26.0,
    image:
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80",
    size: "30ml",
    skinType: "All skin types",
    ingredients: ["Hyaluronic Acid", "Glycerin"],
    benefits: ["Hydration", "Smoother-Looking Skin"],
    scent: null,
    howToUse: "Apply a few drops to clean skin before moisturizer.",
    details: ["Patch test before use"],
  },
  {
    name: "Cloud Cream Moisturizer",
    category: ProductCategory.FACE_BEAUTY,
    description: "A comfortable daily moisturizer with a soft, velvety finish.",
    price: 21.99,
    oldPrice: 25.99,
    image:
      "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80",
    size: "50ml",
    skinType: "Normal to dry skin",
    ingredients: ["Ceramides", "Glycerin", "Squalane"],
    benefits: ["Moisturizing", "Skin Comfort"],
    scent: null,
    howToUse: "Apply evenly to the face and neck.",
    details: ["For external use"],
  },
  {
    name: "Midnight Recovery Face Mask",
    category: ProductCategory.FACE_BEAUTY,
    description: "A nourishing overnight mask for a pampering evening routine.",
    price: 28.5,
    image:
      "https://images.unsplash.com/photo-1570194065650-d99fb4bedf0a?auto=format&fit=crop&w=800&q=80",
    size: "75ml",
    skinType: "Normal to dry skin",
    ingredients: ["Panthenol", "Glycerin", "Squalane"],
    benefits: ["Moisturizing", "Softness"],
    scent: null,
    howToUse: "Apply a thin layer as the final step of your evening routine.",
    details: ["Avoid direct contact with eyes"],
  },
  {
    name: "Rosewater Cloud Toner",
    category: ProductCategory.FACE_BEAUTY,
    description:
      "A refreshing facial toner for a simple, balanced skincare routine.",
    price: 13.75,
    image:
      "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=800&q=80",
    size: "150ml",
    skinType: "All skin types",
    ingredients: ["Rose Water", "Glycerin"],
    benefits: ["Refreshing", "Hydration"],
    scent: { type: "rose", intensity: "light" },
    howToUse: "Apply to clean skin with your hands or a cotton pad.",
    details: ["Patch test before use"],
  },
  {
    name: "Rose Petal Lip Balm",
    category: ProductCategory.FACE_BEAUTY,
    description: "A pocket-sized balm for softer, more comfortable lips.",
    price: 6.5,
    oldPrice: 8.0,
    image:
      "https://images.unsplash.com/photo-1602874801007-bd458bb1b8b6?auto=format&fit=crop&w=800&q=80",
    size: "15g",
    skinType: "All skin types",
    ingredients: ["Shea Butter", "Jojoba Oil", "Beeswax"],
    benefits: ["Lip Moisture", "Softness"],
    scent: { type: "rose", intensity: "light" },
    howToUse: "Apply to lips whenever needed.",
    details: ["External use only"],
  },

  // HAIR STRENGTH
  {
    name: "Silk Finish Hair Serum",
    category: ProductCategory.HAIR_STRENGTH,
    description: "A lightweight serum for smoother-looking, glossy hair.",
    price: 17.5,
    oldPrice: 21.99,
    image:
      "https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=800&q=80",
    size: "100ml",
    ingredients: ["Argan Oil", "Vitamin E"],
    benefits: ["Smoothness", "Shine"],
    scent: { type: "woody", intensity: "light" },
    howToUse: "Apply a small amount to the lengths of your hair.",
    details: ["Avoid contact with eyes"],
  },
  {
    name: "Deep Repair Hair Mask",
    category: ProductCategory.HAIR_STRENGTH,
    description: "A rich conditioning mask for softer, easier-to-manage hair.",
    price: 23.0,
    image:
      "https://images.unsplash.com/photo-1612817288484-6f916006741a?auto=format&fit=crop&w=800&q=80",
    size: "250ml",
    ingredients: ["Shea Butter", "Argan Oil", "Panthenol"],
    benefits: ["Conditioning", "Manageability"],
    scent: { type: "vanilla", intensity: "light" },
    howToUse: "Apply after shampooing, leave for several minutes, then rinse.",
    details: ["Avoid contact with eyes"],
  },
  {
    name: "Botanical Shine Shampoo",
    category: ProductCategory.HAIR_STRENGTH,
    description:
      "A daily shampoo designed to cleanse hair and leave it feeling fresh.",
    price: 15.99,
    image:
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=800&q=80",
    size: "300ml",
    ingredients: ["Aloe Vera", "Glycerin", "Cleansing Agents"],
    benefits: ["Cleansing", "Freshness"],
    scent: { type: "botanical", intensity: "medium" },
    howToUse: "Massage into wet hair and rinse thoroughly.",
    details: ["For external use"],
  },
  {
    name: "Smooth Ritual Conditioner",
    category: ProductCategory.HAIR_STRENGTH,
    description: "A creamy conditioner for softer, more manageable hair.",
    price: 16.5,
    oldPrice: 19.5,
    image:
      "https://images.unsplash.com/photo-1594633409727-3a6ad5f8f1e6?auto=format&fit=crop&w=800&q=80",
    size: "300ml",
    ingredients: ["Panthenol", "Argan Oil", "Conditioning Agents"],
    benefits: ["Softness", "Detangling"],
    scent: { type: "fresh", intensity: "light" },
    howToUse: "Apply to the lengths of clean, wet hair and rinse.",
    details: ["Avoid contact with eyes"],
  },
  {
    name: "Moroccan Argan Hair Oil",
    category: ProductCategory.HAIR_STRENGTH,
    description: "A silky finishing oil for shine and smoother-looking hair.",
    price: 20.0,
    image:
      "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&w=800&q=80",
    size: "50ml",
    ingredients: ["Argan Oil", "Vitamin E"],
    benefits: ["Shine", "Smoothness"],
    scent: { type: "warm", intensity: "light" },
    howToUse: "Work a small amount through the lengths and ends.",
    details: ["Use sparingly"],
  },
  {
    name: "Fresh Start Scalp Scrub",
    category: ProductCategory.HAIR_STRENGTH,
    description: "A pre-wash scalp scrub for a refreshing hair-care ritual.",
    price: 18.9,
    image:
      "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&w=800&q=80",
    size: "150g",
    ingredients: ["Exfoliating Particles", "Glycerin"],
    benefits: ["Scalp Cleansing", "Freshness"],
    scent: { type: "mint", intensity: "medium" },
    howToUse: "Gently massage onto a wet scalp before shampooing, then rinse.",
    details: ["Avoid irritated skin"],
  },
  {
    name: "Leave-In Silk Mist",
    category: ProductCategory.HAIR_STRENGTH,
    description:
      "A lightweight leave-in mist to help detangle and soften hair.",
    price: 14.0,
    oldPrice: 17.0,
    image:
      "https://images.unsplash.com/photo-1629198735660-e39ea93f5c18?auto=format&fit=crop&w=800&q=80",
    size: "150ml",
    ingredients: ["Panthenol", "Conditioning Agents"],
    benefits: ["Detangling", "Softness"],
    scent: { type: "clean", intensity: "light" },
    howToUse: "Mist onto damp hair and comb through.",
    details: ["Avoid spraying into eyes"],
  },

  // HOME
  {
    name: "Amber Woods Reed Diffuser",
    category: ProductCategory.HOME,
    description: "A minimalist reed diffuser with a warm, inviting fragrance.",
    price: 29.99,
    oldPrice: 34.99,
    image:
      "https://images.unsplash.com/photo-1615397349754-cfa2066a298e?auto=format&fit=crop&w=800&q=80",
    size: "200ml",
    ingredients: ["Fragrance Oils", "Diffuser Base"],
    benefits: ["Home Fragrance", "Atmosphere"],
    scent: { type: "woody", intensity: "medium" },
    howToUse: "Insert the reeds into the bottle and turn them periodically.",
    details: ["Keep away from children, pets, and open flames"],
  },
  {
    name: "Slow Sunday Scented Candle",
    category: ProductCategory.HOME,
    description: "A softly scented candle for slow evenings and cozy spaces.",
    price: 18.5,
    image:
      "https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?auto=format&fit=crop&w=800&q=80",
    size: "220g",
    ingredients: ["Wax Blend", "Fragrance Oils"],
    benefits: ["Ambience", "Home Fragrance"],
    scent: { type: "vanilla", intensity: "medium" },
    howToUse: "Place on a heat-resistant surface and light the wick.",
    details: ["Never leave a burning candle unattended"],
  },
  {
    name: "Clean Linen Room Spray",
    category: ProductCategory.HOME,
    description: "A quick room fragrance with a fresh, clean-linen character.",
    price: 12.0,
    oldPrice: 14.5,
    image:
      "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=800&q=80",
    size: "100ml",
    ingredients: ["Fragrance Oils", "Spray Base"],
    benefits: ["Fresh Atmosphere", "Home Fragrance"],
    scent: { type: "fresh", intensity: "medium" },
    howToUse: "Spray lightly into the air away from people and surfaces.",
    details: ["Avoid contact with eyes", "Keep away from flames"],
  },
  {
    name: "Lavender Night Pillow Mist",
    category: ProductCategory.HOME,
    description: "A delicate lavender-scented mist for your bedtime routine.",
    price: 15.5,
    image:
      "https://images.unsplash.com/photo-1618249949923-4e9a6f5e79e4?auto=format&fit=crop&w=800&q=80",
    size: "100ml",
    ingredients: ["Fragrance", "Spray Base"],
    benefits: ["Bedtime Ritual", "Fresh Linen Scent"],
    scent: { type: "lavender", intensity: "light" },
    howToUse: "Lightly mist linens according to the product label.",
    details: ["Test on an inconspicuous fabric area first"],
  },
  {
    name: "Sandalwood Hand Wash",
    category: ProductCategory.HOME,
    description: "A stylish sink-side hand wash with a warm, woody fragrance.",
    price: 11.99,
    image:
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=800&q=80",
    size: "300ml",
    ingredients: ["Cleansing Agents", "Glycerin", "Fragrance"],
    benefits: ["Hand Cleansing", "Freshness"],
    scent: { type: "sandalwood", intensity: "medium" },
    howToUse: "Dispense onto wet hands, lather, and rinse thoroughly.",
    details: ["For external use"],
  },
  {
    name: "Rose Garden Drawer Sachets",
    category: ProductCategory.HOME,
    description:
      "Small scented sachets to add a gentle floral note to drawers.",
    price: 9.5,
    oldPrice: 12.0,
    image:
      "https://images.unsplash.com/photo-1618249949923-4e9a6f5e79e5?auto=format&fit=crop&w=800&q=80",
    size: "Set of 3",
    ingredients: ["Scented Sachet Filling"],
    benefits: ["Drawer Fragrance", "Closet Freshness"],
    scent: { type: "rose", intensity: "light" },
    howToUse:
      "Place sachets inside drawers or closets without direct contact with delicate fabrics.",
    details: ["Not for consumption", "Keep away from children and pets"],
  },
];
const users = [
  {
    name: "Store Admin",
    email: "admin@example.com",
    password: "ChangeMe123!",
    emailVerified: true,
    role: "ADMIN",
  },
  {
    name: "Alice Morgan",
    email: "alice@example.com",
    password: "ChangeMe123!",
    emailVerified: true,
  },
  {
    name: "Bob Chen",
    email: "bob@example.com",
    password: "ChangeMe123!",
    emailVerified: true,
  },
  {
    name: "Charlie Davis",
    email: "charlie@example.com",
    password: "ChangeMe123!",
    emailVerified: false,
  },
];

async function main() {
  // Delete dependent records before their parents to respect foreign keys.
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.product.deleteMany();
  await prisma.user.deleteMany();

  // 1. Seed users (each email is unique; upsert makes reruns predictable).
  const seededUsers = [];

  for (const user of users) {
    const password = await bcrypt.hash(user.password, 10);

    const seededUser = await prisma.user.create({
      data: {
        ...user,
        password,
      },
    });

    seededUsers.push(seededUser);
  }

  console.log(`Seeded ${seededUsers.length} users.`);

  // 2. Seed products.
  // Your schema uses Int prices, so store prices in cents.
  const seededProducts = [];

  for (const product of products) {
    const seededProduct = await prisma.product.create({
      data: {
        ...product,
      },
    });
    seededProducts.push(seededProduct);
  }

  console.log(`Seeded ${seededProducts.length} products.`);

  // 3. Clear existing orders so rerunning this demo seed
  // doesn't create duplicate sample orders.
  // WARNING: This deletes ALL orders and their order items.
  // Helpers for selecting seeded records.
  const userByEmail = (email) => {
    const user = seededUsers.find((u) => u.email === email);
    if (!user) throw new Error(`User not found: ${email}`);
    return user;
  };

  const productByName = (name) => {
    const product = seededProducts.find((p) => p.name === name);
    if (!product) throw new Error(`Product not found: ${name}`);
    return product;
  };

  // 4. Create orders with their ordered items.
  const orders = [
    {
      userEmail: "alice@example.com",
      items: [
        { name: "Velvet Shea Body Lotion", quantity: 2 },
        { name: "Pure Balance Face Cleanser", quantity: 1 },
        { name: "Silk Finish Hair Serum", quantity: 1 },
      ],
    },
    {
      userEmail: "bob@example.com",
      items: [
        { name: "Cloud Cream Moisturizer", quantity: 1 },
        { name: "Rose Petal Lip Balm", quantity: 3 },
      ],
    },
    {
      userEmail: "charlie@example.com",
      items: [
        { name: "Amber Woods Reed Diffuser", quantity: 1 },
        { name: "Slow Sunday Scented Candle", quantity: 2 },
        { name: "Coconut Glow Body Scrub", quantity: 1 },
      ],
    },
  ];

  for (const orderData of orders) {
    const user = userByEmail(orderData.userEmail);

    await prisma.order.create({
      data: {
        userId: user.id,
        items: {
          create: orderData.items.map((item) => {
            const product = productByName(item.name);

            return {
              productId: product.id,
              quantity: item.quantity,
              // Snapshot the current product price in cents.
              price: product.price,
            };
          }),
        },
      },
    });
  }

  console.log(`Seeded ${orders.length} orders with their items.`);
}

main()
  .catch((error) => {
    console.error("Seeding failed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
