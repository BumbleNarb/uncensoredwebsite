import { useParams } from 'react-router';
import { Header } from '../components/Header';
import { ProductListing } from '../components/ProductListing';

export function CategoryPage() {
  const { categoryName } = useParams<{ categoryName: string }>();
  
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="pt-[73px]">
        <ProductListing category={categoryName || 'essentials'} />
      </div>
    </div>
  );
}
