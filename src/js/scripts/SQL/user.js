"use strict";

const userSQL = {
  createUser: `INSERT INTO User (name, email, password, roleId) 
                VALUES (?, ?, ?, ?)`,
  readUserList: `SELECT * FROM User`,
  readUserById: `SELECT * FROM User WHERE id = ?`,
  updateUserById: `UPDATE User 
        SET name = ?, email = ?, password = ?, roleId = ? 
        WHERE id = ?`,
  deleteUserById: `DELETE FROM User WHERE id = ?`,
};

export default userSQL;
