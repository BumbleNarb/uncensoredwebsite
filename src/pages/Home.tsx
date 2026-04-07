import { Header } from '../components/Header';
import { HeroSlider } from '../components/HeroSlider';
import { ProductGrid } from '../components/ProductGrid';

export function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <HeroSlider />
      <ProductGrid />
    </div>
  );
}
