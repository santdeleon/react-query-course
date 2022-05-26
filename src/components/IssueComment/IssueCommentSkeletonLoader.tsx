import Row from '../../components/Row';
import SkeletonLoader from '../../components/SkeletonLoader';

// =============================================================================
// Main Component
// =============================================================================

const IssueCommentSkeletonLoader = () => (
  <Row align="center" margin="0 0 15px 0">
    <SkeletonLoader width="30px" height="30px" borderRadius="50%" margin="0 10px 0 0" />
    <SkeletonLoader width="300px" height="70px" borderRadius="6px" />
  </Row>
);

export default IssueCommentSkeletonLoader;
