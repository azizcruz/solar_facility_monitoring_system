import { useQuery } from "@apollo/client";
import { MY_FACILITIES } from "../graphql/queries/facilities";
import { Box, Button, CircularProgress, Grid, Typography } from "@mui/material";
import Facility from "../components/MyFacilities/Facility";
import { Add } from "@mui/icons-material";
import { DialogContext } from "../context/dialog";
import { useContext } from "react";
import CreateFacilityForm from "../components/MyFacilities/CreateFacilityForm";
import { handleGraphQLError } from "../utils.ts/handleGraphQLError";

export default function MyFacilities() {
  const { openDialog } = useContext(DialogContext);
  const { data, loading } = useQuery(MY_FACILITIES, {
    onError: (error) => {
      openDialog(handleGraphQLError(error));
    },
  });

  if (loading) {
    return (
      <>
        <Box sx={{ display: "flex", placeContent: "center" }}>
          <CircularProgress />
        </Box>
      </>
    );
  }

  if (data?.myFacilities.length === 0) {
    return (
      <>
        <Grid
          container
          alignItems={"center"}
          spacing={2}
          justifyContent={"center"}
          direction={"column"}
          height={"80vh"}
        >
          <Grid item>
            <Typography variant="h4">No facilities found</Typography>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              size="large"
              onClick={() => {
                openDialog(<CreateFacilityForm />);
              }}
            >
              Add <Add />
            </Button>
          </Grid>
        </Grid>
      </>
    );
  }

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6} lg={4}>
          <Facility
            facility={{
              name: "Facility 1",
              latitude: 0,
              longtitude: 0,
              _id: "",
            }}
          />
        </Grid>
      </Grid>
    </>
  );
}
