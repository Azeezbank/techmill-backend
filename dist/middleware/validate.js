import { ZodError } from "zod";
const validate = (schema) => (req, res, next) => {
    try {
        schema.parse(req.body);
        next();
    }
    catch (err) {
        if (err instanceof ZodError) {
            return res.status(400).json({
                success: false,
                errors: err.issues.map((issue) => ({
                    path: issue.path.join("."),
                    message: issue.message,
                })),
            });
        }
        next(err);
    }
};
export default validate;
