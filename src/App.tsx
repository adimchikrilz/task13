import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import UserList from './components/UserList';
import UserDetail from './components/UserDetail';
import UserForm from './components/UserForm';
import Navbar from './components/Navbar';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="min-h-screen bg-gray-100">
          <Navbar />
          <div className="container mx-auto py-8 px-4">
            <Routes>
              <Route path="/" element={<Navigate to="/users" />} />
              <Route path="/users" element={<UserList />} />
              <Route path="/users/:id" element={<UserDetail />} />
              <Route path="/add-user" element={<UserForm />} />
              <Route path="/edit-user/:id" element={<UserForm />} />
            </Routes>
          </div>
        </div>
      </Router>
    </Provider>
  );
}

export default App;