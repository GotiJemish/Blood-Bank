

import React from "react";
import Form from "../../components/shared/Form/Form";
import { useSelector } from "react-redux";
import Loader from "./../../components/shared/Loader";
import toast from 'react-hot-toast';

const Login = () => {
  const { loading, error } = useSelector((state) => state.auth);
  return (
    <>
      {error && toast.error(error)}
      {loading ? (
        <Loader />
      ) : (
            <Form
              formTitle={"Login"}
              submitBtn={"Login"}
              formType={"login"}
            />
      )}
    </>
  );
};

export default Login;

