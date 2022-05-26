import React, { useMemo } from 'react';
import { QueryClient, useMutation, useQueryClient } from 'react-query';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import { relativeDate } from '../utils';

import { IComment, IIssue, IUser, TLabel } from '../types';

import { useIssue, useIssueComments, useMultipleUsers } from '../hooks';

import { BLUE, DEFAULT_LABELS, GREEN, ORANGE, PINK, PURPLE, RED, YELLOW } from '../constants';

import IssueDetails from '../components/IssueDetails';
import IssueDetailsSkeletonLoader from '../components/IssueDetails/IssueDetailsSkeletonLoader';
import IssueComment from '../components/IssueComment';
import Row from '../components/Row';
import Column from '../components/Column';
import IssueCommentSkeletonLoader from '../components/IssueComment/IssueCommentSkeletonLoader';
import StatusSelect from '../components/StatusSelect';
import Badge from '../components/Badge';
import OverlayTrigger from '../components/OverlayTrigger';
import Popover from '../components/Popover';

// =============================================================================
// Styled Components
// =============================================================================

const Header = styled(Column).attrs({
  padding: '20px',
})`
  border-bottom: 2px solid #e8e8e8;
`;

const Body = styled(Row).attrs({ justify: 'space-between' })`
  padding: 20px;
  background-color: ghostwhite;
  border-radius: 0 0 14px 14px;
`;

const ErrorMessage = styled.p`
  margin: 0;
  color: ${RED};
`;

const Title = styled.h4`
  font-weight: 500;
  margin: 0;
`;

const LabelsContainer = styled(Column)`
  padding: 10px;
  min-width: 100px;
  max-width: 100px;
  border-radius: 6px;
  background: #fff;
`;

const PopoverButton = styled.button`
  margin: 0;
  padding: 0;
  cursor: pointer;
  user-select: none;
  background: transparent;
  outline: 0;
  border: 0;
`;

const PopoverItem = styled(PopoverButton)<{ label: TLabel; isActive: boolean }>`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 5px 10px;
  border-radius: 6px;
  background-color: ${(props) => props.isActive && 'ghostwhite'};
  &:hover {
    background-color: ghostwhite;
  }
  span {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    margin-right: 5px;
    background-color: ${(props) => {
      switch (props.label) {
        case 'bug':
          return RED;
        case 'feature':
          return ORANGE;
        case 'question':
          return YELLOW;
        case 'enhancement':
          return GREEN;
        case 'help':
          return BLUE;
        case 'wontfix':
          return PURPLE;
        case 'duplicate':
          return PINK;
      }
    }};
  }
`;

const StyledPopover = styled(Popover)`
  background-color: #fff;
  button {
    &:not(:last-child) {
      margin: 0 0 5px 0;
    }
  }
`;

// =============================================================================
// Typedefs
// =============================================================================

type UserIDToUser = Map<string, IUser>;

interface IssueProps {
  data: {
    queryClient: QueryClient;
    number?: string;
    issue?: IIssue;
    comments?: IComment[];
    userIDToUser: UserIDToUser;
    // updateStatus:
  };
  loading: boolean;
  issueError: unknown;
  commentsError: unknown;
  usersError: unknown;
}

// =============================================================================
// Hooks
// =============================================================================

const useIssueProps = () => {
  const { number } = useParams();
  const numberAsNum = number ? parseFloat(number) : undefined;

  // grab query client
  const queryClient = useQueryClient();

  // fetch issue
  const issueQuery = useIssue(numberAsNum);
  const issue = issueQuery.data;

  // fetch issue comments
  const commentsQuery = useIssueComments(numberAsNum);
  const comments = commentsQuery.data;

  // fetch and format user data
  const issueIDs = issue ? [issue.assignee, issue.createdBy] : [];
  const commentIDs = comments ? comments.map((c) => c.createdBy) : [];
  const userIDSet = new Set([...issueIDs].concat(commentIDs));
  const usersQuery = useMultipleUsers([...userIDSet].filter(Boolean));
  const users = usersQuery.data ?? [];
  const userIDToUser = useMemo(() => new Map(users.map((user) => [user.id, user])), [users]);

  // mutations

  return {
    data: {
      queryClient,
      number,
      issue,
      comments,
      userIDToUser,
    },
    loading: issueQuery.isLoading || commentsQuery.isLoading,
    issueError: issueQuery.error,
    commentsError: commentsQuery.error,
    usersError: usersQuery.error,
  };
};

// =============================================================================
// Stateless Issue
// =============================================================================

const StatelessIssue = React.memo((props: IssueProps) => {
  const { data, loading, issueError, commentsError } = props;
  const { queryClient, number, issue, userIDToUser, comments } = data;
  const issueCreator: IUser | undefined = issue
    ? queryClient.getQueryData(['users', issue.createdBy]) || userIDToUser.get(issue.createdBy)
    : undefined;
  const issueAssignee: IUser | undefined = issue
    ? queryClient.getQueryData(['users', issue.assignee]) || userIDToUser.get(issue.assignee)
    : undefined;

  if (issueError) {
    return <div>Uh oh. Bad Issue</div>;
  }

  return (
    <>
      <Header>
        {loading ? (
          <IssueDetailsSkeletonLoader />
        ) : issueError ? (
          <ErrorMessage>Failed to fetch issue</ErrorMessage>
        ) : issue ? (
          <IssueDetails
            number={number}
            title={issue.title}
            status={issue.status}
            createdByName={issueCreator?.name || issue.createdBy}
            createdDate={relativeDate(issue.createdDate)}
            commentsLength={issue.comments.length}
          />
        ) : null}
      </Header>
      <Body>
        <Column>
          {loading ? (
            [1, 2, 3, 4].map((n) => <IssueCommentSkeletonLoader key={n} />)
          ) : commentsError ? (
            <ErrorMessage>Failed to fetch comments</ErrorMessage>
          ) : (
            comments && (
              <>
                {comments.map((comment) => {
                  const commentCreator: IUser | undefined =
                    queryClient.getQueryData(['users', comment.createdBy]) || userIDToUser.get(comment.createdBy);
                  return (
                    <IssueComment
                      key={comment.id}
                      avatar={commentCreator?.profilePictureUrl || 'https://placekitten.com/g/22/22'}
                      createdByName={commentCreator?.name || comment.createdBy}
                      createdDate={relativeDate(comment.createdDate)}
                      comment={comment.comment}
                    />
                  );
                })}
              </>
            )
          )}
        </Column>
        <Column>
          {/* {issue?.status && (
            <Column margin="0 0 15px 0">
              <Row>
                <Title>Status</Title>
                <button>do the thing</button>
              </Row>
              <StatusSelect
                status={issue.status}
                handleChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                  // updateStatus(e.currentTarget.value);
                }}
              />
            </Column>
          )}
          {issueAssignee && (
            <Column margin="0 0 15px 0">
              <Title>Assignment</Title>
            </Column>
          )} */}
          {loading ? (
            <div>loading...</div>
          ) : issue ? (
            <LabelsContainer>
              <Row align="center" justify="space-between" margin="0 0 5px 0">
                <Title>Labels</Title>
                <OverlayTrigger
                  overlay={
                    <StyledPopover ariaLabel="Labels Popover">
                      <Column align="flex-start">
                        {DEFAULT_LABELS.map((label) => (
                          <PopoverItem
                            key={label.id}
                            label={label.id}
                            isActive={issue.labels.includes(label.id)}
                            // onClick={() => updateLabel(label.id)}
                          >
                            <span />
                            {label.name}
                          </PopoverItem>
                        ))}
                      </Column>
                    </StyledPopover>
                  }
                >
                  <PopoverButton>⚙️</PopoverButton>
                </OverlayTrigger>
              </Row>
              <ul>
                {issue.labels.map((label) => (
                  <Badge key={label} label={label} isActive>
                    {label}
                  </Badge>
                ))}
              </ul>
            </LabelsContainer>
          ) : null}
        </Column>
      </Body>
    </>
  );
});

// =============================================================================
// Issue
// =============================================================================

const Issue = () => {
  const props = useIssueProps();
  return <StatelessIssue {...props} />;
};

export default Issue;
