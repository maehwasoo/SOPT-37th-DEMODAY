import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="flex w-full flex-col gap-[12px] bg-[var(--color-gray-900)] pt-[24px] pr-0 pb-[12px] pl-[16px]">
      <div className="relative h-[14px] w-[40px]">
        <Image
          src="/assets/figma/main/logo_sopt_black.svg"
          alt="SOPT"
          fill
          className="object-contain"
        />
      </div>

      <p className="title_m_12 text-[var(--color-gray-300)]">
        2026 37th DIVE SOPT DEMODAY
        <br />
        System Update: SUNRISE
      </p>
      <p className="caption_r_10 text-[var(--color-gray-300)]">
        SOPT (솝트, 대학생연합 IT벤처창업 동아리)
        <br />
        Copyright©2026.SOPT.All rights reserved.
      </p>
    </footer>
  );
}
