const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');


export async function setPassword(password) {
    await bcrypt.hash(password, saltRounds, function (err, hash) {
        if (err) {

        }

        if (result) {
            return hash;
        }
    });
}

function signup(userName, password) {
}

function login(userName, password) {
    if (checkUserName(userName)) {

    } else {
        return checkPassword(password, hash);
    }
}

function checkUserName(userName) {

}

export async function checkPassword(password, hash) {
    await bcrypt.compare(password, hash, function (err, result) {
        if (err) {

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

