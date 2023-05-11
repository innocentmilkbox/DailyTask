import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {APP_SECRET} from '../config.js';

export const GenerateSalt = async () => {
    return await bcrypt.genSalt();
};

export const GeneratePassword = async (password, salt) => {
    return await bcrypt.hash(password, salt);
};

export const ValidatePassword = async (passIn, password, salt) => {
    return await GeneratePassword(passIn, salt) == password;
}

export const GenerateSignature = (payload) => {
    return jwt.sign(payload, APP_SECRET, {expiresIn: "1d"});
}

export const ValidateSignature = async (req) => {    
    const signature = req.get('Authorization');
    if(signature){
        const payload = await jwt.verify(signature.split(' ')[1], APP_SECRET);
        req.user = payload;
        console.log(payload);
        return true;
    }
    return false;
}