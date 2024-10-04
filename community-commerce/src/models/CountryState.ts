import mongoose, { Schema, Document } from 'mongoose';

interface ICountryState extends Document {
  country: string;
  states: string[];
}

const CountryStateSchema: Schema = new Schema({
  country: { type: String, required: true },
  states: { type: [String], required: true }
});

export default mongoose.models.CountryState || mongoose.model<ICountryState>('CountryState', CountryStateSchema);
