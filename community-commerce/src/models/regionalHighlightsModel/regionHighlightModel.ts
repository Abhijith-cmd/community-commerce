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


import mongoose, { Document, Schema } from 'mongoose';
 
interface RegionalHighlight extends Document {
    region:string
  highlights: {
    title: string;
    description: string;
    date: string;
    link: string;
  }[];
}
 
const RegionalHighlightSchema = new Schema<RegionalHighlight>({
  region:{type:String,required: true},
  highlights: [
    {
      title: { type: String, required: true },
      description: { type: String, required: true },
      link: { type: String, required: true },
    },
  ],
});
 
const RegionalHighlightModel = mongoose.models.RegionalHighlight || mongoose.model<RegionalHighlight>('RegionalHighlight', RegionalHighlightSchema);
 
export default RegionalHighlightModel;
 