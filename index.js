import express from "express";
import mongoose from "mongoose";
import path from "path";
import bodyParser from "body-parser";
import methodOverride from "method-override";
import ejsMate from "ejs-mate";
import ExpressError from "./utils/ExpressError.js";
import catchAsync from "./utils/CatchAsync.js";
import { Habit } from "./models/habit.js";
import { fileURLToPath } from "url";
import { validateHabit } from "./middleware.js";

// Connect to Mongoose:
mongoose.connect('mongodb://127.0.0.1:27017/habit_tracker_db')
.then(() => {
    console.log("Mongo Connection is open.");
})
.catch(err => {
    console.log("Error, Mongo Connection!!!");
    console.log(err);
});

const app = express();
const PORT = 3030;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// parse application/x-www-form-urlencoded.
app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json.
app.use(bodyParser.json());

// Method Override.
app.use(methodOverride('_method'));

// Serving Static folder Files.
app.use(express.static(path.join(__dirname, "public")));

app.engine("ejs", ejsMate);

// Set EJS as the templating engine.
app.set("view engine", "ejs");
// Change the default views directory.
app.set("views", path.join(__dirname, "views"));


app.get("/", (req, res) => {
    res.render("home.ejs");
});

app.get("/habits", catchAsync(async (req, res) => {
    const habits = await Habit.find({});
    res.render("habits/index.ejs", { habits });
}));
app.get("/habits/new", (req, res) => {
    res.render("habits/new.ejs");
});
app.post("/habits", validateHabit, catchAsync(async (req, res) => {
    const { name, description, measurable, goal, unit } = req.body.habit;
    const newHabit = new Habit({
        name,
        description,
        measurable,
        ...((measurable === "true") && { goal, unit })
    });
    await newHabit.save();
    res.redirect(`/habits/${newHabit._id}`);
}));

app.get("/habits/:id/edit", catchAsync(async (req, res) => {
    const { id } = req.params;
    const habit = await Habit.findById(id);
    res.render("habits/edit.ejs", { habit });
}));
app.put("/habits/:id", validateHabit, catchAsync(async (req, res) => {
    const { id } = req.params;
    const { name, description, measurable, goal, unit } = req.body.habit;
    const habit = await Habit.findById(id);
    await Habit.findByIdAndUpdate(id, {
        name,
        description,
        ...((habit.measurable === "true") && { goal, unit })
    }, { runValidators: true });
    res.redirect(`/habits/${id}`);
}));

app.delete("/habits/:id", catchAsync(async (req, res) => {
    const { id } = req.params;
    await Habit.findByIdAndDelete(id);
    res.redirect("/habits");
}));

app.get("/habits/:id", catchAsync(async (req, res) => {
    const {id} = req.params;
    const habit = await Habit.findById(id);
    res.render("habits/show.ejs", { habit });
}));

/* Routes not found */
app.all('*', function (req, res, next) {
    next(new ExpressError('Page not found.', 404));
});
/* Errors handler */
app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if(!err.message)
        err.message = "Something went wrong!!!"
    res.status(statusCode).render('./error', { err });
});

app.listen(PORT, () => {
    console.log(`Server is listening on Port: ${PORT}`);
});