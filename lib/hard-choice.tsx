import React from "react";
import { useMachine } from "@xstate/react";
import { createChoiceMachine } from "~/lib/choice-machine.js";

type HardChoiceType = [string, (value: string) => void];

const HardChoiceContext = React.createContext<HardChoiceType | null>(null);

export const HardChoiceProvider: React.FC<{ value?: string }> = ({
  children,
  value,
}) => {
  const [choice, setChoice] = React.useState(value || "");

  return (
    <HardChoiceContext.Provider value={[choice, setChoice]}>
      {children}
    </HardChoiceContext.Provider>
  );
};

export const useHardChoice = () => {
  return React.useContext(HardChoiceContext);
};

export const useChoiceMachine = () => {
  const [state, send] = useMachine(createChoiceMachine());

  const set = (problem: string) => send({ type: "SET_PROBLEM", data: problem });

  const yes = () => send("YES");

  const no = () => send("NO");

  const reset = () => send("RESET");

  return {
    state: state.value,
    value: state.context.problem,
    set,
    yes,
    no,
    reset,
  };
};
