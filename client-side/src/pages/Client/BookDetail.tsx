import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import controller from "../../services/commonRequests";
import endpoints from "../../services/api";

const BookDetail = () => {
  const { id } = useParams();
  const [book, setBook] = useState<any>(null);

  useEffect(() => {
    const fetchBook = async () => {
      if (id) {
        const resp = await controller.getOne(endpoints.books, id);
        setBook(resp);
      }
    };
    fetchBook();
  }, [id]);

  const calculateAverageRating = (ratings: number[]) => {
    if (!ratings || ratings.length === 0) return 0;
    const total = ratings.reduce((acc, rating) => acc + rating, 0);
    return (total / ratings.length).toFixed(1);
  };

  const downloadPDF = () => {
    const link = document.createElement("a");
    link.href = book.bookPDF;
    link.setAttribute("download", `${book.title}.pdf`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!book)
    return <div className="text-center mt-20 text-gray-500">Loading...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-100 to-blue-50 py-16 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10 bg-white rounded-xl shadow-xl p-8">
        {/* Book Cover */}
        <div className="w-full h-full overflow-hidden rounded-lg shadow-md">
          <img
            src={book.coverImage}
            alt={book.title}
            className="object-cover w-full h-full max-h-[600px]"
          />
        </div>

        {/* Book Details */}
        <div className="lg:col-span-2 space-y-6">
          <div>
            <h1 className="text-4xl font-bold text-slate-800 mb-2">
              {book.title}
            </h1>
            <p className="text-lg text-gray-600">
              by{" "}
              <span className="text-indigo-600 font-semibold">
                {book.author?.name}
              </span>
            </p>
          </div>

          <p className="text-gray-700 leading-relaxed text-justify">
            {book.description}
          </p>

          <div className="bg-indigo-50 p-4 rounded-md shadow-sm">
            <h3 className="text-lg font-semibold text-indigo-800 mb-1">
              About the Author
            </h3>
            <p className="text-sm text-gray-700 leading-relaxed">
              {book.author?.bio || "No bio available for this author."}
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 text-sm text-gray-600 mt-6">
            <p>
              <span className="font-semibold text-gray-700">Category:</span>{" "}
              {book.category}
            </p>
            <p>
              <span className="font-semibold text-gray-700">Price:</span> $
              {book.price}
            </p>
            <p>
              <span className="font-semibold text-gray-700">Digital:</span>{" "}
              {book.digital ? "Yes" : "No"}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 mt-8">
            <a
              href={book.bookPDF}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition"
            >
              Read Book
            </a>
            <button
              onClick={downloadPDF}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition"
            >
              Download
            </button>
            <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition">
              Buy Book
            </button>
          </div>
        </div>
      </div>

      {/* Comments & Rating */}
      <div className="max-w-7xl mx-auto mt-12 bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-blue-800 mb-4">
          Reader Comments
        </h2>

        <div className="flex items-center gap-3 mb-6">
          <span className="text-lg font-medium text-gray-700">
            Overall Rating:
          </span>
          <span className="text-yellow-500 text-xl">
            {"★".repeat(
              Math.round(Number(calculateAverageRating(book.ratings)))
            )}
            {"☆".repeat(
              5 - Math.round(Number(calculateAverageRating(book.ratings)))
            )}
          </span>
          <span className="text-sm text-gray-500">
            ({calculateAverageRating(book.ratings)} / 5)
          </span>
        </div>

        {book.comments.length === 0 ? (
          <p className="text-gray-500 italic">No comments yet.</p>
        ) : (
          <div className="space-y-6">
            {book.comments.map((comment: any, index: number) => (
              <div key={index} className="bg-slate-50 rounded-lg p-4 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600 font-medium">
                    {new Date(comment.date).toLocaleDateString()}
                  </span>
                  {comment.rating && (
                    <span className="text-yellow-500 text-md">
                      {"★".repeat(comment.rating)}{" "}
                      {"☆".repeat(5 - comment.rating)}
                    </span>
                  )}
                </div>
                <p className="text-gray-700">{comment.text}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BookDetail;
