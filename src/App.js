import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./components/Routes";
import "./App.css";
function App() {
  return (
    <div className="App">
      <Router>
        <Routes />
      </Router>
    </div>
  );
}

export default App;
