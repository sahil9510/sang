import React, { useContext, useState } from "react";

import Form from "./Form";
import styles from "./LoginPage.module.css";

import Modal from '../UI/Modal';
import {AuthContext} from '../../context/auth-context';
import LoadingSpinner from '../UI/LoadingSpinner';
let errorText;

const LoginPage = () => {
  const ctx = useContext(AuthContext);
  const [showModal, changeShowModal] = useState(false);
  const [loginMode, setLoginMode] = useState(true);
  const [isLoading, setIsLoading]= useState(false);

  console.log(ctx.isLoggedIn);
  const openModal = () => {
    changeShowModal(true);
  };
  const closeModal = () => {
    changeShowModal(false);
  };

  const onSubmitHandler = async (user) => {
    setIsLoading(true);
    if (loginMode) {
      try {
        const result = await fetch("http://localhost:5000/api/login", {
          method: "POST",
          body: JSON.stringify(user),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await result.json();
        if (!result.ok) {
          console.log(data);
          throw new Error(data.message);
        }
        ctx.login(data);
        console.log(data);
      } catch (err) {
        errorText=err.message;
        openModal();
        console.log(err);
      }
    } else {
      try {
        const result = await fetch("http://localhost:5000/api/register", {
          method: "POST",
          body: JSON.stringify(user),
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await result.json();
        if (!result.ok) {
            console.log(data);
            throw new Error(data.message);
        }
        console.log(data);
        ctx.login(data);
      } catch (err) {
        errorText=err.message;
        openModal();
        console.log(err);
      }
    }
    setIsLoading(false);
  };

  const switchHandler = () => {
    setLoginMode((prevMode) => !prevMode);
  };
  return (
    <React.Fragment>
      {showModal && <Modal closeModal={closeModal} message={errorText}/>}
      <div className={`${styles.formBox}`}>
      {isLoading && (<div className={styles.loader}>
        <LoadingSpinner />
        </div>)}
        <h1 className={styles.heading}>{loginMode ? "Sign In" : "Sign Up"}</h1>
        <Form submitHandler={onSubmitHandler} loginMode={loginMode} />
        <button onClick={switchHandler} className={`${styles.switch}`}>
          {loginMode ? "Sign Up" : "Sign In"}
        </button>
      </div>
    </React.Fragment>
  );
};

export default LoginPage;
