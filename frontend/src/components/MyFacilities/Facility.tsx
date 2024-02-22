import { Delete, Edit } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";

import { useMutation } from "@apollo/client";
import { DELETE_FACILITY } from "../../graphql/mutations/facilities";
import { MY_FACILITIES } from "../../graphql/queries/facilities";
import CreateEditFacilityForm from "./CreateEditFacilityForm";
import { useNavigate } from "react-router-dom";
import { useDialog } from "../../hook/useDialog";

interface FacilityProps {
  facility: {
    _id: string;
    name: string;
    longitude: number;
    latitude: number;
  };
}

export default function Facility({ facility }: FacilityProps) {
  const { openConfirmDialog, openDialog } = useDialog();
  const [deleteFacility] = useMutation(DELETE_FACILITY);
  const navigate = useNavigate();

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
          }}
        >
          <Typography sx={{ fontSize: 28 }} variant="h3">
            {facility.name}
          </Typography>
          <Box sx={{ my: 2 }}></Box>
          <Typography>Latitude</Typography>
          <Typography sx={{ fontSize: 24 }}>{facility.latitude}</Typography>
          <Typography>Longtitude</Typography>
          <Typography sx={{ fontSize: 24 }}>{facility.longitude}</Typography>
        </CardContent>
        <CardActions sx={{ justifyContent: "space-between", height: "100%" }}>
          <Button
            size="small"
            onClick={() =>
              navigate(`/dashboard/facility-details/${facility._id}`)
            }
          >
            Learn More
          </Button>
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
