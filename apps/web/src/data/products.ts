import { TEAM_LIST, type TeamKey, type TeamTrack } from './teams';

export type ProductTrack = TeamTrack;
export type ProductPlatform = 'mobile_app' | 'mobile_web' | 'desktop_web';

export type Product = {
  teamKey: TeamKey;
  title: string;
  category: string;
  description: string;
  thumbnailSrc: string;
  track: ProductTrack;
  platform?: ProductPlatform;
};

const THUMBNAIL_PLACEHOLDER_SRC =
  '/assets/figma/products/thumbnail_placeholder.svg';

export const PRODUCTS: readonly Product[] = TEAM_LIST.map((team) => ({
  teamKey: team.key,
  title: team.displayName,
  category: team.category,
  description: team.shortDescription,
  thumbnailSrc: THUMBNAIL_PLACEHOLDER_SRC,
  track: team.track,
}));
