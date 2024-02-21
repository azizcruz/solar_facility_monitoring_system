import { CircularProgress, Grid } from "@mui/material";

export default function LoadingView({ height = "80vh" }: { height?: string }) {
  return (
    <Grid
      container
      alignItems={"center"}
      spacing={2}
      justifyContent={"center"}
      direction={"column"}
      height={height}
    >
      <Grid item>
        <CircularProgress />
      </Grid>
    </Grid>
  );
}
