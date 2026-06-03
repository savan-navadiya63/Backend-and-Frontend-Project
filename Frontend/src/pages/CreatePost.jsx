import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const CreatePost = () => {


const [image, setImage] = useState(null);
const [caption, setCaption] = useState("");


  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formdata = new FormData(); // form data ko create krna

    formdata.append("image", image);
    formdata.append("caption", caption);

  try {
    const res = await axios.post(
      "https://my-backend-app.onrender.com/create-post",
      formdata,
    );

    alert(res.data.message);
    navigate("/Feed");

  } catch (err) {
    console.log(err);
    alert("Error creating post");
  }
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-6 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-8">
          Create Post
        </h1>

        <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 md:p-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm sm:text-base font-semibold text-gray-800 mb-3">
                Upload Image
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 sm:p-12 text-center hover:border-blue-400 transition">
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  className="w-full"
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm sm:text-base font-semibold text-gray-800 mb-3">
                Caption
              </label>
              <input
                type="text"
                name="caption"
                placeholder="Enter caption"
                required
                className="w-full px-4 py-3 sm:py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm sm:text-base placeholder-gray-400 transition"
                onChange={(e) => setCaption(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="w-full px-6 py-3 sm:py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-200 shadow-md hover:shadow-lg text-sm sm:text-base"
            >
              Create Post
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default CreatePost;
