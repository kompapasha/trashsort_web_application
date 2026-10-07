import mongoose from "mongoose";
import { type } from "os";
import { emitWarning } from "process";

const SortPlacesSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    sortCategories: [
        {
            type: String,
        }
    ],
    address: String,
    phoneHumber: String,
    description: String,
    workingHours: String,
    cordinates: [
        {
            type: Number,
            required: true,
        }
    ],
});

export default mongoose.model('SortPlaces', SortPlacesSchema);