import { Delete } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";

interface Facility {
  facility: {
    _id: string;
    name: string;
    longtitude: number;
    latitude: number;
  };
}

export default function Facility({ facility }: Facility) {
  return (
    <>
      <Card>
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            placeItems: "center",
            placeContent: "center",
            aspectRatio: "2/1",
          }}
        >
          <Typography sx={{ fontSize: 24 }} color="text.secondary" gutterBottom>
            {facility.name}
          </Typography>
          <Box sx={{ my: 4 }}></Box>
          <Typography>Latitude</Typography>
          <Typography sx={{ fontSize: 24 }}>{facility.latitude}</Typography>
          <Typography>Longtitude</Typography>
          <Typography sx={{ fontSize: 24 }}>{facility.longtitude}</Typography>
        </CardContent>
        <CardActions sx={{ justifyContent: "space-between", height: "100%" }}>
          <Button size="small">Learn More</Button>
          <Button size="small">
            <Delete />
          </Button>
        </CardActions>
      </Card>
    </>
  );
}
