import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken'


export const revalidarJwt = (req : any , res: Response , next: NextFunction) => {
    
    const token = req.header('x-token')

    if (!token) {
        return res.status(401).json({
            ok: false,
            message: 'no hay token'
        })
    }

    try {
       const payload: any = jwt.verify(token , process.env.SECRET_KEY)
       req.id = payload.id
       req.name = payload.name
       
       
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            ok: false,
            message: 'token invalid'
        })
        
    }

    next()
}
