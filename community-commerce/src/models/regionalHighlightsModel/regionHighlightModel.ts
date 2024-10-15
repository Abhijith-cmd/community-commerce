// import mongoose, { Document, Schema } from 'mongoose';
 
// interface RegionalHighlight extends Document {
//     region:string
//   highlights: {
//     title: string;
//     description: string;
//     date: string;
//     link: string;
//   }[];
// }
 
// const RegionalHighlightSchema = new Schema<RegionalHighlight>({
//   region:{type:String,required: true},
//   highlights: [
//     {
//       title: { type: String, required: true },
//       description: { type: String, required: true },
//       link: { type: String, required: true },
//     },
//   ],
// });
 
// const RegionalHighlightModel = mongoose.models.RegionalHighlight || mongoose.model<RegionalHighlight>('RegionalHighlight', RegionalHighlightSchema);
 
// export default RegionalHighlightModel;


//main function(2)
// import mongoose, { Document, Schema } from 'mongoose';
 
// interface RegionalHighlight extends Document {
//     region:string
//   highlights: {
//     title: string;
//     description: string;
//     date: string;
//     link: string;
//   }[];
// }
 
// const RegionalHighlightSchema = new Schema<RegionalHighlight>({
//   region:{type:String,required: true},
//   highlights: [
//     {
//       title: { type: String, required: true },
//       description: { type: String, required: true },
//       link: { type: String, required: true },
//     },
//   ],
// });
 
// const RegionalHighlightModel = mongoose.models.RegionalHighlight || mongoose.model<RegionalHighlight>('RegionalHighlight', RegionalHighlightSchema);
 
// export default RegionalHighlightModel;
 

//main function(3)
import mongoose, { Schema, Document } from 'mongoose';
 
interface RegionalHighlight {
  title: string;
  description: string;
  link: string;
  isActive: boolean;
}
 
interface Highlight extends Document {
  region: string;
  highlights: RegionalHighlight[];
}
 
const RegionalHighlightsSchema = new Schema<Highlight>({
  region: { type: String, required: true },
  highlights: [{
    _id: { type: Schema.Types.ObjectId, default: () => new mongoose.Types.ObjectId() },
    title: { type: String, required: true },
    description: { type: String, required: true },
    link: { type: String, required: true },
    isActive: { type: Boolean, default: true },
  }]
});
 
const RegionalHighlightsModel = mongoose.models.RegionalHighlights || mongoose.model('RegionalHighlights', RegionalHighlightsSchema);
 
export default RegionalHighlightsModel;