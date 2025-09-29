import Testimonial from "../models/testimonial.js";
import { handleResponse } from "../utils/helper.js";

export const addTestimonial = async (req, res) => {
    try {
        const { name, role, testimonial } = req.body;
        const image = req.file?.path || null;

        const newTestimonial = await Testimonial.create({ name, role, testimonial, image });

        return handleResponse(res, 201, "Testimonial added successfully", newTestimonial);

    } catch (error) {
        console.error("Error adding testimonial:", error.message);
        return handleResponse(res, 500, error.message);
    }
}

export const getTestimonial = async (req, res) => {
    try {
        const testimonials = await Testimonial.find().sort({ createdAt: -1 });
        return handleResponse(res, 200, "Testimonials fetched successfully", testimonials);
    }   catch (error) {
        console.error("Error fetching testimonials:", error.message);
        return handleResponse(res, 500, error.message);
    }
}

export const updateTestimonial = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, role, testimonial } = req.body;
        const image = req.file?.path || null;

        const updateData = { name, role, testimonial };
        if (image) updateData.image = image;

        const updatedTestimonial = await Testimonial.findByIdAndUpdate(id, updateData, { new: true });

        if (!updatedTestimonial) {
            return handleResponse(res, 404, "Testimonial not found");
        }

        return handleResponse(res, 200, "Testimonial updated successfully", updatedTestimonial);

    } catch (error) {
        console.error("Error updating testimonial:", error.message);
        return handleResponse(res, 500, error.message);
    }
}

export const deleteTestimonial = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedTestimonial = await Testimonial.findByIdAndDelete(id);

        if (!deletedTestimonial) {
            return handleResponse(res, 404, "Testimonial not found");
        }   
        return handleResponse(res, 200, "Testimonial deleted successfully", deletedTestimonial);

    } catch (error) {
        console.error("Error deleting testimonial:", error.message);
        return handleResponse(res, 500, error.message);
    }   
}

