import React, { useState } from "react";
import { auth, provider } from "../firebase-config";
import { signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";

function Login({ setIsAuth }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

  let navigate = useNavigate();

  const logInWithEmailAndPassword = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      localStorage.setItem("isAuth", true);
      setIsAuth(true);
      navigate("/");
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider).then((result) => {
      localStorage.setItem("isAuth", true);
      setIsAuth(true);
      navigate("/");
    });
  };

  return (
    <div className="loginPage">
        <div className="login__container">
            <input
            type="text"
            className="login__textBox"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-mail Address"
            />
            <input
            type="password"
            className="login__textBox"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            />
            <button
            className="login__btn"
            type="submit"
            onClick={() => logInWithEmailAndPassword(email, password)}
            >
            Login
            </button>

        </div>
       <p>Sign In With Google to Continue</p>
      <button className="login-with-google-btn" onClick={signInWithGoogle}>
        Sign in with Google
      </button>

        <div>
          <Link to="/reset">Forgot Password</Link>
        </div>
        <div>
          Don't have an account? <Link to="/register">Register</Link> now.
        </div>
    </div>
  );
}

export default Login;