import { Box, Card, CardContent, debounce } from "@mui/material";
import { LineChart } from "@mui/x-charts/LineChart";
import { useEffect, useRef, useState, memo, useMemo } from "react";

interface PVMetricProps {
  timestamp: string;
  activePowerKW: number;
  energyKWh: number;
}

export default memo(function PVMetric({
  pvMetrics,
}: {
  pvMetrics: PVMetricProps[];
}) {
  const [chartDimensions, setChartDimensions] = useState({
    width: 0,
    height: 0,
  });

  const chartContainer = useRef(null);

  useEffect(() => {
    const debouncedHandleResize = debounce(() => {
      const container = chartContainer.current;
      if (container) {
        setChartDimensions({
          width: container.clientWidth,
          height: container.clientHeight,
        });
      }
    }, 100);

    window.addEventListener("resize", debouncedHandleResize);

    debouncedHandleResize();

    return () => {
      window.removeEventListener("resize", debouncedHandleResize);
    };
  }, []);

  const data = useMemo(
    () =>
      pvMetrics.map((metric) => ({
        timestamp: new Date(parseInt(metric.timestamp)).toLocaleString(
          "default",
          {
            month: "long",
            day: "numeric",
            year: "numeric",
            hour: "numeric",
            minute: "numeric",
          }
        ),
        activePowerKW: metric.activePowerKW,
        energyKWh: metric.energyKWh,
      })),
    [pvMetrics]
  );

  const dates = useMemo(() => data.map((metric) => metric.timestamp), [data]);
  const activePowerKW = useMemo(
    () => data.map((metric) => metric.activePowerKW),
    [data]
  );
  const energyKWh = useMemo(
    () => data.map((metric) => metric.energyKWh),
    [data]
  );

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "100%",
        aspectRatio: "3/2",
      }}
      ref={chartContainer}
    >
      <Card sx={{ width: "100%", maxWidth: "100%", aspectRatio: "3/2" }}>
        <CardContent
          sx={{
            display: "flex",
            width: "100%",
            height: "100%",
          }}
        >
          <LineChart
            width={chartDimensions.width}
            height={chartDimensions.height}
            series={[
              {
                data: activePowerKW,
                label: "Real-time Power Output (kW)",
                yAxisKey: "leftAxisId",
              },
              {
                data: energyKWh,
                label: "Total Power Generated (kWh)",
                yAxisKey: "rightAxisId",
              },
            ]}
            xAxis={[{ scaleType: "point", data: dates }]}
            yAxis={[{ id: "leftAxisId" }, { id: "rightAxisId" }]}
            rightAxis="rightAxisId"
          />
        </CardContent>
      </Card>
    </Box>
  );
});
