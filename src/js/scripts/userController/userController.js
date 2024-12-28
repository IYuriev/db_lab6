"use strict";

import UserService from "../services/userService.js";

class UserController {
  async create(req, res) {
    try {
      const user = await UserService.create(req.body);
      res.status(201).json(user);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  async getAll(req, res) {
    try {
      const users = await UserService.getAll();
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  async getOne(req, res) {
    const { id } = req.params;
    try {
      const user = await UserService.getById(id);
      res.status(200).json(user);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  }

  async update(req, res) {
    const { id } = req.params;
    try {
      const user = await UserService.update(id, req.body);
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  async delete(req, res) {
    const { id } = req.params;
    try {
      const user = await UserService.delete(id);
      res.status(200).json(user);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  }
}

export default new UserController();