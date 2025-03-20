import { body } from "express-validator";


const SignupValidation = [
    body("Name").notEmpty().trim().withMessage("Name is Required"),
    body("Password").trim().isLength({min:6}).withMessage("Password must be atleast 6 chars long"),
    body("Role").trim(),
]


export default SignupValidation