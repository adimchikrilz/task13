import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchUsers } from '../store/userSlice';
import UserCard from './UserCard';
import { UserPlusIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

const UserList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { users, loading, error } = useAppSelector(state => state.users);

useEffect(() => {
    
    if (users.length === 0) {
      dispatch(fetchUsers());
    }
  }, [dispatch, users.length]); 

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-xl font-medium text-gray-500">Loading users...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-xl font-medium text-red-500">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Users</h1>
        <Link 
          to="/add-user" 
          className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          <UserPlusIcon className="mr-2" size={18} />
          Add New User
        </Link>
      </div>

      {users.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <p className="text-gray-500">No users found. Add a new user to get started.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {users.map(user => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      )}
    </div>
  );
};

export default UserList;