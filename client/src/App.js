import './App.css';
import Login from './components/login';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Dashboard from './components/dashboard';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' exact='true' element={<Login />} />
          <Route path='/dashboard' exact='true' element={<Dashboard />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
