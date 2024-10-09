import mongoose, { Document, Schema } from 'mongoose';
 
interface DistrictEvent extends Document {
    city:string
    district:string
  highlights: {
    title: string;
    description: string;
    date: string;
    link: string;
  }[];
}
 
const DistrictEventSchema = new Schema<DistrictEvent>({
    city:{type:String,required:true},
  district:{type:String,required: true},
  highlights: [
    {
      title: { type: String, required: true },
      description: { type: String, required: true },
      link: { type: String, required: true },
      date: {type:String,required:true}
    },
  ],
});
 
const DistrictEventModel = mongoose.models.DistrictEvent || mongoose.model<DistrictEvent>('DistrictEvent', DistrictEventSchema);
 
export default DistrictEventModel;
 