
import { useEffect } from 'react';
import { useMemo } from 'react';
import { useState } from 'react';
import './app.css'
import Timer from './components/Timer';
import Start from './components/Start';
import Trivia from './components/Trivia';

function App() {

  const moneyPyramid = useMemo(() =>
    [
      { _id: 1, amount: "$ 100" },
      { _id: 2, amount: "$ 200" },
      { _id: 3, amount: "$ 300" },
      { _id: 4, amount: "$ 500" },
      { _id: 5, amount: "$ 1000" },
      { _id: 6, amount: "$ 2000" },
      { _id: 7, amount: "$ 4000" },
      { _id: 8, amount: "$ 8000" },
      { _id: 9, amount: "$ 16000" },
      { _id: 10, amount: "$ 32000" },
      { _id: 11, amount: "$ 64000" },
      { _id: 12, amount: "$ 125000" },
      { _id: 13, amount: "$ 250000" },
      { _id: 14, amount: "$ 500000" },
      { _id: 15, amount: "$ 1000000" },
    ].reverse(), []
  );

  const data = [
    {
      id: 1,
      question: "What is JSX in React?",
      answers: [
        { text: "JavaScript XML", correct: true },
        { text: "Java Syntax Extension", correct: false },
        { text: "JavaScript Extension", correct: false },
        { text: "JSON Syntax", correct: false },
      ],
    },
    {
      id: 2,
      question: "Which hook is used to manage state in a functional component?",
      answers: [
        { text: "useEffect", correct: false },
        { text: "useState", correct: true },
        { text: "useContext", correct: false },
        { text: "useMemo", correct: false },
      ],
    },
    {
      id: 3,
      question: "What command creates a new React application?",
      answers: [
        { text: "npm init react", correct: false },
        { text: "npx create-react-app my-app", correct: true },
        { text: "npm install react", correct: false },
        { text: "npx generate-react-app", correct: false },
      ],
    },
    {
      id: 4,
      question: "How do you pass data from a parent to a child component in React?",
      answers: [
        { text: "Using props", correct: true },
        { text: "Using state", correct: false },
        { text: "Using hooks", correct: false },
        { text: "Using context", correct: false },
      ],
    },
    {
      id: 5,
      question: "What is the default port for a Node.js server?",
      answers: [
        { text: "5000", correct: false },
        { text: "3000", correct: true },
        { text: "8000", correct: false },
        { text: "8080", correct: false },
      ],
    },
    {
      id: 6,
      question: "What does the `express` library in Node.js provide?",
      answers: [
        { text: "Database management", correct: false },
        { text: "Server-side framework", correct: true },
        { text: "Front-end library", correct: false },
        { text: "File handling", correct: false },
      ],
    },
    {
      id: 7,
      question: "Which lifecycle method is called after the component renders for the first time?",
      answers: [
        { text: "componentDidUpdate", correct: false },
        { text: "componentDidMount", correct: true },
        { text: "componentWillUnmount", correct: false },
        { text: "componentWillUpdate", correct: false },
      ],
    },
    {
      id: 8,
      question: "Which hook is used for side effects in React?",
      answers: [
        { text: "useEffect", correct: true },
        { text: "useState", correct: false },
        { text: "useRef", correct: false },
        { text: "useReducer", correct: false },
      ],
    },
    {
      id: 9,
      question: "What does `npm` stand for?",
      answers: [
        { text: "Node Package Manager", correct: true },
        { text: "Node Process Manager", correct: false },
        { text: "Node Project Manager", correct: false },
        { text: "New Package Module", correct: false },
      ],
    },
    {
      id: 10,
      question: "How do you create a server in Node.js?",
      answers: [
        { text: "http.createServer()", correct: true },
        { text: "express.initServer()", correct: false },
        { text: "node.createServer()", correct: false },
        { text: "server.createNode()", correct: false },
      ],
    },
    {
      id: 11,
      question: "What is the purpose of `React.Fragment`?",
      answers: [
        { text: "To manage state", correct: false },
        { text: "To group elements without adding extra nodes to the DOM", correct: true },
        { text: "To apply CSS styles", correct: false },
        { text: "To create a virtual DOM", correct: false },
      ],
    },
    {
      id: 12,
      question: "Which method is used to send data to a server in Node.js?",
      answers: [
        { text: "server.send()", correct: false },
        { text: "response.write()", correct: true },
        { text: "app.route()", correct: false },
        { text: "send.data()", correct: false },
      ],
    },
    {
      id: 13,
      question: "Which of the following is NOT a React hook?",
      answers: [
        { text: "useCallback", correct: false },
        { text: "useReducer", correct: false },
        { text: "useAction", correct: true },
        { text: "useRef", correct: false },
      ],
    },
    {
      id: 14,
      question: "What does the `res.send()` method do in Express?",
      answers: [
        { text: "Reads data", correct: false },
        { text: "Sends a response to the client", correct: true },
        { text: "Creates a server", correct: false },
        { text: "Parses a request body", correct: false },
      ],
    },
    {
      id: 15,
      question: "What is the virtual DOM in React?",
      answers: [
        { text: "A real DOM rendered on the server", correct: false },
        { text: "A lightweight copy of the real DOM", correct: true },
        { text: "A physical DOM element", correct: false },
        { text: "A database connection", correct: false },
      ],
    },
  ];

  const [queNum, setQueNum] = useState(1);
  const [userName, setUserName] = useState(null);
  const [stop, setStop] = useState(false);
  const [earned, setEarned] = useState("$ 0");

  useEffect(() => {
    queNum > 1 && setEarned(moneyPyramid?.find(m => m?._id === queNum - 1).amount)
  }, [moneyPyramid, queNum]);

  const handlePlayAgain = ()=>{
    window.location.reload(); 
  }

  return (
    <div className="app">
      {userName ? (
        <>
          <div className="main">
            {stop 
            ? 
             <div className='centerContent'>
              <h1 className='earnText'> You ({userName}) Earned: {earned}</h1>
              <button className='playAgainButton' onClick={handlePlayAgain}>Play Again</button>
            </div> 
            : (
              <>
              {/* <h1 className='userName'> Welcome {userName}</h1> */}
                <div className="top">
                  <div className="timer"><Timer setStop={setStop} queNum={queNum} /></div>
                </div>
                <div className="bottom">
                  <Trivia data={data} setStop={setStop} setQueNum={setQueNum} queNum={queNum} />
                </div>
              </>
            )}
          </div>
          {/* left side amount pyramid */}
          <div className="pyramid">
            <ul className='moneyList'>
            <h1 className='userName'> Welcome {userName}</h1>
              {moneyPyramid.map((m) => (
                <li key={m.id} className={queNum === m._id ? 'moneyListItem active' : 'moneyListItem'}>
                  <span className='moneyListItemNumber'>{m._id}</span>
                  <span className='moneyListItemAmount'>{m.amount}</span>
                </li>
              ))
              }
            </ul>
          </div>
        </>
      ) : <Start setUserName={setUserName} />}
      {/* image part */}

    </div>
  );
}

export default App;


