import styled from 'styled-components';

export default styled.div`
  padding-left: 15px;
  padding-right: 15px;
  float: left;
  width: ${ props => props.span ? (props.span / 12 * 100) : "8.33"}%;
`;