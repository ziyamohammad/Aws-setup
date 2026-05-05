
import './App.css';
import { BrowserRouter as Router , Routes , Route } from 'react-router';
import Authpage from './Pages/Authpage';
import Loginpage from './Pages/Loginpage';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from './Pages/Dashboard';



function App() {

  return (
    <div className="App">
    <Router>
      <Routes>
        <Route path = "/" element = {<Authpage/>}/>
        <Route path = "/login" element = {<Loginpage/>}/>
        <Route path = "/dashboard" element = {<Dashboard/>}/>
      </Routes>
    </Router>
    <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default App;
