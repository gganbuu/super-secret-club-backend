import pool from "../configs/db.js";

export async function allMessagesFullGet() {
    const select = 'SELECT u.username, u.admin, m.content, m.title, m.time_created'
    const from =   'FROM messages AS m'
    const join =   'JOIN users AS u'
    const on =     'ON u.id = m.user_id;'

    const { rows } = await pool.query(`${select} ${from} ${join} ${on}`)
    return rows
}

export async function allMessagesGet() {
    const select = 'SELECT m.content, m.title, m.time_created'
    const from =   'FROM messages AS m'
    const join =   'JOIN users AS u'
    const on =     'ON u.id = m.user_id;'
    const { rows } = await pool.query(`${select} ${from} ${join} ${on}`)
    return rows
}

export async function messagePost({userId, title, content}) {
    await pool.query(`INSERT INTO messages (user_id, title, content, time_created)
                      VALUES ($1, $2, $3, now())`,
                      [userId, title, content]
                    )

}