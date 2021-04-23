import { createMachine, assign } from "xstate";

const assignProblem = assign({
  problem: (_, event) => event.data,
});

const isValidProblem = (_, event) => {
  return event.data.length > 0;
};

export const createChoiceMachine = () =>
  createMachine(
    {
      id: "choice-machine",
      initial: "idle",
      context: {
        problem: undefined,
      },
      states: {
        idle: {
          on: {
            SET_PROBLEM: {
              target: "readyToChoose",
              actions: "assignProblem",
              cond: "isValidProblem",
            },
          },
        },
        readyToChoose: {
          on: {
            YES: "hellYes",
            NO: "no",
          },
        },
        hellYes: {
          on: {
            RESET: "idle",
          },
        },
        no: {
          on: {
            RESET: "idle",
          },
        },
      },
    },
    {
      actions: {
        assignProblem,
      },
      guards: { isValidProblem },
    }
  );
