import styled from 'styled-components';

import Row from '../../components/Row';
import SkeletonLoader from '../../components/SkeletonLoader';

// =============================================================================
// Styled Components
// =============================================================================

const IssueCommentCard = styled(SkeletonLoader)`
  border-radius: 6px;
  width: 300px;
  height: 70px;
`;

// =============================================================================
// Main Component
// =============================================================================

const IssueCommentSkeletonLoader = () => {
  return (
    <Row align="center" margin="0 0 15px 0">
      <SkeletonLoader width="30px" height="30px" borderRadius="50%" margin="0 10px 0 0" />
      <IssueCommentCard />
    </Row>
  );
};

export default IssueCommentSkeletonLoader;
