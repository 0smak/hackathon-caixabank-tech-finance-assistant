import styled, { css } from "styled-components";

const Div = styled.div`
  padding: 4px 10px;
  border-radius: 5px;
  font-size: 14px;
  width: fit-content;

  ${(props) =>
    props.type === "success" &&
    css`
      background-color: var(--success-color);
      color: var(--success-color-fg);
    `}

  ${(props) =>
    props.type === "error" &&
    css`
      background-color: var(--error-color);
      color: var(--error-color-fg);
    `}
`;

const Badge = ({ type, children }) => {
  const firstUpperCase = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  return <Div type={type}>{firstUpperCase(children)}</Div>;
};

export default Badge;
