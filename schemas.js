import Joi from "joi";

export const habitSchema = Joi.object({
    habit: Joi.object({
        name: Joi.string().trim().min(3).max(30).required(),
        description: Joi.string().optional(),
        measurable: Joi.boolean().required(),
        goal: Joi.when("measurable", {
            is: true,
            then: Joi.number().required()
        }),
        unit: Joi.when("measurable", {
            is: true,
            then: Joi.string().required()
        })
    }).required()
});
