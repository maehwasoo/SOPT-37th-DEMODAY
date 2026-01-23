import { notFound } from 'next/navigation';

import { PRODUCTS } from '@/data/products';

import ProductDetailPageClient from './ProductDetailPageClient';

type ProductDetailPageProps = {
  params: Promise<{
    teamKey: string;
  }>;
};

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const { teamKey: rawTeamKey } = await params;
  const teamKey = rawTeamKey.trim().toLowerCase();
  const product = PRODUCTS.find((item) => item.teamKey === teamKey);

  if (!product) notFound();

  return <ProductDetailPageClient product={product} />;
}
