import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { IIssue, TLabel } from '../../types';

import { hexToRGB, relativeDate } from '../../utils';

import { BLUE, GREEN, ORANGE, PINK, PURPLE, RED, YELLOW, DEFAULT_LABELS } from '../../constants';

import Row from '../Row';

// =============================================================================
// Styled Components
// =============================================================================

const Card = styled.div`
  border-width: 2px 2px 4px;
  border-style: solid;
  border-color: #e5e0e0;
  border-radius: 6px;
  padding: 15px;
  margin-bottom: 20px;
`;

const Avatar = styled.img`
  border-radius: 50%;
  width: 16px;
  height: 16px;
  margin-right: 5px;
`;

const Title = styled(Link)`
  font-size: 17px;
  font-weight: 500;
  margin-bottom: 5px;
  text-decoration: none;
  max-width: 100%;
  text-wrap: nowrap;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: black;
  &:hover {
    color: ${PINK};
  }
  &:focus {
    outline-color: #f9d4f6;
  }
`;

const SubtitleRow = styled(Row).attrs({
  align: 'center',
  justify: 'space-between',
  margin: '0 0 10px 0',
})`
  flex-wrap: wrap;

  > * {
    color: #9b9b9b;
    font-size: 14px;
  }
`;

const Subtitle = styled.h4`
  margin: 0;
  font-weight: 500;
  max-width: 100%;
  text-wrap: nowrap;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #9b9b9b;
`;

const Comments = styled(Row).attrs({ align: 'center' })`
  svg {
    margin-right: 4px;
  }
`;

const Badge = styled.span<{ label: TLabel }>`
  color: ${(props) => {
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
  background-color: ${(props) => {
    switch (props.label) {
      case 'bug':
        return hexToRGB(RED, 0.1);
      case 'feature':
        return hexToRGB(ORANGE, 0.1);
      case 'question':
        return hexToRGB(YELLOW, 0.1);
      case 'enhancement':
        return hexToRGB(GREEN, 0.1);
      case 'help':
        return hexToRGB(BLUE, 0.1);
      case 'wontfix':
        return hexToRGB(PURPLE, 0.1);
      case 'duplicate':
        return hexToRGB(PINK, 0.1);
    }
  }};
  font-size: 13px;
  font-weight: 500;
  padding: 2px 6px;
  border-radius: 6px;
`;

// =============================================================================
// Main Component
// =============================================================================

const IssueListItem = React.memo((props: IIssue) => {
  const { id, title, number, assignee, comments, createdBy, createdDate, labels } = props;
  // using this to avoid broken images
  const [avatar, setAvatar] = useState<string | undefined>(assignee);
  const timestamp = `#${number} opened ${relativeDate(createdDate)} by ${createdBy}`;

  return (
    <li key={id}>
      <Card>
        <Row>
          <Title to={`/issue/${number}`}>{title}</Title>
        </Row>
        <SubtitleRow>
          <Row align="center">
            {avatar && (
              <Avatar
                src={`https://res.cloudinary.com/uidotdev/image/twitter_name/${assignee}`}
                onError={() => setAvatar(undefined)}
              />
            )}
            <Subtitle>{timestamp}</Subtitle>
          </Row>
          <Comments>
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 16 16"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M14 1H2c-.55 0-1 .45-1 1v8c0 .55.45 1 1 1h2v3.5L7.5 11H14c.55 0 1-.45 1-1V2c0-.55-.45-1-1-1zm0 9H7l-2 2v-2H2V2h12v8z"
              />
            </svg>
            {comments.length}
          </Comments>
        </SubtitleRow>
        {labels && (
          <Row align="center">
            {labels.map((label) => (
              <Badge key={label} label={label}>
                {label}
              </Badge>
            ))}
          </Row>
        )}
      </Card>
    </li>
  );
});

export default IssueListItem;
