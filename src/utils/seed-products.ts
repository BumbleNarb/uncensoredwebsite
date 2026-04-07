// Helper script to seed products into the database
// You can run this once to add sample products

import { projectId, publicAnonKey } from './supabase/info';

const sampleProducts = [
  {
    name: 'Classic White T-Shirt',
    price: 89.00,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800',
    colors: ['#FFFFFF', '#000000', '#808080'],
    sizes: ['XS', 'S', 'M', 'L', 'XL', '2XL'],
    category: 'essentials',
    description: 'Premium cotton t-shirt with a comfortable fit'
  },
  {
    name: 'Slim Fit Denim Jacket',
    price: 299.00,
    image: 'https://images.unsplash.com/photo-1495105787522-5334e3ffa0ef?w=800',
    colors: ['#4169E1', '#000080'],
    sizes: ['S', 'M', 'L', 'XL'],
    category: 'men',
    description: 'Classic denim jacket with modern slim fit'
  },
  {
    name: 'Floral Summer Dress',
    price: 189.00,
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800',
    colors: ['#FFB6C1', '#FFF0F5', '#FF69B4'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    category: 'women',
    description: 'Lightweight floral dress perfect for summer'
  },
  {
    name: 'Leather Crossbody Bag',
    price: 159.00,
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800',
    colors: ['#8B4513', '#000000', '#D2B48C'],
    sizes: ['One Size'],
    category: 'others',
    description: 'Genuine leather crossbody bag with adjustable strap'
  },
  {
    name: 'Oversized Hoodie',
    price: 149.00,
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800',
    colors: ['#000000', '#808080', '#D3D3D3'],
    sizes: ['S', 'M', 'L', 'XL', '2XL', '3XL'],
    category: 'essentials',
    description: 'Comfortable oversized hoodie with kangaroo pocket'
  },
  {
    name: 'Tailored Blazer',
    price: 399.00,
    image: 'https://images.unsplash.com/photo-1507680434567-5739c80be1ac?w=800',
    colors: ['#000080', '#000000', '#808080'],
    sizes: ['S', 'M', 'L', 'XL'],
    category: 'men',
    description: 'Modern tailored blazer for professional occasions'
  },
  {
    name: 'Silk Blouse',
    price: 129.00,
    image: 'https://images.unsplash.com/photo-1564257577-8ec0b7d7c8e7?w=800',
    colors: ['#FFF5EE', '#FFB6C1', '#000000'],
    sizes: ['XS', 'S', 'M', 'L'],
    category: 'women',
    description: 'Elegant silk blouse with button details'
  },
  {
    name: 'Minimalist Watch',
    price: 249.00,
    image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=800',
    colors: ['#C0C0C0', '#FFD700', '#000000'],
    sizes: ['One Size'],
    category: 'others',
    description: 'Classic minimalist watch with leather strap'
  },
];

export async function seedProducts() {
  for (const product of sampleProducts) {
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-32210018/products`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify(product),
        }
      );

      if (response.ok) {
        console.log(`✓ Added product: ${product.name}`);
      } else {
        console.error(`✗ Failed to add product: ${product.name}`);
      }
    } catch (error) {
      console.error(`✗ Error adding product ${product.name}:`, error);
    }
  }
  
  console.log('Seeding complete!');
}

// Uncomment to run:
// seedProducts();
