import React from 'react';
import styled from 'styled-components';
import { FiPlay, FiPause, FiRefreshCcw } from 'react-icons/fi';
import { buttonCss } from '../styled/mixins';

const StyledControllers = styled.div`
  background: var(--cl-gray);
  text-align: center;

  padding: 1em 0;
  button {
    ${buttonCss}
    font-size: 2.2rem;
    margin: 0 0.5em;
  }
`;

type ControllersProps = {
  isRunning: boolean;
  handleStartStopClick: () => void;
  handleResetClick: () => void;
};

function Controllers(props: ControllersProps) {
  return (
    <StyledControllers>
      <button id="start_stop" onClick={props.handleStartStopClick}>
        {props.isRunning ? <FiPause /> : <FiPlay />}
      </button>
      <button id="reset" onClick={props.handleResetClick}>
        <FiRefreshCcw />
      </button>
    </StyledControllers>
  );
}

export default Controllers;
