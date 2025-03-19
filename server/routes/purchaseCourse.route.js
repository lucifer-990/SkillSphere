import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import {
  createCheckoutSession,
  getAllPurchasedCourse,
  getCourseDetailWithPurchaseStatus,
  UpdateEverything,
} from "../controller/coursePurchase.controller.js";

const router = express.Router();

router
  .route("/checkout/create-checkout-session")
  .post(isAuthenticated, createCheckoutSession);
router
  .route("/course/:courseId/detail-with-status")
  .get(isAuthenticated, getCourseDetailWithPurchaseStatus);

router.route("/").get(isAuthenticated, getAllPurchasedCourse);
router.route("/update-everything").post(isAuthenticated, UpdateEverything);

export default router;
