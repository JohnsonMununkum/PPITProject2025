import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './components/Home';
import AccountLogin from './components/AccountLogin';
import Register from './components/Register';
import Menu from './components/Menu';

function App() {
  return (
    //Navigation to other pages in the app
    <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/AccountLogin" element={<AccountLogin/>} />
          <Route path="/Register" element={<Register/>} />
          <Route path="/Menu" element={<Menu/>} />
        </Routes>
    </Router>
  );
}

export default App;
