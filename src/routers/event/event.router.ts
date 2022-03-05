import { Router } from 'express';
import { createEvent, deleteEvent, getEvents, updateEvent } from '../../controllers/event/event.controller';
import { revalidarJwt } from '../../middlewares/revalidarJwt';
import { check } from 'express-validator';
import { verificateCamp } from '../../middlewares/verficate.camp';



const eventRouter = Router()

eventRouter.use(revalidarJwt)
eventRouter.post('/', 
[
    check('title' , 'Title is obligatory').not().isEmpty(),
    check('start' , 'The date initial is obligatory').not().isEmpty(),
    check('end' , 'The date end is obligatory').not().isEmpty(),
    check('start' , 'The date is incorret').isDate(),
    check('end' , 'The date is incorret').isDate(),
    verificateCamp
]
 , createEvent)

 eventRouter.get('/' , getEvents)
 eventRouter.put('/:id' , updateEvent)
 eventRouter.delete('/:id' , deleteEvent)



export default eventRouter