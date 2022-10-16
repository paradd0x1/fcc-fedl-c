// Util
function operatorEntered(value) {
  return (value == '=' || value == '+' || value == '-' || value == '*' || value == '/') ? true : false
}

// React
const Calculator = () => {
  const [state, setState] = React.useState({
    display: '0',
    input: '0',
    operator_entered: false,
    decimals_entered: 0,
    last_operator: '',
    similarNegativeSigns: 0,
    operators_entered: 0,
    has_submitted: false,
    result: null
  });
  
  const initState = {
    display: '0',
    input: '0',
    operator_entered: false,
    decimals_entered: 0,
    last_operator: '',
    similarNegativeSigns: 0,
    operators_entered: 0,
    has_submitted: false,
    result: null
  };
  
  function handleClear() {
    setState(initState);
  };
  
  function handleDisplay(value) {
    // If input and display is 0, remove 0 and replace display and input with value
    if(state.input == '0' && state.display == '0') {
      setState({
        display: value,
        input: value,
        operator_entered: state.operator_entered,
        decimals_entered: state.decimals_entered,
        last_operator: state.last_operator,
        similarNegativeSigns: state.similarNegativeSigns,
        operators_entered: 0,
        has_submitted: false,
        result: null
      });
    
    } else if (operatorEntered(value) && state.has_submitted == true) {
      setState({
        display: `${state.result}${value}`,
        input: value,
        operator_entered: state.operator_entered,
        decimals_entered: state.decimals_entered,
        last_operator: state.last_operator,
        similarNegativeSigns: state.similarNegativeSigns,
        operators_entered: 0,
        has_submitted: false,
        result: null
      });
      
    // If operator is entered and value is not the same as last operator and value is '-',
    // concatenate display value with current value
    
    } else if (operatorEntered(value) && value != state.last_operator && value == '-') {
      setState({
        display: state.display.concat(value),
        input: value,
        operator_entered: true,
        decimals_entered: 0,
        last_operator: value,
        similarNegativeSigns: state.similarNegativeSigns,
        operators_entered: state.operators_entered + 1,
        has_submitted: false,
        result: null
      });
    
    // If operator is entered and that operator is the same as last operator and the operator 
    // is '-', concatenate display value with current value entered but do not exceed similars threshold
    } else if (operatorEntered(value) && value == state.last_operator && value == '-') {
      if (state.similarNegativeSigns < 1 && state.operators_entered < 2) {
        setState({
          display: state.display.concat(value),
          input: value,
          operator_entered: true,
          decimals_entered: 0,
          last_operator: value,
          similarNegativeSigns: state.similarNegativeSigns + 1,
          operators_entered: state.operators_entered + 1,
          has_submitted: false,
          result: null
        });
      }
    // If operator is presently entered and value is not the same as last operator and an operator has been entered before,
    // remove the last operators
    } else if (operatorEntered(value) && value != state.last_operator && state.operator_entered) {
      // Find index of last number
      const splitted = state.display.split('');
      var lastNumIdx;
      for (let i=splitted.length-1; i>=0 ; i--) {
        if(Number(splitted[i]) >= 0) {
          lastNumIdx = i;
          break;
        }
      }
      const removedLastOperators = splitted.slice(0, lastNumIdx+1).join('');
      // Remove last operators and set new operator
      setState({
        display: removedLastOperators.concat(value),
        input: value,
        operator_entered: true,
        decimals_entered: 0,
        last_operator: value,
        similarNegativeSigns: state.similarNegativeSigns,
        operators_entered: state.operators_entered == 2 ? state.operators_entered - 1 : state.operators_entered,
        has_submitted: false,
        result: null
      });
    
    } else if (operatorEntered(value) && value != state.last_operator && state.operator_entered == false) {
      setState({
        display: state.display.concat(value),
        input: value,
        operator_entered: true,
        decimals_entered: 0,
        last_operator: value,
        similarNegativeSigns: state.similarNegativeSigns,
        operators_entered: state.operators_entered + 1,
        has_submitted: false,
        result: null
      });
      
    } else if (operatorEntered(value) && value == state.last_operator) {
      setState({
        display: state.display,
        input: value,
        operator_entered: true,
        decimals_entered: 0,
        last_operator: value,
        similarNegativeSigns: state.similarNegativeSigns,
        operators_entered: state.operators_entered,
        has_submitted: false,
        result: null
      });
      
    } else if (state.operator_entered == true) {
      setState({
        display: state.display.concat(value),
        input: value,
        operator_entered: false,
        decimals_entered: 0,
        last_operator: '',
        similarNegativeSigns: 0,
        operators_entered: 0,
        has_submitted: false,
        result: null
      });
    } else if (value=='.') {
      
      const numOfDecimals = state.decimals_entered;
      
      if(numOfDecimals < 1) {
        setState({
          display: state.display.concat(value),
          input: state.input.concat(value),
          operator_entered: state.operator_entered,
          decimals_entered: state.decimals_entered + 1,
          last_operator: state.last_operator,
          similarNegativeSigns: state.similarNegativeSigns,
          operators_entered: state.operators_entered,
          has_submitted: false,
          result: null
        })
      }
    } else {
      setState({
        display: state.display.concat(value),
        input: state.input.concat(value),
        operator_entered: false,
        decimals_entered: state.decimals_entered,
        last_operator: '',
        similarNegativeSigns: 0,
        operators_entered: 0,
        has_submitted: false,
        result: null
      });
    }
  };
  
  function handleSubmit() {
    const result = eval(state.display);
    setState({
      display: state.display.concat(`=${result}`),
      input: result,
      has_submitted: true,
      result: result
    })
  };

  return(
    <div className="container fs-4" id="calculator-container">
      <div className="row bg-dark pt-1 px-1">
        <Display 
          displayValue={state.display}
          inputValue={state.input}/>
      </div>
      <div className="row bg-dark pb-1 px-1" id="buttons">
        <div className="col-12">
          <div className="row" id="first-half-first-row">
            <Clickable divClass="col-6" kind="btn-danger" name="AC" id="clear" handler={handleClear}/>
            <Clickable divClass="col" kind="btn-warning" name="/" id="divide" handler={handleDisplay}/>
            <Clickable divClass="col" kind="btn-warning" name="*" id="multiply" handler={handleDisplay}/>
          </div>
          <div className="row" id="first-half-second-row">
            <Clickable divClass="col" kind="btn-secondary" name="7" id="seven" handler={handleDisplay}/>
            <Clickable divClass="col" kind="btn-secondary" name="8" id="eight" handler={handleDisplay}/>
            <Clickable divClass="col" kind="btn-secondary" name="9" id="nine" handler={handleDisplay}/>
            <Clickable divClass="col" kind="btn-warning" name="-" id="subtract" handler={handleDisplay}/>
          </div>
          <div className="row" id="first-half-third-row">
            <Clickable divClass="col" kind="btn-secondary" name="4" id="four" handler={handleDisplay}/>
            <Clickable divClass="col" kind="btn-secondary" name="5" id="five" handler={handleDisplay}/>
            <Clickable divClass="col" kind="btn-secondary" name="6" id="six" handler={handleDisplay}/>
            <Clickable divClass="col" kind="btn-warning" name="+" id="add" handler={handleDisplay}/>
          </div>
        </div>
        <div className="col-9">
          <div className="row">
            <Clickable divClass="col" kind="btn-secondary" name="1" id="one" handler={handleDisplay}/>
            <Clickable divClass="col" kind="btn-secondary" name="2" id="two" handler={handleDisplay}/>
            <Clickable divClass="col" kind="btn-secondary" name="3" id="three" handler={handleDisplay}/>
          </div>
          <div className="row">
            <Clickable divClass="col-8" kind="btn-secondary" name="0" id="zero" handler={handleDisplay}/>
            <Clickable divClass="col" kind="btn-secondary" name="." id="decimal" handler={handleDisplay}/>
          </div>
        </div>
        <div className="col-3 px-0">
          <Clickable divClass="" kind="btn-primary" name="=" id="equals" followHeight="h-100" handler={handleSubmit}/>
        </div>
      </div>
      <h6 className="text-center pt-2">Designed and Coded by</h6>
      <h6 className="text-center">Paolo Linaac</h6>
    </div>
  );
}

const Clickable = (props) => {
  const clickableClass = `container-fluid btn rounded-0 border border-dark ${props.kind} ${props.followHeight}`;
  const buttonStyle = {
    height: 70
  }
  
  const handleClick = (event) => {
    const handler = props.handler;
    handler(props.name);
  }
  
  return(
    <div className={`${props.divClass} d-flex px-0 ${props.followHeight}`}>
      <button type="button" 
        style={buttonStyle}
        id={props.id}
        onClick={handleClick}
        className={clickableClass}>
        {props.name}
      </button>
    </div>
  );
}

const Display = (props) => {
  return(
      <div className="bg-dark text-light">
        <div className="row d-flex justify-content-end text-info" id="input">{props.displayValue}</div>
        <div className="row d-flex justify-content-end fs-2" id="display">{props.inputValue}</div>
      </div>
  );
}

ReactDOM.render(<Calculator />, document.getElementById('calculator'));
