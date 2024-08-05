import React from "react";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { useDispatch } from "react-redux";
import { signInSuccess, signInFailure } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";
import { app } from "../firebase";

const OAuth = () => {
  const dispatch = useDispatch();
  const navigate=useNavigate();

  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);

      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        dispatch(signInSuccess(data));
        navigate("/");
      } else {
        dispatch(signInFailure(data.message || "Google sign-in failed"));
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
      console.error("Could not sign in with Google", error);
    }
  };

  return (
    <div>
      <button
        className="p-3 text-white uppercase bg-red-700 rounded-lg hover:opacity-95"
        type="button"
        onClick={handleGoogleClick}
      >
        Continue With Google
      </button>
    </div>
  );
};

export default OAuth;
