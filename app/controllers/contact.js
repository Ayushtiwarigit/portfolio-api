import Contact from "../models/contact.js";
import { handleResponse } from "../utils/helper.js";

export const createContact = async (req, res) => {
  try {
    const contact = await Contact.create(req.body);
    return handleResponse(res, 201, "Contact created successfully", contact);
  } catch (error) {
    return handleResponse(res, 500, error.message);
  }
};

export const getContact = async (req, res) => {
  try {
    const contact = await Contact.findOne().sort({ createdAt: -1 });
    return handleResponse(res, 200, "Contact fetched successfully", contact);
  } catch (error) {
    return handleResponse(res, 500, error.message);
  }
};

export const updateContact = async (req, res) => {
  try {
    const { id } = req.params;
    const contact = await Contact.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!contact) return handleResponse(res, 404, "Contact not found");
    return handleResponse(res, 200, "Contact updated successfully", contact);
  } catch (error) {
    return handleResponse(res, 500, error.message);
  }
};

export const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;
    const contact = await Contact.findByIdAndDelete(id);
    if (!contact) return handleResponse(res, 404, "Contact not found");
    return handleResponse(res, 200, "Contact deleted successfully", contact);
  } catch (error) {
    return handleResponse(res, 500, error.message);
  }
};
