import bcrypt from "bcrypt";
const saltRounds = 10

export const hash = async (password) => {
    try {
        const hash = await bcrypt.hash(password, saltRounds)
        return hash
    } catch (error) {
        console.log('Error: Hash Password', error);
        throw error
    }
}



export const verifyPassword = async (password, passwordHash) => {
    try {
        const verify = await bcrypt.compare(password, passwordHash)
        return verify
    } catch (error) {
        console.log('Error: verify Password', error);
        throw error
    }
}