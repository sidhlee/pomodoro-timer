import React from 'react';
import styled from 'styled-components';

import { formatSeconds } from '../util/conversion';

const StyledVscFooter = styled.footer`
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  color: var(--cl-white);
  background: var(--cl-primary);
  padding: 0.3em 2em;
  display: flex;
  justify-content: space-between;
  span,
  p {
    font-size: 1.1rem;
  }
  border-radius: 0 0 var(--border-radius) var(--border-radius);
  a {
    text-decoration: none;
    font-weight: 700;
  }
`;

type Props = {
  secondsLeft: number;
};

function VscFooter(props: Props) {
  return (
    <StyledVscFooter>
      <p>
        Time left -{' '}
        <span id="time-left">{formatSeconds(props.secondsLeft)}</span>
      </p>
      <span>
        by <a href="https://github.com/toypiano">toypiano</a>
      </span>
    </StyledVscFooter>
  );
}

export default VscFooter;
