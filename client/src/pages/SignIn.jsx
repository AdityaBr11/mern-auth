import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

import { useForm } from "react-hook-form";
import ic from "../assets/ic_user.png";
import { makeStyles } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { loadUser, loginUser } from "../Redux/user/action";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const theme = createTheme();

const useStyles = makeStyles((them) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  input: {},
}));

function SignIn() {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const { error, loading, isAuthenticated, login } = useSelector(
    (store) => store.user
  );

  useEffect(() => {
    if (login == false) {
      toast.error(error, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    if (login == true) {
      toast.success("Login Success", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setTimeout(() => {
        nav("/user");
      }, 2000);
    }
  }, [error, login]);
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const loginform = (data) => {
    console.log(data);
    dispatch(loginUser(data));
  };
  return (
    <ThemeProvider theme={theme}>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Container
        component="main"
        maxWidth="xs"
        className="px-4 md:px-0 border-red-600 "
      >
        <Box
          sx={{
            marginTop: 5,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar className="w-[150px] h-[150px] md:w-[200px] md:h-[200px] bg-[#EFEFEF]">
            <img src={ic} alt="person" />
          </Avatar>
          <Typography className="pt-4 text-[48px] font-bold text-[#0B3558] tracking-wide">
            Welcome!
          </Typography>
          <div className="text-center text-[20px] text-[#0b3558e5]">
            <p>Let's connect to your workspace.</p>
            <p> Please enter your email to continue.</p>
          </div>
          <Box
            component="form"
            onSubmit={handleSubmit(loginform)}
            noValidate
            sx={{ mt: 1 }}
            className={`text-[#A2A2A2] ${classes.root}`}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              label="Email Address"
              className="bg-white"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email",
                },
              })}
              error={errors?.email}
            />
            <p className=" text-[#db5452] text-xs">{errors?.email?.message}</p>
            <TextField
              className={classes.input}
              margin="normal"
              required
              fullWidth
              label="Password"
              error={errors?.password}
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be more than 8 Character",
                },
              })}
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              InputProps={{
                endAdornment: (
                  <InputAdornment
                    position="end"
                    className=" cursor-pointer"
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }
                  >
                    {showPassword ? (
                      <VisibilityOutlinedIcon className="text-black" />
                    ) : (
                      <VisibilityOffOutlinedIcon className="text-black" />
                    )}
                  </InputAdornment>
                ),
              }}
            />
            <p className="text-xs text-[#db5452]">
              {errors?.password?.message}
            </p>
            <div className="w-full">
              <Box className="text-end text-[18px] font-semibold text-[#003FB9]">
                <p>Forgot password?</p>
              </Box>
            </div>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 2, mb: 2 }}
              size="large"
              className="bg-[#003FB9] hover:bg-[#072e7a] capitalize"
            >
              {loading ? (
                <span
                  className="spinner-border text-light"
                  role="status"
                  aria-hidden="true"
                ></span>
              ) : (
                "Sign In"
              )}
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default SignIn;
