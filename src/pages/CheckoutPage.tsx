import { useState } from 'react';
import { Header } from '../components/Header';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router';
import { CreditCard, Smartphone } from 'lucide-react';

export function CheckoutPage() {
  const { items, getTotalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const total = getTotalPrice();

  // Form states
  const [email, setEmail] = useState('');
  const [emailOffers, setEmailOffers] = useState(false);
  const [country, setCountry] = useState('Malaysia');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [apartment, setApartment] = useState('');
  const [postcode, setPostcode] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('Selangor');
  const [phone, setPhone] = useState('');
  
  const [paymentMethod, setPaymentMethod] = useState('credit-card');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [securityCode, setSecurityCode] = useState('');
  const [nameOnCard, setNameOnCard] = useState('');
  const [useSameAddress, setUseSameAddress] = useState(true);
  const [saveInfo, setSaveInfo] = useState(false);
  const [mobilePhone, setMobilePhone] = useState('+60');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle order submission
    alert('Order placed successfully!');
    clearCart();
    navigate('/');
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="pt-[73px] p-6 text-center">
          <p className="text-gray-500 mt-20">Your cart is empty</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="pt-[73px]">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <form onSubmit={handleSubmit} className="grid lg:grid-cols-2 gap-12">
            {/* Left Column - Form */}
            <div>
              <h2 className="text-2xl mb-6">Express checkout</h2>
              
              {/* Express Checkout Buttons */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <button
                  type="button"
                  className="bg-purple-600 hover:bg-purple-700 text-white py-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <span className="text-lg">Shop Pay</span>
                </button>
                <button
                  type="button"
                  className="bg-black hover:bg-gray-800 text-white py-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <span className="text-lg">G</span> Pay
                </button>
              </div>

              <div className="text-center text-gray-500 mb-6">OR</div>

              {/* Contact Section */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg">Contact</h3>
                  <a href="#" className="text-blue-600 text-sm hover:underline">
                    Sign in
                  </a>
                </div>
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <label className="flex items-center gap-2 mt-4 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={emailOffers}
                    onChange={(e) => setEmailOffers(e.target.checked)}
                    className="w-4 h-4 accent-blue-600"
                  />
                  <span className="text-sm">Email me with news and offers</span>
                </label>
              </div>

              {/* Delivery Section */}
              <div className="mb-6">
                <h3 className="text-lg mb-4">Delivery</h3>
                
                <select
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option>Malaysia</option>
                  <option>Singapore</option>
                  <option>Thailand</option>
                </select>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <input
                    type="text"
                    placeholder="First name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    placeholder="Last name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <input
                  type="text"
                  placeholder="Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <input
                  type="text"
                  placeholder="Apartment, suite, etc. (optional)"
                  value={apartment}
                  onChange={(e) => setApartment(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <div className="grid grid-cols-3 gap-4 mb-4">
                  <input
                    type="text"
                    placeholder="Postcode"
                    value={postcode}
                    onChange={(e) => setPostcode(e.target.value)}
                    required
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    placeholder="City"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <select
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option>Selangor</option>
                    <option>Kuala Lumpur</option>
                    <option>Johor</option>
                    <option>Penang</option>
                  </select>
                </div>

                <input
                  type="tel"
                  placeholder="Phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Payment Section */}
              <div className="mb-6">
                <h3 className="text-lg mb-4">Payment</h3>
                <p className="text-sm text-gray-600 mb-4">
                  All transactions are secure and encrypted.
                </p>

                {/* Payment Method Selection */}
                <div className="border border-gray-300 rounded-lg overflow-hidden mb-4">
                  <label className="flex items-center justify-between p-4 border-b border-gray-300 cursor-pointer hover:bg-gray-50">
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="payment"
                        value="credit-card"
                        checked={paymentMethod === 'credit-card'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="w-4 h-4 accent-blue-600"
                      />
                      <span>Credit card</span>
                    </div>
                    <div className="flex gap-2">
                      <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg" alt="Visa" className="h-6" />
                      <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-6" />
                    </div>
                  </label>

                  {paymentMethod === 'credit-card' && (
                    <div className="p-4 bg-gray-50">
                      <input
                        type="text"
                        placeholder="Card number"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <input
                          type="text"
                          placeholder="Expiration date (MM / YY)"
                          value={expiryDate}
                          onChange={(e) => setExpiryDate(e.target.value)}
                          required
                          className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                          type="text"
                          placeholder="Security code"
                          value={securityCode}
                          onChange={(e) => setSecurityCode(e.target.value)}
                          required
                          className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <input
                        type="text"
                        placeholder="Name on card"
                        value={nameOnCard}
                        onChange={(e) => setNameOnCard(e.target.value)}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={useSameAddress}
                          onChange={(e) => setUseSameAddress(e.target.checked)}
                          className="w-4 h-4 accent-blue-600"
                        />
                        <span className="text-sm">Use shipping address as billing address</span>
                      </label>
                    </div>
                  )}

                  <label className="flex items-center justify-between p-4 border-b border-gray-300 cursor-pointer hover:bg-gray-50">
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="payment"
                        value="grab"
                        checked={paymentMethod === 'grab'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="w-4 h-4 accent-blue-600"
                      />
                      <span>Grab — Pay today or later at 0% interest.</span>
                    </div>
                    <span className="text-green-600">Grab</span>
                  </label>

                  <label className="flex items-center justify-between p-4 border-b border-gray-300 cursor-pointer hover:bg-gray-50">
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="payment"
                        value="nihaopay"
                        checked={paymentMethod === 'nihaopay'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="w-4 h-4 accent-blue-600"
                      />
                      <span>NihaoPay</span>
                    </div>
                  </label>

                  <label className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50">
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="payment"
                        value="hitpay"
                        checked={paymentMethod === 'hitpay'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="w-4 h-4 accent-blue-600"
                      />
                      <span>HitPay - QR Code, E-wallets and Cards</span>
                    </div>
                  </label>
                </div>

                {/* Save Information */}
                <div className="border-t border-gray-200 pt-6">
                  <p className="text-sm mb-4">Save my information for a faster checkout</p>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <Smartphone className="w-5 h-5 text-gray-400" />
                    <input
                      type="tel"
                      placeholder="Mobile phone (optional)"
                      value={mobilePhone}
                      onChange={(e) => setMobilePhone(e.target.value)}
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </label>
                  <p className="text-xs text-gray-500 mt-2">
                    By providing your phone number, you agree to create a Shop account subject to Shop's{' '}
                    <a href="#" className="underline">Terms</a> and{' '}
                    <a href="#" className="underline">Privacy Policy</a>.
                  </p>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-yellow-400 hover:bg-yellow-500 text-black py-4 rounded-full transition-colors text-center uppercase tracking-wide"
              >
                Pay now
              </button>
            </div>

            {/* Right Column - Order Summary */}
            <div className="lg:border-l lg:pl-12">
              <h2 className="text-2xl mb-6">Order Summary</h2>
              
              {/* Order Items */}
              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="relative">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-lg border border-gray-200"
                      />
                      <span className="absolute -top-2 -right-2 w-6 h-6 bg-gray-500 text-white text-xs rounded-full flex items-center justify-center">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm mb-1">{item.name}</h3>
                      <p className="text-xs text-gray-500">Size: {item.size}</p>
                    </div>
                    <p className="text-sm">RM{(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>

              {/* Subtotal */}
              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Subtotal</span>
                  <span>RM{total.toFixed(2)} MYR</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Shipping</span>
                  <span className="text-gray-500">Calculated at next step</span>
                </div>
                <div className="flex justify-between text-lg border-t border-gray-200 pt-4 mt-4">
                  <span>Total</span>
                  <span>RM{total.toFixed(2)} MYR</span>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
