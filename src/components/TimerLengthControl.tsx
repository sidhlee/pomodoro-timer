import React from 'react';
import styled from 'styled-components';
import { FiPlus, FiMinus } from 'react-icons/fi';
import { buttonCss } from '../styled/mixins';

const StyledTimerLengthControl = styled.div`
  margin: 1em;
  display: grid;
  grid-template-areas:
    'label label label'
    'dec length inc';
  grid-row-gap: 0.5em;

  label {
    color: var(--cl-light-blue);
    font-size: 1.2rem;
    grid-area: label;
    text-align: center;
  }
  p {
    grid-area: length;
    justify-self: center;
    color: var(--cl-light-yellow);
  }
  button {
    ${buttonCss}
    font-size: 1.5rem;
  }
  .button--dec {
    grid-area: dec;
  }
  .button--inc {
    grid-area: inc;
  }
`;

type TimerLengthControlProps = {
  name: string;
  length: number;
  handleDecreaseClick: () => void;
  handleIncreaseClick: () => void;
};

function TimerLengthControl(props: TimerLengthControlProps) {
  return (
    <StyledTimerLengthControl>
      <label id={`${props.name}-label`} htmlFor={`${props.name}-length`}>
        {props.name} length
      </label>
      <p id={`${props.name}-length`}>{props.length}</p>
      <button
        id={`${props.name}-decrement`}
        className="button--dec"
        type="button"
        onClick={props.handleDecreaseClick}
      >
        <FiMinus />
      </button>
      <button
        id={`${props.name}-increment`}
        className="button--inc"
        type="button"
        onClick={props.handleIncreaseClick}
      >
        <FiPlus />
      </button>
    </StyledTimerLengthControl>
  );
}

export default TimerLengthControl;
