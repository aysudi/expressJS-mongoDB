import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";

const Contact = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-slate-100 py-20 px-6">
      {/* Heading */}
      <div className="max-w-3xl mx-auto text-center mb-14">
        <h1 className="text-4xl font-bold text-blue-800">Get in Touch</h1>
        <p className="text-gray-600 mt-4 text-lg">
          Have a question, suggestion, or just want to say hello? We'd love to
          hear from you.
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Contact Form */}
        <form className="bg-white shadow-xl rounded-2xl p-8 space-y-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Your name"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Message
            </label>
            <textarea
              rows={5}
              placeholder="Write your message..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-300"
          >
            Send Message
          </button>
        </form>

        {/* Modern Contact Info Card */}
        <div className="bg-gradient-to-br from-white to-slate-100 shadow-xl rounded-2xl p-10 flex flex-col justify-between">
          <div className="mb-10">
            <h3 className="text-2xl font-bold text-blue-800 mb-4">
              We’d Love to Hear From You 💬
            </h3>
            <p className="text-gray-600 text-lg leading-relaxed">
              Whether you're searching for your next favorite read, want
              personalized book recommendations, or simply have feedback about
              your experience, our team is always here and eager to connect.
              Reach out through any of the contact options below — we're ready
              to listen and help in any way we can.
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="bg-blue-100 text-blue-600 p-3 rounded-full">
                <FaEnvelope className="text-xl" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="text-base font-medium text-gray-700">
                  support@bookhaven.com
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="bg-blue-100 text-blue-600 p-3 rounded-full">
                <FaPhoneAlt className="text-xl" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <p className="text-base font-medium text-gray-700">
                  +1 (555) 123-4567
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="bg-blue-100 text-blue-600 p-3 rounded-full">
                <FaMapMarkerAlt className="text-xl" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Location</p>
                <p className="text-base font-medium text-gray-700">
                  123 Story Lane, Booktown, NY
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mt-16 mx-auto h-64 md:h-72 lg:h-80 rounded-xl overflow-hidden shadow-md border border-gray-200">
        <iframe
          title="Google Map - Book Haven HQ"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3039.4284905031036!2d49.851370576608076!3d40.37719495804366!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40307d079efb5163%3A0xc20aa51a5f0b5e01!2sCode%20Academy!5e0!3m2!1sen!2saz!4v1752353500047!5m2!1sen!2saz"
          width="100%"
          height="100%"
          allowFullScreen={true}
          loading="lazy"
          className="w-full h-full"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
};

export default Contact;
