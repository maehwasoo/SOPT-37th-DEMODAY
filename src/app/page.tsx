import { Divider, TagMain } from '@/components';

export default function Home() {
  return (
    <main className="px-[16px] py-[24px]">
      <div className="flex flex-col gap-[12px]">
        <TagMain>행사 개요</TagMain>
        <Divider />
      </div>
    </main>
  );
}
