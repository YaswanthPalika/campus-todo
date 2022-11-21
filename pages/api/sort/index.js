import Todo from "../../../db/models/Todo";
import { Op } from "sequelize";

export default async (req, res) => {
  if (req.method === "GET") {
    const { search, sort, value, offset } = req.query;
    console.log(search);
    const todos = await Todo.findAll({
      where: {
        title: {
          [Op.like]: `%${search}%`,
        },
      },
      order: [[sort, value]],
      limit: 10,
      offset: offset,
    });
    res.status(200).json(todos);
  }
};
