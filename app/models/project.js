import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
    {
        projectImage: { type: String },
        projectName: { type: String, required: true },
        projectDescription: { type: String, required: true },
        // technologiesUsed: [{ type: String, required: true }],
        technologiesUsed: [
            {
                techStack: { type: mongoose.Schema.Types.ObjectId, ref: "TechStack", required: true },
                skillId: { type: mongoose.Schema.Types.ObjectId, required: true },
            },
        ],
        githubLink: { type: String },
        previewLink: { type: String },
    },
    { timestamps: true }
);

export default mongoose.model("Project", projectSchema);
