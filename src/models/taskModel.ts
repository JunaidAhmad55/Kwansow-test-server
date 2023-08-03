import mongoose from 'mongoose';

interface Task {
  _id: string;
  name: string;
}

const taskSchema = new mongoose.Schema<Task>({
  name: { type: String, required: true },
});

const TaskModel = mongoose.model<Task>('Task', taskSchema);

export default TaskModel;
