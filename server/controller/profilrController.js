import User from "../models/userModel.js"


// GET PROFILE
export const getProfile = async (req, res) => {

  try {

    const user = await User.findById(req.user.id)
      .select("-password");

    res.json(user);

  } catch (err) {

    res.status(500).json({
      message: "Server Error"
    });

  }
};


// UPDATE PROFILE
export const updateProfile = async (req, res) => {

  try {

    const user = await User.findById(req.user._id);

    if (!user)
      return res.status(404).json({
        message: "User not found"
      });


    user.firstName = req.body.firstName || user.firstName;
    user.lastName = req.body.lastName || user.lastName;
    user.phone = req.body.phone || user.phone;
    user.address = req.body.address || user.address;
    user.city = req.body.city || user.city;
    user.zipCode = req.body.zipCode || user.zipCode;


    if (req.file) {
      user.avatar = `/uploads/${req.file.filename}`;
    }


    await user.save();

    res.json({
      message: "Profile updated",
      user
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: "Update failed"
    });

  }
};
