import Experience from "../models/experience.js";
import { handleResponse } from "../utils/helper.js";

// ✅ Create Experience
export const addExperience = async (req, res) => {
  try {
    const { role, company, duration, description } = req.body;
    const logo = req.file?.path;

    const experience = await Experience.create({
      role,
      company,
      duration,
      description,
      logo,
    });

    return handleResponse(res, 201, "Experience created successfully", experience);
  } catch (error) {
    return handleResponse(res, 500, error.message);
  }
};

// ✅ Get All Experiences
export const getAllExperience = async (req, res) => {
  try {
    const experiences = await Experience.find();
    return handleResponse(res, 200, "Fetched all experiences", experiences);
  } catch (error) {
    return handleResponse(res, 500, error.message);
  }
};

// ✅ Get Experience By ID
export const getExperienceById = async (req, res) => {
  try {
    const experience = await Experience.findById(req.params.id);
    if (!experience) {
      return handleResponse(res, 404, "Experience not found");
    }
    return handleResponse(res, 200, "Fetched experience", experience);
  } catch (error) {
    return handleResponse(res, 500, error.message);
  }
};

// ✅ Update Experience (PATCH)
export const updateExperience = async (req, res) => {
  try {
    const { role, company, duration, description } = req.body;
    const logo = req.file?.path;

    const experience = await Experience.findByIdAndUpdate(
      req.params.id,
      {
        role,
        company,
        duration,
        description,
        ...(logo && { logo }),
      },
      { new: true }
    );

    if (!experience) {
      return handleResponse(res, 404, "Experience not found");
    }

    return handleResponse(res, 200, "Experience updated successfully", experience);
  } catch (error) {
    return handleResponse(res, 500, error.message);
  }
};

// ✅ Delete Experience
export const deleteExperience = async (req, res) => {
  try {
    const experience = await Experience.findByIdAndDelete(req.params.id);
    if (!experience) {
      return handleResponse(res, 404, "Experience not found");
    }
    return handleResponse(res, 200, "Experience deleted successfully");
  } catch (error) {
    return handleResponse(res, 500, error.message);
  }
};
