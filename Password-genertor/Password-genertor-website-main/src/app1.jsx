import { useCallback, useEffect, useState } from "react";
import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [numAllowed, setnumAllowed] = useState(false);
  const [charAllowed, setcharAllowed] = useState(false);
  const [Password, setPassword] = useState("");

  const PasswordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numAllowed) str += "0123456789";
    if (charAllowed) str += ",./;[]`!@#$%^&*()<>?:{}";
    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numAllowed, charAllowed]);

  useEffect(() => {
    PasswordGenerator();
  }, [length, numAllowed, charAllowed, PasswordGenerator]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(Password);
  };

  return (
    <>
      <div className="w-full max-w-md mx-auto rounded-lg px-4 py-8 text-orange-500 bg-slate-800">
        <h1 className="text-white text-2xl text-center my-3">Password Generator</h1>

        <div className="flex rounded-lg overflow-hidden mt-4">
          <input
            className="py-1 px-3 w-full outline-none"
            type="text"
            value={Password}
            placeholder="password"
            readOnly
          />

          <button
            className="bg-blue-700 outline-none text-white px-2 py-1 shrink-0.5 rounded-r-lg"
            onClick={copyToClipboard}
          >
            Copy
          </button>
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
                setLength(e.target.value);
              }}
            />
            <label>length: {length}</label>
          </div>

          <div className="flex items-center gap-x-1">
            <input
              className="my-3"
              type="checkbox"
              id="numbersInput"
              checked={numAllowed}
              onChange={() => {
                setnumAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="numbersInput">Number</label>
          </div>

          <div className="flex items-center gap-x-1">
            <input
              className="my-3"
              type="checkbox"
              id="charcterInput"
              checked={charAllowed}
              onChange={() => {
                setcharAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="charcterInput">Character</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
