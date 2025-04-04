import React, { useState } from 'react';
import { User, deleteUser } from '../store/userSlice';
import { useAppDispatch } from '../store/hooks';
import { useNavigate } from 'react-router-dom';
import { Pencil, Trash2, User as UserIcon, Mail, MapPin, Phone, Globe, Briefcase, ChevronDown, ChevronUp } from 'lucide-react';

interface UserCardProps {
  user: User;
}

const UserCard: React.FC<UserCardProps> = ({ user }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  
  const [showDetails, setShowDetails] = useState(false);

  const handleEdit = () => {
    navigate(`/edit-user/${user.id}`);
  };

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete ${user.name}?`)) {
      dispatch(deleteUser(user.id));
    }
  };

  
  const toggleDetails = (e: React.MouseEvent) => {
    e.stopPropagation(); 
    setShowDetails(!showDetails);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-5">
        <div className="flex justify-between items-start">
          <div 
            className="cursor-pointer w-full"
            onClick={() => navigate(`/users/${user.id}`)}
          >
            <div className="flex items-center mb-1">
                <UserIcon size={18} className="mr-2 text-gray-600" />
                <h3 className="text-lg font-semibold text-gray-800">{user.name}</h3>
            </div>
            <div className="flex items-center text-gray-600 mb-2">
              <Mail size={16} className="mr-2" />
              <span className="text-sm">{user.email}</span>
            </div>
            <div className="flex items-start text-gray-600">
              <MapPin size={16} className="mr-2 mt-1" />
              <div className="text-sm">
                <p>{user.address.street}, {user.address.suite}</p>
                <p>{user.address.city}, {user.address.zipcode}</p>
              </div>
            </div>
            
           
            <button
              onClick={toggleDetails}
              className="mt-3 flex items-center text-sm text-blue-600 hover:text-blue-800"
            >
              {showDetails ? (
                <>
                  <ChevronUp size={16} className="mr-1" />
                  Hide Details
                </>
              ) : (
                <>
                  <ChevronDown size={16} className="mr-1" />
                  Show Details
                </>
              )}
            </button>
  
            {showDetails && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                {user.phone && (
                  <div className="flex items-center text-gray-600 mb-2">
                    <Phone size={16} className="mr-2" />
                    <span className="text-sm">{user.phone}</span>
                  </div>
                )}
                
                {user.website && (
                  <div className="flex items-center text-gray-600 mb-2">
                    <Globe size={16} className="mr-2" />
                    <span className="text-sm">{user.website}</span>
                  </div>
                )}
                
                {user.company && (
                  <div className="flex items-start text-gray-600 mb-2">
                    <Briefcase size={16} className="mr-2 mt-1" />
                    <div className="text-sm">
                      <p className="font-medium">{user.company.name}</p>
                      <p className="italic">"{user.company.catchPhrase}"</p>
                      <p>{user.company.bs}</p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="bg-gray-50 px-5 py-3 flex justify-end space-x-2">
        <button
          onClick={handleEdit}
          className="flex items-center px-3 py-1 text-sm bg-blue-50 text-blue-600 rounded hover:bg-blue-100"
        >
          <Pencil size={14} className="mr-1" />
          Edit
        </button>
        <button
          onClick={handleDelete}
          className="flex items-center px-3 py-1 text-sm bg-red-50 text-red-600 rounded hover:bg-red-100"
        >
          <Trash2 size={14} className="mr-1" />
          Delete
        </button>
      </div>
    </div>
  );
};

export default UserCard;