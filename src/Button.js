

const Button = ({ id, handleInput, value, handleOperator, isInput }) => {
    return (


        <div className={id}>
            <button type="button" id={id} onClick={isInput ? handleInput : handleOperator}>{value}</button>
        </div>


    )
}

export default Button