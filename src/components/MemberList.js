import React from "react";

const MemberList = ({ members, deleteMember, setEditingMember }) => {
  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">Members</h2>
      <ul className="divide-y divide-gray-200">
        {members.map((member) => (
          <li key={member.id} className="py-4 flex items-center justify-between">
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">{member.name}</p>
              <p className="text-sm text-gray-500">{member.email}</p>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => setEditingMember(member)}
                className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Edit
              </button>
              <button
                onClick={() => deleteMember(member.id)}
                className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MemberList;