import { Add, ArrowBack } from "@mui/icons-material";
import { Button, Divider, Grid, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import PVMetric from "../components/MyFacilities/PVMetric";
import UploadMetricsForm from "../components/MyFacilities/UploadMetricsForm";

import { useQuery } from "@apollo/client";
import { GET_FACILITY } from "../graphql/queries/facilities";
import LoadingView from "../components/Shared/LoadingView";
import { useErrorHandler } from "../hook/useErrorHandler";
import { useDialog } from "../hook/useDialog";

export default function FacilityDetails() {
  const { openDialog } = useDialog();
  const navigate = useNavigate();
  const { handleGraphQLError } = useErrorHandler();
  const params = useParams();
  const { data, loading } = useQuery(GET_FACILITY, {
    variables: {
      facilityId: params.id,
    },
    onError: (error) => {
      const message = handleGraphQLError(error);
      openDialog(message);
    },
  });

  if (loading) {
    return <LoadingView />;
  }

  return (
    <>
      {BackButton(navigate)}
      <Divider sx={{ my: 2 }} />
      {data?.facility?.pv_metrics.length === 0 ? (
        EmptyPVMetricsView(openDialog, params)
      ) : (
        <Grid container>
          <PVMetric pvMetrics={data.facility.pv_metrics} />
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
