import { notFound } from 'next/navigation';

import { PRODUCTS } from '@/data/products';

import ProductDetailPageClient from './ProductDetailPageClient';

type ProductDetailPageProps = {
  params: {
    teamKey: string;
  };
};

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  const teamKey = params.teamKey;
  const product = PRODUCTS.find((item) => item.teamKey === teamKey);

  if (!product) notFound();

  return <ProductDetailPageClient product={product} />;
}
