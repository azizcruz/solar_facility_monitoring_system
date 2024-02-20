import { Delete, Edit } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import { useContext } from "react";
import { DialogContext } from "../../context/dialog";
import { useMutation } from "@apollo/client";
import { DELETE_FACILITY } from "../../graphql/mutations/facilities";
import { MY_FACILITIES } from "../../graphql/queries/facilities";
import CreateEditFacilityForm from "./CreateEditFacilityForm";

interface FacilityProps {
  facility: {
    _id: string;
    name: string;
    longitude: number;
    latitude: number;
  };
}

export default function Facility({ facility }: FacilityProps) {
  const { openConfirmDialog, openDialog } = useContext(DialogContext);
  const [deleteFacility] = useMutation(DELETE_FACILITY);

  const handleDelete = () => {
    openConfirmDialog(
      <Typography>Are you sure you want to delete this facility?</Typography>,
      () => {
        deleteFacility({
          variables: { deleteFacilityId: facility._id },
          refetchQueries: [MY_FACILITIES],
        });
      }
    );
  };

  const handleEdit = () => {
    openDialog(<CreateEditFacilityForm facility={facility} />);
  };
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
          <Typography sx={{ fontSize: 24 }}>{facility.longitude}</Typography>
        </CardContent>
        <CardActions sx={{ justifyContent: "space-between", height: "100%" }}>
          <Button size="small">Learn More</Button>
          <Box>
            <Button size="small" onClick={handleEdit}>
              <Edit />
            </Button>
            <Button size="small" onClick={handleDelete} color="warning">
              <Delete />
            </Button>
          </Box>
        </CardActions>
      </Card>
    </>
  );
}
