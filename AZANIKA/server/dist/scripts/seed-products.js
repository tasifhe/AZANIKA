"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const supabase_1 = __importDefault(require("../config/supabase"));
const sampleProducts = [
    {
        name: 'Elegant Pearl Statement Necklace',
        description: 'Beautiful handcrafted pearl necklace featuring lustrous freshwater pearls. Perfect for weddings, parties, or elegant everyday wear. Each piece is unique and carefully crafted.',
        price: 2500,
        category: 'Jewelry',
        stock: 15,
        image_url: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800',
        images: [
            'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800',
            'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800',
            'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800'
        ],
        colors: ['Silver', 'Gold', 'Rose Gold'],
        sizes: ['Standard'],
        in_stock: true,
        featured: true
    },
    {
        name: 'Premium Leather Handbag',
        description: 'Luxurious genuine leather handbag with spacious interior and elegant design. Features multiple compartments, adjustable strap, and premium hardware. Perfect for both casual and formal occasions.',
        price: 4500,
        category: 'Bags',
        stock: 8,
        image_url: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800',
        images: [
            'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800',
            'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800',
            'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800'
        ],
        colors: ['Black', 'Brown', 'Tan'],
        sizes: ['One Size'],
        in_stock: true,
        featured: true
    },
    {
        name: 'Designer Sunglasses Collection',
        description: 'Stylish UV400 protection sunglasses with polarized lenses. Lightweight frame with durable construction. Includes protective case and cleaning cloth.',
        price: 1800,
        category: 'Accessories',
        stock: 25,
        image_url: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800',
        images: [
            'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800',
            'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800'
        ],
        colors: ['Black', 'Tortoise', 'Gold'],
        sizes: ['Standard'],
        in_stock: true,
        featured: false
    },
    {
        name: 'Silk Scarf Premium Collection',
        description: 'Pure silk scarf with beautiful patterns. Soft, lightweight, and perfect for all seasons. Can be worn multiple ways - as a neck scarf, headband, or accessory.',
        price: 1200,
        category: 'Accessories',
        stock: 30,
        image_url: 'https://images.unsplash.com/photo-1601024445121-e5b82f020549?w=800',
        images: [
            'https://images.unsplash.com/photo-1601024445121-e5b82f020549?w=800',
            'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800'
        ],
        colors: ['Red', 'Blue', 'Pink', 'Gold'],
        sizes: ['90x90cm'],
        in_stock: true,
        featured: false
    },
    {
        name: 'Gold Chain Bracelet',
        description: 'Delicate gold-plated chain bracelet with secure clasp. Hypoallergenic and tarnish-resistant. Perfect for layering or wearing alone.',
        price: 1500,
        category: 'Jewelry',
        stock: 20,
        image_url: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800',
        images: [
            'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800',
            'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=800'
        ],
        colors: ['Gold', 'Silver', 'Rose Gold'],
        sizes: ['Adjustable'],
        in_stock: true,
        featured: false
    },
    {
        name: 'Leather Wallet Premium',
        description: 'Genuine leather wallet with RFID blocking technology. Multiple card slots, bill compartment, and coin pocket. Slim design that fits easily in pocket.',
        price: 1800,
        category: 'Accessories',
        stock: 12,
        image_url: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=800',
        images: [
            'https://images.unsplash.com/photo-1627123424574-724758594e93?w=800',
            'https://images.unsplash.com/photo-1624222247344-550fb60583a2?w=800'
        ],
        colors: ['Black', 'Brown'],
        sizes: ['Standard'],
        in_stock: true,
        featured: false
    }
];
async function seedProducts() {
    console.log('🌱 Starting to seed products...');
    try {
        for (const product of sampleProducts) {
            const result = await supabase_1.default.query(`INSERT INTO products (
          name, description, price, category, stock,
          image_url, images, colors, sizes, in_stock, featured
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
        RETURNING *`, [
                product.name,
                product.description,
                product.price,
                product.category,
                product.stock,
                product.image_url,
                product.images,
                product.colors,
                product.sizes,
                product.in_stock,
                product.featured
            ]);
            console.log(`✅ Added: ${product.name}`);
        }
        console.log(`\n🎉 Successfully added ${sampleProducts.length} products!`);
        console.log('You can now view them in your admin dashboard and main store.\n');
        process.exit(0);
    }
    catch (error) {
        console.error('❌ Error seeding products:', error.message);
        process.exit(1);
    }
}
seedProducts();
