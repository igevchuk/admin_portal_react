import styled from "styled-components";

const Button = styled.button`
  background: transparent;
  padding: 8px 16px;
  min-width: 88px;
  min-height: 36px;
  border-radius: 3px;
  line-height: 0;
  text-align: center;
  text-transform: uppercase;
  font-size: ${props => props.theme.baseFontSize}
  font-weight: ${props => props.theme.fontLight};
  box-shadow: ${props => props.theme.buttonBoxShadow};
  border: none;
  &:hover {
    cursor: pointer;
  }
  &:focus {
    outline: none;
  }
`;

const RaisedButton = Button.extend`
  background: ${props => props.theme.raisedButton};
  color: ${props => props.theme.white};
`;

const SecondaryButton = Button.extend`
  background: ${props => props.theme.secondaryButton};
  color: ${props => props.theme.baseFontColor};
`;

export {
  Button,
  RaisedButton,
  SecondaryButton
};
