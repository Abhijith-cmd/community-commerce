import mongoose, { Document, Schema } from 'mongoose';
 
interface Highlight extends Document {
  abbreviation: string;
  country_name:string,
  highlights: {
    title: string;
    description: string;
    date: string;
    link: string;
  }[];
}
 
const HighlightSchema = new Schema<Highlight>({
  abbreviation: { type: String, required: true },
  country_name: {type:String, required:true},
 
  highlights: [
    {
      title: { type: String, required: true },
      description: { type: String, required: true },
      date: { type: String, required: true },
      link: { type: String, required: true },
    },
  ],
});
 
const HighlightModel = mongoose.models.Highlight || mongoose.model<Highlight>('Highlight', HighlightSchema);
 
export default HighlightModel;