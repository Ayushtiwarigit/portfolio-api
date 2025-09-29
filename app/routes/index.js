import userRoutes from "./user.js";
import aboutRoutes from "./about.js";
import educationRoutes from "./education.js";
import experienceRoutes from "./experience.js";
import techStackRoutes from "./techStack.js";
import projectRoutes from "./project.js";
import contactRoutes from "./contact.js";
import messageRoutes from "./message.js";
import awardRoutes from "./awards.js";
import testimonialRoutes from "./testimonial.js";

const setupRoutes = (app) => {
    app.use("/api/v1/user", userRoutes);
    app.use("/api/v1/about", aboutRoutes);
    app.use("/api/v1/education", educationRoutes);
    app.use("/api/v1/experience", experienceRoutes);
    app.use("/api/v1/tech-stack", techStackRoutes);
    app.use("/api/v1/project", projectRoutes);
    app.use("/api/v1/contact", contactRoutes);
    app.use("/api/v1/message", messageRoutes);
    app.use("/api/v1/awards", awardRoutes);
    app.use("/api/v1/testimonials", testimonialRoutes);
};

export default setupRoutes;
