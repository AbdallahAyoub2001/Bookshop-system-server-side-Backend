const userDAO = require('../UserModel/UserModel')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const secretKey = 'secret-key';

class userServices {
    async addUser(userInfo) {
        return userDAO.addUser(userInfo);
    }

    async authenticateUser (userLoginInfo){
        let user = await userDAO.getUser('username', userLoginInfo.username);
        if (!user) {
            return { status: 404, message: 'User not found' };
        }

        const passwordMatch = await this.comparePasswords(userLoginInfo.password, user[0][0].password);
        if (!passwordMatch) {
            return { status: 401, message: 'Invalid credentials' };
        }

        const token = this.generateJWTToken(user[0][0].id, user[0][0].username);
        // console.log(token);
        return { status: 200, message: 'Sign in successful', token: token };
    };

    getUsers() {
        return userDAO.getUsers();
    }

    getUser(key, value) {
        return userDAO.getUser(key, value);
    }

    async updateUser(id, userInfo) {
        return userDAO.updateUser(id, userInfo);
    }

    async deleteUser(id) {
        return userDAO.deleteUser(id);
    }

    async comparePasswords(password, hashedPassword) {
        try {
            return await bcrypt.compare(password, hashedPassword);
        } catch (err) {
            throw err;
        }

    };

    generateJWTToken(userId, username) {
        return jwt.sign({ userId, username }, secretKey, { expiresIn: '1h' });
    };

}

module.exports = new userServices();