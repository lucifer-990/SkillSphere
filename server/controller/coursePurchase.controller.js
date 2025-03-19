import Course from "../models/course.model.js";
import CoursePurchase from "../models/coursePurchase.model.js";
import Lecture from "../models/lecture.model.js";
import User from "../models/user.model.js";

export const createCheckoutSession = async (req, res) => {
  try {
    const userId = req.id;
    const { courseId } = req.body;
    if (!courseId) {
      return res.status(400).json({ message: "Course ID is required" });
    }

    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: "Course not found!" });

    // Create a new course purchase record
    const newPurchase = await CoursePurchase.create({
      courseId,
      userId,
      amount: course.coursePrice,
      status: "completed",
    });

    // Save the purchase record
    await newPurchase.save();

    return res.status(200).json({
      newPurchase,
      message: "Course purchased successfully.",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to Purchase course",
    });
  }
};

export const UpdateEverything = async (req, res) => {
  try {
    const userId = req.id;
    const { courseId } = req.body;
    const purchase = await CoursePurchase.findOne({
      userId,
      courseId,
    }).populate({ path: "courseId" });

    if (!purchase) {
      return res.status(404).json({ message: "Purchase not found" });
    }
    await purchase.save();

    await User.findByIdAndUpdate(
      purchase.userId,
      { $addToSet: { enrolledCourses: purchase.courseId._id } }, // Add course ID to enrolledCourses
      { new: true }
    );

    // Update course to add user ID to enrolledStudents
    await Course.findByIdAndUpdate(
      purchase.courseId._id,
      { $addToSet: { enrolledStudents: purchase.userId } }, // Add user ID to enrolledStudents
      { new: true }
    );
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to update data",
    });
  }
};

export const getCourseDetailWithPurchaseStatus = async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.id;

    const course = await Course.findById(courseId)
      .populate({ path: "creator" })
      .populate({ path: "lectures" });

    if (!course) {
      return res.status(404).json({ message: "course not found!" });
    }
    const purchased = await CoursePurchase.findOne({ userId, courseId });
    console.log(purchased);

    if (
      purchased &&
      purchased.courseId &&
      purchased.courseId.lectures &&
      purchased.courseId.lectures.length > 0
    ) {
      await Lecture.updateMany(
        { _id: { $in: purchased.courseId.lectures } },
        { $set: { isPreviewFree: true } }
      );

      await purchased.save();
      await User.findByIdAndUpdate(
        purchased.userId,
        { $addToSet: { enrolledCourses: purchased.courseId._id } }, // Add course ID to enrolledCourses
        { new: true }
      );

      // Update course to add user ID to enrolledStudents
      await Course.findByIdAndUpdate(
        purchased.courseId._id,
        { $addToSet: { enrolledStudents: purchased.userId } }, // Add user ID to enrolledStudents
        { new: true }
      );
    }
    return res.status(200).json({
      course,
      purchased: !!purchased, // true if purchased, false otherwise
    });
  } catch (error) {
    console.log(error);
  }
};

export const getAllPurchasedCourse = async (req, res) => {
  try {
    const userId = req.id;

    const purchasedCourse = await Course.find({
      // status: "completed",
      creator: userId,
    }).populate("_id");

    if (!purchasedCourse) {
      return res.status(404).json({
        purchasedCourse: [],
      });
    }
    return res.status(200).json({
      purchasedCourse,
    });
  } catch (error) {
    console.log(error);
  }
};
