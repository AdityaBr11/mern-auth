import {
  LOGIN_REQUEST,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
  
} from "./actionType";
import axios from "axios";
import Cookies from "universal-cookie";


const cookie = new Cookies();

export const loginUser = (payload) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });
    const { data } = await axios.post(`https://hungry-elk-underwear.cyclic.app/user/login`, payload);
    console.log(data, "login data");

    dispatch({ type: LOGIN_SUCCESS, payload: data.msg });
    let token = data.token;
    cookie.set("token", token, { maxAge: 900 });
  } catch (error) {
    dispatch({ type: LOGIN_FAIL, payload: error.response.data.msg });
  }
};

export const loadUser = () => async (dispatch) => {
    try {
      dispatch({ type: LOAD_USER_REQUEST });
  
      const { data } = await axios.get(`https://hungry-elk-underwear.cyclic.app/user/me`, {
        headers: {
          authorization: cookie.get("token"),
        },
      });
  
      dispatch({ type: LOAD_USER_SUCCESS, payload: data.user });
    } catch (error) {
      dispatch({ type: LOAD_USER_FAIL, payload: error.response.data.message });
    }
  };
