import { model, Schema } from "mongoose"
import { ITodo } from "../interfaces/todo.interface"

const todoSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    completed: {
      type: Boolean,
      required: true,
    },
    ownerId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
  },
  { timestamps: true }
)

export default model<ITodo>("Todo", todoSchema)