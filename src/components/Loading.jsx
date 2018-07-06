import React from "react";
import styled from "styled-components";
import { CircularProgress } from "@material-ui/core";

const Loading = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding-top: 10px;
  padding-bottom: 10px;
`;

export default props => (
  <div ref={props.innerRef}>
    <Loading className="loading" ref={props.innerRef}>
      <CircularProgress color="primary" thickness={2} />      
    </Loading>
  </div>
);
