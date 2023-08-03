import { Request, Response } from 'express';
import TaskModel from '../models/taskModel';
import { handleError } from '../utils/errorHandler';

export const createTask = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const newTask = new TaskModel({ name });
    await newTask.save();

    res.json({ task: { id: newTask._id, name: newTask.name } });
  } catch (err) {
    handleError(res, 500, 'Internal server error');
  }
};

export const listTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await TaskModel.find();

    res.json({ tasks });
  } catch (err) {
    handleError(res, 500, 'Internal server error');
  }
};
