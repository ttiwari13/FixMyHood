import React, { useState, useEffect } from "react";

const dummyIssues = [
  {
    id: 1,
    title: "Pothole on Main Street",
    description: "This pothole has been here for over 2 weeks and is damaging vehicles.",
    location: "Main Street, Sector 14",
    upvotes: 23,
    image: "https://i.imgur.com/FdC2KaU.jpg"  // road pothole
  },
  {
    id: 2,
    title: "Overflowing Garbage Bin",
    description: "Garbage collection hasn't happened for days in our lane.",
    location: "Lane 5, Green Park",
    upvotes: 45,
    image: "https://i.imgur.com/zU0gLOJ.jpg"  // garbage bin
  },
  {
    id: 3,
    title: "Broken Streetlight",
    description: "It’s pitch dark at night, posing safety risks.",
    location: "Near Community Center, Block C",
    upvotes: 31,
    image: "https://i.imgur.com/8nE0jvJ.jpg"  // broken light
  }
];

const CommunityFeed = () => {
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    setIssues(dummyIssues);
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-4xl font-bold mb-8 text-center text-gray-800">🗺️ Community Feed</h2>

      {issues.length === 0 ? (
        <p className="text-gray-600 text-center">No issues reported yet.</p>
      ) : (
        issues.map((issue) => (
          <div
            key={issue.id}
            className="bg-white rounded-2xl shadow-md overflow-hidden mb-6 border border-gray-200"
          >
            {/* Image */}
            <img
              src={issue.imageUrl}
              alt={issue.title}
              className="w-full h-64 object-cover"
            />

            {/* Content */}
            <div className="p-5">
              <h3 className="text-2xl font-semibold text-blue-700 mb-2">{issue.title}</h3>
              <p className="text-gray-700 leading-relaxed">{issue.description}</p>
              <div className="mt-4 flex flex-col sm:flex-row sm:justify-between sm:items-center">
                <p className="text-gray-600 mt-2 sm:mt-0">📍 {issue.location}</p>
                <p className="text-gray-400 text-sm mt-1">
                  🕒 Reported on {new Date(issue.timestamp).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default CommunityFeed;
