"use strict";

import userSQL from "../SQL/user.js";
import connectToDatabase from '../ConnectionDataBase/connectToDataBase.js'

class UserService {
  async #executeQuery(query, params = []) {
    const connection = await connectToDatabase();

    try {
      return await connection.execute(query, params);
    } catch (err) {
      throw new Error(`Database query failed: ${err.message}`);
    } finally {
      connection.release();
    }
  }

  #validateUserData(user) {
    const { 
      name,
      email,
      password,
      roleId = null,
    } = user;

    if (!name || !email || !password) {
      throw new Error("Missing required user fields: name, email, or password.");
    }

    return {
      name,
      email,
      password,
      roleId,
    };
  }

  async create(user) {
    const validatedUser = this.#validateUserData(user);
    const query = userSQL.createUser;

    const [result] = await this.#executeQuery(query, [
      validatedUser.name,
      validatedUser.email,
      validatedUser.password,
      validatedUser.roleId,
    ]);

    return { id: result.insertId, message: "User created successfully" };
  }

  async getAll() {
    const query = userSQL.readUserList;
    const [users] = await this.#executeQuery(query);
    return users;
  }

  async getById(id) {
    const query = userSQL.readUserById;
    const [users] = await this.#executeQuery(query, [id]);

    if (!users || users.length === 0) {
      throw new Error(`User with ID ${id} not found`);
    }

    return users[0];
  }

  async update(id, user) {
    const validatedUser = this.#validateUserData(user);
    const query = userSQL.updateUserById;

    const [result] = await this.#executeQuery(query, [
      validatedUser.name,
      validatedUser.email,
      validatedUser.password,
      validatedUser.roleId,
      id,
    ]);

    if (result.affectedRows === 0) {
      throw new Error(`User with ID ${id} not found`);
    }

    return { message: "User updated successfully" };
  }

  async delete(id) {
    const query = userSQL.deleteUserById;
    const [result] = await this.#executeQuery(query, [id]);

    if (result.affectedRows === 0) {
      throw new Error(`User with ID ${id} not found`);
    }

    return { message: "User deleted successfully" };
  }
}

export default new UserService();
