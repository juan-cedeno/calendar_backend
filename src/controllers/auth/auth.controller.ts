import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { User } from "../../entity/User";
import { Users } from '../../interfaces/User';
import bcrypts from 'bcryptjs'
import { generateJwt } from '../../helpers/generate.json.web.token';


export const registerUser = async (req: Request<any , any , Users> , res: Response) => {
    const {email,password} = req.body
    try {
        
        const user = await getRepository(User).findOne({email})
        if(user) {
            return res.status(400).json({
                ok: false,
                message: 'Email alredy used'
            })
        }
        
        const newUser =  getRepository(User).create(req.body)
        const salt = bcrypts.genSaltSync()
        newUser.password = bcrypts.hashSync(password , salt)
        const resultUser = await getRepository(User).save(newUser)

        const token = await generateJwt(resultUser.id , resultUser.name)

     res.status(201).json({
        ok: true,
        email: resultUser.email,
        id: resultUser.id,
        name: resultUser.name,
        token,
    })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            message: 'Comunicarse con soporte'
        })
    }
}

export const loginUser = async (req : Request<any , any , Users> , res: Response) => {
    const {email,password , id , name} = req.body

    try {
        const user = await getRepository(User).findOne({email})
        if (!user) {
            return res.status(400).json({
                ok: false,
                message: 'Email or password incorrect'
            })
        }

        const validPassword = bcrypts.compareSync(password , user.password)
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                message: 'Email or password incorrect'
            })
        }

        const token = await generateJwt(user.id , user.name)

        res.status(200).json({
            ok: true,
            id: user.id,
            email: user.email,
            name: user.name,
            token
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            message: 'Comunicarse con soporte'
        })
    }
}

export const revalidarToken = async (req: any , res: Response) => {
    const id = req.id
    const name = req.name

    const token = await generateJwt(id , name)

    return res.status(200).json({
        ok: true,
        id,
        name,
        token
    })



}