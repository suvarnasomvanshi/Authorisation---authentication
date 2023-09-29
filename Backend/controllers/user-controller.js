import User from "../model/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET_KEY = "MyKey";

export const signup = async(req,res,next)=>{

  const {name,email,password}=req.body;

  let existingUser;

  try{
    existingUser = await User.findOne({email:email});

  }catch(err){
    console.log(err);
  }

  if(existingUser){
    return res.status(400).json({message:"User already exist.login instead of signin"})
  }

  const hashedPassword = bcrypt.hashSync
}

export const signup = async (req, res, next) => {
  const { name, email, password } = req.body;
  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    console.log(err);
  }
  if (existingUser) {
    return res
      .status(400)
      .json({ message: "User already exists! Login Instead" });
  }
  const hashedPassword = bcrypt.hashSync(password);
  const user = new User({
    name,
    email,
    password: hashedPassword,
  });

  try {
    await user.save();
  } catch (err) {
    console.log(err);
  }
  return res.status(201).json({ message: user });
};





export const login = async (req, res, next) => {

  const { email, password } = req.body;

  let existingUser;

  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    return new Error(err);
  }
  if (!existingUser) {
    return res.status(400).json({ message: "User not found. signup please" });
  }

  const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);
  if (!isPasswordCorrect) {
    return res.status(400).json({ message: "invalid email/password" });
  }


  const token = jwt.sign(
    { id: existingUser._id }, 
    JWT_SECRET_KEY, 
    {expiresIn: "30s"}
  );


  res.cookie(
    String(existingUser._id), 
    token, 
    { path: "/",
      expires: new Date(Date.now() + 1000 * 30),
      httpOnly: true,
      sameSite: "lax",
    }
    );

  return res
    .status(200)
    .json({ message: "succesfully login", user: existingUser, token });
};




export const verifytoken = (req, res, next) => {

  const cookies = req.headers.cookie;
  const token = cookies.split("=")[1];
  console.log(token);

  if (!token) {
    res.status(404).json({ message: "no token found" });
  }

  jwt.verify(String(token), JWT_SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(400).json({ message: "Invalid token" });
    }
    console.log(user.id);
    req.id = user.id;
  });

  
  next();
};





export const getUser = async (req, res, next) => {
  const userId = req.id;
  let user;
  try {
    user = await User.findById(userId, "-password");
  } catch (err) {
    return new Error(err);
  }
  if (!user) {
    return res.status(404).json({ message: "User not find" });
  }
  return res.status(200).json({ user });
};
