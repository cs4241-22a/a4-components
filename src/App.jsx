import { useState } from "react";
import Login from "./screens/Login";
import Dashboard from "./screens/Dashboard";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <div>
      {loggedIn ? <Dashboard /> : <Login setLoggedIn={setLoggedIn} />}
      <button
        onClick={() =>
          setLoggedIn((prevLoggedIn) => {
            setLoggedIn(!prevLoggedIn);
          })
        }
      >
        Toggle Login Page
      </button>
    </div>
  );
}

export default App;
