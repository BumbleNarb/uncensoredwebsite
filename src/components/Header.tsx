import { ImageWithFallback } from './figma/ImageWithFallback';
import { Link } from 'react-router';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';

export function Header() {
  const { items, setIsCartOpen } = useCart();
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex-1" />
          <Link to="/" className="flex items-center justify-center gap-3">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1674978037981-fef8cbf2b3a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwZmFzaGlvbiUyMGJyYW5kJTIwbG9nb3xlbnwxfHx8fDE3NzAwMzI0MjR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Brand Logo"
              className="w-10 h-10 object-cover rounded-full"
            />
            <h1 className="text-2xl tracking-tight text-gray-900">Redakted</h1>
          </Link>
          <div className="flex-1 flex justify-end">
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ShoppingCart className="w-6 h-6 text-gray-900" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-600 text-white text-xs rounded-full flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}