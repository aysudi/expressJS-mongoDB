import { Link } from "react-router-dom";

const ForgotPassword = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-sky-100 flex items-center justify-center px-4">
      <div className="bg-white shadow-xl rounded-2xl max-w-md w-full p-8 space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-gray-800">
            Forgot Your Password?
          </h1>
          <p className="text-sm text-gray-500 mt-2">
            Enter your email and we’ll send you a link to reset it.
          </p>
        </div>

        <form className="space-y-6">
          <div>
            <label className="block text-sm text-gray-600 mb-2">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-2 rounded-lg font-medium hover:opacity-90 transition cursor-pointer"
          >
            Send Reset Link
          </button>
        </form>

        <p className="text-sm text-center text-gray-500">
          Remember your password?{" "}
          <Link to="/auth/login" className="text-blue-600 hover:underline">
            Go back to login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
