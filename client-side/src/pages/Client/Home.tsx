import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import controller from "../../services/commonRequests";
import endpoints from "../../services/api";

const Home = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const resp: any = await controller.getAll(endpoints.books);
      setBooks(resp.data);
    };

    fetchData();
  }, []);

  if (!books) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 via-blue-50 to-white text-gray-800">
      {/* Hero */}
      <section className="relative h-[70vh] flex items-center justify-center text-center px-4">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1512820790803-83ca734da794')] bg-cover bg-center brightness-50" />
        <div className="relative z-10 max-w-3xl bg-white/10 backdrop-blur-xl p-8 rounded-xl shadow-xl">
          <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow">
            Find Your Next Favorite Book
          </h1>
          <p className="text-gray-200 mt-4 text-lg">
            Read, explore, and collect books you love.
          </p>
          <Link
            to="/books"
            className="mt-6 inline-block bg-blue-600 hover:bg-blue-700 transition text-white px-6 py-3 rounded-full font-medium"
          >
            Browse Collection
          </Link>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 px-6 md:px-20 bg-white">
        <h2 className="text-3xl font-bold text-center mb-10">
          Popular Categories
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {[
            {
              title: "Fiction",
              image:
                "https://authornews.penguinrandomhouse.com/wp-content/uploads/2016/02/fiction1.jpg",
            },
            {
              title: "Science",
              image:
                "https://www.euroschoolindia.com/blogs/wp-content/uploads/2023/08/importance-of-learning-science.jpg",
            },
            {
              title: "History",
              image:
                "https://alameda.edu/wp-content/uploads/2021/07/History.png",
            },
            {
              title: "Romance",
              image:
                "https://wallpapers.com/images/featured/romance-pictures-9nus2ne9xefezvcs.jpg",
            },
          ].map((cat, i) => (
            <div
              key={i}
              className="relative rounded-xl overflow-hidden shadow-lg group hover:scale-[1.03] transition"
            >
              <img
                src={cat.image}
                alt={cat.title}
                className="object-cover h-48 w-full group-hover:brightness-75 transition"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent p-4 flex items-end">
                <h3 className="text-white text-lg font-semibold">
                  {cat.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Books */}
      <section className="py-20 px-6 md:px-20 bg-gradient-to-b from-white to-blue-50">
        <h2 className="text-3xl font-bold text-center mb-12">
          Featured This Week
        </h2>
        <div className="columns-2 md:columns-3 gap-6 max-w-6xl mx-auto space-y-6">
          {books.slice(0, 3).map((book, i) => (
            <div
              key={book.title + i}
              className="break-inside-avoid bg-white shadow-xl rounded-xl overflow-hidden hover:-translate-y-1 hover:shadow-2xl transition cursor-default"
              onClick={() => {
                navigate(`/book-details/${book.id}`);
              }}
            >
              <img
                src={book.coverImage}
                alt={book.title}
                className="w-full object-cover h-[300px]"
              />
              <div className="p-4">
                <h3 className="font-semibold text-lg text-blue-800">
                  {book.title}
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  by {book.author?.name}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why Us */}
      <section className="py-20 px-6 md:px-20 bg-white text-center">
        <h2 className="text-3xl font-bold mb-12">Why Readers Love Us</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              icon: "📚",
              title: "Curated Libraries",
              desc: "Expert-picked selections for every taste.",
            },
            {
              icon: "⚡",
              title: "Instant Access",
              desc: "Enjoy books digitally or order to your door.",
            },
            {
              icon: "🌐",
              title: "Global Reach",
              desc: "Stories from around the world, all in one place.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="p-8 bg-blue-50 rounded-xl shadow hover:shadow-lg transition hover:scale-[1.02]"
            >
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="text-xl font-semibold">{item.title}</h3>
              <p className="text-gray-600 mt-2 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 px-6 md:px-20 bg-sky-100">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 items-center">
          <img
            src="https://s43097.pcdn.co/wp-content/uploads/2021/06/Newsletters_blog.png"
            alt="Newsletter"
            className="rounded-xl shadow-md hidden md:block"
          />
          <div>
            <h2 className="text-2xl font-bold mb-4">Get the Best Book Deals</h2>
            <p className="text-gray-600 mb-6 text-sm">
              Subscribe to our newsletter and be the first to know about new
              arrivals, author interviews, and more.
            </p>
            <form className="flex gap-3 flex-col sm:flex-row">
              <input
                type="email"
                placeholder="you@example.com"
                className="flex-1 px-4 py-2 rounded-lg border border-gray-300 outline-none focus:ring-2 focus:ring-blue-400"
              />
              <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
