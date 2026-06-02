import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import CreatePost from "./pages/CreatePost";
import Feed from "./pages/Feed";
import "./index.css";
const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        {/* Navigation Bar */}
        <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16 sm:h-20">
              {/* Logo */}
              <Link to="/Feed" className="flex-shrink-0">
                <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  PostHub
                </h1>
              </Link>

              {/* Navigation Links */}
              <div className="flex items-center gap-2 md:gap-4">
                <Link
                  to="/Feed"
                  className="px-4 py-2 text-sm md:text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"
                >
                  Feed
                </Link>
                <Link
                  to="/create-post"
                  className="px-4 py-2 text-sm md:text-base font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-md"
                >
                  Create Post
                </Link>
              </div>
            </div>
          </div>
        </nav>

        <Routes>
          <Route path="/create-post" element={<CreatePost />} />
          <Route
            path="/about"
            element={
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
                  about Page
                </h1>
              </div>
            }
          />
          <Route path="/Feed" element={<Feed />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
