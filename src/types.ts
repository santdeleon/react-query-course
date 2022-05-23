export type TLabel = 'bug' | 'feature' | 'enhancement' | 'question' | 'help' | 'wontfix' | 'duplicate';

export interface ILabel {
  id: string;
  name: TLabel;
  color: string;
}

export type TStatus = 'backlog' | 'todo' | 'inProgress' | 'backlog' | 'cancelled' | 'done';

export interface IStatus {
  id: TStatus;
  label: string;
}

export interface IIssue {
  assignee: string;
  comments: string[];
  completedDate: Date | null;
  createdBy: string;
  createdDate: Date;
  dueDate: Date;
  id: string;
  labels: TLabel[];
  number: number;
  status: TStatus;
  title: string;
}

export interface IComment {
  comment: string;
  createdBy: string;
  createdDate: Date;
  id: string;
  issue_id: string;
}
