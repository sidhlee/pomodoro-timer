import React from 'react';
import styled from 'styled-components';
import figlet from 'figlet';
import standard from 'figlet/importable-fonts/Standard.js';

import { formatSeconds } from '../util/conversion';

// Declaration merging
// https://www.typescriptlang.org/docs/handbook/declaration-merging.html
declare module 'figlet' {
  function parseFont(fontName: string, data: string): FontOptions;
}

figlet.parseFont('Standard', standard);

const StyledTimeDisplay = styled.div<{ seconds: number }>`
  text-align: center;
  margin: 1em auto;
  font-weight: 700;
  color: var(--cl-green);
  pre {
    color: ${(props) => {
      if (props.seconds <= 300) return 'var(--cl-red)';
      else if (props.seconds <= 600) return 'var(--cl-orange)';
      else return 'var(--cl-green)';
    }};
  }
`;

type TimeDisplayProps = {
  secondsLeft: number;
};
function TimeDisplay(props: TimeDisplayProps) {
  const formattedTime = formatSeconds(props.secondsLeft);
  const time = figlet.textSync(formattedTime, {
    font: 'Standard',
    horizontalLayout: 'full',
    verticalLayout: 'full',
  });

  return (
    <StyledTimeDisplay seconds={props.secondsLeft}>
      <p>/* =====================</p>
      <pre>{time}</pre>
      <p> ====================== */ </p>
    </StyledTimeDisplay>
  );
}

export default TimeDisplay;
