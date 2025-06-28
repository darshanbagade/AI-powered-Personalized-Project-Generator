import User from "../model/User.model.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import transporter from "../lib/nodemailer.js"
export async function Signup(req, res) {
  const {  name ,email, password,role} = req.body;
  
  try {
      if (!email || !password || !name ) {
          return res.status(400).json({ message: "All fields are required" });
        }

        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters" });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }      
    
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists, please use a diffrent one" });
        }
        const hashedPassword=await bcrypt.hash(password,10);
        const newUser = await User.create({
            name,
            email,
            password:hashedPassword,
            role
        });
    
        await newUser.save();
        const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET_KEY, {
            expiresIn: "7d",
        });
    
        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: email,
            subject: "Welcome to Time Pass page",
            text: `Welcome to Time Pass Website. Your account has been created with email: ${email}`
        };

        await transporter.sendMail(mailOptions);
        res.cookie("token", token, {
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true, 
            sameSite: "strict",
            secure: process.env.NODE_ENV === "production",
        });
    
        res.status(201).json({ success: true, user: newUser });
    } catch (error) {
        console.log("Error in signup controller", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export async function Login(req,res) {
    const { email, password} = req.body;
    try {
      if (!email || !password ) {
          return res.status(400).json({ message: "All fields are required" });
        }

        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters" });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }      
    
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(400).json({ message: "User not found" });
        }
        
        const isMatched=bcrypt.compare(password , existingUser.password);
        if(!isMatched)
        {
            return res.status(400).json({ message: "User not found" });
        }

        const token = jwt.sign({ userId: existingUser._id }, process.env.JWT_SECRET_KEY, {
            expiresIn: "7d",
        });
    
        res.cookie("token", token, {
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true, 
            sameSite: "strict",
            secure: process.env.NODE_ENV === "production",
        });
    
        res.status(200).json({ success: true, user: existingUser });
    } catch (error) {
        console.log("Error in Login controller", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export async function Logout(req,res){
    try {
        res.clearCookie("token", {
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV === "production",
        });

        return res.status(200).json({success:true , message:"Logged out successfully"})
    } catch (error) {
        console.log("Error in Logout controller", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export async function sendverificationOtp(req, res) {
  const { userId } = req.body;

  try {
    const user = await User.findById(userId); // ✅ correct usage

    if (!user) {
      return res.status(400).json({ success: false, message: "User Not found" });
    }

    if (user.isAccountVerified) {
      return res.status(400).json({ success: false, message: "User already verified" });
    }

    const otp = String(Math.floor(100000 + Math.random() * 900000));
    user.verifyOtp = otp;
    user.verifyOtpexpireAt = Date.now() + 24 * 60 * 60 * 1000;

    await user.save(); // ✅ works now

    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: "Account Verification OTP",
      text: `Your OTP is ${otp}. Verify your account using this code.`,
    };

    await transporter.sendMail(mailOptions);

    return res.status(201).json({ success: true, message: "OTP sent to the email ID" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ success: false, message: "Unable to send the OTP" });
  }
}

export async function verifyEmail(req,res) {
    const {userId,otp}=req.body;
    try {
        if(!userId || !otp)
        {
            return res.status(400).json({success:false,message:"OTP required"});
        }
        const user= await User.findById(userId);
        if(!user)
        {
            return res.status(400).json({success:false,message:"User Not found"});
        }
        console.log(user.verifyOtp);
        
        if(user.verifyOtp ==='' || user.verifyOtp!==otp)
        {
            return res.status(400).json({success:false,message:"Invalid OTP"});
        }
        if (user.verifyOtpexpireAt<Date.now()) {
            return res.status(400).json({success:false,message:"Expired OTP"});            
        }
        user.isAccountVerified=true;
        user.verifyOtp='';
        user.verifyOtpexpireAt=0;
        await user.save();
        return res.status(200).json({success:true,message:"Email Verified successfully"});            
    } catch (error) {
        console.log(error);
        return res.status(400).json({success:false,message:"random error during otp verificcation"});
    }
}

export async function isAuthenticated(req,res) {
    try {
        return res.status(200).json({success:true,message:"User is Authenticated"});
    } catch (error) {
        return res.status(400).json({success:true,message:"Invalid User"});
    }
}

export async function resetPasswordOtp(req, res) {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ success: false, message: "Email is required" });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const otp = String(Math.floor(100000 + Math.random() * 900000));
    user.resetOtp = otp;
    user.resetOtpexpireAt = Date.now() + 15 * 60 * 1000;

    await user.save();

    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: "Reset Password OTP",
      text: `Your OTP for resetting your password is ${otp}. This OTP is valid for 15 minutes.`,
    };

    await transporter.sendMail(mailOptions);

    return res.status(200).json({ success: true, message: "Reset Password OTP sent to email successfully" });
  } catch (error) {
    console.error("Error in resetPasswordOtp:", error);
    return res.status(500).json({ success: false, message: "Failed to send OTP" });
  }
}

export async function resetPassword(req, res) {
  const { email, otp, newPassword } = req.body;

  if (!email || !otp || !newPassword) {
    return res.status(400).json({ success: false, message: "All fields are required" });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    if (user.resetOtp !== otp) {
      return res.status(400).json({ success: false, message: "Invalid OTP" });
    }

    if (user.resetOtpexpireAt < Date.now()) {
      return res.status(400).json({ success: false, message: "OTP has expired" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    user.resetOtp = "";
    user.resetOtpexpireAt = 0;

    await user.save();

    return res.status(200).json({ success: true, message: "Password reset successfully" });
  } catch (error) {
    console.error("Error in resetPassword:", error);
    return res.status(500).json({ success: false, message: "Failed to reset password" });
  }
}
