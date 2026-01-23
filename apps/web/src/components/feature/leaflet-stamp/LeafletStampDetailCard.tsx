const DETAIL_ICON_SRC = '/assets/leaflet/icons/detail-info.svg';

export default function LeafletStampDetailCard() {
  return (
    <div className="bg-[var(--color-gray-900)] py-[8px] pr-[10px] pl-[8px]">
      <div className="flex w-full gap-[4px]">
        <img
          alt=""
          className="h-[19px] w-[19px] shrink-0"
          src={DETAIL_ICON_SRC}
        />
        <div className="caption_r_10 flex flex-col gap-[4px] text-[var(--color-gray-300)]">
          <p>
            각 팀의 부스에서 QR 스캔을 통해 스탬프를 찍어보세요!
            <br />
            12개의 기록을 완성한 뒤, 행사장 입구의 안내데스크에서 경품에 응모할
            수 있어요.
          </p>
          <p>
            본 이벤트 응모는 15:50에 마감되며, 16:00 폐회식에서 결과가 발표될
            예정입니다.
          </p>
        </div>
      </div>
    </div>
  );
}
