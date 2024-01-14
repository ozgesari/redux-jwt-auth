import { Routes, Route } from 'react-router-dom'
import './App.css';
import Layout from './components/Layout';
import Public from './components/Public';
import Login from './components/Login';
import RequireAuth from './features/auth/RequireAuth';
import Welcome from './components/Welcome';



function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route index element={<Public />} />
        <Route path="/login" element={<Login />} />

        {/* private routes */}
        <Route element={<RequireAuth />}>
          {/* private routes */}
          <Route path="welcome" element={<Welcome />} />
          {/* <Route path="usersList" element={<UsersList />} /> */}
        </Route>
      </Route>
    </Routes >
  );
}

export default App;
