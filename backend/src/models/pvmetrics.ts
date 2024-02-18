import mongoose, { Schema } from "mongoose";

export interface PvMetricsDocument extends mongoose.Document {
  _id: mongoose.Types.ObjectId;
  activePowerKW: number;
  energyKWh: number;
  facility: string;
  timestamp: Date;
}

const pvmetricsSchema = new Schema({
  activePowerKW: {
    type: Number,
    required: true,
  },
  energyKWh: {
    type: Number,
    required: true,
  },
  facility: {
    type: Schema.Types.ObjectId,
    ref: "Facility",
    required: true,
  },
  timestamp: {
    type: Date,
    required: true,
  },
});

export const PvMetric = mongoose.model<PvMetricsDocument>(
  "PvMetric",
  pvmetricsSchema
);
