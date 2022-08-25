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
    }
    this.handleInput = this.handleInput.bind(this)
    this.handleOperator = this.handleOperator.bind(this)
  }

  

  // use enums for state variable?
  operators = ["add", "subtract", "multiply", "divide", "equals", "clear"]
  inputs = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "decimal"]


   handleInput = (e) => {
     console.log(this.state.prevInput,this.state.display,this.state.activeOp)
    console.log(e.target.id)
    if (this.state.decimal && e.target.id === "decimal") {
      return
    }

    if (e.target.id === "decimal") {
      //setDecimal(true)
      this.setState({
        ...this.state,
        decimal: true,
      })
    }

    if (this.state.display === '0' || this.state.opLast) {
/*       setPrevInput(display)
      setOpLast(false)
      setDisplay(e.target.innerText) */

      this.setState({
        ...this.state,
        display: e.target.innerText,
        opLast: false,
      })
      return
    }
    
    this.setState(prevState => ({
      ...prevState,
      display: prevState.display + e.target.innerText
    })
    )
    
    
    
    
  }
  
  
  handleOperator = (e) => {
    if (this.state.opLast) {
      this.setState({
        ...this.state,
        activeOp: e.target.id
      })
      return
    }

    if (e.target.id === "subtract" && this.state.opLast) {
      this.setState({
        ...this.State,
        display: "-", 
      })
    }

    if (e.target.id === "clear") {
      this.setState({
        ...this.state, 
        display:'0',
        prevInput: '0',
        activeOp: '',
        opLast: false,
        decimal: false,
      })

      return
    }
    
    if (e.target.id === "equals") {
      
      
      this.setState(prevState =>({
        ...prevState,
        prevInput: "0",
        display: compute(prevState.prevInput, prevState.display,prevState.activeOp),

      
      
    }))
      
      
      return
    }

    if (this.state.prevInput !== '0') {
      this.setState({
        ...this.state,
        prevInput: compute(this.state.prevInput, this.state.display, this.state.activeOp),
        display: '0',
        activeOp: e.target.id,
        decimal: false,
      })
      return
    }
    
    
    this.setState({
      ...this.state,
      prevInput: this.state.display,
      opLast: true,
      decimal: false,
      activeOp: e.target.id,
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
