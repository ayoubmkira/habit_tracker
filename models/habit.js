import mongoose, { Model, model } from "mongoose";

const Schema = mongoose.Schema;

const HabitSchema = new Schema({
    name: String,
    description: String,
    measurable: Boolean,
    unit: String,
    goal: Number
});

export const Habit = mongoose.model("Habit", HabitSchema);