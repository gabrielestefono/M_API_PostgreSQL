const db = require("../../database");

class UserRepository {
    constructor() {
        this.db = db;
    }

    async findByEmail(email) {
        const storedUser = await this.db.oneOrNone("SELECT * FROM users WHERE email = $1", email);
        return storedUser ? new User(storedUser) : null;
    }

    async save(user) {
        await this.db.none("INSERT INTO users (id, nome, email, password) VALUES ($1, $2, $3, $4)", [user.id, user.nome, user.email, user.password]);
    }
}

module.exports = UserRepository;