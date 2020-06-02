import React from 'react';
import styled from 'styled-components';
import figlet from 'figlet';
import standard from 'figlet/importable-fonts/Standard.js';

import { formatSeconds } from '../util/conversion';

declare module 'figlet' {
  // Module Augmentation
  // paseFont function is missing type definition, so we're adding it here.
  // https://www.typescriptlang.org/docs/handbook/declaration-merging.html#module-augmentation
  function parseFont(fontName: string, data: string): FontOptions;
}

// https://github.com/patorjk/figlet.js#getting-started---webpack--react
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
  // https://github.com/patorjk/figlet.js#font-options
  const time = figlet.textSync(formattedTime, {
    font: 'Standard',
    horizontalLayout: 'full',
    verticalLayout: 'full',
  });

  return (
    <StyledTimeDisplay seconds={props.secondsLeft}>
      <p>/* =====================</p>
      {/* ASCII arts need to be in pre tag to keep the newline characters */}
      <pre>{time}</pre>
      <p> ====================== */ </p>
    </StyledTimeDisplay>
  );
}

export default TimeDisplay;
