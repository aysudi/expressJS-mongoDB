import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useFormik } from "formik";
import { IoClose } from "react-icons/io5";
import regsiterValidation from "../../validation/registerValidation";
import { enqueueSnackbar } from "notistack";
import controller from "../../services/commonRequests";
import endpoints from "../../services/api";

const Register = () => {
  const [imagePreview, setImagePreview] = useState<string>("");
  const navigate = useNavigate();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (e.currentTarget.files && file) {
      setImagePreview(URL.createObjectURL(file));
      registerFormik.setFieldValue("profileImage", file);
    }
  };

  const removeImage = () => {
    setImagePreview("");
    registerFormik.setFieldValue("profileImage", null);
  };

  const registerFormik = useFormik({
    initialValues: {
      fullName: "",
      username: "",
      email: "",
      profileImage: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: regsiterValidation,
    onSubmit: async (values, action) => {
      const formData = new FormData();

      formData.append("fullName", values.fullName);
      formData.append("username", values.username);
      formData.append("email", values.email);
      formData.append("password", values.password);
      if (values.profileImage) {
        formData.append("profileImage", values.profileImage);
      }

      try {
        await controller.post(`${endpoints.users}/register`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        enqueueSnackbar("User registered successfully!", {
          autoHideDuration: 2000,
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "right",
          },
          variant: "success",
        });

        action.resetForm();
        setImagePreview("");

        navigate("/auth/login");
      } catch (error: any) {
        enqueueSnackbar(error.response.data.message, {
          autoHideDuration: 2000,
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "right",
          },
          variant: "error",
        });
        values.email = "";
        values.username = "";
      }
    },
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-sky-100 flex items-center justify-center px-4">
      <div className="bg-white shadow-xl rounded-2xl max-w-lg w-full p-8 space-y-4">
        <div className="text-center">
          <h1 className="text-3xl font-semibold text-gray-800">
            Create Account
          </h1>
          <p className="text-gray-500 mt-2 text-sm">
            Join our book community today
          </p>
        </div>

        <form onSubmit={registerFormik.handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                onChange={registerFormik.handleChange}
                onBlur={registerFormik.handleBlur}
                value={registerFormik.values.fullName}
                placeholder="Jane Doe"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
              {registerFormik.errors.fullName &&
                registerFormik.touched.fullName && (
                  <span className="text-red-500 text-sm mt-1 block">
                    {registerFormik.errors.fullName}
                  </span>
                )}
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Username
              </label>
              <input
                type="text"
                name="username"
                onChange={registerFormik.handleChange}
                value={registerFormik.values.username}
                onBlur={registerFormik.handleBlur}
                placeholder="jdoe123"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
              {registerFormik.errors.username &&
                registerFormik.touched.username && (
                  <span className="text-red-500 text-sm mt-1 block">
                    {registerFormik.errors.username}
                  </span>
                )}
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Email</label>
            <input
              type="email"
              name="email"
              onChange={registerFormik.handleChange}
              value={registerFormik.values.email}
              onBlur={registerFormik.handleBlur}
              placeholder="jane@example.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
            {registerFormik.errors.email && registerFormik.touched.email && (
              <span className="text-red-500 text-sm mt-1 block">
                {registerFormik.errors.email}
              </span>
            )}
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Profile Image
            </label>
            {/* Profile Image Preview */}
            {imagePreview && (
              <div className="relative w-16 h-16 mt-2 mb-4">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="object-cover w-full h-full rounded-lg border border-gray-200 shadow-sm"
                />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute top-[-6px] right-[-8px] bg-white rounded-full p-0.5 shadow-2xl hover:bg-red-100 border border-gray-200 cursor-pointer"
                >
                  <IoClose className="text-red-600 text-lg shadow-2xl" />
                </button>
              </div>
            )}
            <label className="w-full cursor-pointer px-4 py-2 border border-gray-300 rounded-lg flex items-center justify-between text-sm text-gray-500 bg-gray-50 hover:bg-gray-100 transition">
              <span>{imagePreview ? "Change Image" : "Choose image..."}</span>
              <input
                type="file"
                name="profileImage"
                onBlur={registerFormik.handleBlur}
                onChange={handleImageChange}
                accept="image/*"
                className="hidden"
              />
              {registerFormik.errors.profileImage &&
                registerFormik.touched.profileImage && (
                  <span className="text-red-500 text-sm mt-1 block">
                    {registerFormik.errors.profileImage}
                  </span>
                )}
            </label>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Password
              </label>
              <input
                type="password"
                name="password"
                onChange={registerFormik.handleChange}
                value={registerFormik.values.password}
                onBlur={registerFormik.handleBlur}
                placeholder="••••••••"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
              {registerFormik.errors.password &&
                registerFormik.touched.password && (
                  <span className="text-red-500 text-sm mt-1 block">
                    {registerFormik.errors.password}
                  </span>
                )}
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                onChange={registerFormik.handleChange}
                value={registerFormik.values.confirmPassword}
                onBlur={registerFormik.handleBlur}
                placeholder="••••••••"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
              {registerFormik.errors.confirmPassword &&
                registerFormik.touched.confirmPassword && (
                  <span className="text-red-500 text-sm mt-1 block">
                    {registerFormik.errors.confirmPassword}
                  </span>
                )}
            </div>
          </div>

          <button
            disabled={
              registerFormik.isSubmitting ||
              !registerFormik.dirty ||
              Object.entries(registerFormik.errors).length > 0
            }
            type="submit"
            className="w-full bg-gradient-to-r disabled:from-blue-400 disabled:to-indigo-400 disabled:cursor-not-allowed from-blue-500 to-indigo-500 text-white py-2 rounded-lg font-medium hover:opacity-90 transition cursor-pointer"
          >
            Register
          </button>
        </form>

        <div className="flex items-center justify-between gap-4">
          <hr className="flex-1 border-gray-300" />
          <span className="text-gray-400 text-sm">or continue with</span>
          <hr className="flex-1 border-gray-300" />
        </div>

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

        <p className="text-sm text-center text-gray-500">
          Already have an account?{" "}
          <Link to="/auth/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
