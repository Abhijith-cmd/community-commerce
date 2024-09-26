import mongoose, { Schema, Document } from 'mongoose';

interface IPromotionalBanner extends Document {
  imageUrl: string;
  description: string;
  link: string;
  isActive: boolean;
}

const promotionalBannerSchema = new Schema<IPromotionalBanner>({
  imageUrl: { type: String, required: true },
  description: { type: String, required: true },
  link: { type: String, required: true },
  isActive: { type: Boolean, default: true }
});

const PromotionalBanner = mongoose.models.PromotionalBanner || mongoose.model<IPromotionalBanner>('PromotionalBanner', promotionalBannerSchema);

export default PromotionalBanner;
