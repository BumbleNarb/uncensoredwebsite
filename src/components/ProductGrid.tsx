import { Link } from 'react-router';

const products = [
  {
    id: 1,
    name: 'Essentials',
    description: 'Everyday classics',
    image: 'https://images.unsplash.com/photo-1640989818014-b4363bd44443?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZW5zJTIwY2FzdWFsJTIwd2VhcnxlbnwxfHx8fDE3NzAwMzI0MjZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    path: '/category/essentials',
  },
  {
    id: 2,
    name: 'Men',
    description: 'Contemporary menswear',
    image: 'https://images.unsplash.com/photo-1611312449408-fcece27cdbb7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZW5zJTIwamFja2V0JTIwZmFzaGlvbnxlbnwxfHx8fDE3NzAwMTkyMzl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    path: '/category/men',
  },
  {
    id: 3,
    name: 'Women',
    description: 'Refined & elegant',
    image: 'https://images.unsplash.com/photo-1768289222419-255b80c65259?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21lbnMlMjBmYXNoaW9uJTIwY2xvdGhpbmd8ZW58MXx8fHwxNzcwMDMyNDI2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    path: '/category/women',
  },
  {
    id: 4,
    name: 'Others',
    description: 'Accessories & more',
    image: 'https://images.unsplash.com/photo-1769116416641-e714b71851e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBhY2Nlc3NvcmllcyUyMGZhc2hpb258ZW58MXx8fHwxNzcwMDMyNDI2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    path: '/category/others',
  },
];

export function ProductGrid() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl text-center mb-4 tracking-tight text-gray-900">
          Our Collections
        </h2>
        <p className="text-center text-gray-600 mb-16 text-lg">
          Explore our curated clothing lines
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Link
              key={product.id}
              to={product.path}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-gray-100 mb-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <h3 className="text-xl mb-1 text-gray-900">
                {product.name}
              </h3>
              <p className="text-gray-600">
                {product.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}