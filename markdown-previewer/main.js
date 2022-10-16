// Redux
const PARSE_TEXT = 'PARSE_TEXT';

const parseText = (text) => {
  return {
    type: PARSE_TEXT,
    toParse: text
  }
}

const mdReducer = (state = '', action) => {
  switch(action.type) {
    case PARSE_TEXT:
      return marked.parse(action.toParse);
    default: 
      return state;
  }
}

const store = Redux.createStore(mdReducer);

// React
class MarkdownPreviewer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      parsed: '',
      input: '# This is a heading \n' + 
      '## This is a subheading \n' +
      'Powered by [MarkedJS](https://marked.js.org/) ' +
      'which converts markdown code <br> like `# Hello` ' +
      'to html code like `<h1>Hello</h1>`.<br>' +
      `\nThis is a code block:<br>` +
      '\n```\n<DOCTYPE html>\n<html lang="en">\n</html>\n```\n' +
      'This is a list item:<br>' +
      '\n1. Definitely a list item\n2. Another list item\n'+
      '\nThis is a blockquote:<br>\n' + 
      '\n> Dorothy followed her through many of the beautiful rooms in her castle.<br>\n' +
      '\nThis is an image:<br>\n' +
      '\n![Definitely an image](https://i.pinimg.com/736x/43/d9/24/43d9243b3054e377c1869bea35d0b879.jpg)<br>' +
      '\n**And this is definitely a bold text**'
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    e.preventDefault();
    let input = e.target.value;
    this.props.parseText(input); // Store parsed text in Redux store
    this.setState({
      parsed: this.props.markdown, // Retrieve parsed text as prop
      input: input
    });
  }
  render() {
    return (
      <div className='row container-fluid my-5 min-vh-100'>
        <div className='col-6 h-100'>
          <h2>Editor</h2>
          <textarea id="editor" onChange={this.handleChange} value={this.state.input} className="form-control"></textarea>
        </div>
        <div className='col-6 shadow h-100'>
          <h2>Preview</h2>
          <hr />
          <div className="h-100" id="preview" dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(marked.parse(this.state.input, {breaks:true}))}}></div>
        </div>
      </div>
    );
  }
}

// React Redux
const mapStateToProps = (state) => {
  return { markdown: state };
}

const mapDispatchToProps = (dispatch) => {
  return {
    parseText: (text) => {
      dispatch(parseText(text))
    }
  };
}

const Provider = ReactRedux.Provider;
const connect = ReactRedux.connect;

const Container = connect(mapStateToProps, mapDispatchToProps)(MarkdownPreviewer);

ReactDOM.render(
  <Provider store={store}>
    <Container />
  </Provider>,
  document.getElementById('root')
);
