import styled from 'styled-components';

export interface RowProps extends React.HTMLProps<HTMLDivElement> {
  align?: string;
  justify?: string;
  width?: string;
  margin?: string;
  padding?: string;
}

const Row = styled.div<RowProps>`
  display: flex;
  flex-direction: row;
  align-items: ${(props) => props.align};
  justify-content: ${(props) => props.justify};
  width: ${(props) => props.width};
  margin: ${(props) => props.margin};
  padding: ${(props) => props.padding};
`;

export default Row;
