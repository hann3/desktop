import styled, { css } from 'styled-components';

import StyledDivProps from './StyledDiv.type';

const StyledDiv = styled.div<StyledDivProps>`
  position: relative;
  display: flex;
  align-items: center;
  width: ${props => props.width || 'auto'};
  flex-grow: ${props => props.flexGrow || 0};
  flex-shrink: 0;
  padding: 5px;
  border: 1px solid #727483;
  border-radius: 15px;
  margin-right: 10px;

  &::after {
    ${props =>
      props.person &&
      css`
        content: '명';
        position: absolute;
        left: 70px;
        transform: translateY(-1px);
      `}
  }

  img {
    width: 30px;
    height: 30px;
    margin-right: 10px;
  }

  input {
    width: calc(100% - 42px);
  }
`;

export { StyledDiv };
