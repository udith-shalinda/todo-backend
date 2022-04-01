import { model, Schema } from "mongoose"
import { IUser } from "../interfaces/user.interface"

const userSchema: Schema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    todos: [{
        type: Schema.Types.ObjectId,
        ref: "Todo"
    }]
  },
  { timestamps: true }
)

export default model<IUser>("User", userSchema)