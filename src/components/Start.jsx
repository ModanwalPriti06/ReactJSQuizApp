import { useRef } from "react"


function Start({setUserName}) {

    const inputRef = useRef();

    const handleSubmit = ()=>{
        
        if(inputRef.current.value === ''){
            alert("Enter Your Name...")
        } else {
            setUserName(inputRef.current.value);
        }
    }
  return (
    <div className="start">
        <input placeholder="Enter Your Name" className="startInput" ref={inputRef}/>
        <button className="startButton" onClick={handleSubmit}>Start</button>
    </div>
  )
}

export default Start