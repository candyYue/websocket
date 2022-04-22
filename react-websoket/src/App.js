import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import ChartRoom from './pages/ChartRoom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <Routes>
              <Route path='/login' element={Login()} />
              <Route path='/chartroom' element={ChartRoom()} />
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
