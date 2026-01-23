import { TEAM_LIST, type TeamKey } from '@/data/teams';

export type LeafletStampKey = TeamKey;

export type LeafletStamp = {
  key: LeafletStampKey;
  label: string;
};

export const LEAFLET_STAMPS: LeafletStamp[] = TEAM_LIST.map((team) => ({
  key: team.key,
  label: team.displayName,
}));
