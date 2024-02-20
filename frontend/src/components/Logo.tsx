import { SolarPower } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";

export default function Logo({ size = 42 }: { size?: number }) {
  return (
    <>
      <Box
        sx={{
          padding: 8,
          display: "flex",
          placeContent: "center",
          placeItems: "center",
          backgroundColor: "primary.main",
          color: "white",
        }}
      >
        <Typography
          sx={{ fontSize: { xs: size / 2, sm: size / 1.5, lg: size } }}
        >
          Ampereground
        </Typography>
        <SolarPower sx={{ fontSize: size, ml: 1 }} />
      </Box>
    </>
  );
}
