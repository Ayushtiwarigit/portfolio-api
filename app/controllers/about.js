import About from "../models/about.js";
import { handleResponse } from "../utils/helper.js";

// export const upsertAbout = async (req, res) => {
//   try {
//     const { aboutText, techStack } = req.body;
//     const image =
//       req.convertedFiles?.image && req.convertedFiles.image.length > 0
//         ? req.convertedFiles.image[0]
//         : null;

//     if (!aboutText) {
//       return handleResponse(res, 400, "About text is required");
//     }

//     const updateData = {
//       aboutText,
//       techStack: techStack
//         ? Array.isArray(techStack)
//           ? techStack
//           : JSON.parse(techStack)
//         : [],
//     };

//     if (image) updateData.image = image;
//     updateData.createdBy = req.user.id;

//     const about = await About.findOneAndUpdate({}, updateData, {
//       new: true,
//       upsert: true,
//     });

//     return handleResponse(res, 200, "About section saved successfully", about);
//   } catch (error) {
//     console.error("Error saving about:", error.message);
//     return handleResponse(res, 500, "Server Error", { error: error.message });
//   }
// };

export const upsertAbout = async (req, res) => {
  try {
    const { aboutText, techStack } = req.body;
    const image = req.file?.path || null;

    if (!aboutText) {
      return res.status(400).json({ message: "About text is required" });
    }

    let parsedTechStack = [];
    if (techStack) {
      try {
        parsedTechStack = Array.isArray(techStack)
          ? techStack
          : JSON.parse(techStack);
      } catch (err) {
        console.warn("TechStack parsing failed, using as string array");
        parsedTechStack = [techStack];
      }
    }

    const updateData = {
      aboutText,
      techStack: parsedTechStack,
    };

    if (image) updateData.image = image;
    updateData.createdBy = req.user.id;

    const about = await About.findOneAndUpdate({}, updateData, {
      new: true,
      upsert: true,
    });

    return res.status(200).json({
      message: "About section saved successfully",
      data: about,
    });
  } catch (error) {
    console.error("Error saving about:", error);
    return res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export const getAbout = async (req, res) => {
  try {
    const about = await About.findOne().populate("createdBy", "username email");

    if (!about) {
      return handleResponse(res, 404, "About section not found");
    }

    return handleResponse(res, 200, "About section fetched successfully", about);
  } catch (error) {
    console.error("Error fetching about:", error.message);
    return handleResponse(res, 500, "Server Error", { error: error.message });
  }
};
