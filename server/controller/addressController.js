import User from "../models/userModel.js";


/* =============================
   GET ALL ADDRESSES
============================= */

export const getAddress = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Find default
    const defaultAddress = user.addresses.find(
      (addr) => addr.isDefault
    );

    res.json(defaultAddress || null);

  } catch (error) {
    console.error("GET ADDRESS ERROR:", error);
    res.status(500).json({
      message: "Failed to get address",
    });
  }
};



/* =============================
   ADD NEW ADDRESS
============================= */

export const addAddress = async (req, res) => {

  try {

    const user = await User.findById(req.user._id);

    const newAddress = req.body;

    // If first address → make default
    if (user.addresses.length === 0) {
      newAddress.isDefault = true;
    }

    user.addresses.push(newAddress);

    await user.save();

    res.json({
      message: "Address added",
      addresses: user.addresses,
    });

  } catch (err) {

    res.status(500).json({
      message: "Failed to add address",
    });
  }
};


/* =============================
   SET DEFAULT
============================= */

export const setDefaultAddress = async (req, res) => {

  try {

    const user = await User.findById(req.user._id);

    user.addresses.forEach((addr) => {
      addr.isDefault = addr._id == req.params.id;
    });

    await user.save();

    res.json({
      message: "Default updated",
      addresses: user.addresses,
    });

  } catch (err) {

    res.status(500).json({
      message: "Failed to update default",
    });
  }
};


/* =============================
   DELETE
============================= */

export const deleteAddress = async (req, res) => {

  try {

    const user = await User.findById(req.user._id);

    user.addresses = user.addresses.filter(
      (addr) => addr._id != req.params.id
    );

    await user.save();

    res.json({
      message: "Address removed",
      addresses: user.addresses,
    });

  } catch (err) {

    res.status(500).json({
      message: "Failed to delete address",
    });
  }
};

export const saveAddress = async (req, res) => {
  try {
    const userId = req.user._id;
    const addressData = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // ✅ If first address → make default
    if (user.addresses.length === 0) {
      addressData.isDefault = true;
    }

    // ✅ Push into array
    user.addresses.push(addressData);

    await user.save();

    res.json({
      message: "Address saved successfully",
      address: addressData,
    });

  } catch (error) {
    console.error("SAVE ADDRESS ERROR:", error); // 👈 IMPORTANT
    res.status(500).json({
      message: "Failed to save address",
    });
  }
};
