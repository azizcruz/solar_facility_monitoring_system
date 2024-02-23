import { ArrowBack } from "@mui/icons-material";
import { Box, Button } from "@mui/material";

export function BackButton({ navigate }) {
  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Button onClick={() => navigate(-1)}>
          <ArrowBack />
        </Button>
      </Box>
    </>
  );
}
