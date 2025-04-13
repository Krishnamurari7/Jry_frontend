import React, { useState, useEffect } from "react";

const MemberForm = ({ addMember, updateMember, editingMember }) => {
  const [formData, setFormData] = useState({ name: "", email: "" });

  useEffect(() => {
    if (editingMember) {
      setFormData(editingMember);
    } else {
      setFormData({ name: "", email: "" });
    }
  }, [editingMember]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingMember) {
      updateMember(formData);
    } else {
      addMember(formData);
    }
    setFormData({ name: "", email: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Name
        </label>
        <input
          id="name"
          type="text"
          placeholder="Enter name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          id="email"
          type="email"
          placeholder="Enter email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
        />
      </div>
      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        {editingMember ? "Update" : "Add"} Member
      </button>
    </form>
  );
};

export default MemberForm;