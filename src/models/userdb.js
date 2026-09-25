import pool from "../configs/db.js";
import bcrypt from "bcryptjs";


export async function findUserByUsernameWithHash(username) {
    const { rows } = await pool.query("SELECT id, username, password FROM users WHERE username = $1", [username]);
    return rows[0];
}

export async function checkUsernameExists(username) {
    const { rows } = await pool.query("SELECT username FROM users WHERE username = $1", [username])
    return rows[0]
}

export async function findUserById(id) {
    const { rows } = await pool.query("SELECT id, username, admin, member FROM users WHERE id = $1", [id]);
    const user = rows[0] ?? null;
    return user;
};

export async function addUser({username, passwordHash}) {
    await pool.query("INSERT INTO users (username, password, member, admin) VALUES ($1, $2, false, false)", [username, passwordHash])
};

export async function memberUpdate(userId) {
    await pool.query("UPDATE users SET member = TRUE WHERE id = $1", [userId])
}



