import { Router } from "express";
import { check } from "express-validator";
import { loginUser, registerUser, revalidarToken } from '../../controllers/auth/auth.controller';
import { revalidarJwt } from "../../middlewares/revalidarJwt";
import { verificateCamp } from '../../middlewares/verficate.camp';


const authRouter = Router()

authRouter.post('/register',
[
    check('name' , 'Name is obligatory').not().isEmpty(),
    check('email' , 'Email is obligatory').not().isEmpty(),
    check('password' , 'Password is obligatory').not().isEmpty(),
    check('password' , 'Minimum 6 letter').isLength({min: 6}),
    check('email' , 'Email invalid').isEmail(),
    verificateCamp
]
 , registerUser
)

authRouter.post('/login' , 
[
    check('email' , 'Email is obligatory').not().isEmpty(),
    check('password' , 'Password is obligatory').not().isEmpty(),
    verificateCamp
],
    loginUser
)

authRouter.get('/renew', revalidarJwt, revalidarToken)

export default authRouter