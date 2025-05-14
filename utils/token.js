import jwt from "jsonwebtoken";



export const Token = (userId) => {
    return new Promise((resolve, reject) => {
        const token = jwt.sign({ userId }, secrate, { expiresIn: '1h' }, (err, token) => {

            if (err) {
                reject(null)
            }
            resolve(token)
        })
    })
}


export const verify = (token) => {
    return new Promise((resolve, reject) => {
        const decoded = jwt.verify(token, secrate, (err, decoded) => {

            if (err) {
                reject(null)
            }
            resolve(decoded)
        })
    })
}