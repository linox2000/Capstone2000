import { useState } from "react";

import FormInput from "../form-inpt/form-inpt.component";
import Button from "../button/button.component";

import "./sign-up-form.style.scss";

import {
  createUserAuthWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassowrd: "",
};

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassowrd } = formFields;

  //   console.log(formFields);
  const resetFormField = () => {
    setFormFields(defaultFormFields);
  };
  const handlerChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handlerSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassowrd) {
      alert("password do not match");
      return;
    }
    try {
      const { user } = await createUserAuthWithEmailAndPassword(
        email,
        password
      );
      await createUserDocumentFromAuth(user, { displayName });
      resetFormField();
    } catch (error) {
      if (error.code === "auth/email-already-in-use")
        alert("cannot create user already in use");
      else if (error.code === "auth/weak-password")
        alert("Password should be at least 6 characters ");
      console.log("user creation encountered an error", error);
    }
  };

  return (
    <div className="sign-up-container">
      <h2>Don't have an account ?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handlerSubmit}>
        <FormInput
          label="Display Name"
          type="text"
          required
          onChange={handlerChange}
          name="displayName"
          value={displayName}
        />

        <FormInput
          label="Email"
          type="email"
          required
          onChange={handlerChange}
          name="email"
          value={email}
        />

        <FormInput
          label="Password"
          type="password"
          required
          onChange={handlerChange}
          name="password"
          value={password}
        />

        <FormInput
          label="Confirm Password"
          type="password"
          required
          onChange={handlerChange}
          name="confirmPassowrd"
          value={confirmPassowrd}
        />

        <Button  type="submit">Sign Up</Button>
      </form>
    </div>
  );
};

export default SignUpForm;
