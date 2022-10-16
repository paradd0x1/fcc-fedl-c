// Quotes
const quoteArr = [
  {
    quote: "We are most alive when we're in love.",
    author: "John Updike"
  },
  {
    quote: "We hate some persons because we do not know them; and we will not know them because we hate them.",
    author: "Charles Caleb Colton"
  },
  {
    quote: "While one person hesitates because he feels inferior, the other is busy making mistakes and becoming superior.",
    author: "Henry C. Link"
  },
  {
    quote: "Don't simply retire from something; have something to retire to.",
    author: "Harry Emerson Fosdick"
  },
  {
    quote: "Whenever I hear, 'It can't be done,' I know I'm close to success.",
    author: "Michael Flatley"
  },
  {
    quote: "Never help a child with a task at which he feels he can succeed.",
    author: "Maria Montessori"
  },
  {
    quote: "Be neither too remote nor too familiar.",
    author: "Prince Charles"
  }
];

// Redux
const NEW_QUOTE = 'NEW_QUOTE';

// Action creator
const generateNewQuote = () => {
  return {
    type: NEW_QUOTE
  }
};

// Quote Reducer
const quoteReducer = (state = { quote: '', author: '' }, action) => {
  let rand = Math.floor(Math.random()*quoteArr.length-1);
  switch(action.type) {
    case NEW_QUOTE:
      return { 
        quote: quoteArr[rand].quote, 
        author: quoteArr[rand].author
      };
    default:
      return state;
  }
};

// Store
const store = Redux.createStore(quoteReducer);

// React
class Quote extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit() {
    this.props.generate();
  }
  render() {
    let rand = Math.floor(Math.random()*quoteArr.length-1);
    const rQuote = this.props.quote.quote;
    const rAuthor = this.props.quote.author;
    return(
      <div id="quote-box" className="d-flex flex-column justify-content-center align-items-center shadow-lg py-5 px-3 gap-2 w-75 mh-75">
        <div className="container d-flex flex-column align-items-center justify-content-center gap-2">
          <div id="text" className="blockquote w-75 text-center">{rQuote == '' ? quoteArr[rand].quote : rQuote}</div>
          <div id="author" className="blockquote-footer">{rAuthor == '' ? quoteArr[rand].author : rAuthor}</div>
        </div>
        <button type="button" className="btn btn-light shadow" id="new-quote" onClick={this.handleSubmit}>New Quote</button>
        <a href="twitter.com/intent/tweet" target="_blank" id="tweet-quote">Tweet Quote</a>
      </div>
    );
  }
}

// React Redux
const mapStateToProps = (state) => {
  return { quote: state };
};

const mapDispatchToProps = (dispatch) => {
  return {
    generate: () => dispatch(generateNewQuote())
  };
}

const Container = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(Quote);
const Provider = ReactRedux.Provider;

class AppWrapper extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Container />
      </Provider>
    )
  };
}

// Render
ReactDOM.render(
  <AppWrapper />,
  document.getElementById('root')
);
