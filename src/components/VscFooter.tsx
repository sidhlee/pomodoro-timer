import React from 'react';
import styled from 'styled-components';

import { getMinute, getSecond } from '../util/conversion';

const StyledVscFooter = styled.footer`
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  color: var(--cl-white);
  background: var(--cl-primary);
  padding: 0.3em 2em;
  display: flex;

  span,
  p {
    font-size: 1.1rem;
  }

  span:not(:last-of-type) {
    margin-right: 1em;
  }

  border-radius: 0 0 var(--border-radius) var(--border-radius);
  a {
    text-decoration: none;
    font-weight: 700;
  }
  .credit {
    margin-left: auto;
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
      <span>[{props.mode}]</span>
      <p>
        Time left -{' '}
        <span id="time-left">
          {getMinute(seconds)} min {getSecond(seconds)} sec{' '}
        </span>
      </p>
      <span className="credit">
        by <a href="https://github.com/toypiano">toypiano</a>
      </span>
    </StyledVscFooter>
  );
}

export default VscFooter;
