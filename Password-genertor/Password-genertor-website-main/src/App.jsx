import { useCallback, useEffect, useState,useRef } from "react";
import "./App.css";

function App() {

const [length , setLength] = useState(8);
const [numAllowed, setnumAllowed] = useState(false);
const [charAllowed, setcharAllowed] = useState(false);
const [Password , setPassword] =  useState("");
const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if(numAllowed) str+= "0123456789"
    if(charAllowed) str+= ",./;[]`!@#$%^&*()<>?:{}";
    for (let i = 0; i < length; i++) {
    let char = Math.floor(Math.random() * str.length +1)
     pass += str.charAt(char);
    }
    setPassword(pass)

} , [length , numAllowed , charAllowed,setPassword ]) // setpassword is for more optimized


useEffect(() => {
  passwordGenerator()
}, [length , numAllowed , charAllowed , passwordGenerator])



const paswordRef = useRef(null);
const copyToClipboard = useCallback( () => {
  paswordRef.current?.select()
  paswordRef.current?.setSelectionRange(0,5)
window.navigator.clipboard.writeText(Password);
},[Password])


  return (
    <>
      <div className=" w-full max-w-md mx-auto rounded-lg px-4 py-8 text-orange-500 bg-slate-800 ">

        <h1 className="text-white text-2xl  text-center my-3">password Generator</h1>

        <div className="flex rounded-lg overflow-hidden mt-4" >
          <input className="py-1 px-3 w-full outline-none"
          ref={paswordRef}
          type="text"
          value={Password}
          placeholder="password" 
          readOnly
          />

          <button 
          onClick={copyToClipboard}
          className="bg-blue-700 outline-none text-white px-2 py-1 shrink-0.5 rounded-r-lg">Copy</button>

          </div>
          
          <div className="flex gap-x-2 text-sm">
            <div className="flex items-center gap-x-1">
                
                <input 
                className="my-3"
                type="range"
                min={8}
                max={100}
                value={length}
                onChange={(e) => {
                  setLength(e.target.value)
                }}
                />
                <label >
                  length:{length}
                </label>

            </div>

            <div className="flex items-center gap-x-1">
                
                <input 
                className="my-3"
                type="checkbox"
                min={8}
                max={100}
                id="numbersInput"
                value={length}
                onChange={() => {
                  setnumAllowed((prev) =>  !prev)
                }}
                />
                <label htmlFor="numbersInput">
                  Number
                </label>

            </div>

            <div className="flex items-center gap-x-1">
                
                <input 
                className="my-3"
                type="checkbox"
                min={8}
                max={100}
                id="charcterInput"
                value={length}
                onChange={() => {
                  setcharAllowed((prev) =>  !prev)
                }}
                />
                <label htmlFor="charcterInput">
                  Chracter
                </label>

            </div>
          </div>
          

        </div>
      
    </>
  );

}


export default App;


// hii