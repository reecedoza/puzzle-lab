import { createMachine } from 'xstate';

export const gameMachine = createMachine({
  id: 'puzzleGame',
  initial: 'idle',
  states: {
    idle: { on: { START: 'playing' } },
    playing: {
      on: {
        WIN: 'won',
        FAIL: 'lost',
      },
    },
    won: { on: { RESTART: 'idle' } },
    lost: { on: { RESTART: 'idle' } },
  },
});