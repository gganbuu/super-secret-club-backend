import pool from "../configs/db.js";

export async function allMessagesFullGet() {
    const select = 'SELECT u.username, m.id, m.user_id, u.admin, m.content, m.title, m.time_created'
    const from =   'FROM messages AS m'
    const join =   'JOIN users AS u'
    const on =     'ON u.id = m.user_id'
    const orderby = 'ORDER BY m.time_created ASC;'

    const { rows } = await pool.query(`${select} ${from} ${join} ${on} ${orderby}`)
    return rows
}

export async function allMessagesGet() {
    const select = 'SELECT m.content, m.title, m.time_created'
    const from =   'FROM messages AS m'
    const join =   'JOIN users AS u'
    const on =     'ON u.id = m.user_id'
    const { rows } = await pool.query(`${select} ${from} ${join} ${on}`)
    return rows
}

export async function messagePost({userId, title, content}) {
    await pool.query(`INSERT INTO messages (user_id, title, content, time_created)
                      VALUES ($1, $2, $3, now())`,
                      [userId, title, content]
                    )

}

export async function messageEdit({messageId, title, content}) {
    await pool.query(`UPDATE messages SET (title, content) = ($1, $2)
                      WHERE id = $3`,
                      [title, content, messageId]
                    )
}

export async function messageDelete({messageId}) {
    await pool.query(`DELETE FROM messages WHERE id = $1`, [messageId])
}

// function that checks if message id belongs to user id
export async function checkMessageIdWithUserId(userId, messageId) {
    const { rows } = await pool.query('SELECT EXISTS (SELECT 1 FROM messages WHERE id = $1 AND user_id = $2);', [messageId, userId]);
    return rows;
}