// =============================================================================
// Colors
// =============================================================================

import { ILabel, IIssue, IComment, TStatus, IStatus } from './types';

export const RED = '#ff6363';
export const ORANGE = '#fc9049';
export const YELLOW = '#fccc49';
export const GREEN = '#37d813';
export const BLUE = '#13bbd8';
export const PURPLE = '#7213d8';
export const PINK = '#d813cb';

// =============================================================================
// Example Data
// =============================================================================

export const DEFAULT_LABELS: ILabel[] = [
  {
    id: '1',
    name: 'bug',
    color: RED,
  },
  {
    id: '2',
    name: 'feature',
    color: ORANGE,
  },
  {
    id: '3',
    name: 'question',
    color: YELLOW,
  },
  {
    id: '4',
    name: 'enhancement',
    color: GREEN,
  },
  {
    id: '5',
    name: 'help',
    color: BLUE,
  },
  {
    id: '6',
    name: 'wontfix',
    color: PURPLE,
  },
  {
    id: '7',
    name: 'duplicate',
    color: PINK,
  },
];

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

export const DEFAULT_ISSUE: IIssue = {
  assignee: 'u_2',
  comments: ['comment_1'],
  completedDate: null,
  createdBy: 'u_1',
  createdDate: new Date(),
  dueDate: new Date(),
  id: 'issue_1',
  labels: ['bug'],
  number: 1,
  status: 'inProgress',
  title: 'Test Issue',
};

export const DEFAULT_COMMENTS: IComment[] = [
  {
    comment: 'This is a test issue.',
    createdBy: 'u_1',
    createdDate: new Date(),
    id: 'comment_1',
    issue_id: 'issue_1',
  },
];

export const DEFAULT_STATUSES: IStatus[] = [
  { id: 'backlog', label: 'Backlog' },
  { id: 'cancelled', label: 'Cancelled' },
  { id: 'done', label: 'Done' },
  { id: 'inProgress', label: 'In Progress' },
  { id: 'todo', label: 'Todo' },
];
