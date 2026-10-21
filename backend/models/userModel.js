import pool from '../config/db.js'

const UserModel = {
    async getAll() {
        const [rows] = await pool.query('SELECT * FROM users');
        return rows;
    },

    async getById(id) {
        const [rows] = await pool.query("SELECT * FROM users WHERE id = ?", [id]);;
        return rows[0];
    },

    async create(user) {
        const {email,password,name,phone=null,role=0} = user;
        const [result] = await pool.query(
            'INSERT INTO users(email,password,name,role,phone) VALUES(?,?,?,?,?)',
            [email,password,name,role,phone]
        );
        return {id: result.insertId, email, name, role, phone};
    },

    async getByEmail(email) {
        const [rows] = await pool.query('SELECT * FROM users WHERE email = ? ', [email]);
        return rows[0];
    },

    async updateLastLogin(id) {
        const [result] = await pool.query('UPDATE users SET lastlogin = NOW() WHERE id = ?', [id]);
        return result.affectedRows = 1;
    }
}

export default UserModel