import { habitSchema } from "./schemas.js";
import ExpressError from "./utils/ExpressError.js";

export const validateHabit = (req, res, next) => {
    const { error } = habitSchema.validate(req.body);

    if(error) {
        const msg = error.details.map(err => err.message).join(",");
        throw new ExpressError("Validation Error :: " + msg, 400);
    } else {
        next();
    }
};