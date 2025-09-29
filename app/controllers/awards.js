import Awards from "../models/awards.js";
import { handleResponse } from "../utils/helper.js";

export const addAward = async (req, res) => {
    try {
        const { title, description, date } = req.body;
        const image = req.file?.path || null;


        const newAward = await Awards.create({ title, description, date, image });

        return handleResponse(res, 201, "Award added successfully", newAward);

    } catch (error) {
        console.error("Error adding award:", error.message);
        return handleResponse(res, 500, error.message);
    }
}

export const getAward = async (req,res) => {
    try {
        const awards = await Awards.find().sort({ createdAt: -1 });
        return handleResponse(res, 200, "Awards fetched successfully", awards);
    } catch (error) {
        console.error("Error fetching awards:", error.message);
        return handelResponse(res, 500, error.message);
    }
}

export const updateAward = async (req,res ) => {
    try {
        const { id } = req.params;
        const { title, description, date } = req.body;
        const image = req.file?.path || null;

        const updateData = { title, description, date };
        if (image) updateData.image = image;

        const updatedAward = await Awards.findByIdAndUpdate(id, updateData, { new: true });

        if (!updatedAward) {
            return handleResponse(res, 404, "Award not found");
        }

        return handleResponse(res, 200, "Award updated successfully", updatedAward);

    } catch (error) {
        console.error("Error updating award:", error.message);
        return handleResponse(res, 500, error.message);
    }
}

export const deleteAward = async (req,res) => {
    try {
        const { id } = req.params;
        const deletedAward = await Awards.findByIdAndDelete(id);

        if (!deletedAward) {
            return handleResponse(res, 404, "Award not found");
        }

        return handleResponse(res, 200, "Award deleted successfully");

    } catch (error) {
        console.error("Error deleting award:", error.message);
        return handleResponse(res, 500, error.message);
    }
}