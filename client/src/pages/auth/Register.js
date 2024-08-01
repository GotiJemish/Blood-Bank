import React from "react";
import Form from "../../components/shared/Form/Form";
import { useSelector } from "react-redux";
import Loader from "./../../components/shared/Loader";
import toast from 'react-hot-toast';

const Register = () => {
  const { loading, error } = useSelector((state) => state.auth);
  return (
    <>
      {error && <span>{toast.error(error)}</span>}
      {loading ? (
        <Loader />
      ) : (
       
            <Form
              formTitle={"Register"}
              submitBtn={"Register"}
              formType={"register"}
            />
        
      )}
    </>
  );
};

export default Register;
