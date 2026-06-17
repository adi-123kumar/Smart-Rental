import User from "../models/User.js";
import bcrypt from "bcryptjs";

// =====================
// GET PROFILE
// =====================
export const getProfile = async (
  req,
  res
) => {
  try {
    const user =
      await User.findById(req.user).select(
        "-password"
      );

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// =====================
// UPDATE PROFILE
// =====================
export const updateProfile =
  async (req, res) => {
    try {
      const user =
        await User.findById(req.user);

      if (!user) {
        return res.status(404).json({
          message: "User not found",
        });
      }

      user.name =
        req.body.name || user.name;

      user.phone =
        req.body.phone || user.phone;

      user.gender =
        req.body.gender || user.gender;

      user.dateOfBirth =
        req.body.dateOfBirth ||
        user.dateOfBirth;

      user.address =
        req.body.address ||
        user.address;

      user.city =
        req.body.city || user.city;

      user.state =
        req.body.state || user.state;

      user.country =
        req.body.country ||
        user.country;

      user.pincode =
        req.body.pincode ||
        user.pincode;

      user.occupation =
        req.body.occupation ||
        user.occupation;

      user.company =
        req.body.company ||
        user.company;

      user.bio =
        req.body.bio || user.bio;

      if (req.file) {
        user.profileImage =
          req.file.path;
      }

      const updatedUser =
        await user.save();

      res.json(updatedUser);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };

// =====================
// CHANGE PASSWORD
// =====================
export const changePassword =
  async (req, res) => {
    try {
      const {
        oldPassword,
        newPassword,
      } = req.body;

      const user =
        await User.findById(req.user);

      const isMatch =
        await bcrypt.compare(
          oldPassword,
          user.password
        );

      if (!isMatch) {
        return res.status(400).json({
          message:
            "Old password incorrect",
        });
      }

      user.password =
        await bcrypt.hash(
          newPassword,
          10
        );

      await user.save();

      res.json({
        message:
          "Password changed successfully",
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };