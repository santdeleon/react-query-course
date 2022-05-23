import styled from 'styled-components';

export interface ColumnProps extends React.HTMLProps<HTMLDivElement> {
  align?: string;
  justify?: string;
  width?: string;
  margin?: string;
  padding?: string;
}

const Column = styled.div<ColumnProps>`
  display: flex;
  flex-direction: column;
  align-items: ${(props) => props.align};
  justify-content: ${(props) => props.justify};
  width: ${(props) => props.width};
  margin: ${(props) => props.margin};
  padding: ${(props) => props.padding};
`;

export default Column;
