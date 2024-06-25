import mongoose, { Model, model } from "mongoose";

const Schema = mongoose.Schema;

const HabitSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: String,
    measurable: {
        type: Boolean,
        required: true
    },
    unit: {
        type: String,
        required: function () {
            return this.measurable;
        }
    },
    goal: {
        type: Number,
        required: function () {
            return this.measurable;
        }
    }
});

export const Habit = mongoose.model("Habit", HabitSchema);