import { useState, useEffect } from "react";

import Display from "./components/Display";
import Keyboard from "./components/Keyboard";

const calcData = [
  { id: "clear", value: "AC" },
  { id: "divide", value: "/" },
  { id: "multiply", value: "x" },
  { id: "seven", value: 7 },
  { id: "eight", value: 8 },
  { id: "nine", value: 9 },
  { id: "subtract", value: "-" },
  { id: "four", value: 4 },
  { id: "five", value: 5 },
  { id: "six", value: 6 },
  { id: "add", value: "+" },
  { id: "one", value: 1 },
  { id: "two", value: 2 },
  { id: "three", value: 3 },
  { id: "equals", value: "=" },
  { id: "zero", value: 0 },
  { id: "decimal", value: "." },
];

const operators = ["/", "x", "+", "-"];

const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

function App() {
  const [input, setInput] = useState("0");
  const [output, setOutput] = useState("");
  const [calculatorData, setCalculatorData] = useState("");

  const handleSubmit = () => {
    const total = eval(calculatorData);
    setInput(total);
    setOutput(`${total} = ${total}`);
    setCalculatorData(`${total}`);
  };

  const handleNumber = (value) => {
    if (!calculatorData.length) {
      setInput(`${value}`);
      setCalculatorData(`${value}`);
    } else {
      if (value === 0 && (calculatorData === "0" || input === "0")) {
        setCalculatorData(`${calculatorData}`);
      } else {
        const lastChar = calculatorData.charAt(calculatorData.length - 1);
        const isLastCharOperator =
          lastChar === "*" || operators.includes(lastChar);

        setInput(isLastCharOperator ? `${value}` : `${input}${value}`);
        setCalculatorData(`${calculatorData}${value}`);
      }
    }
  };

  const handleOperators = (value) => {
    if (calculatorData.length) {
      setInput(`${value}`);
      const beforeLastChar = calculatorData.charAt(calculatorData.length - 2);

      const beforeLastCharIsOperator =
        operators.includes(beforeLastChar) || beforeLastChar === "*";

      const lastChat = calculatorData.charAt(calculatorData.length - 1);

      const lastChatIsOperator =
        operators.includes(lastChat) || lastChat === "*";

      const validOp = value === "x" ? "*" : value;
      if (
        (lastChatIsOperator && value !== "-") ||
        (beforeLastCharIsOperator && lastChatIsOperator)
      ) {
        if (beforeLastCharIsOperator) {
          const updatedValue = `${calculatorData.substring(
            0,
            calculatorData.length - 2
          )}${value}`;
          setCalculatorData(updatedValue);
        } else {
          setCalculatorData(
            `${calculatorData.substring(
              0,
              calculatorData.length - 1
            )}${validOp}`
          );
        }
      } else {
        setCalculatorData(`${calculatorData}${validOp}`);
      }
    }
  };

  const handleClear = () => {
    setCalculatorData("");
    setInput("0");
  };

  const handleDotOperator = () => {
    const lastChar = calculatorData.charAt(calculatorData.length - 1);
    if (!calculatorData.length) {
      setInput("0.");
      setCalculatorData("0.");
    } else {
      if (lastChar === "*" || operators.includes(lastChar)) {
        setInput("0.");
        setCalculatorData(`${calculatorData} 0.`);
      } else {
        setInput(
          lastChar === "." || input.includes(".") ? `${input}` : `${input}.`
        );
        const formattedValue =
          lastChar === "." || input.includes(".")
            ? `${calculatorData}`
            : `${calculatorData}.`;
        setCalculatorData(formattedValue);
      }
    }
  };

  const handleInput = (value) => {
    const number = numbers.find((num) => num === value);
    const operator = operators.find((op) => op === value);

    switch (value) {
      case number:
        handleNumber(value);
        break;
      case operator:
        handleOperators(value);
        break;
      case "=":
        handleSubmit(value);
        break;
      case ".":
        handleDotOperator(value);
        break;
      case "AC":
        handleClear();
        break;
      default:
        break;
    }
  };

  const handleOutput = () => {
    setOutput(calculatorData);
  };

  useEffect(() => {
    handleOutput();
  }, [calculatorData]);

  return (
    <div className="calculator">
      <Display input={input} output={output} />
      <Keyboard handleInput={handleInput} calcData={calcData} />
    </div>
  );
}

export default App;
