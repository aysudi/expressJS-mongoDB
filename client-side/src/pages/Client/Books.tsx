import { useEffect, useState } from "react";
import BookCard from "../../components/Client/BookCard";
import controller from "../../services/commonRequests";
import endpoints from "../../services/api";

const BooksPage = () => {
  const [books, setBooks] = useState<Book[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const resp: any = await controller.getAll(endpoints.books);
      setBooks(resp.data);
    };

    fetchData();
  }, []);

  if (!books) return null;

  const uniqueCategories = [
    "All",
    ...new Set(books.map((book) => book.category)),
  ].sort((a, b) => {
    if (a === "All") return -1;
    return a.localeCompare(b);
  });

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredBooks = books.filter((book) => {
    const matchesCategory =
      selectedCategory === "All" || book.category === selectedCategory;
    const matchesSearch =
      book.title?.toLowerCase().includes(search.toLowerCase()) ||
      book.author?.name.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 px-6 py-12">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-10 text-center">
        <h1 className="text-4xl font-bold text-blue-900 mb-2">Browse Books</h1>
        <p className="text-gray-500">
          Find your next great read from our collection.
        </p>
      </div>

      {/* Filters */}
      <div className="max-w-5xl mx-auto mb-8 flex flex-col sm:flex-row items-center gap-4">
        <input
          type="text"
          placeholder="Search books..."
          className="w-full sm:w-1/2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {uniqueCategories.map((cat) => (
            <option key={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {/* Book Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {filteredBooks.map((book, index) => (
          <BookCard key={index} book={book} />
        ))}
      </div>

      {filteredBooks.length === 0 && (
        <p className="text-center text-gray-500 mt-10">No books found.</p>
      )}
    </div>
  );
};

export default BooksPage;
