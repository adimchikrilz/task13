import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { deleteUser } from '../store/userSlice';
import { ArrowLeft, Pencil, Trash2, Mail, Phone, Globe, Building } from 'lucide-react';

const UserDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const userId = Number(id);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  
  const user = useAppSelector(state => 
    state.users.users.find(user => user.id === userId)
  );

  if (!user) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold text-gray-700">User not found</h2>
        <Link to="/users" className="mt-4 inline-block text-blue-600 hover:underline">
          Back to users list
        </Link>
      </div>
    );
  }

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete ${user.name}?`)) {
      dispatch(deleteUser(userId));
      navigate('/users');
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
      <div className="px-6 py-4">
        <div className="mb-6">
          <Link to="/users" className="flex items-center text-blue-600 hover:underline">
            <ArrowLeft size={16} className="mr-1" />
            Back to users
          </Link>
        </div>

        <div className="flex justify-between items-start mb-6">
          <h1 className="text-2xl font-bold text-gray-800">{user.name}</h1>
          <div className="flex space-x-2">
            <button
              onClick={() => navigate(`/edit-user/${user.id}`)}
              className="flex items-center px-3 py-1 bg-blue-50 text-blue-600 rounded hover:bg-blue-100"
            >
              <Pencil size={16} className="mr-1" />
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="flex items-center px-3 py-1 bg-red-50 text-red-600 rounded hover:bg-red-100"
            >
              <Trash2 size={16} className="mr-1" />
              Delete
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-700">Contact Information</h2>
            <div className="space-y-2">
              <div className="flex items-center text-gray-700">
                <Mail size={18} className="mr-2" />
                <span>{user.email}</span>
              </div>
              {user.phone && (
                <div className="flex items-center text-gray-700">
                  <Phone size={18} className="mr-2" />
                  <span>{user.phone}</span>
                </div>
              )}
              {user.website && (
                <div className="flex items-center text-gray-700">
                  <Globe size={18} className="mr-2" />
                  <span>{user.website}</span>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-700">Address</h2>
            <div className="space-y-1 text-gray-700">
              <p>{user.address.street}, {user.address.suite}</p>
              <p>{user.address.city}, {user.address.zipcode}</p>
            </div>
          </div>
        </div>

        {user.company && (
          <div className="mt-6 pt-6 border-t border-gray-200">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">Company</h2>
            <div className="flex items-start space-x-2">
              <Building size={18} className="mr-2 mt-1" />
              <div>
                <p className="font-medium text-gray-700">{user.company.name}</p>
                <p className="text-sm text-gray-600 italic">"{user.company.catchPhrase}"</p>
                <p className="text-sm text-gray-600">{user.company.bs}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDetail;