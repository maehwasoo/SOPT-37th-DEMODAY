export type TeamKey =
  | 'amp'
  | 'carena'
  | 'cherrish'
  | 'clustar'
  | 'snappin'
  | 'comfit'
  | 'flint'
  | 'kareer'
  | 'smashing'
  | 'kiero'
  | 'poti'
  | 'makers';

export type TeamTrack = 'appjam' | 'makers';

export type Team = {
  key: TeamKey;
  displayName: string;
  category: string;
  shortDescription: string;
  track: TeamTrack;
};

export const TEAM_LIST: readonly Team[] = [
  {
    key: 'smashing',
    displayName: '스매싱',
    category: '스포츠',
    shortDescription: '스포츠인들을 위한 매칭 서비스는 계속된다',
    track: 'appjam',
  },
  {
    key: 'carena',
    displayName: 'CareNA',
    category: '건강/피트니스',
    shortDescription: '건강검진 결과를 쉽게, 관리까지 한 번에',
    track: 'appjam',
  },
  {
    key: 'kiero',
    displayName: 'KIERO',
    category: '육아',
    shortDescription: '아이의 하루가 모험이 되는 곳, 키어로',
    track: 'appjam',
  },
  {
    key: 'comfit',
    displayName: 'Comfit',
    category: '비즈니스',
    shortDescription: '기업과 나를 잇는 자소서 작성 가이드, Comfit',
    track: 'appjam',
  },
  {
    key: 'amp',
    displayName: 'AMP',
    category: '엔터테인먼트',
    shortDescription: '작은 공지도 크게 울리는 공연 공지의 공식, AMP',
    track: 'appjam',
  },
  {
    key: 'snappin',
    displayName: 'Snappin’',
    category: '라이프스타일',
    shortDescription: "나만의 무드로 연결되는 스냅, Snappin'",
    track: 'appjam',
  },
  {
    key: 'cherrish',
    displayName: 'Cherrish',
    category: '생산성',
    shortDescription: '당신이 아름다워야 할 그 날을 위해, Cherrish',
    track: 'appjam',
  },
  {
    key: 'clustar',
    displayName: 'CLUSTAR',
    category: '생산성',
    shortDescription: '흩어진 메모를 빛나는 결과물로',
    track: 'appjam',
  },
  {
    key: 'flint',
    displayName: 'Flint',
    category: '엔터테인먼트',
    shortDescription: '끌림에서 시작하는 나를 위한 콘텐츠 탐색',
    track: 'appjam',
  },
  {
    key: 'poti',
    displayName: '포티',
    category: '엔터테인먼트',
    shortDescription: '원하는 굿즈만 쏙, 덕후들을 하나로 잇는 공간',
    track: 'appjam',
  },
  {
    key: 'kareer',
    displayName: 'Kareer',
    category: '비즈니스',
    shortDescription: '외국인을 위한 AI 기반 한국 취업•비자 길잡이',
    track: 'appjam',
  },
  {
    key: 'makers',
    displayName: 'SOPT Makers',
    category: '라이프스타일',
    shortDescription: 'SOPT를 SOPT답게',
    track: 'makers',
  },
] as const;

export const TEAM_BY_KEY: Readonly<Record<TeamKey, Team>> = TEAM_LIST.reduce(
  (acc, team) => {
    acc[team.key] = team;
    return acc;
  },
  {} as Record<TeamKey, Team>
);
