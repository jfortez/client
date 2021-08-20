import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./components/Routes";
import "./App.css";
import ValuesProvider from "./provider/ValuesProvider";
import ReactNotification from "react-notifications-component";

function App() {
  return (
    <div className="App">
      <Router>
        <ReactNotification />
        <ValuesProvider>
          <Routes />
        </ValuesProvider>
      </Router>
    </div>
  );
}

export default App;
