// import mongoose, { Document, Schema } from 'mongoose';

// interface IToken extends Document {
//   token: string;
//   userId: string;
// }

// const TokenSchema = new Schema<IToken>({
//   token: { type: String, required: true },
//   userId: { type: String, required: true },
// });

// const TokenModel = mongoose.model<IToken>('Token', TokenSchema);

// export default TokenModel;


//new
import  { Document, Schema, model, models } from 'mongoose';

interface IToken extends Document {
  token: string;
  userId: string;
}

const TokenSchema: Schema = new Schema({
  token: { type: String, required: true },
  userId: { type: String, required: true },
});

// Use the existing model if it exists, otherwise create a new one
const TokenModel = models.Token || model<IToken>('Token', TokenSchema);

export default TokenModel;
