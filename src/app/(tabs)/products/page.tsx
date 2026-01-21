import { Footer } from '@/components';

import ProductsPageClient from './ProductsPageClient';

export default function ProductsPage() {
  return (
    <main className="bg-[var(--color-black)]">
      <ProductsPageClient />
      <div className="mt-[48px]">
        <Footer />
      </div>
    </main>
  );
}
