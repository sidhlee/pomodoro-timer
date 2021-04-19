import React from 'react';
import styled from 'styled-components';

import { getMinute, getSecond } from '../util/conversion';

const StyledVscFooter = styled.footer`
  /* position: absolute;
  left: 0;
  bottom: 0; */
  width: 100%;
  color: var(--cl-white);
  background: var(--cl-primary);
  padding: 0.3em 5vw;
  .container {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    border-radius: 0 0 var(--border-radius) var(--border-radius);
    max-width: 25rem;
    margin-left: auto;
  }

  span,
  p {
    font-size: 1.1rem;
    margin-left: auto;
  }

  span:not(:last-of-type) {
    margin-right: 0.5em;
  }

  .credit {
    a {
      text-decoration: none;
      font-weight: 700;
    }
  }
`;

type Props = {
  secondsLeft: number;
  mode: string;
};

function VscFooter(props: Props) {
  const { secondsLeft: seconds } = props;
  return (
    <StyledVscFooter>
      <div className="container">
        <span>[{props.mode}]</span>
        <span id="time-left">
          {getMinute(seconds)} min {getSecond(seconds)} sec{' '}
        </span>
        <span className="credit">
          by <a href="https://github.com/sidhlee">sidhlee</a>
        </span>
      </div>
    </StyledVscFooter>
  );
}

export default VscFooter;
