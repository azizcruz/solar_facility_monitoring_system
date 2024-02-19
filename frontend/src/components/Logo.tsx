import { SolarPower } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";

export default function Logo() {
  return (
    <>
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          placeContent: "center",
          placeItems: "center",
        }}
      >
        <Typography component="h1" variant="h3">
          Ampereground
        </Typography>
        <SolarPower sx={{ fontSize: 42, ml: 1 }} />
      </Box>
    </>
  );
}
