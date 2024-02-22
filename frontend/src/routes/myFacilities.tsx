import { useQuery } from "@apollo/client";
import { MY_FACILITIES } from "../graphql/queries/facilities";
import { Button, Grid, Typography } from "@mui/material";
import Facility from "../components/MyFacilities/Facility";
import { Add } from "@mui/icons-material";
import CreateFacilityForm from "../components/MyFacilities/CreateEditFacilityForm";
import LoadingView from "../components/Shared/LoadingView";
import { useErrorHandler } from "../hook/useErrorHandler";
import { useDialog } from "../hook/useDialog";

export interface FacilityType {
  _id: string;
  name: string;
  longitude: number;
  latitude: number;
}

export default function MyFacilities() {
  const { openDialog } = useDialog();
  const { handleGraphQLError } = useErrorHandler();
  const { data, loading } = useQuery(MY_FACILITIES, {
    onError: (error) => {
      const message = handleGraphQLError(error);
      openDialog(message);
    },
  });

  const facilities = data?.myFacilities.map((facility: FacilityType) => {
    return (
      <Grid item key={facility._id} xs={12} sm={6} md={4}>
        <Facility key={facility._id} facility={facility} />
      </Grid>
    );
  });

  if (loading) {
    return <LoadingView />;
  }

  if (data?.myFacilities.length === 0) {
    return <>{EmptyMyFacilitiesView(openDialog)}</>;
  }

  return (
    <>
      <Grid container spacing={2}>
        {facilities}
        <Button
          variant="contained"
          size="large"
          onClick={() => {
            openDialog(<CreateFacilityForm />);
          }}
          sx={{
            position: "fixed",
            bottom: 20,
            right: 20,
          }}
        >
          Add <Add />
        </Button>
      </Grid>
    </>
  );
}

function EmptyMyFacilitiesView(openDialog: (content: JSX.Element) => void) {
  return (
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
  );
}
