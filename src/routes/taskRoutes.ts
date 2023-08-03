import { Router } from 'express';
import { createTask, listTasks } from '../controllers/taskController';
import { authenticateUser } from '../middleware/authMiddleware';
import { createTaskValidator } from '../validators/taskValidators';

const router = Router();

router.post('/create-task', authenticateUser, createTaskValidator, createTask);
router.get('/list-tasks', authenticateUser, listTasks);

export default router;
