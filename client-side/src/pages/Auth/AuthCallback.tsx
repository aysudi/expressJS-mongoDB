import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { enqueueSnackbar } from "notistack";
import { jwtDecode } from "jwt-decode";

const AuthCallback = () => {
  const navigate = useNavigate();
  const { token } = useParams();
  useEffect(() => {
    if (token) {
      try {
        const decoded: {
          role: string;
          email: string;
          fullName: string;
          profileImage: string;
          id: string;
          iat: number;
          exp: number;
        } = jwtDecode(token);

        localStorage.setItem("token", JSON.stringify(token));
        enqueueSnackbar("Login successful", {
          variant: "success",
          autoHideDuration: 2000,
          anchorOrigin: {
            horizontal: "right",
            vertical: "bottom",
          },
        });

        // Redirect based on role
        if (decoded.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/books");
        }
      } catch (err) {
        console.log("error: ", err);
        enqueueSnackbar("Invalid token", {
          variant: "error",
          autoHideDuration: 2000,
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "right",
          },
        });
        navigate("/auth/login");
      }
    } else {
      enqueueSnackbar("Token not found", {
        variant: "error",
        autoHideDuration: 2000,
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "right",
        },
      });
      navigate("/auth/login");
    }
  }, [navigate, token]);

  return <div className="text-center mt-10 text-gray-600">Redirecting...</div>;
};

export default AuthCallback;
