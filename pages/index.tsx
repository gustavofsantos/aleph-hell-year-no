import React from "react";
import { useChoiceMachine } from "~/lib/hard-choice.tsx";

export default function Home() {
  const [value, setValue] = React.useState("");
  const choiceMachine = useChoiceMachine();

  return (
    <article className="page">
      <head>
        <title>Hell yes or no</title>
        <link rel="stylesheet" href="../style/index.css" />
      </head>

      {choiceMachine.state === "idle" && (
        <div className="stack justify-center w-full">
          <label htmlFor="choice-input w-full mb-4">
            <span className="text text-center w-full">
              What you need to decide?
            </span>
            <input
              id="choice-input"
              className="title w-full"
              placeholder="Type here"
              value={value}
              onChange={(ev) => setValue(ev.target.value)}
            />
          </label>

          <button
            className="button primary"
            onClick={() => choiceMachine.set(value)}
          >
            Ready to choose
          </button>
        </div>
      )}

      {choiceMachine.state === "readyToChoose" && (
        <div className="stack w-full">
          <h3 className="text text-center w-full">The hard choice is</h3>
          <h1 className="title text-center w-full mb-4">{value}</h1>

          <div className="stack w-full">
            <h3 className="text text-center w-full mb-2">It worth doing?</h3>

            <div className="flex justify-center w-full">
              <button className="button" onClick={choiceMachine.yes}>
                Hell Yes!
              </button>
              <button className="button ml-4" onClick={choiceMachine.no}>
                No
              </button>
            </div>
          </div>
        </div>
      )}

      {choiceMachine.state === "hellYes" && (
        <h1 className="title">Hell Yes! 🤘</h1>
      )}

      {choiceMachine.state === "no" && <h1 className="title">No.</h1>}
    </article>
  );
}
