import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  const [length, setlength] = useState(8);
  const [numberAllowed, setNumAllow] = useState(false);
  const [charAllow, setCharAllow] = useState(false);
  const [password, setPassword] = useState(``);
  const passwordRef = useRef(null);

  const passGen = useCallback(() => {
    let pass = ``;
    let str = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz`;
    if (numberAllowed) str += `0123456789`;
    if (charAllow) str += `!@#$%^&*`;
    for (let i = 1; i < length; i++) {
      const char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numberAllowed, charAllow]);

  useEffect(() => {
    passGen();
  }, [length, numberAllowed, charAllow]);

  const copyPasstoClip = () => {
    window.navigator.clipboard.writeText(password);
    passwordRef.current?.select();
  };

  return (
    <>
      <div className="min-h-screen bg-gray-800 flex justify-center items-center">
        <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-900 text-black text-md">
          <h1 className="my-3 text-center text-white">Password Generator</h1>
          <div className="flex shadow rounded-lg overflow-hidden mb-4">
            <input
              type="text"
              value={password}
              className="outline-none w-full py-1 px-3"
              placeholder="Password"
              readOnly
              ref={passwordRef}
            />
            <button
              className="outline-none bg-blue-500 text-white py-0.5 px-3 shrink-0 hover:bg-blue-900"
              onClick={copyPasstoClip}
            >
              Copy
            </button>
          </div>
          <div className="flex tex-sm gap-x-2">
            <div className="flex items-center gap-x-1">
              <input
                type="range"
                min={6}
                max={30}
                value={length}
                name=""
                id=""
                className="cursor-pointer"
                onChange={(e) => setlength(e.target.value)}
              />
              <label htmlFor="length" className="text-slate-300">
                {" "}
                Length: {length}{" "}
              </label>
            </div>
            <div className="flex items-center gap-x-1">
              <input
                type="checkbox"
                name=""
                id=""
                defaultChecked={numberAllowed}
                onChange={() => {
                  setNumAllow((prev) => !prev);
                }}
              />
              <label htmlFor="number" className="text-slate-300">
                {" "}
                Numbers{" "}
              </label>
            </div>
            <div className="flex items-center gap-x-1">
              <input
                type="checkbox"
                defaultChecked={charAllow}
                id="charInput"
                onChange={() => {
                  setCharAllow((prev) => !prev);
                }}
              />
              <label htmlFor="characterInput" className="text-slate-300">
                {" "}
                Characters{" "}
              </label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
