// import mongoose, { Document, Schema } from 'mongoose';
 
// interface Highlight extends Document {
//   abbreviation: string;
//   country_name:string,
//   highlights: {
//     title: string;
//     description: string;
//     date: string;
//     link: string;
//   }[];
// }
 
// const HighlightSchema = new Schema<Highlight>({
//   abbreviation: { type: String, required: true },
//   country_name: {type:String, required:true},
 
//   highlights: [
//     {
//       title: { type: String, required: true },
//       description: { type: String, required: true },
//       date: { type: String, required: true },
//       link: { type: String, required: true },
//     },
//   ],
// });
 
// const HighlightModel = mongoose.models.Highlight || mongoose.model<Highlight>('Highlight', HighlightSchema);
 
// export default HighlightModel;

// new function(1)
// import mongoose, { Schema, Document } from "mongoose";

// interface Highlight {
//   title: string;
//   description: string;
//   date?: string;
//   link: string;
// }

// interface HighlightsDocument extends Document {
//   abbreviation: string;
//   country_name: string;
//   highlights: Highlight[];
// }

// const highlightSchema = new Schema({
//   abbreviation: { type: String, required: true },
//   country_name: { type: String, required: true },
//   highlights: [
//     {
//         _id: { type: Schema.Types.ObjectId, default: () => new mongoose.Types.ObjectId() },  // Automatically generate _id
//       title: { type: String, required: true },
//       description: { type: String, required: true },
//       date: { type: String },
//       link: { type: String, required: true },
//     },
//   ],
// });

// const Highlights =
//   mongoose.models.Highlights ||
//   mongoose.model<HighlightsDocument>("Highlights", highlightSchema);

// export default Highlights;


//new function(3)
import mongoose, { Schema, Document } from "mongoose";

interface Highlight {
  title: string;
  description: string;
  date?: string;
  link: string;
  isActive: boolean;    // New field for active status
  priority: number;     // New field for priority
}

interface HighlightsDocument extends Document {
  abbreviation: string;
  country_name: string;
  highlights: Highlight[];
}

const highlightSchema = new Schema({
  abbreviation: { type: String, required: true },
  country_name: { type: String, required: true },
  highlights: [
    {
      _id: { type: Schema.Types.ObjectId, default: () => new mongoose.Types.ObjectId() }, // Automatically generate _id
      title: { type: String, required: true },
      description: { type: String, required: true },
      date: { type: String },
      link: { type: String, required: true },
      isActive: { type: Boolean, default: true }, // Default value set to true
      priority: { type: Number, required: true, unique: true }, // Unique priority
    },
  ],
});

// Create a pre-save hook to enforce unique priority within highlights array
highlightSchema.pre<HighlightsDocument>('save', function(next) {
  const highlightPriorities = new Set();

  for (const highlight of this.highlights) {
    if (highlight.priority < 1) {
      const err = new Error('Priority must start from 1.');
      return next(err);
    }
    
    if (highlightPriorities.has(highlight.priority)) {
      const err = new Error(`Priority ${highlight.priority} must be unique.`);
      return next(err);
    }

    highlightPriorities.add(highlight.priority);
  }
  next();
});

const Highlights =
  mongoose.models.Highlights ||
  mongoose.model<HighlightsDocument>("Highlights", highlightSchema);

export default Highlights;
