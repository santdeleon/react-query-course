import React, { useMemo } from 'react';
import { QueryClient, useQueryClient } from 'react-query';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import { relativeDate, hexToRGB } from '../utils';

import { IComment, IIssue, IUser, TLabel, TStatus } from '../types';

import { useIssue, useIssueComments, useUpdateIssue, UpdateIssueArgs, useUsers } from '../hooks';

import { BLUE, GREEN, ORANGE, PINK, PURPLE, RED, YELLOW, DEFAULT_LABELS } from '../constants';

import IssueDetails from '../components/IssueDetails';
import IssueDetailsSkeletonLoader from '../components/IssueDetails/IssueDetailsSkeletonLoader';
import IssueCommentList from '../components/IssueCommentList';
import Row from '../components/Row';
import Column from '../components/Column';
import StatusSelect from '../components/StatusSelect';
import Badge from '../components/Badge';
import OverlayTrigger from '../components/OverlayTrigger';
import Popover from '../components/Popover';
import SkeletonLoader from '../components/SkeletonLoader';
import Spinner from '../components/Spinner';

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

const Title = styled.h4`
  font-weight: 500;
  margin: 0;
`;

const ErrorMessage = styled.p`
  margin: 0;
  color: ${RED};
`;

const UnorderedList = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  li:not(:last-child) {
    margin-bottom: 20px;
  }
`;

const ListItem = styled.li`
  display: flex;
  align-items: center;
`;

const UpdateContainer = styled(Column)`
  padding: 10px;
  max-width: 150px;
  border-radius: 6px;
  background: #fff;
  margin-bottom: 20px;
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

const PopoverItem = styled(PopoverButton)<{ label?: TLabel; isActive: boolean }>`
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
        default:
          return;
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

const AssigneeAvatar = styled.img.attrs({
  width: 24,
})`
  border-radius: 50%;
  margin-right: 5px;
`;

const AssigneeName = styled.p`
  margin: 0;
  color: ${hexToRGB('#222222', 0.7)};
`;

// =============================================================================
// Typedefs
// =============================================================================

type UserIDToUser = Map<string, IUser>;

interface IssueProps {
  data: {
    number?: string;
    issue?: IIssue;
    comments?: IComment[];
    users?: IUser[];
    userIDToUser: UserIDToUser;
    queryClient: QueryClient;
    updateIssue: (args: UpdateIssueArgs) => void;
  };
  isLoadingIssue: boolean;
  isLoadingComments: boolean;
  isLoadingUsers: boolean;
  issueError: unknown;
  commentsError: unknown;
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

  // fetch all users
  const usersQuery = useUsers();
  const users = usersQuery.data ?? [];
  const userIDToUser = useMemo(() => new Map(users.map((user) => [user.id, user])), [users]);

  // mutations
  const updateIssueMutation = useUpdateIssue();

  return {
    data: {
      number,
      issue,
      comments,
      users,
      userIDToUser,
      queryClient,
      updateIssue: (args: UpdateIssueArgs) => updateIssueMutation.mutate(args),
    },
    isLoadingIssue: issueQuery.isLoading,
    isLoadingComments: commentsQuery.isLoading,
    isLoadingUsers: usersQuery.isLoading,
    issueError: issueQuery.error,
    commentsError: commentsQuery.error,
  };
};

// =============================================================================
// Stateless Issue
// =============================================================================

const StatelessIssue = React.memo((props: IssueProps) => {
  const { data, isLoadingIssue, isLoadingComments, isLoadingUsers, issueError, commentsError } = props;
  const isLoading = isLoadingIssue || isLoadingComments || isLoadingUsers;
  const { number, issue, users, userIDToUser, comments, queryClient, updateIssue } = data;

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
        {isLoading ? (
          <IssueDetailsSkeletonLoader />
        ) : issue ? (
          <IssueDetails
            number={number}
            title={issue.title}
            status={issue.status}
            createdByName={issueCreator?.name || issue.createdBy}
            createdDate={relativeDate(issue.createdDate)}
            commentsLength={issue.comments.length}
          />
        ) : (
          <Title>Could not find issue {number && `#${number}`}</Title>
        )}
      </Header>
      <Body>
        <Column>
          {isLoading ? (
            <UnorderedList>
              {[1, 2, 3, 4].map((n) => (
                <ListItem key={n}>
                  <SkeletonLoader width="36px" height="36px" borderRadius="50%" margin="0 10px 0 0" />
                  <SkeletonLoader width="300px" height="70px" borderRadius="6px" />
                </ListItem>
              ))}
            </UnorderedList>
          ) : commentsError ? (
            <ErrorMessage>Failed to fetch comments</ErrorMessage>
          ) : comments && comments.length > 0 ? (
            <IssueCommentList comments={comments} userIDToUser={userIDToUser} queryClient={queryClient} />
          ) : (
            <div>No comments...</div>
          )}
        </Column>
        <Column>
          {isLoading ? null : issue ? (
            <>
              <UpdateContainer>
                <Row align="center" justify="space-between" margin="0 0 5px 0">
                  <Title>Status</Title>
                </Row>
                <StatusSelect
                  status={issue.status}
                  handleChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                    const { value } = e.currentTarget;
                    if (value === 'default') return;
                    updateIssue({ issueId: issue.number, status: e.currentTarget.value as TStatus });
                  }}
                />
              </UpdateContainer>
              <UpdateContainer>
                <Row align="center" justify="space-between" margin="0 0 5px 0">
                  <Title>Assignment</Title>
                  {users && (
                    <OverlayTrigger
                      overlay={
                        <StyledPopover ariaLabel="Labels Popover">
                          <Column align="flex-start">
                            {users.map((user) => (
                              <PopoverItem
                                key={user.id}
                                isActive={!!issueAssignee && issueAssignee?.id === user.id}
                                onClick={() => updateIssue({ issueId: issue.number, assignee: user.id })}
                              >
                                <AssigneeAvatar src={user.profilePictureUrl} alt={user.name} />
                                {user.name}
                              </PopoverItem>
                            ))}
                          </Column>
                        </StyledPopover>
                      }
                    >
                      <PopoverButton>⚙️</PopoverButton>
                    </OverlayTrigger>
                  )}
                </Row>
                {issueAssignee && (
                  <Row align="center">
                    <AssigneeAvatar src={issueAssignee.profilePictureUrl} alt={issueAssignee.name} />
                    <AssigneeName>{issueAssignee.name}</AssigneeName>
                  </Row>
                )}
              </UpdateContainer>
              {/* <UpdateContainer>
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
              </UpdateContainer> */}
            </>
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
