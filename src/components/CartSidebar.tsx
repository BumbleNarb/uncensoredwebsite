import { X, Minus, Plus } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router';

export function CartSidebar() {
  const { items, isCartOpen, setIsCartOpen, updateQuantity, getTotalPrice } = useCart();
  const navigate = useNavigate();
  const total = getTotalPrice();
  const shippingThreshold = 300;
  const remainingForFreeShipping = Math.max(0, shippingThreshold - total);

  const handleCheckout = () => {
    setIsCartOpen(false);
    navigate('/checkout');
  };

  if (!isCartOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-50"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Sidebar */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-50 shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl">Cart</h2>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free shipping banner */}
        {remainingForFreeShipping > 0 && (
          <div className="bg-blue-50 p-4 text-sm text-center text-blue-900">
            Buy with RM{remainingForFreeShipping.toFixed(2)} MYR more to get free shipping!
          </div>
        )}

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="text-center text-gray-500 mt-20">
              <p>Your cart is empty</p>
            </div>
          ) : (
            <div className="space-y-6">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="text-sm mb-1">{item.name}</h3>
                    <p className="text-xs text-gray-500 mb-2">Size: {item.size}</p>
                    <p className="text-sm">RM{item.price.toFixed(2)} MYR</p>
                  </div>
                  <div className="flex flex-col items-end justify-between">
                    <p className="text-sm">
                      RM{(item.price * item.quantity).toFixed(2)} MYR
                    </p>
                    <div className="flex items-center gap-2 border border-gray-300 rounded-full">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="text-sm w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-lg">Subtotal</span>
              <span className="text-lg">RM{total.toFixed(2)} MYR</span>
            </div>
            <button
              onClick={handleCheckout}
              className="w-full bg-yellow-400 hover:bg-yellow-500 text-black py-4 rounded-full transition-colors text-center uppercase tracking-wide"
            >
              Checkout
            </button>
            <p className="text-xs text-gray-500 text-center mt-2">
              Shipping and taxes calculated at checkout
            </p>
          </div>
        )}
      </div>
    </>
  );
}
