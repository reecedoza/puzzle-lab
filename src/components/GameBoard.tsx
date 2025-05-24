import { createActor } from 'xstate';
import { gameMachine } from '../machines/gameMachine';

const GameBoard = () => {
  const [state, send] = createActor(gameMachine);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Current State: {state.value}</h1>
      <button onClick={() => send('START')}>Start</button>
    </div>
  );
};