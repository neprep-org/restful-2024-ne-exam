import Joi from "joi";

import { currentYear } from "../../utilities/dates.utils";

const CreateBookValidationSchema = Joi.object({
  name: Joi.string().min(2).max(50).required(),
  author: Joi.string().min(2).max(50).required(),
  publisher: Joi.string().min(2).max(50).required(),
  publicationYear: Joi.number().less(currentYear).greater(-5000).required(), // allow from current year back to 5000 years ago
  subject: Joi.string().max(50).required(),
});

export default CreateBookValidationSchema;
