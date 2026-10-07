import mongoose from "mongoose";
import { type } from "os";
import { emitWarning } from "process";

const ArticleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        required: true,
        unique: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    imageUrl: String,
},  {
    timestamps: true,
    },
);

export default mongoose.model('Article', ArticleSchema);

/*
tags: {
        type: Array,
        default: [],
    }   
viewsCount: {
        type: String,
        default: 0,
    }
*/