import { Link } from 'react-router-dom';
import { FaWrench, FaArrowUp, FaComments, FaPlus } from 'react-icons/fa';
import { getAuth } from 'firebase/auth';
import logo from '../assets/logo.jpg';

export default function Home() {
  const auth = getAuth();
  const user = auth.currentUser;
  const userName = user?.displayName || user?.email?.split('@')[0] || "Guest";

  const posts = [
    {
      id: 1,
      title: "Pothole on Main Street",
      description: "This pothole has been here for over 2 weeks and is damaging vehicles.",
      location: "Main Street, Sector 14",
      upvotes: 23,
      image: "https://source.unsplash.com/600x400/?pothole,road"
    },
    {
      id: 2,
      title: "Overflowing Garbage Bin",
      description: "Garbage collection hasn't happened for days in our lane.",
      location: "Lane 5, Green Park",
      upvotes: 45,
      image: "https://source.unsplash.com/600x400/?garbage,dump"
    },
    {
      id: 3,
      title: "Broken Streetlight",
      description: "It’s pitch dark at night, posing safety risks.",
      location: "Near Community Center, Block C",
      upvotes: 31,
      image: "https://source.unsplash.com/600x400/?streetlight,night"
    }
  ];

  return (
    <div className="min-h-screen bg-white text-gray-800 flex flex-col relative">
      {/* Navbar */}
      <header className="flex items-center justify-between px-8 py-4 shadow">
        <div className="flex items-center space-x-2">
          <img src={logo} alt="FixMyHood Logo" className="h-10 w-10" />
          <span className="text-xl font-bold text-teal-600">FixMyHood</span>
        </div>
        <nav className="space-x-6 text-sm font-medium">
          <Link to="/" className="hover:text-teal-600">Home</Link>
          <Link to="/profile" className="text-teal-600 font-semibold hover:underline">
            {userName}
          </Link>

        </nav>
      </header>

      {/* Community Feed */}
      <main className="flex flex-col items-center py-8 px-4 flex-grow">
        <h2 className="text-2xl font-bold mb-6 text-center">Community Feed</h2>
        <div className="w-full max-w-4xl space-y-6">
          {posts.map((post) => (
            <div key={post.id} className="bg-white border rounded-lg shadow-md overflow-hidden">
              {post.image && (
                <img src={post.image} alt={post.title} className="w-full h-64 object-cover" />
              )}
              <div className="p-5">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{post.title}</h3>
                <p className="text-gray-600 mb-2">{post.description}</p>
                <p className="text-sm text-gray-500 mb-2">📍 {post.location}</p>
                <div className="flex items-center space-x-2 text-gray-600">
                  <FaArrowUp className="text-teal-600" />
                  <span>{post.upvotes} upvotes</span>
                  <FaComments className="ml-4" />
                  <span>12 comments</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Floating + Button */}
      <Link
        to="/report"
        className="fixed bottom-6 right-6 bg-teal-600 hover:bg-teal-700 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg text-2xl"
        title="Report an Issue"
      >
        <FaPlus />
      </Link>

      {/* Footer */}
      <footer className="border-t px-8 py-4 text-sm text-gray-500 flex justify-between items-center">
        <div className="space-x-6">
          <Link to="/about" className="hover:text-teal-600">About</Link>
          <Link to="/contact" className="hover:text-teal-600">Contact Us</Link>
          <Link to="/privacy" className="hover:text-teal-600">Privacy Policy</Link>
        </div>
        <span>© 2025 FixMyHood</span>
      </footer>
    </div>
  );
}
