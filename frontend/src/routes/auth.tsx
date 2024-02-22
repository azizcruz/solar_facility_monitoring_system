import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";

import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Logo from "../components/Logo";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useMutation } from "@apollo/client";
import { LOGIN, REGISTER } from "../graphql/mutations/user";
import { useAuth } from "../hook/useAuth";
import { useCallback, useContext, useEffect, useState } from "react";
import { DialogContext } from "../context/dialog";
import { CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useErrorHandler } from "../hook/useErrorHandler";

type Form = {
  email: string;
  password: string;
};

const formSchema = yup
  .object()
  .shape({
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup.string().required("Password is required").min(4, "Too short"),
  })
  .required();

function SignUp() {
  const { login, token } = useAuth();
  const { openDialog } = useContext(DialogContext);
  const { handleGraphQLError } = useErrorHandler();
  const navigate = useNavigate();
  const memoizedNavigate = useCallback(
    () => navigate("/dashboard", { replace: true }),
    [navigate]
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(formSchema),
    mode: "onBlur",
  });

  const [submitRegister, { loading }] = useMutation(REGISTER, {
    onCompleted: (data) => {
      login(data.createUser.token);
      reset();
    },
    onError: (error) => {
      openDialog(handleGraphQLError(error));
    },
  });

  const onSubmit: SubmitHandler<Form> = (data) => {
    submitRegister({
      variables: {
        input: data,
      },
    });
  };

  useEffect(() => {
    if (token) {
      memoizedNavigate;
    }
  }, [token, memoizedNavigate]);

  if (loading) return <CircularProgress color="secondary" />;

  return (
    <>
      <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign up
      </Typography>
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          autoComplete="email"
          autoFocus
          {...register("email")}
          error={!!errors.email}
          helperText={errors.email?.message as string}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          {...register("password")}
          error={!!errors.password}
          helperText={errors.password?.message as string}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign In
        </Button>
      </Box>
    </>
  );
}

function SignIn() {
  const { login, token } = useAuth();
  const { openDialog } = useContext(DialogContext);
  const { handleGraphQLError } = useErrorHandler();

  const navigate = useNavigate();
  const memoizedNavigate = useCallback(
    () => navigate("/dashboard", { replace: true }),
    [navigate]
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(formSchema),
    mode: "onBlur",
  });

  const [submitSignIn, { loading }] = useMutation(LOGIN, {
    onCompleted: (data) => {
      login(data.userLogin.token);
      reset();
    },
    onError: (error) => {
      openDialog(handleGraphQLError(error));
    },
  });

  const onSubmit: SubmitHandler<Form> = (data) => {
    submitSignIn({
      variables: {
        input: data,
      },
    });
  };

  useEffect(() => {
    if (token) {
      memoizedNavigate();
    }
  }, [token, memoizedNavigate]);

  if (loading) return <CircularProgress color="primary" />;

  return (
    <>
      <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign in
      </Typography>
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          autoComplete="email"
          autoFocus
          {...register("email")}
          error={!!errors.email}
          helperText={errors.email?.message as string}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          {...register("password")}
          error={!!errors.password}
          helperText={errors.password?.message as string}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign In
        </Button>
      </Box>
    </>
  );
}

export default function Auth() {
  const [authType, setAuthType] = useState<"login" | "register">("login");

  return (
    <>
      <Container component="main" maxWidth="xs" sx={{ pt: 1 }}>
        <Logo />
        <Box
          sx={{
            marginTop: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <CssBaseline />
          {authType === "login" ? <SignIn /> : <SignUp />}
        </Box>

        <Grid container>
          <Grid item>
            {authType === "login" ? (
              <Link
                href="#"
                variant="body2"
                onClick={() => setAuthType("register")}
              >
                {"Don't have an account? Sign Up"}
              </Link>
            ) : (
              <Link
                href="#"
                variant="body2"
                onClick={() => setAuthType("login")}
              >
                {"You already have an account? Sign in"}
              </Link>
            )}
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
