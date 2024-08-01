import toast from "react-hot-toast";
import { userLogin, userRegister } from "../redux/features/auth/authActions";
import store from "../redux/store";

const handleLogin = (e, email, password, role) => {
  e.preventDefault();
  try {
    if (!role || !email || !password) {
      return toast.error("Please Privde All Feilds");
    }
    store.dispatch(userLogin({ email, password, role }));
  } catch (error) {
    console.log(error);
  }
};

const handleRegister = (
  e,
  name,
  role,
  email,
  password,
  phone,
  organisationName,
  address,
  hospitalName,
  website
) => {
  e.preventDefault();
  try {
    store.dispatch(
      userRegister({
        name,
        role,
        email,
        password,
        phone,
        organisationName,
        address,
        hospitalName,
        website,
      })
    );
  } catch (error) {
    console.log(error);
  }
};

export {handleRegister, handleLogin}