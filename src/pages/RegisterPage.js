import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    businessName: '',
    businessOption: '',
    fatherName: '',
    dob: '',
    image: null,
    post: '',
    pinCode: '',
    policeStation: '',
    district: '',
    state: '',
    phoneNo: '',
    aadharNo: '',
    panNo: '',
    villageTown: '',
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { register } = useAuth();

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image" && files && files[0]) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          image: reader.result, // base64 string
        }));
      };
      reader.readAsDataURL(files[0]);
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      const { confirmPassword, ...userData } = formData;
      const result = await register(userData); // Make sure this calls the backend route

      if (result.success) {
        navigate('/login');
      } else {
        setError(result.message || 'Registration failed');
      }
    } catch (err) {
      console.error(err);
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto pt-10">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Create your account</h2>
        <p className="mt-2 text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
            Sign in
          </Link>
        </p>
      </div>

      <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <form className="space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded">
              {error}
            </div>
          )}
          {[
            { label: "Full Name", name: "name", type: "text" },
            { label: "Email address", name: "email", type: "email" },
            { label: "Password", name: "password", type: "password" },
            { label: "Confirm Password", name: "confirmPassword", type: "password" },
            
          ].map(({ label, name, type }) => (
            <div key={name}>
              <label htmlFor={name} className="block text-sm font-medium text-gray-700">
                {label}
              </label>
              <input
                id={name}
                name={name}
                type={type}
                required
                value={formData[name]}
                onChange={handleChange}
                className="block w-full px-3 py-2 border rounded-md shadow-sm"
              />
            </div>
          ))}

          {[
           
            { label: "Father Name", name: "fatherName", type: "text" },
            { label: "Date of Birth", name: "dob", type: "date" },
            { label: "Business Name", name: "businessName", type: "text" },
            { label: "Post", name: "post", type: "text" },
  { label: "Pin code", name: "pinCode", type: "text" },
  { label: "Police Station", name: "policeStation", type: "text" },
  { label: "District", name: "district", type: "text" },
  { label: "State", name: "state", type: "text" },
  { label: "Phone No", name: "phoneNo", type: "text" },
  { label: "Aadhar No", name: "aadharNo", type: "text" },
  { label: "Pan No", name: "panNo", type: "text" },
  { label: "Village/Town", name: "villageTown", type: "text" }
          ].map(({ label, name, type }) => (
            <div key={name}>
              <label htmlFor={name} className="block text-sm font-medium text-gray-700">
                {label}
              </label>
              <input
                id={name}
                name={name}
                type={type}
                
                value={formData[name]}
                onChange={handleChange}
                className="block w-full px-3 py-2 border rounded-md shadow-sm"
              />
            </div>
          ))}

          <div>
            <label htmlFor="businessOption" className="block text-sm font-medium text-gray-700">
              Business Type
            </label>
            <select
              id="businessOption"
              name="businessOption"
              
              value={formData.businessOption}
              onChange={handleChange}
              className="block w-full px-3 py-2 border rounded-md shadow-sm"
            >
              <option value="">Select a business type</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>

          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-700">
              Profile Image
            </label>
            <input
              id="image"
              name="image"
              type="file"
              accept="image/*"
              onChange={handleChange}
              className="block w-full"
            />
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
            >
              {loading ? 'Creating account...' : 'Create account'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
