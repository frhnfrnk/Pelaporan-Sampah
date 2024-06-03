// models/Location.ts
import mongoose, { Document, Model, Schema } from "mongoose";

export interface ILocation extends Document {
  name: string;
  latitude: string;
  longitude: string;
}

const LocationSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  latitude: {
    type: String,
    required: true,
  },
  longitude: {
    type: String,
    required: true,
  },
});

const Location: Model<ILocation> =
  mongoose.models.Location ||
  mongoose.model<ILocation>("Location", LocationSchema);

export default Location;
