import jwt from 'jsonwebtoken'



export const generateJwt = (id: number , name: string) => {

    return new Promise((resolve , reject) => {
        const payload = {id , name}
        jwt.sign(payload , process.env.SECRET_KEY , {
            expiresIn: '2h'
        }, (err , token) => {
            if(err) {
                console.log(err);
                reject('No se pudo generar el token')
            }
            resolve(token)
        })
    })


    
}