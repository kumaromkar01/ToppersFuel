import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { useBookStore } from "../store/bookStore";
import { useAuthStore } from "../store/authStore";
import toast from "react-hot-toast";

const Bookpage = () => {
  const { user } = useAuthStore();
  const { fetchBook, book, isLoading, deleteBook } = useBookStore();
  const navigate = useNavigate("/");
  const params = useParams();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchBook(params.id);
  }, [fetchBook, params]);

  if (isLoading) {
    return <p className="text-center py-20 text-lg animate-pulse">Loading...</p>;
  }

  console.log("Book: ", book);

  const handleDelete = async () => {
    const { message } = await deleteBook(params.id);
    toast.success(message);
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5] text-[#252422] px-4 md:px-12 pb-10">
      {/* Back Button */}
      <p 
        className="cursor-pointer py-6 hover:text-[#944424] transition-colors" 
        onClick={() => navigate("/")}
      >
        &larr; <span className="underline">Back</span>
      </p>

      {/* Book Content */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* Cover Image + Read Button */}
        <div className="md:basis-[30%] md:mr-6 mx-auto w-full">
          <img
            src={book?.image}
            alt="book_img"
            className="max-h-[50vh] mx-auto rounded-lg shadow-md hover:shadow-lg transition-shadow"
          />
          <Link to={book?.link} target="_blank">
            <div className="w-full flex justify-center items-center">
              <button className="bg-[#403D39] hover:bg-[#252422] text-[#CCC5B9] px-3 py-2 w-full md:max-w-52 mt-4 rounded-md transition-all">
                Read
              </button>
            </div>
          </Link>
        </div>

        {/* Book Details */}
        <div className="mt-6 md:mt-0 md:max-w-4xl basis-[65%]">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-2 text-[#252422]">
              {book?.title}
            </h1>
          {/* Uploader + Menu */}
          <div className="flex justify-between items-center mb-4">
            
            <p className="text-gray-600">
              Uploaded by:{" "}
              <span className="text-[#944424] font-medium">@{book?.user.username}</span>
            </p>

            {user?._id === book?.user?._id && (
              <div className="text-2xl font-bold -mt-2 relative">
                <span
                  onClick={() => setOpen(!open)}
                  className="cursor-pointer tracking-widest hover:text-[#944424] transition-colors"
                >
                  ...
                </span>

                {open && (
                  <div className="absolute bg-white shadow-lg py-2 px-4 text-base font-normal right-0 top-10 rounded-md w-32 z-10 border border-gray-100">
                    <Link to={`/book/${book._id}/update`}>
                      <p className="mb-2 pb-2 border-b border-gray-200 hover:text-[#944424]">Update</p>
                    </Link>
                    <p 
                      onClick={handleDelete} 
                      className="text-red-500 hover:text-red-700 cursor-pointer transition-colors"
                    >
                      Delete
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Title & Author */}
          
          {book?.subtitle && (
            <h3 className="text-xl text-gray-600 mb-4">{book?.subtitle}</h3>
          )}
          <p className="text-lg text-gray-700 mb-6">Written by: {book?.author}</p>

          {/* Review */}
          <div className="bg-white/50 p-6 rounded-lg">
            <p className="font-semibold text-lg md:text-xl mb-3">Review:</p>
            <p className="md:text-lg leading-relaxed">{book?.review}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bookpage;