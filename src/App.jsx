import { useState, useEffect } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  // Function to generate a new password
  const passwordGenerator = () => {
    let generatedPassword = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*()_+";

    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length);
      generatedPassword += str.charAt(char);
    }

    setPassword(generatedPassword);
  };

  // Use useEffect to auto-generate password on any change
  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed]);

  return (
    <>
      <h1 className="p-5 text-4xl font-bold text-center">🔐 Password Generator</h1>

      <div className="w-full max-w-md mx-auto shadow-md bg-gray-100 rounded-lg px-6 py-8">
        <div className="flex shadow rounded-lg mb-4 overflow-hidden">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-3 px-3 border border-gray-300 rounded-lg"
            placeholder="Generated Password"
            readOnly
          />
          <button
            onClick={() => navigator.clipboard.writeText(password)}
            className="bg-blue-500 text-white px-4 py-3 rounded-r-lg hover:bg-blue-700"
          >
            Copy
          </button>
        </div>

        {/* Controls */}
        <div className="flex flex-col space-y-4">
          <div className="flex items-center justify-between">
            <label>Password Length: {length}</label>
            <input
              type="range"
              min="6"
              max="20"
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
              className="cursor-pointer"
            />
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={numberAllowed}
              onChange={() => setNumberAllowed((prev) => !prev)}
            />
            <label>Include Numbers</label>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={charAllowed}
              onChange={() => setCharAllowed((prev) => !prev)}
            />
            <label>Include Special Characters</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
