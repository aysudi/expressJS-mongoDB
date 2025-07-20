import { Link } from "react-router";

const BookCard = ({ book }: { book: any }) => {
  return (
    <Link
      to={`/book-details/${book.id}`}
      className="relative group bg-gradient-to-tr from-white via-slate-50 to-slate-200 border border-slate-100 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-transform duration-300"
    >
      {/* Book Cover */}
      <div className="relative z-10 h-64 -mt-10 mx-6 rounded-xl overflow-hidden shadow-lg">
        <img
          src={book.coverImage}
          alt={book.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="p-6 pt-16 text-center">
        <h3 className="text-xl font-bold text-gray-800">{book.title}</h3>
        <p className="text-sm text-gray-500 mt-1 italic">{book.author.name}</p>

        <span className="inline-block mt-3 text-xs font-medium bg-blue-100 text-blue-600 px-3 py-1 rounded-full">
          {book.category}
        </span>

        <div className="mt-6">
          <button className="w-full bg-gradient-to-r from-indigo-500 to-blue-600 text-white py-2 rounded-full font-semibold tracking-wide shadow hover:shadow-lg hover:opacity-90 transition cursor-pointer">
            View Book
          </button>
        </div>
      </div>

      {/* Glow Effect */}
      <div className="absolute -bottom-10 right-6 h-32 w-32 bg-blue-400/30 rounded-full blur-3xl opacity-70 group-hover:scale-110 transition duration-300" />
    </Link>
  );
};

export default BookCard;
