import React, { useContext, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./Auth.module.css";
import { DataContext } from "../../COMPONENT/DataProvider/DataProvider.jsx";
import ClipLoader from "react-spinners/ClipLoader";

// ← Updated imports for Firebase v9 modular
import { auth } from "../../Utility/Firebase"; // your updated firebase.js file
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [error, setError] = useState(null);
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);

  const [state, dispatch] = useContext(DataContext);
  const navigate = useNavigate();
  const location = useLocation();

  const redirectPath = location.state?.from || "/";
  const redirectMessage = location.state?.message || null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (isSignUp && password !== rePassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      let userCredential;

      if (isSignUp) {
        // ← Updated: modular syntax
        userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password,
        );

        // ← Updated: updateProfile is now a separate function
        await updateProfile(userCredential.user, { displayName: name });
      } else {
        // ← Updated: modular syntax
        userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password,
        );
      }

      dispatch({ type: "SET_USER", payload: userCredential.user });

      // Redirect to original page after login/signup
      navigate(redirectPath, { replace: true });

      setEmail("");
      setPassword("");
      setName("");
      setRePassword("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.auth}>
      <img
        className={styles.logo}
        src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"
        alt="Amazon Logo"
      />

      <div className={styles.authBox}>
        <h1>{isSignUp ? "Create account" : "Sign in"}</h1>

        {/* Show redirect message */}
        {redirectMessage && (
          <p className={styles.redirectMsg}>{redirectMessage}</p>
        )}

        <form onSubmit={handleSubmit}>
          {isSignUp && (
            <>
              <label>Your name</label>
              <input
                type="text"
                placeholder="First and last name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </>
          )}

          <label>Email</label>
          <input
            type="email"
            placeholder="temesgen@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {isSignUp && (
            <>
              <label>Re-enter password</label>
              <input
                type="password"
                placeholder="Re-enter password"
                value={rePassword}
                onChange={(e) => setRePassword(e.target.value)}
                required
              />
            </>
          )}

          {error && <p className={styles.errorText}>{error}</p>}

          <button
            type="submit"
            className={styles.primaryBtn}
            disabled={loading}
          >
            {loading ? (
              <ClipLoader size={24} color="#fff" />
            ) : isSignUp ? (
              "Sign Up"
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        <button
          type="button"
          className={styles.secondaryBtn}
          onClick={() => setIsSignUp(!isSignUp)}
        >
          {isSignUp ? "Sign In" : "Create your Amazon account"}
        </button>
      </div>
    </div>
  );
};

export default Auth;
