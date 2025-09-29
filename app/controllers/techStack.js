import TechStack from "../models/techStack.js";
import { handleResponse } from "../utils/helper.js";

export const createTechStack = async (req, res) => {
  try {
    const newTechStack = new TechStack(req.body);
    const savedTechStack = await newTechStack.save();
    return handleResponse(res, 201, "TechStack created successfully", savedTechStack);
  } catch (error) {
    return handleResponse(res, 500, error.message);
  }
};

// GET all tech stack categories
export const getAllTechStacks = async (req, res) => {
  try {
    const techStacks = await TechStack.find();
    return handleResponse(res, 200, "TechStacks retrieved successfully", techStacks);
  } catch (error) {
    return handleResponse(res, 500, error.message);
  }
};

// GET a tech stack by ID
export const getTechStackById = async (req, res) => {
  try {
    const techStack = await TechStack.findById(req.params.id);
    if (!techStack) return handleResponse(res, 404, "TechStack not found");
    return handleResponse(res, 200, "TechStack retrieved successfully", techStack);
  } catch (error) {
    return handleResponse(res, 500, error.message);
  }
};

// UPDATE a tech stack by ID
export const updateTechStackById = async (req, res) => {
  try {
    const updatedTechStack = await TechStack.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedTechStack) return handleResponse(res, 404, "TechStack not found");
    return handleResponse(res, 200, "TechStack updated successfully", updatedTechStack);
  } catch (error) {
    return handleResponse(res, 500, error.message);
  }
};

// DELETE a tech stack by ID
export const deleteTechStackById = async (req, res) => {
  try {
    const deletedTechStack = await TechStack.findByIdAndDelete(req.params.id);
    if (!deletedTechStack) return handleResponse(res, 404, "TechStack not found");
    return handleResponse(res, 200, "TechStack deleted successfully");
  } catch (error) {
    return handleResponse(res, 500, error.message);
  }
};
