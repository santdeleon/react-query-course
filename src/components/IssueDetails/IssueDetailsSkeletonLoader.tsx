import Row from '../../components/Row';
import Column from '../../components/Column';
import SkeletonLoader from '../../components/SkeletonLoader';

const IssueDetailsSkeletonLoader = () => {
  return (
    <Column width="100%">
      <Row width="100%" align="center" justify="space-between" margin="0 0 10px 0">
        <SkeletonLoader width="60px" height="12px" borderRadius="8px" />
        <SkeletonLoader width="40px" height="10px" borderRadius="8px" />
      </Row>
      <Column>
        <SkeletonLoader width="250px" height="16px" borderRadius="8px" margin="0 0 10px 0" />
        <SkeletonLoader width="120px" height="12px" borderRadius="8px" />
      </Column>
    </Column>
  );
};

export default IssueDetailsSkeletonLoader;
