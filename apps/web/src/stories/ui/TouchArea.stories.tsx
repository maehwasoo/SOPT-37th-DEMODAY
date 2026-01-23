import { ArrowLeftIcon, TouchArea } from '@/components';

const meta = {
  title: 'ui/TouchArea',
  tags: ['autodocs'],
};
export default meta;

export const Basic = {
  render: () => {
    return (
      <div className="flex items-center gap-[12px] p-[24px]">
        <TouchArea aria-label="뒤로가기" icon={<ArrowLeftIcon />} />
        <TouchArea
          aria-label="뒤로가기(강조)"
          icon={<ArrowLeftIcon />}
          className="rounded-[12px] bg-[rgba(255,255,255,0.06)] text-[var(--color-37demo-red)]"
        />
      </div>
    );
  },
};
