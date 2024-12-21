// import React from "react";
// import { useEffect } from "react";
// import { useState } from "react";
// import useSound from "use-sound";
// import play from '../sounds/play.mp3'
// import correct from '../sounds/correct.mp3'
// import wrong from '../sounds/wrong.mp3'

// function Trivia({ data, setStop, setQueNum, queNum }) {
//   const [question, setQuestion] = useState(null);
//   const [selectedAns, setSelectedAns] = useState();
//   const [className, setClassName] = useState('answer');
//   const [letsPlay] = useState(play);
//   const [correctAns] = useState(correct);
//   const [wrongAns] = useState(wrong);

//   useEffect(()=>{
//     letsPlay()
//   },[letsPlay]);

//   useEffect(() => {
//     setQuestion(data[queNum - 1]);
//   }, [data, queNum]);

// const delay = (duration, callback)=> {
//     setTimeout(()=>{
//         callback();
//     },duration)


// }

//   const handleClick = (a)=>{
//     setSelectedAns(a);
//     setClassName("answer active");
//     delay(3000, ()=> setClassName(a.correct ? "answer correct" : 'answer wrong'))
//     delay(6000, ()=> {
//         if(a.correct){
//             setQueNum(prev => prev+1);
//             setSelectedAns(null)
//         } else{
//             setStop(true)
//         }
//     })
//     // setTimeout(()=>{
//     //     setClassName(a.correct ? "answer correct" : 'answer wrong');
//     // },3000)
//   }

//   return (
//     <div className="trivia">
//       <div className="question">{question?.question}</div>
//       <div className="answers">
//         {question?.answers?.map((a) => (
//           <div className={selectedAns === a ? className : 'answer'} onClick={()=>handleClick(a)}>
//             {a.text}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Trivia;

import React, { useState, useEffect } from "react";
import useSound from "use-sound";
import playSound from "../sounds/play.mp3";
import correctSound from "../sounds/correct.mp3";
import wrongSound from "../sounds/wrong.mp3";

function Trivia({ data, setStop, setQueNum, queNum }) {
  const [question, setQuestion] = useState(null);
  const [selectedAns, setSelectedAns] = useState(null);
  const [className, setClassName] = useState("answer");

  // Sound hooks
  const [play] = useSound(playSound);
  const [playCorrect] = useSound(correctSound);
  const [playWrong] = useSound(wrongSound);

  useEffect(() => {
    play();
  }, [play]);

  useEffect(() => {
    setQuestion(data[queNum - 1]);
  }, [data, queNum]);

  // Delay function with cleanup
  const delay = (duration, callback) => {
    const timer = setTimeout(() => {
      callback();
    }, duration);

    return () => clearTimeout(timer);
  };

  const handleClick = (a) => {
    setSelectedAns(a);
    setClassName("answer active");

    delay(3000, () => {
      setClassName(a.correct ? "answer correct" : "answer wrong");
      if (a.correct) {
        playCorrect();
      } else {
        playWrong();
      }
    });

    delay(6000, () => {
      if (a.correct) {
        setQueNum((prev) => prev + 1);
        setSelectedAns(null);
      } else {
        setStop(true);
      }
    });
  };

  return (
    <div className="trivia">
      <div className="question">{question?.question}</div>
      <div className="answers">
        {question?.answers?.map((a, index) => (
          <div
            key={index}
            className={selectedAns === a ? className : "answer"}
            onClick={() => handleClick(a)}
          >
            {a.text}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Trivia;

