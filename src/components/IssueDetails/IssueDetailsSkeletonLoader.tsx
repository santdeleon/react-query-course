import Row from '../../components/Row';
import Column from '../../components/Column';
import SkeletonLoader from '../../components/SkeletonLoader';

const IssueDetailsSkeletonLoader = () => {
  return (
    <Column width="100%">
      <Row width="100%" align="center" justify="space-between" margin="0 0 10px 0">
        {/* Issue Number */}
        <SkeletonLoader width="60px" height="14px" borderRadius="8px" />
        {/* Badge */}
        <SkeletonLoader width="50px" height="27px" borderRadius="6px" />
      </Row>
      <Column>
        {/* Title */}
        <SkeletonLoader width="250px" height="16px" borderRadius="8px" margin="0 0 10px 0" />
        {/* Subtitle */}
        <SkeletonLoader width="120px" height="12px" borderRadius="8px" />
      </Column>
    </Column>
  );
};

export default IssueDetailsSkeletonLoader;
