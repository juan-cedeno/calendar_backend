import { Request, Response } from 'express';
import { Event } from '../../entity/Event';
import { getRepository } from 'typeorm';
import { User } from '../../entity/User';


export const createEvent = async (req , res: Response) => {
    const {end,id,notes,start,title,user} = req.body

    
    try {
        const event =  getRepository(Event).create({end,notes,start,title,user})
        const id =  req.id
        const name =  req.name
        event.user = {id , name, } as User
        
        const result = await getRepository(Event).save(event)

        res.status(201).json({
            ok: true,
            result
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            message: 'Hable con el administrador'
        })
    }
}

export const getEvents = async (req: Request <any , any , Event> , res: Response) => { 
    try {
        const event = await getRepository(Event).find({relations: ['user']})


        res.status(200).json({
            ok : true,
            event,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            message: 'Hable con el administrador'
        })
    }
}

export const updateEvent = async (req , res:Response) => {

    const eventId = req.params.id

    try {
        const event = await getRepository(Event).findOne(eventId , {relations: ['user']})

        if(!eventId){
            return res.status(400).json({
                ok: false,
                message: 'No hay un evento con ese id'
            })
        }
    
        if (event.user.id !== req.id) {
            return res.status(401).json({
                ok: false,
                message: 'No puedes editar este evento'
        })
    }

    const eventUdate =  getRepository(Event).merge(event , req.body ,{user: event.user})
    const result = await getRepository(Event).save(eventUdate)

    res.json({
        result
    })
    } catch (error) {
        return res.status(401).json({
            ok: false,
            message: 'No puedes editar este evento'
    })
    }
}

export const deleteEvent = async (req , res: Response) => {
    const id = req.params.id

    try {
        const event = await getRepository(Event).findOne(id  , {relations: ['user']})   

        if (!event) {
            return res.status(404).json({
                ok: false,
                message: 'No hay un evento con ese id'
            })
        }

        if (event.user.id !== req.id) {
            return res.status(401).json({
                ok: false,
                message: 'No puede eliminar este evento'
            })
        }

         await getRepository(Event).delete(event)


         res.status(200).json({
             ok: false,
             message: 'Event deleted'
         })

    } catch (error) {
        console.log(error);
        
        return res.status(500).json({
            ok: false,
            message: 'Comunicarse con soporte'
    })
    }


}