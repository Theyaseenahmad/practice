import { body } from "express-validator";


const loginValidation = [
    body("Name").notEmpty().trim().withMessage("Name is Required"),
    body("Password").trim().isLength({min:6}).withMessage("Password must be atleast 6 chars long"),
]


export default loginValidation