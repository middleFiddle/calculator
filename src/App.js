import { useState } from "react"
import { nanoid } from "nanoid"

const compute = (p, c, op) => {
  const [prev, curr] = [Number(p), Number(c)]
  console.log(prev, curr)
  switch (op) {
    case "add":
      return `${prev + curr}`

    case "subtract":
      return `${prev - curr}`
    case "multiply":
      return `${prev * curr}`
    case "divide":
      return `${prev / curr}`

    default:

  }
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
    default:
  }
  return result
}

const Display = ({ display }) => {
  return (

    <h1 id="display">
      {display}
    </h1>
  )
}

const Button = ({ id, handleInput, value, handleOperator, isInput }) => {
  return (


    <div className={id}>
      <button type="button" id={id} onClick={isInput ? handleInput : handleOperator} >{value}</button>
    </div>


  )
}


const App = () => {
  const [prevInput, setPrevInput] = useState('0')
  const [activeOp, setActiveOp] = useState('')
  const [display, setDisplay] = useState('0')
  const [opLast, setOpLast] = useState(false)
  const [decimal, setDecimal] = useState(false)

  // use enums for state variable?
  const operators = ["add", "subtract", "multiply", "divide", "equals", "clear"]
  const inputs = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "decimal"]


  const handleInput = (e) => {
    if (decimal && e.target.id === "decimal") {
      return
    }

    if (e.target.id === "decimal") {
      setDecimal(true)
    }

    if (display === '0' || opLast) {
      setPrevInput(display)
      setOpLast(false)
      setDisplay(e.target.innerText)
      return
    }

    setOpLast(false)
    setDisplay(prev => prev + e.target.innerText)

  }


  const handleOperator = (e) => {
    setDecimal(false)

    setOpLast(true)

    if (e.target.id === "clear") {
      console.log("clear")
      setDisplay('0')
      setPrevInput('0')
      setActiveOp('')
      setOpLast(false)
      setDecimal(false)
      return
    }

    setActiveOp(e.target.id)

    if (e.target.id === "equals") {
      setPrevInput('0')
      setDisplay(compute(prevInput, display, activeOp))

      setActiveOp('')
      return
    }

    if (activeOp !== '') {
      setPrevInput(prevInput => compute(prevInput, display, activeOp))
      setDisplay(display => compute(prevInput, display, activeOp))
      return
    }


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

  console.log([prevInput, activeOp, display])
  console.log(typeof prevInput, typeof activeOp, typeof display)

  return (
    <div className="container">
      <Display display={display} />
      {buttonMaker(inputs, "inputs")}
      {buttonMaker(operators, "operators")}
    </div >
  );
}

export default App;
