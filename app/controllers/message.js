import Message from "../models/message.js";
import { handleResponse } from "../utils/helper.js";

export const sendMessage = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    const newMessage = await Message.create({ name, email, message });

    return handleResponse(res, 201, "Message sent successfully", newMessage);
  } catch (error) {
    return handleResponse(res, 500, error.message);
  }
};

export const getMessages = async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    return handleResponse(res, 200, "Messages fetched successfully", messages);
  } catch (error) {
    return handleResponse(res, 500, error.message);
  }
};

export const replyMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const { reply } = req.body;

    const message = await Message.findById(id);
    if (!message) return handleResponse(res, 404, "Message not found");

    message.reply = reply;
    message.repliedAt = new Date();
    await message.save();

    return handleResponse(res, 200, "Reply sent successfully", message); 
  } catch (error) {
    return handleResponse(res, 500, error.message);
  }
};
