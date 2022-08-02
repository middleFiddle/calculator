import { useEffect, useState } from "react"
import Button from "./Button"
import { nanoid } from "nanoid"



function App() {
  const [currentInput, setCurrentInput] = useState(0)
  const [activeOp, setActiveOp] = useState('')
  const [prevInput, setPrevInput] = useState('')
  const [display, setDisplay] = useState(currentInput)


  // use enums for state variable?
  const operators = ["add", "subtract", "multiply", "divide", "equals", "clear"]
  const inputs = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "decimal"]
  console.log(prevInput, activeOp, display)

  const handleInput = (e) => {
    setDisplay(prev => prev + e.target.innerText)
  }

  const compute = (p, c, op) => {
    const [prev, curr] = [Number(p), Number(c)]
    switch (op) {
      case "+":
        return prev + curr

      case "-":
        return prev - curr
      case "*":
        return prev * curr
      case "/":
        return prev / curr
      default:
        break;
    }
  }

  const handleOperator = (e) => {
    if (e.target.innerText === "C") {
      setDisplay(0)
      setPrevInput(0)
      setActiveOp('')
      return
    }

    if (e.target.innerText === "=") {
      setDisplay(compute(prevInput, display, activeOp))
      return
    }

    setPrevInput(display)
    setActiveOp(e.target.innerText)
  }


  const operatorMap = (str) => {
    let result;
    // eslint-disable-next-line default-case
    switch (str) {
      case "add": result = "+"
        break
      case "subtract": result = "-"
        break
      case "multiply": result = "*"
        break
      case "divide": result = "/"
        break
      case "equals": result = "="
        break
      case "clear": result = "C"
        break
    }
    return result
  }

  const buttonMaker = (arrId, type) => {
    const isInput = type === "inputs";
    const elements = arrId.map((s, i) => {

      return (
        <Button id={s} value={isInput ? (i === 10 ? "." : i) : operatorMap(s)} handleInput={handleInput} handleOperator={handleOperator} isInput={isInput} key={nanoid()} />
      )
    })
    return elements
  }


  return (
    <div className="container">
      <div div className="display" > {display}</div>

      {buttonMaker(inputs, "inputs")}



      {buttonMaker(operators, "operators")}




    </div >
  );
}

export default App;
