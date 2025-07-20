import { useFormik } from "formik";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import loginValidation from "../../validation/loginValidation";
import controller from "../../services/commonRequests";
import endpoints from "../../services/api";
import { enqueueSnackbar } from "notistack";
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";

const Login = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const message = searchParams.get("message");

  const error = searchParams.get("error");

  useEffect(() => {
    if (error) {
      enqueueSnackbar(
        "This account has been created with email, please try to login with email",
        {
          autoHideDuration: 2000,
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "right",
          },
          variant: "error",
        }
      );
    }
  }, [error]);

  useEffect(() => {
    if (message) {
      enqueueSnackbar(message, {
        autoHideDuration: 2000,
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "right",
        },
        variant: "success",
      });
    }
  }, [message]);

  const loginFormik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginValidation,
    onSubmit: async (values, actions) => {
      try {
        const { email, password } = values;

        const response = await controller.post(`${endpoints.users}/login`, {
          email,
          password,
        });

        if (response.statusCode == 401 || response.statusCode == 500) {
          actions.resetForm();

          return enqueueSnackbar(response.message, {
            autoHideDuration: 2000,
            anchorOrigin: {
              vertical: "bottom",
              horizontal: "right",
            },
            variant: "error",
          });
        } else {
          enqueueSnackbar("User successfully login", {
            autoHideDuration: 2000,
            anchorOrigin: {
              vertical: "bottom",
              horizontal: "right",
            },
            variant: "success",
          });

          if (response.token) {
            const decoded: Decode = jwtDecode(response.token);
            localStorage.setItem("token", JSON.stringify(response.token));

            if (decoded.role == "admin") {
              navigate("/admin");
            } else if (decoded.role == "customer" || decoded.role == "vendor") {
              navigate("/books");
            }
          }
        }

        actions.resetForm();
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-sky-100 flex items-center justify-center px-4">
      <div className="bg-white shadow-xl rounded-2xl max-w-md w-full p-8 space-y-4">
        <div className="text-center">
          <h1 className="text-3xl font-semibold text-gray-800">Welcome Back</h1>
          <p className="text-gray-500 mt-2 text-sm">
            Login to your account to continue
          </p>
        </div>

        {/* Email / Password Login */}
        <form onSubmit={loginFormik.handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={loginFormik.values.email}
              onBlur={loginFormik.handleBlur}
              onChange={loginFormik.handleChange}
              placeholder="you@example.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {loginFormik.errors.email && loginFormik.touched.email && (
              <span className="text-red-500 text-sm mt-1 block">
                {loginFormik.errors.email}
              </span>
            )}
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={loginFormik.values.password}
              onBlur={loginFormik.handleBlur}
              onChange={loginFormik.handleChange}
              placeholder="••••••••"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {loginFormik.errors.password && loginFormik.touched.password && (
              <span className="text-red-500 text-sm mt-1 block">
                {loginFormik.errors.password}
              </span>
            )}
          </div>
          <button
            type="submit"
            disabled={
              loginFormik.isSubmitting ||
              !loginFormik.dirty ||
              Object.entries(loginFormik.errors).length > 0
            }
            className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 disabled:from-blue-400 disabled:to-indigo-400 disabled:cursor-not-allowed text-white py-2 rounded-lg font-medium hover:opacity-90 transition cursor-pointer"
          >
            Sign In
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center justify-between gap-4">
          <hr className="flex-1 border-gray-300" />
          <span className="text-gray-400 text-sm">or continue with</span>
          <hr className="flex-1 border-gray-300" />
        </div>

        {/* Google Sign In */}
        <button
          onClick={() =>
            (window.location.href = "http://localhost:3030/auth/google")
          }
          className="flex items-center justify-center w-full gap-3 border border-gray-300 py-2 rounded-lg hover:bg-gray-100 transition cursor-pointer"
        >
          <FcGoogle className="text-xl" />
          <span className="text-sm text-gray-700">Continue with Google</span>
        </button>

        <button
          onClick={() =>
            (window.location.href = "http://localhost:3030/auth/github")
          }
          className="flex items-center justify-center w-full gap-3 border border-gray-300 py-2 rounded-lg hover:bg-gray-100 transition cursor-pointer"
        >
          <img
            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg"
            alt="GitHub"
            className="w-5 h-5"
          />
          <span className="text-sm text-gray-700">Continue with GitHub</span>
        </button>

        <div className="text-center text-sm">
          <Link
            to="/auth/forgot-password"
            className="text-center text-sm text-blue-600 hover:underline"
          >
            Forgot password?
          </Link>
        </div>

        <p className="text-sm text-center text-gray-500">
          Don’t have an account?{" "}
          <Link to="/auth/register" className="text-blue-600 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
