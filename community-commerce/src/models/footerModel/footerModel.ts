import { Schema, model, Document, models } from 'mongoose';

interface IFooter extends Document {
    section_1: string[];
    section_2: string[];
    section_3: string[];
    section_4: string[];
}

const footerSchema = new Schema<IFooter>({
    section_1: { type: [String], required: true },
    section_2: { type: [String], required: true },
    section_3: { type: [String], required: true },
    section_4: { type: [String], required: true },
});

// Check if the model already exists to avoid OverwriteModelError
const Footer = models.Footer || model<IFooter>('Footer', footerSchema);

export default Footer;
