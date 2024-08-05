import mongoose from 'mongoose'


const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default:
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.istockphoto.com%2Fphotos%2Fprofile-image&psig=AOvVaw0EKiJatp4P6ZeBevrP48dK&ust=1722916468292000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCKDzpZP63IcDFQAAAAAdAAAAABAE",
    },
  },
  { timestamps: true }
);


const User=mongoose.model('User',userSchema);


export default User;