import { css } from 'styled-components';

/**
 * Base style rules for button
 */
export const buttonCss = css`
  cursor: pointer;
  font: inherit;
  line-height: 1;
  background: transparent;
  border: none;
  color: var(--cl-light-gray);
  &:hover,
  &:active {
    color: var(--cl-white);
  }
  outline: none;
  &:focus {
    outline: 1px dotted var(--cl-light-gray);
  }

  svg {
    display: block;
    margin: auto;
  }
`;
