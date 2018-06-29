import styled from 'styled-components';

export default styled.div`
  padding-left: 0;
  padding-right: 0;
  margin-left: -15px;
  margin-right: 0;
  &:after {
    content: "";
    display: table;
    clear: both;
  }
`;