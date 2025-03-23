import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { addUser, updateUser, User } from '../store/userSlice';
import { ArrowLeft, Save } from 'lucide-react';


const emptyUser = {
  name: '',
  email: '',
  address: {
    street: '',
    suite: '',
    city: '',
    zipcode: ''
  }
};

const UserForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const isEditMode = !!id;
  const userId = isEditMode ? Number(id) : null;
  
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const existingUser = useAppSelector(state => 
    userId ? state.users.users.find(user => user.id === userId) : null
  );

  
  const [formData, setFormData] = useState<Omit<User, 'id'>>({
    ...emptyUser
  });

  useEffect(() => {

    if (isEditMode && existingUser) {
      setFormData({
        name: existingUser.name,
        email: existingUser.email,
        address: { ...existingUser.address },
        phone: existingUser.phone,
        website: existingUser.website,
        company: existingUser.company ? { ...existingUser.company } : undefined
      });
    }
  }, [isEditMode, existingUser]);

 
  if (isEditMode && !existingUser) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold text-gray-700">User not found</h2>
        <Link to="/users" className="mt-4 inline-block text-blue-600 hover:underline">
          Back to users list
        </Link>
      </div>
    );
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
   
    if (name.startsWith('address.')) {
      const addressField = name.split('.')[1];
      setFormData({
        ...formData,
        address: {
          ...formData.address,
          [addressField]: value
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };


const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (isEditMode && existingUser) {
        const resultAction = await dispatch(updateUser({ ...formData, id: existingUser.id }));
        // Check if the action was successful
        if (updateUser.fulfilled.match(resultAction)) {
          // Add a small delay to ensure state is updated
          setTimeout(() => navigate('/users'), 100);
        }
      } else {
        const resultAction = await dispatch(addUser(formData));
        if (addUser.fulfilled.match(resultAction)) {
          setTimeout(() => navigate('/users'), 100);
        }
      }
    } catch (error) {
      console.error('Failed to save user:', error);
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

        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          {isEditMode ? 'Edit User' : 'Add New User'}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-700">Personal Information</h2>
            
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1">
                Phone (optional)
              </label>
              <input
                type="text"
                name="phone"
                value={formData.phone || ''}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1">
                Website (optional)
              </label>
              <input
                type="text"
                name="website"
                value={formData.website || ''}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-700">Address</h2>
            
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1">
                Street
              </label>
              <input
                type="text"
                name="address.street"
                value={formData.address.street}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1">
                Suite/Apt
              </label>
              <input
                type="text"
                name="address.suite"
                value={formData.address.suite}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1">
                City
              </label>
              <input
                type="text"
                name="address.city"
                value={formData.address.city}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1">
                Zip Code
              </label>
              <input
                type="text"
                name="address.zipcode"
                value={formData.address.zipcode}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="flex items-center justify-center w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <Save size={18} className="mr-2" />
              {isEditMode ? 'Update User' : 'Add User'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserForm;