import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./components/Routes";
import "./App.css";
import ValuesProvider from "./provider/ValuesProvider";
function App() {
  return (
    <div className="App">
      <Router>
        <ValuesProvider>
          <Routes />
        </ValuesProvider>
      </Router>
    </div>
  );
}

export default App;
