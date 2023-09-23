const db = require('../../../db/db');
const { Users} = require('../../../db/DatabaseTables');
const bcrypt = require('bcrypt');

class UserModel {
    async addUser(userInfo) { // how to prevent adding user if the groups weren't added successfully
        const hashedPassword = await this.hashPassword(userInfo.password);

        let [id] = await db(Users).insert({
            username: userInfo.username, password: hashedPassword
        });

        return id;
    }

    async getUsers() {
        return db.select().from(Users);
    }

    async getUser(key, value) {
        let user;
        user = await db(Users).where(key, value);
        return [user];
    }

    async updateUser(id, userInfo) {
        const hashedPassword = await this.hashPassword(userInfo.password);

        return db(Users)
            .where({ id: id })
            .update({
                username: userInfo.username,
                password: hashedPassword,
            }, ['id']);
    }

    async deleteUser(id) {
            return db(Users)
                .where({ id: id })
                .del();
    }

    async hashPassword(password) {
        const saltRounds = 10;
        return bcrypt.hash(password, saltRounds);
    };

}

module.exports = new UserModel();