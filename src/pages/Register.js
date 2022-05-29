import React, { useState } from "react";
import { auth, db } from "../firebase-config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection, doc} from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";

  function Register({ setIsAuth }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [fullname, setFullName] = useState("");
    const [surname, setSurname] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");

    const navigate = useNavigate();

    const registerWithEmailAndPassword = async (fullname, surname, email, password, phoneNumber) => {
        try {
          const res = await createUserWithEmailAndPassword(auth, email, password);
          const user = res.user;
          localStorage.setItem("isAuth", true);
          setIsAuth(true);
          navigate("/");
          await addDoc(collection(db, "users"), {
            uid: user.uid,
            fullname,
            surname,
            phoneNumber,
            authProvider: "local",
            email,
          });
        } catch (err) {
          console.error(err);
          alert(err.message);
        }
      };

    const register = () => {
      if (!fullname) alert("Please enter name");
      registerWithEmailAndPassword(fullname, surname, email, password, phoneNumber);
    };
    
    return (
      <div className="register">
        <div className="register__container">
          <input
            type="text"
            className="register__textBox"
            value={fullname}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Full Name"
          />
          <input
            type="text"
            className="register__textBox"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
            placeholder="Surname"
          />
          <input
            type="text"
            className="register__textBox"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="PhoneNumber"
          />
          <input
            type="text"
            className="register__textBox"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-mail Address"
          />
          <input
            type="password"
            className="register__textBox"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <button className="register__btn" onClick={register}>
            Register
          </button>
        </div>
      </div>
    );
  }
  export default Register;