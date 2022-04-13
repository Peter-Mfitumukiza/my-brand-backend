import bcrypt from 'bcrypt';
const { genSalt, hash } = bcrypt;

const hashPassword = async(password) => {
    const salt = await genSalt(10)
    const hashed = await hash(password,salt)
    return hashed;
}

export default hashPassword