// =============================================================================
// Colors
// =============================================================================

import { IStatus, ILabel } from './types';

export const RED = '#ff6363';
export const ORANGE = '#fc9049';
export const YELLOW = '#fccc49';
export const GREEN = '#37d813';
export const BLUE = '#13bbd8';
export const PURPLE = '#7213d8';
export const PINK = '#d813cb';
export const GRAY = '#d2d2d2';

// =============================================================================
// Example Data
// =============================================================================

export const DEFAULT_USERS = [
  {
    id: 'u_1',
    name: 'Tyler',
    profilePictureUrl: 'https://res.cloudinary.com/uidotdev/image/twitter_name/tylermcginnis',
  },
  {
    id: 'u_2',
    name: 'Bono',
    profilePictureUrl: 'https://res.cloudinary.com/uidotdev/image/twitter_name/u2',
  },
];

export const DEFAULT_STATUSES: IStatus[] = [
  { id: 'backlog', label: 'Backlog' },
  { id: 'todo', label: 'Todo' },
  { id: 'inProgress', label: 'In Progress' },
  { id: 'done', label: 'Done' },
  { id: 'cancelled', label: 'Cancelled' },
];

export const DEFAULT_LABELS: ILabel[] = [
  { id: 'bug', name: 'bug', color: RED },
  { id: 'feature', name: 'feature', color: ORANGE },
  { id: 'enhancement', name: 'enhancement', color: GREEN },
  { id: 'question', name: 'question', color: YELLOW },
  { id: 'help', name: 'help wanted', color: BLUE },
  { id: 'wontfix', name: 'wontfix', color: PURPLE },
  { id: 'duplicate', name: 'duplicate', color: PINK },
];
