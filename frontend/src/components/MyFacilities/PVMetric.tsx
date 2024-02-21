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
    const handleResize = debounce((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        setChartDimensions({ width, height });
      }
    }, 100);

    const observer = new ResizeObserver((entries) => {
      handleResize(entries);
    });

    const container = chartContainer.current;
    if (container) {
      observer.observe(container);
    }

    return () => {
      if (container) {
        observer.unobserve(container);
      }
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
