import Education from "../models/education.js";
import { handleResponse } from "../utils/helper.js";
import mongoose from "mongoose";

export const createEducation = async (req, res) => {
  try {
    const { name, address, qualification, gradeOrPercentage, yearOfCompletion } = req.body;

    if (!name || !address || !qualification || !gradeOrPercentage || !yearOfCompletion) {
      return handleResponse(res, 400, "All fields are required");
    }

    const newEducation = new Education({
      name,
      address,
      qualification,
      gradeOrPercentage,
      yearOfCompletion,
      createdBy: req.user.id,
    });

    await newEducation.save();
    return handleResponse(res, 201, "Education entry created successfully", newEducation);
  } catch (error) {
    console.error("Error creating education:", error.message);
    return handleResponse(res, 500, "Server Error", { error: error.message });
  }
};

export const getEducations = async (req, res) => {
  try {
    const educations = await Education.find().sort({ createdAt: -1 });
    return handleResponse(res, 200, "Education entries fetched successfully", educations);
  } catch (error) {
    console.error("Error fetching educations:", error.message);
    return handleResponse(res, 500, "Server Error", { error: error.message });
  }
};

export const updateEducation = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return handleResponse(res, 400, "Invalid education ID");
    }

    const { name, address, qualification, gradeOrPercentage, yearOfCompletion } = req.body;

    const updatedEducation = await Education.findByIdAndUpdate(
      id,
      { name, address, qualification, gradeOrPercentage, yearOfCompletion },
      { new: true }
    );

    if (!updatedEducation) {
      return handleResponse(res, 404, "Education entry not found");
    }

    return handleResponse(res, 200, "Education entry updated successfully", updatedEducation);
  } catch (error) {
    console.error("Error updating education:", error.message);
    return handleResponse(res, 500, "Server Error", { error: error.message });
  }
};
export const deleteEducation = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedEducation = await Education.findByIdAndDelete(id);
    if (!deletedEducation) {
      return handleResponse(res, 404, "Education entry not found");
    }

    return handleResponse(res, 200, "Education entry deleted successfully");
  } catch (error) {
    console.error("Error deleting education:", error.message);
    return handleResponse(res, 500, "Server Error", { error: error.message });
  }
};
