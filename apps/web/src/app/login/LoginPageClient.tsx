'use client';

import { useMemo, useState } from 'react';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import NavTop from '@/components/layout/nav-top/NavTop';
import { loginApi } from '@/lib/api';

const BRANDING_BG_SRC = '/assets/figma/main/img_branding_main.png';

const TEAM_ICON_SRC = '/assets/figma/login/icon-team.svg';
const PERSON_ICON_SRC = '/assets/figma/login/icon-person.svg';
const CHEVRON_ICON_SRC = '/assets/figma/login/icon-chevron.svg';

type ParticipantType = 'appjam' | 'visitor';

type TeamOption = {
  teamKey: string;
  label: string;
};

const TEAM_OPTIONS: readonly TeamOption[] = [
  { teamKey: 'amp', label: 'AMP' },
  { teamKey: 'clustar', label: 'CLUSTAR' },
  { teamKey: 'comfit', label: 'Comfit' },
  { teamKey: 'flint', label: 'FLINT' },
  { teamKey: 'kareer', label: 'Kareer' },
  { teamKey: 'kiero', label: 'KIERO' },
  { teamKey: 'makers', label: 'Makers' },
  { teamKey: 'snappin', label: 'Snappin’' },
  { teamKey: 'smashing', label: '스매싱' },
  { teamKey: 'carena', label: '케어나' },
  { teamKey: 'poti', label: '포티' },
  { teamKey: 'cherrish', label: 'Cherrish' },
] as const;

function sanitizeNextPath(next: string | undefined) {
  if (!next) return null;
  if (!next.startsWith('/')) return null;
  if (next.startsWith('//')) return null;
  return next;
}

function trimInput(value: string) {
  return value.trim();
}

function SelectCard({
  participantType,
  onSelectType,
  onNext,
}: {
  participantType: ParticipantType | null;
  onSelectType: (type: ParticipantType) => void;
  onNext: () => void;
}) {
  const canNext = participantType !== null;

  return (
    <div className="w-[343px] rounded-[8px] bg-[var(--color-black)] px-[16px] pt-[16px] pb-[24px]">
      <div className="flex flex-col items-center gap-[16px]">
        <p className="title_m_18 text-center text-[var(--color-white)]">
          데모데이 참여 유형을 선택해 주세요
        </p>

        <div className="flex flex-col items-center gap-[32px]">
          <div className="flex items-center gap-[16px]">
            <button
              type="button"
              className={[
                'relative h-[167px] w-[134px] overflow-hidden rounded-[4px] bg-[var(--color-gray-900)]',
                participantType === 'appjam'
                  ? 'border border-[var(--color-37demo-red)]'
                  : 'border border-transparent',
                'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-white)]',
              ].join(' ')}
              onClick={() => onSelectType('appjam')}
            >
              <span className="absolute top-[calc(50%-22.5px)] left-[calc(50%-1px)] h-[66px] w-[66px] -translate-x-1/2 -translate-y-1/2 overflow-hidden">
                <span className="absolute top-[25%] right-0 bottom-[25%] left-0">
                  <img alt="" className="h-full w-full" src={TEAM_ICON_SRC} />
                </span>
              </span>
              <span className="head_b_18 absolute top-[120.5px] left-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-[var(--color-white)]">
                앱잼 참여 팀
              </span>
            </button>

            <button
              type="button"
              className={[
                'relative h-[167px] w-[134px] overflow-hidden rounded-[4px] bg-[var(--color-gray-900)]',
                participantType === 'visitor'
                  ? 'border border-[var(--color-37demo-red)]'
                  : 'border border-transparent',
                'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-white)]',
              ].join(' ')}
              onClick={() => onSelectType('visitor')}
            >
              <span className="absolute top-[calc(50%-22.5px)] left-[calc(50%-1px)] h-[66px] w-[66px] -translate-x-1/2 -translate-y-1/2 overflow-hidden">
                <span className="absolute inset-[16.67%]">
                  <img alt="" className="h-full w-full" src={PERSON_ICON_SRC} />
                </span>
              </span>
              <span className="head_b_18 absolute top-[120.5px] left-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-[var(--color-white)]">
                관람객
              </span>
            </button>
          </div>

          <button
            type="button"
            className={[
              'head_b_18 h-[56px] w-[285px] rounded-[4px] text-center',
              canNext
                ? 'bg-[var(--color-37demo-red)] text-[var(--color-white)] active:bg-[var(--color-37demo-red-80)]'
                : 'cursor-not-allowed bg-[var(--color-gray-800)] text-[var(--color-gray-600)]',
              'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-white)]',
            ].join(' ')}
            onClick={onNext}
            disabled={!canNext}
          >
            다음
          </button>
        </div>
      </div>
    </div>
  );
}

function TeamDropdown({
  open,
  selectedTeamKey,
  onToggle,
  onSelect,
}: {
  open: boolean;
  selectedTeamKey: string | null;
  onToggle: () => void;
  onSelect: (teamKey: string) => void;
}) {
  const selected = TEAM_OPTIONS.find((o) => o.teamKey === selectedTeamKey);

  return (
    <div className="relative w-full">
      <button
        type="button"
        className={[
          'flex h-[56px] w-full items-center justify-between rounded-[4px] bg-[var(--color-black)] py-[16px] pr-[16px] pl-[20px]',
          open || selectedTeamKey
            ? 'border border-[var(--color-37demo-red)]'
            : 'border border-[var(--color-gray-800)]',
          'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-white)]',
        ].join(' ')}
        onClick={onToggle}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span
          className={
            selected
              ? 'body_r_16 text-[var(--color-white)]'
              : 'body_r_14 text-[var(--color-gray-600)]'
          }
        >
          {selected ? selected.label : '소속 팀을 선택해 주세요'}
        </span>

        <span className="relative h-[24px] w-[24px]">
          <span className={open ? 'block rotate-90' : 'block -rotate-90'}>
            <img alt="" className="h-[18px] w-[10px]" src={CHEVRON_ICON_SRC} />
          </span>
        </span>
      </button>

      {open ? (
        <div
          className="absolute top-[calc(100%+8px)] left-0 z-20 max-h-[360px] w-full overflow-y-auto overscroll-contain rounded-[4px] border border-[var(--color-black)] bg-[var(--color-black)] py-[12px]"
          role="listbox"
        >
          {TEAM_OPTIONS.map((option) => {
            const isSelected = option.teamKey === selectedTeamKey;

            return (
              <button
                key={option.teamKey}
                type="button"
                className={[
                  'body_r_16 flex h-[48px] w-full items-center px-[12px] text-left text-[var(--color-white)]',
                  isSelected ? 'bg-[var(--color-37demo-red-20)]' : '',
                  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-white)]',
                ]
                  .filter(Boolean)
                  .join(' ')}
                onClick={() => onSelect(option.teamKey)}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}

function TextInput({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}) {
  const hasValue = value.length > 0;

  return (
    <div className="h-[56px] w-full rounded-[4px] bg-[var(--color-gray-900)] px-[20px] py-[14px]">
      <input
        className={[
          hasValue ? 'body_r_16' : 'body_r_14',
          'h-full w-full bg-transparent text-[var(--color-white)] outline-none placeholder:text-[var(--color-gray-600)]',
        ].join(' ')}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete="off"
        inputMode="text"
      />
    </div>
  );
}

function AppjamCard({
  teamKey,
  name,
  dropdownOpen,
  errorMessage,
  submitting,
  onToggleDropdown,
  onSelectTeam,
  onChangeName,
  onPrev,
  onNext,
}: {
  teamKey: string | null;
  name: string;
  dropdownOpen: boolean;
  errorMessage: string | null;
  submitting: boolean;
  onToggleDropdown: () => void;
  onSelectTeam: (teamKey: string) => void;
  onChangeName: (value: string) => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const canNext = Boolean(teamKey) && trimInput(name).length > 0 && !submitting;

  return (
    <>
      <div className="w-[343px] rounded-[8px] bg-[var(--color-black)] px-[24px] pt-[16px] pb-[24px]">
        <div className="flex flex-col items-center gap-[16px]">
          <p className="title_m_18 text-center text-[var(--color-white)]">
            소속 팀과 본인의 이름을 입력해 주세요
          </p>

          <div className="flex w-full flex-col items-center gap-[32px]">
            <div className="flex w-full flex-col gap-[16px]">
              <TeamDropdown
                open={dropdownOpen}
                selectedTeamKey={teamKey}
                onToggle={onToggleDropdown}
                onSelect={onSelectTeam}
              />
              <TextInput
                value={name}
                onChange={onChangeName}
                placeholder="이름을 입력해 주세요"
              />
              {errorMessage ? (
                <p className="body_r_14 text-[var(--color-37demo-red)]">
                  {errorMessage}
                </p>
              ) : null}
            </div>

            <div className="flex w-full gap-[8px]">
              <button
                type="button"
                className="head_b_18 h-[56px] flex-1 rounded-[4px] border border-[var(--color-gray-800)] bg-transparent text-[var(--color-white)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-white)]"
                onClick={onPrev}
                disabled={submitting}
              >
                이전
              </button>
              <button
                type="button"
                className={[
                  'head_b_18 h-[56px] w-[192px] rounded-[4px] text-center',
                  canNext
                    ? 'bg-[var(--color-37demo-red)] text-[var(--color-white)] active:bg-[var(--color-37demo-red-80)]'
                    : 'cursor-not-allowed bg-[var(--color-gray-800)] text-[var(--color-gray-600)]',
                  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-white)]',
                ].join(' ')}
                onClick={onNext}
                disabled={!canNext}
              >
                다음
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* detail */}
      <div className="w-[343px] bg-[var(--color-gray-900)] py-[8px] pr-[10px] pl-[8px]">
        <div className="flex w-full items-center justify-center gap-[4px]">
          <img
            alt=""
            className="h-[19px] w-[19px] shrink-0"
            src="/assets/leaflet/icons/detail-info.svg"
          />
          <p className="caption_r_10 text-[var(--color-gray-300)]">
            앱잼 참여 팀원은 마이페이지에서 QR 코드를 방문객에게 제공할 수
            있어요!
          </p>
        </div>
      </div>
    </>
  );
}

function VisitorCard({
  name,
  errorMessage,
  submitting,
  onChangeName,
  onNext,
}: {
  name: string;
  errorMessage: string | null;
  submitting: boolean;
  onChangeName: (value: string) => void;
  onNext: () => void;
}) {
  const canNext = trimInput(name).length > 0 && !submitting;

  return (
    <div className="w-[343px] rounded-[8px] bg-[var(--color-black)] px-[24px] pt-[16px] pb-[24px]">
      <div className="flex flex-col items-center gap-[16px]">
        <p className="title_m_18 text-center text-[var(--color-white)]">
          본인의 이름을 입력해 주세요
        </p>

        <div className="flex w-full flex-col items-center gap-[32px]">
          <div className="flex w-full flex-col gap-[16px]">
            <TextInput
              value={name}
              onChange={onChangeName}
              placeholder="이름을 입력해 주세요"
            />
            {errorMessage ? (
              <p className="body_r_14 text-[var(--color-37demo-red)]">
                {errorMessage}
              </p>
            ) : null}
          </div>

          <button
            type="button"
            className={[
              'head_b_18 h-[56px] w-full rounded-[4px] text-center',
              canNext
                ? 'bg-[var(--color-37demo-red)] text-[var(--color-white)] active:bg-[var(--color-37demo-red-80)]'
                : 'cursor-not-allowed bg-[var(--color-gray-800)] text-[var(--color-gray-600)]',
              'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-white)]',
            ].join(' ')}
            onClick={onNext}
            disabled={!canNext}
          >
            다음
          </button>
        </div>
      </div>
    </div>
  );
}

export default function LoginPageClient({ next }: { next?: string }) {
  const router = useRouter();

  const safeNext = useMemo(() => sanitizeNextPath(next), [next]);

  const [step, setStep] = useState<'select' | 'appjam' | 'visitor'>('select');
  const [participantType, setParticipantType] =
    useState<ParticipantType | null>(null);

  const [appjamTeamKey, setAppjamTeamKey] = useState<string | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const [name, setName] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const navigateAfterLogin = () => {
    router.push(safeNext ?? '/leaflet');
  };

  const handleLogin = async (input: { teamKey: string; name: string }) => {
    const trimmedName = trimInput(input.name);
    if (!trimmedName) return;

    setSubmitting(true);
    setErrorMessage(null);

    try {
      await loginApi({ teamKey: input.teamKey, name: trimmedName });
      navigateAfterLogin();
    } catch {
      setErrorMessage('로그인에 실패했습니다. 다시 시도해 주세요.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-[var(--app-max-width)]">
      <div className="relative h-[667px] min-h-[667px] w-full overflow-hidden bg-[var(--color-black)]">
        {/* nav top */}
        <div className="absolute top-0 left-0 w-full pt-[var(--safe-area-top)]">
          <NavTop variant="main" />
        </div>

        {/* branding bg */}
        <div className="pointer-events-none absolute top-1/2 left-1/2 h-[792px] w-[750px] -translate-x-1/2 -translate-y-1/2 opacity-10">
          <Image
            src={BRANDING_BG_SRC}
            alt=""
            fill
            priority
            className="object-cover"
            sizes="750px"
          />
        </div>

        {/* contents */}
        {step === 'select' ? (
          <div className="absolute top-[176px] left-1/2 w-[343px] -translate-x-1/2">
            <SelectCard
              participantType={participantType}
              onSelectType={(type) => {
                setParticipantType(type);
              }}
              onNext={() => {
                if (!participantType) return;
                setStep(participantType === 'appjam' ? 'appjam' : 'visitor');
              }}
            />
          </div>
        ) : null}

        {step === 'appjam' ? (
          <>
            <div className="absolute top-[176px] left-1/2 flex w-[343px] -translate-x-1/2 flex-col gap-[36px]">
              <AppjamCard
                teamKey={appjamTeamKey}
                name={name}
                dropdownOpen={dropdownOpen}
                errorMessage={errorMessage}
                submitting={submitting}
                onToggleDropdown={() => setDropdownOpen((v) => !v)}
                onSelectTeam={(selectedTeamKey) => {
                  setAppjamTeamKey(selectedTeamKey);
                  setDropdownOpen(false);
                }}
                onChangeName={(value) => setName(value)}
                onPrev={() => {
                  setStep('select');
                  setDropdownOpen(false);
                  setErrorMessage(null);
                }}
                onNext={() => {
                  if (!appjamTeamKey) return;
                  handleLogin({ teamKey: appjamTeamKey, name });
                }}
              />
            </div>
          </>
        ) : null}

        {step === 'visitor' ? (
          <div className="absolute top-[196px] left-1/2 w-[343px] -translate-x-1/2">
            <VisitorCard
              name={name}
              errorMessage={errorMessage}
              submitting={submitting}
              onChangeName={(value) => setName(value)}
              onNext={() => handleLogin({ teamKey: 'external', name })}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
}
