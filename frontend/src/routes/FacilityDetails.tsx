import { Add, ArrowBack } from "@mui/icons-material";
import { Button, Divider, Grid, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import PVMetric from "../components/MyFacilities/PVMetric";
import { client } from "../plugins/apolloClient";
import { MY_FACILITIES } from "../graphql/queries/facilities";
import UploadMetricsForm from "../components/MyFacilities/UploadMetricsForm";
import { DialogContext } from "../context/dialog";
import { useContext } from "react";

export default function FacilityDetails() {
  const { openDialog } = useContext(DialogContext);
  const navigate = useNavigate();
  const params = useParams();
  const data = client.readQuery({
    query: MY_FACILITIES,
    variables: {
      id: params.id,
    },
  });

  return (
    <>
      {BackButton(navigate)}
      <Divider sx={{ my: 2 }} />
      {data.myFacilities.length ? (
        EmptyPVMetricsView(openDialog, params)
      ) : (
        <Grid container>
          <PVMetric />
        </Grid>
      )}
    </>
  );
}

function EmptyPVMetricsView(
  openDialog: (content: JSX.Element) => void,
  params
) {
  return (
    <Grid
      container
      alignItems={"center"}
      spacing={2}
      justifyContent={"center"}
      direction={"column"}
      height={"70vh"}
    >
      <Grid item>
        <Typography variant="h4">No PV Metrics found</Typography>
      </Grid>
      <Grid item>
        <Button
          variant="contained"
          size="large"
          onClick={() => {
            openDialog(<UploadMetricsForm facilityId={params.id} />);
          }}
        >
          Add Metrics <Add />
        </Button>
      </Grid>
    </Grid>
  );
}

// TODO: this should be a component
function BackButton(navigate) {
  return (
    <Button onClick={() => navigate(-1)}>
      <ArrowBack />
    </Button>
  );
}
