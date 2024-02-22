import { Add, ArrowBack } from "@mui/icons-material";
import { Box, Button, Divider, Grid, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import PVMetric from "../components/MyFacilities/PVMetric";
import UploadMetricsForm from "../components/MyFacilities/UploadMetricsForm";

import { useQuery } from "@apollo/client";
import { GET_FACILITY } from "../graphql/queries/facilities";
import LoadingView from "../components/Shared/LoadingView";
import { useErrorHandler } from "../hook/useErrorHandler";
import { useDialog } from "../hook/useDialog";
import { chunk } from "lodash";
import { useEffect, useState } from "react";

export default function FacilityDetails() {
  const { openDialog } = useDialog();
  const navigate = useNavigate();
  const { handleGraphQLError } = useErrorHandler();
  const params = useParams();
  const [chunkedData, setChunkedData] = useState([]);
  const [currentChunkIndex, setCurrentChunkIndex] = useState(0);
  const { data, loading } = useQuery(GET_FACILITY, {
    variables: {
      facilityId: params.id,
    },
    onError: (error) => {
      const message = handleGraphQLError(error);
      openDialog(message);
    },
  });

  useEffect(() => {
    if (data) {
      makeChunks(data.facility.pv_metrics);
    }
  }, [data]);

  function makeChunks(data, size = 25) {
    const chunks = chunk(data, size);
    setChunkedData(chunks);
  }

  if (loading) {
    return <LoadingView />;
  }

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          placeItems: "center",
        }}
      >
        <BackButton navigate={navigate} />
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
          {chunkedData?.length > 0 &&
            chunkedData.map((_chunk, index) => {
              return (
                <Button
                  key={index}
                  variant={
                    index === currentChunkIndex ? "contained" : "outlined"
                  }
                  onClick={() => setCurrentChunkIndex(index)}
                  sx={{
                    width: "20px",
                    height: "20px",
                    display: "flex",
                    placeItems: "center",
                  }}
                >
                  {index + 1}
                </Button>
              );
            })}
        </Box>

        {chunkedData?.length === 0 ? (
          <Button
            variant="contained"
            onClick={() => makeChunks(data.facility.pv_metrics)}
            size="small"
            disabled={data.facility.pv_metrics.length === 0}
          >
            Zoom In
          </Button>
        ) : (
          <Button
            variant="contained"
            onClick={() => setChunkedData([])}
            size="small"
            disabled={data.facility.pv_metrics.length === 0}
          >
            Zoom out
          </Button>
        )}
      </Box>
      <Divider sx={{ my: 2 }} />
      {data?.facility?.pv_metrics.length === 0 ? (
        EmptyPVMetricsView(openDialog, params)
      ) : (
        <Grid container>
          <PVMetric
            pvMetrics={
              chunkedData[currentChunkIndex] || data.facility.pv_metrics
            }
          />
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
function BackButton({ navigate }) {
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
