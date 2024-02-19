import { Container, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function ErrorPage() {
  return (
    <>
      <Container
        maxWidth="xs"
        sx={{
          display: "flex",
          flexDirection: "column",
          placeContent: "center",
          height: "100vh",
        }}
      >
        <Typography variant="h1">Error</Typography>
        <Typography variant="h4">Something went wrong</Typography>
        <Link to="/">
          <Typography variant="body1">Go back</Typography>
        </Link>
      </Container>
    </>
  );
}
