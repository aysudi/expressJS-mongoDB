const About = () => {
  return (
    <div className="bg-[#f0f4f8] text-gray-800 overflow-hidden">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#5c6ac4] to-[#667eea] text-white py-28 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
            Turning Pages, <br /> Building Worlds
          </h1>
          <p className="mt-6 text-lg md:text-xl text-white/80">
            We’re not just a book platform — we’re a new way to experience
            stories.
          </p>
        </div>
        <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />
      </section>

      {/* Overlapping About Story */}
      <section className="relative z-10 -mt-16 px-6 pb-32">
        <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl p-10 md:p-16">
          <h2 className="text-3xl font-bold mb-6 text-[#5c6ac4]">
            Our Journey
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            We started with a simple belief — that discovering your next
            favorite book should feel as magical as reading it. That meant
            breaking away from cluttered platforms and building a clean, elegant
            space where stories shine.
          </p>
          <p className="mt-6 text-lg text-gray-700 leading-relaxed">
            With hand-curated titles, beautifully designed reading experiences,
            and smart filtering, we built a home for readers who love both form
            and function. This isn’t just a digital library — it’s a celebration
            of storytelling.
          </p>
        </div>
      </section>

      {/* Feature Icons */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <h2 className="text-center text-3xl font-bold text-gray-800 mb-12">
          What Makes Us Different
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 text-center">
          {[
            {
              icon: "📖",
              title: "Minimal & Beautiful",
              desc: "A distraction-free space where every page feels like art.",
            },
            {
              icon: "🌐",
              title: "Explore Without Limits",
              desc: "Digital-first and accessible anywhere, anytime.",
            },
            {
              icon: "🧠",
              title: "Built by Book Lovers",
              desc: "We know what readers want — because we are them.",
            },
          ].map((f, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-8 shadow-md hover:shadow-lg transition duration-300"
            >
              <div className="text-5xl mb-4">{f.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-[#5c6ac4]">
                {f.title}
              </h3>
              <p className="text-gray-600">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default About;
