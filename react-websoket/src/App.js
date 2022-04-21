import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import chartRoom from './pages/chartRoom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <Routes>
              <Route path='/login' element={Login} />
              <Route path='/chartroom' element={chartRoom} />
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
