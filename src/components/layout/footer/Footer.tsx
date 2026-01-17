export default function Footer() {
  return (
    <footer className="flex w-full flex-col gap-[12px] bg-[var(--color-gray-900)] pt-[24px] pr-0 pb-[12px] pl-[16px]">
      <div className="grid h-[14px] w-[40px] place-items-center rounded-[2px] bg-[var(--color-gray-800)]">
        <p className="caption_r_10 text-[var(--color-gray-400)]">SOPT</p>
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
