import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';

export const verificateCamp = (req : Request, res:Response , next:NextFunction) => {
    const error = validationResult(req)

    if(!error.isEmpty()){
        return res.status(400).json({
            ok: false,
            message: error.array()
        })
    }
    next()

}