import { Link, useSearchParams } from "react-router-dom";
import { CheckCircleIcon } from "lucide-react";

const EmailVerify = () => {
  const [searchParams] = useSearchParams();

  const message = searchParams.get("message");

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-100 to-sky-100 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-10 max-w-md w-full text-center">
        <CheckCircleIcon className="mx-auto h-16 w-16 text-green-500 mb-6" />

        <h1 className="text-2xl font-semibold text-gray-800 mb-2">{message}</h1>

        <p className="text-gray-600 mb-6">
          Your email has been successfully verified. You're all set to sign in!
        </p>

        <Link
          to="/auth/login"
          className="inline-block w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-3 rounded-xl font-medium hover:opacity-90 transition"
        >
          Jump Right Back to Login
        </Link>
      </div>
    </div>
  );
};

export default EmailVerify;
