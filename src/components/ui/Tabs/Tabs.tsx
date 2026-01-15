'use client';

import { useId } from 'react';
import type { KeyboardEvent } from 'react';

export type TabsValue = 'all' | 'appjam' | 'makers';

export type TabsItem = {
  value: TabsValue;
  label: string;
};

export type TabsProps = {
  value: TabsValue;
  onValueChange: (value: TabsValue) => void;
  items?: readonly TabsItem[];
  className?: string;
};

const DEFAULT_ITEMS: readonly TabsItem[] = [
  { value: 'all', label: 'ALL' },
  { value: 'appjam', label: 'APPJAM' },
  { value: 'makers', label: 'MAKERS' },
] as const;

export default function Tabs({
  value,
  onValueChange,
  items = DEFAULT_ITEMS,
  className,
}: TabsProps) {
  const baseId = useId();

  const focusTabByIndex = (index: number) => {
    const target = items[index];
    if (!target) return;

    const el = document.getElementById(`${baseId}-tab-${target.value}`);
    if (el instanceof HTMLElement) el.focus();
  };

  const selectByIndex = (index: number) => {
    const target = items[index];
    if (!target) return;
    onValueChange(target.value);
    requestAnimationFrame(() => focusTabByIndex(index));
  };

  const handleKeyDown = (
    event: KeyboardEvent<HTMLButtonElement>,
    index: number
  ) => {
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      selectByIndex((index + 1) % items.length);
      return;
    }

    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      selectByIndex((index - 1 + items.length) % items.length);
      return;
    }

    if (event.key === 'Home') {
      event.preventDefault();
      selectByIndex(0);
      return;
    }

    if (event.key === 'End') {
      event.preventDefault();
      selectByIndex(items.length - 1);
    }
  };

  const tabBaseClassName =
    'title_m_12 inline-flex flex-1 items-center justify-center h-[44px] border-b-2 border-transparent bg-transparent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-white)] active:text-[var(--color-gray-800)]';

  return (
    <div
      aria-label="Tabs"
      className={['flex w-full', className].filter(Boolean).join(' ')}
      role="tablist"
    >
      {items.map((item, index) => {
        const selected = item.value === value;

        const tabStateClassName = selected
          ? 'text-[var(--color-37demo-red)] border-[var(--color-37demo-red)]'
          : 'text-[var(--color-gray-500)]';

        const tabClassName = [tabBaseClassName, tabStateClassName].join(' ');

        return (
          <button
            key={item.value}
            aria-selected={selected}
            className={tabClassName}
            id={`${baseId}-tab-${item.value}`}
            onClick={() => onValueChange(item.value)}
            onKeyDown={(event) => handleKeyDown(event, index)}
            role="tab"
            tabIndex={selected ? 0 : -1}
            type="button"
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}
