import cloudinary from "../config/cloudinary.js";
import Notification from "../models/notification.model.js";
import User from "../models/user.model.js";

export const getUsers = async (req, res) => {
  try {
    const users = await User.find().select("fullName profileImg");
    if(!users) return res.status(404).json({ error: "Users not found" });
    res.status(200).json(users);
  } catch (error) {
    console.error(`Error in getUsers controller ${error.message}`);
    res.status(500).json({ error: "Internal server error" });
  }
}

export const getUserProfile = async (req, res) => {
  try {
    const username = req.params.username;

    const user = await User.findOne({ username }).select("-password");
    if(!user) {
      return res.status(400).json({ error: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(`Error in getUserProfile controller ${error.message}`);
    res.status(500).json({ error: "Internal server error" });
  }
}

export const updateProfile = async (req, res) => {
  const { fullName, email, username, website, bio, gender, notes } = req.body;
  let { profileImg } = req.body;
  
  try {
    let user = req.user;

    const existingEmail = await User.findOne({ email });
    if(existingEmail) {
      return res.status(400).json({ error: "Email already exist" });
    }

    const existingUsername = await User.findOne({ username });
    if(existingUsername) {
      return res.status(400).json({ error: "Username already exist" });
    }

    if(profileImg) {
      if(user.profileImg) {
        await cloudinary.uploader.destroy(user.profileImg.split("/").pop().split(".")[0]);
      }

      profileImg = await cloudinary.uploader.upload(profileImg).secure_url;
    }

    user.fullName = fullName || user.fullName;
    user.email = email || user.email;
    user.username = username || user.username;
    user.website = website || user.website;
    user.bio = bio || user.bio;
    user.gender = gender || user.gender;
    user.notes = notes || user.notes;
    user.profileImg = profileImg || user.profileImg
    
    user.save();
    
    res.status(200).json(user);
  } catch (error) {
    console.error(`Error in updateProfile controller ${error.message}`);
    res.status(500).json({ error: "Internal server error" });
  }
}

export const followUnfollowUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = req.user;

    const following = await User.findOne({ _id: user._id, following: {
      $in: [userId]
    } });

    if(following) {
      await User.findByIdAndUpdate({ _id: userId }, {
        $pull: { followers: user._id }
      });

      await User.findByIdAndUpdate({ _id: user._id }, {
        $pull: { following: userId }
      });
    }

    if(!following) {
      await User.findByIdAndUpdate({ _id: userId }, {
        $push: { followers: user._id }
      });

      await User.findByIdAndUpdate({ _id: user._id }, {
        $push: { following: userId }
      });

      await Notification.create({
        from: user._id,
        to: userId,
        action: "Followed",
      });
    }

    res.status(200).json({ message: "You followed/unfollowed user"});
  } catch (error) {
    console.error(`Error in followUnfollowUser controller ${error.message}`);
    res.status(500).json({ error: "Internal server error" });
  }
}

export const getSuggestedUsers = async (req, res) => {
  try {
    const userId = req.user._id;

    const userFollowing = await User.findById(userId).select("following");
    const users = await User.aggregate([
			{
				$match: { 
					_id: { $ne: userId }
				}
			}, 
			{
				$sample: { size: 10 }
			}
		]);

    const filteredUsers = users.filter(user => !userFollowing.following.includes(user._id))
    let suggestedUsers = filteredUsers.slice(0, 4);

    suggestedUsers.forEach((user) => {
      user.password = undefined
    });

    res.status(200).json(suggestedUsers);
  } catch (error) {
    console.error(`Error in getSuggestedUsers controller ${error.message}`);
    res.status(500).json({ error: "Internal server error" });
  }
}
