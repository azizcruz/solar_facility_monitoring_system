import fs from "fs";
import csv from "csv-parser";
import { PvMetric, PvMetricsDocument } from "../models/pvmetrics.js";

interface CSVData {
  activePowerKW: string;
  energyKWh: string;
  timestamp: string;
  facility: string;
}

export async function extractMetricsAndAssignToFacility(
  stream,
  fascilityId
): Promise<PvMetricsDocument[]> {
  let results: PvMetricsDocument[] = [];

  return new Promise((resolve, reject) => {
    stream
      .pipe(csv())
      .on("data", (row) => {
        if (!row.active_power_kW || !row.energy_kWh || !row.timestamp) {
          throw new Error("Invalid CSV data");
        }

        results = [
          ...results,
          new PvMetric({
            activePowerKW: Number(row.active_power_kW),
            energyKWh: Number(row.energy_kWh),
            facility: fascilityId,
            timestamp: row.timestamp,
          }),
        ];
      })
      .on("end", () => {
        resolve(results);
      })
      .on("error", (error) => {
        reject(error);
      });
  });
}

function parseCSVData(data: CSVData): PvMetricsDocument {
  const pvMetrics: PvMetricsDocument = new PvMetric({
    activePowerKW: Number(data.activePowerKW),
    energyKWh: Number(data.energyKWh),
    facility: data.facility,
    timestamp: data.timestamp,
  });
  return pvMetrics;
}
