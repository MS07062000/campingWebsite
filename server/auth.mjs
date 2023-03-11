// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {promisify} from 'util';
const saltRounds = 10;

export async function setPassword(password) {
    return await bcrypt.hash(password, saltRounds);
}


export async function checkPassword(password, hash) {
    return await bcrypt.compare(password, hash);
}

export function logOut() {

}

export async function validatingToken(token,sessionId) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, sessionId, (err, decoded) => {
            if (err) {
                reject(err);
            }
            if(token){
                resolve(decoded);
            }
        });
    });
}

export async function tokenGeneration(payload,sessionId) {
    const jwtSignFunction = promisify(jwt.sign);
    return jwtSignFunction(payload, sessionId,{ expiresIn: Date.now() + (1000 * 60 * 60) }); 
}


