import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../App.css";
import { loadUser } from "../Redux/user/action";
import { Button } from "@mui/material";
import { LOGOUT_USER } from "../Redux/user/actionType";

const User = () => {
  const dispatch = useDispatch();
  const { user, isloading } = useSelector((store) => store.user);

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  return (
    <>
      <div className="h-[73vh] w-[100%]">
        <div className="pt-36 flex justify-center items-center">
          {isloading ? (
            <div className=" text-8xl font-black flex justify-center items-center text-[#003FB9] gap-2">
              <div className="">.</div>
              <div className="">.</div>
              <div className="animate-bounce">.</div>
            </div>
          ) : (
            <p className="text-6xl text-center font-serif">
              Welcome {user?.name}
            </p>
          )}
        </div>
        <div className=" block text-center mt-10">
          <Button
            variant="outlined"
            size="large"
            onClick={() => {
              dispatch({ type: LOGOUT_USER })
            }}
          >
            Logout
          </Button>
        </div>
      </div>
    </>
  );
};

export default User;
