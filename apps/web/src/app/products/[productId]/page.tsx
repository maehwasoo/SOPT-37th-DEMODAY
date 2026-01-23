import { notFound } from 'next/navigation';

import { MOCK_PRODUCTS } from '@/mocks/products';

import ProductDetailPageClient from './ProductDetailPageClient';

type ProductDetailPageProps = {
  params: {
    productId: string;
  };
};

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  const productId = Number(params.productId);

  if (!Number.isFinite(productId)) notFound();

  const product = MOCK_PRODUCTS.find((item) => item.id === productId);

  if (!product) notFound();

  return <ProductDetailPageClient product={product} />;
}
