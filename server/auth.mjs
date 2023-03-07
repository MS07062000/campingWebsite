// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const saltRounds = 10;


export async function setPassword(password) {
    await bcrypt.hash(password, saltRounds, function (err, hash) {
        if (err) {
            console.log("Error in creating hash");
        }

        if (result) {
            return hash;
        }
    });
}


export async function checkPassword(password, hash) {
    await bcrypt.compare(password, hash, function (err, result) {
        if (err) {
            console.log("Error in comparing hash");
        }
        if (result) {
            return result;
        }
    });
}

export function logOut() {

}

export async function invalidateToken(token) {
    let payload = await jwt.verify(token, privateKey, (err, payload) => {
        if (err) {
            console.log("Error in verifying jwt");
        }
        if (payload) {
            return payload;
        }
    });
    return payload;
}

export async function tokenGeneration(payload) {
    await jwt.sign(payload, privateKey, (err, token) => {
        if (err) {
            console.log("Error in tokenGeneration");
        }

        if (token) {
            return token;
        }

    }, { expiresIn: Date.now() + (1000 * 60 * 60) });
    // crypto.randomBytes(64)
    // crypto.randomBytes(32).toString(16)
    // Date.now() + 1000 * 60 * 60
}

function authenticate() {

}

