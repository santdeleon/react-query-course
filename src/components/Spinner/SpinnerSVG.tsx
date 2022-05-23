import React from 'react';
import styled, { keyframes } from 'styled-components';

import { SpinnerProps } from '.';

// =============================================================================
// Styled Components
// =============================================================================

const rotate = keyframes`
  100% {
    transform: rotate(360deg);
  }
`;

const StyledSVG = styled.svg`
  width: 1.8rem;
  height: 1.8rem;
  animation: ${rotate} 0.5s linear infinite;
`;

const Track = styled.path`
  fill: lightgray;
`;

const Block = styled.path`
  fill: gray;
`;

// =============================================================================
// SpinnerSVG
// =============================================================================

const SpinnerSVG = () => (
  <StyledSVG viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Track */}
    <g filter="url(#filter0_i)">
      <Track
        fillRule="evenodd"
        clipRule="evenodd"
        d="M22.0004 40.0001C31.9415 40.0001 40.0003 31.9412 40.0003 22.0002C40.0003 12.0591 31.9415 4.00024 22.0004 4.00024C12.0593 4.00024 4.00049 12.0591 4.00049 22.0002C4.00049 31.9412 12.0593 40.0001 22.0004 40.0001ZM22.0004 44.0001C34.1506 44.0001 44.0003 34.1504 44.0003 22.0002C44.0003 9.84994 34.1506 0.000244141 22.0004 0.000244141C9.85019 0.000244141 0.000488281 9.84994 0.000488281 22.0002C0.000488281 34.1504 9.85019 44.0001 22.0004 44.0001Z"
      />
    </g>
    {/* Block */}
    <g filter="url(#filter1_i)">
      <Block
        fillRule="evenodd"
        clipRule="evenodd"
        d="M27.8464 41.2306C27.4216 40.211 27.9037 39.0401 28.9233 38.6152C31.1053 37.7061 33.0868 36.376 34.7547 34.7011C36.4226 33.0261 37.7443 31.039 38.6443 28.8533C39.5443 26.6675 40.0049 24.3259 40 21.9621C39.995 19.5984 39.5245 17.2587 38.6153 15.0768C38.1905 14.0572 38.6726 12.8862 39.6922 12.4614C40.7118 12.0365 41.8828 12.5187 42.3076 13.5383C43.4188 16.2051 43.9939 19.0647 44 21.9537C44.006 24.8428 43.443 27.7048 42.343 30.3762C41.243 33.0477 39.6276 35.4764 37.5891 37.5235C35.5505 39.5707 33.1287 41.1963 30.4618 42.3075C29.4422 42.7324 28.2713 42.2502 27.8464 41.2306Z"
      />
    </g>
    <defs>
      <filter
        id="filter0_i"
        x="0.000488281"
        y="0.000244141"
        width="43.9998"
        height="43.9998"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset />
        <feGaussianBlur stdDeviation="2" />
        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
        <feBlend mode="normal" in2="shape" result="effect1_innerShadow" />
      </filter>
      <filter
        id="filter1_i"
        x="27.6919"
        y="12.307"
        width="16.3079"
        height="30.1549"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset />
        <feGaussianBlur stdDeviation="2" />
        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
        <feBlend mode="normal" in2="shape" result="effect1_innerShadow" />
      </filter>
    </defs>
  </StyledSVG>
);

export default SpinnerSVG;
