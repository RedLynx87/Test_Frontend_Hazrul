import { BrowserRouter, Routes, Route } from 'react-router-dom';

import AuthPage from './pages/AuthPage.jsx';
import UserPage from './pages/UserPage.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/users" element={<UserPage />} />
      </Routes>
    </BrowserRouter>
  );
}


export default App;
