import { Box, Card, CardContent, Typography, debounce } from "@mui/material";
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

  const data: {
    timestamp: string[];
    activePowerKW: number[];
    energyKWh: number[];
  } = useMemo(() => {
    const timestamp = [];
    const activePowerKW = [];
    const energyKWh = [];
    pvMetrics.forEach((metric) => {
      timestamp.push(
        new Date(parseInt(metric.timestamp)).toLocaleString("default", {
          month: "long",
          day: "numeric",
          year: "numeric",
          hour: "numeric",
          minute: "numeric",
        })
      );
      activePowerKW.push(metric.activePowerKW);
      energyKWh.push(metric.energyKWh);
    });
    return { timestamp, activePowerKW, energyKWh };
  }, [pvMetrics]);

  const timestampFrom = data.timestamp[0].replace("\n", "");
  const timestampTo = data.timestamp.at(-1).replace("\n", "");

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
            flexDirection: "column",
            placeItems: "center",
            width: "100%",
            height: "100%",
          }}
        >
          <Typography sx={{ fontSize: { xs: 12, sm: 14, fontWeight: "bold" } }}>
            {timestampFrom}

            <Typography
              component="span"
              sx={{ fontWeight: "bold", fontSize: { xs: 12, sm: 14 }, mx: 1 }}
            >
              to
            </Typography>
            {timestampTo}
          </Typography>
          <LineChart
            width={chartDimensions.width}
            height={chartDimensions.height}
            series={[
              {
                data: data.activePowerKW,
                label: "Real-time Power Output (kW)",
                yAxisKey: "leftAxisId",
              },
              {
                data: data.energyKWh,
                label: "Total Power Generated (kWh)",
                yAxisKey: "rightAxisId",
              },
            ]}
            xAxis={[{ scaleType: "point", data: data.timestamp }]}
            yAxis={[{ id: "leftAxisId" }, { id: "rightAxisId" }]}
            rightAxis="rightAxisId"
          />
        </CardContent>
      </Card>
    </Box>
  );
});
