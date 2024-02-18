import mongoose, { Schema } from "mongoose";

export interface FacilityDocument extends mongoose.Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  latitude: number;
  longitude: number;
  user: string;
  pv_metrics: string[];
}

const facilitySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    latitude: {
      type: Number,
      required: true,
    },
    longitude: {
      type: Number,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    pv_metrics: {
      type: [Schema.Types.ObjectId],
      ref: "PvMetric",
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

export const Facility = mongoose.model<FacilityDocument>(
  "Facility",
  facilitySchema
);
