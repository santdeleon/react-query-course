import styled, { keyframes } from 'styled-components';

// =============================================================================
// Keyframes
// =============================================================================

export const shimmer = keyframes`
  from {
    left: -150px;
    transform: skewX(-10deg);
  }
  to {
    left: 100%;
    transform: skewX(-10deg);
  }
`;

// =============================================================================
// Typedefs
// =============================================================================

interface SkeletonLoaderProps extends React.HTMLProps<HTMLDivElement> {
  width?: string;
  height?: string;
  margin?: string;
  borderRadius?: string;
  backgroundColor?: string;
}

// =============================================================================
// Styled Components
// =============================================================================

const SkeletonLoader = styled.div<SkeletonLoaderProps>`
  position: relative;
  overflow: hidden;
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  margin: ${({ margin }) => margin};
  border-radius: ${({ borderRadius }) => borderRadius};
  background-color: ${({ backgroundColor }) => backgroundColor ?? '#f7f4f4'};
  &:before {
    content: '';
    display: block;
    position: absolute;
    left: -150px;
    top: 0;
    height: 100%;
    width: 150px;
    background: linear-gradient(to right, transparent 0%, #e0dede 50%, transparent 100%);
    animation: ${shimmer} 1.5s cubic-bezier(0.4, 0, 0.2, 1) infinite;
  }
`;

export default SkeletonLoader;
