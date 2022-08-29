import React from "react"


const compute = (p, c, op) => {
  const [prev, curr] = [Number(p), Number(c)]
  console.log(prev, curr, op)
  switch (op) {
    case "add":
      return `${prev + curr}`

    case "subtract":
      return `${prev - curr}`
    case "multiply":
      return `${prev * curr}`
    case "divide":
      return `${prev / curr}`
    case "equals":
      return `${prev}`

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


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      prevInput: "0",
      activeOp: '',
      display: '0',
      opLast: false,
      decimal: false,
      negative: false,
    }
    this.handleInput = this.handleInput.bind(this)
    this.handleOperator = this.handleOperator.bind(this)
  }

  

  // use enums for state variable?
  operators = ["add", "subtract", "multiply", "divide", "equals", "clear"]
  inputs = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "decimal"]


   handleInput = (e) => {
    // decimals can only be put onto display once
    if (this.state.decimal && e.target.id === "decimal") {
      return
    } 
    // we hold decimal true in state after first use
    if (e.target.id === "decimal") {
      //setDecimal(true)
      this.setState({
        ...this.state,
        decimal: true,
      })
    }

// if the display is zeroed out, and the calculator is ready for Inputs, '0' will be replaced
    if (this.state.display === '0' || this.state.opLast) {
      
      this.setState({
        ...this.state,
        display: e.target.innerText,
        opLast: false,
      })
      return
    }
//  otherwise, new inputs are concatenated to the previous display    
    this.setState(prevState => ({
      ...prevState,
      display: prevState.display + e.target.innerText,
      opLast: false,
    
    })
    )
    
    
    
    return
  }
  
  
  handleOperator = (e) => {
    if (e.target.id === "clear") {
      this.setState({
        ...this.state, 
        display:'0',
        prevInput: '0',
        activeOp: '',
        opLast: false,
        decimal: false,
        setNegative: false
      })

      return
    }
    if (this.state.opLast && e.target.id !== "subtract") {
      this.setState({
        ...this.state,
        activeOp: e.target.id
      })
      return
    }

    if (e.target.id === "subtract" && this.state.opLast) {
      this.handleInput(e)
      
      return
    }

    
    if (e.target.id === "equals") {
      
      
      this.setState(prevState =>({
        ...prevState,
        prevInput: "0",
        display: compute(prevState.prevInput, prevState.display,prevState.activeOp),
        activeOp: '',

      
      
    }))
      
      
      return
    }

    if (this.state.display === '-') {
      this.setState(prev =>({
        ...prev,
        display: prev.prevInput,
        activeOp: e.target.id,
        opLast: true,
      }))
      return
    }

    if (this.state.activeOp) {
      this.setState(prev => ({
        ...prev,
        prevInput: compute(prev.prevInput, prev.display, prev.activeOp),
        display: '0',
        activeOp: e.target.id
      }))
      return
    } 

    this.setState({
      ...this.state,
      prevInput: this.state.display,
      opLast: true,
      decimal: false,
      activeOp: e.target.id,
      setNegative: false
    })



      //setDisplay(display => compute(prevInput, display, activeOp))
      return
    }

    
    
    


  buttonMaker = (arrId, type) => {
    const isInput = type === "inputs";
    const elements = arrId.map((s, i) => {

      return (
        <Button id={s} value={isInput ? (i === 10 ? "." : i) : operatorMap(s)} handleInput={this.handleInput} handleOperator={this.handleOperator} isInput={isInput} key={s} />
      )
    })
    return elements
  }


  render() {return (
    <div className="container">
      <Display display={this.state.display} />
      {this.buttonMaker(this.inputs, "inputs")}
      {this.buttonMaker(this.operators, "operators")}
    </div >
  );}
}

export default App;
