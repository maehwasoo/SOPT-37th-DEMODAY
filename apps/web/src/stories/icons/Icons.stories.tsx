import {
  ArrowLeftIcon,
  ArrowRightIcon,
  HomeFilledIcon,
  HomeOutlineIcon,
  InstagramIcon,
  LeafletFilledIcon,
  LeafletOutlineIcon,
  LinkIcon,
  LoadingWheelIcon,
  OpenLinkIcon,
  ProductsFilledIcon,
  ProductsOutlineIcon,
  QrIcon,
  SunriseIcon,
  YoutubeIcon,
} from '@/components';

const meta = {
  title: 'icons/Icons',
  tags: ['autodocs'],
};
export default meta;

const icons = [
  { name: 'open_link', Icon: OpenLinkIcon },
  { name: 'link', Icon: LinkIcon },
  { name: 'products_outline', Icon: ProductsOutlineIcon },
  { name: 'products_filled', Icon: ProductsFilledIcon },
  { name: 'home_outline', Icon: HomeOutlineIcon },
  { name: 'home_filled', Icon: HomeFilledIcon },
  { name: 'leaflet_outline', Icon: LeafletOutlineIcon },
  { name: 'leaflet_filled', Icon: LeafletFilledIcon },
  { name: 'instagram', Icon: InstagramIcon },
  { name: 'youtube', Icon: YoutubeIcon },
  { name: 'arrow_left', Icon: ArrowLeftIcon },
  { name: 'arrow_right', Icon: ArrowRightIcon },
  { name: 'sunrise', Icon: SunriseIcon },
  { name: 'loading_wheel', Icon: LoadingWheelIcon },
  { name: 'qr', Icon: QrIcon },
] as const;

export const Gallery = {
  render: () => {
    return (
      <div className="p-[24px]">
        <div className="grid grid-cols-[repeat(auto-fill,minmax(140px,1fr))] gap-[16px]">
          {icons.map(({ name, Icon }) => {
            return (
              <div
                key={name}
                className="flex items-center gap-[12px] rounded-[12px] bg-[rgba(255,255,255,0.06)] p-[12px]"
              >
                <Icon />
                <span className="caption_r_10 text-[var(--color-white-70)]">
                  {name}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    );
  },
};

export const Colored = {
  render: () => {
    return (
      <div className="p-[24px]">
        <div className="grid grid-cols-[repeat(auto-fill,minmax(140px,1fr))] gap-[16px]">
          {icons.map(({ name, Icon }) => {
            return (
              <div
                key={name}
                className="flex items-center gap-[12px] rounded-[12px] bg-[rgba(255,255,255,0.06)] p-[12px] text-[var(--color-37demo-red)]"
              >
                <Icon />
                <span className="caption_r_10 text-[var(--color-white-70)]">
                  {name}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    );
  },
};
