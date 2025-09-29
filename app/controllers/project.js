import Project from "../models/project.js";
import TechStack from "../models/techStack.js";
import { handleResponse } from "../utils/helper.js";

export const addProject = async (req, res) => {
    try {
        const { projectName, projectDescription, technologiesUsed, githubLink, previewLink } = req.body;

        const projectImage = req.file?.path;

        // if (!projectImage) {
        //     return handleResponse(res, 400, "Project image is required");
        // }

        let parsedTech = [];
        if (technologiesUsed) {
            let techArray = technologiesUsed;

            if (typeof techArray === "string") {
                try {
                    techArray = JSON.parse(techArray);

                    if (typeof techArray === "string") {
                        techArray = JSON.parse(techArray);
                    }
                } catch (err) {
                    return handleResponse(res, 400, "Invalid JSON format for technologiesUsed");
                }
            }

            if (!Array.isArray(techArray)) {
                return handleResponse(res, 400, "technologiesUsed must be an array");
            }

            for (let i = 0; i < techArray.length; i++) {
                const item = techArray[i];
                if (!item.techStack || !item.skillId) {
                    return handleResponse(res, 400, `technologiesUsed[${i}] must include techStack and skillId`);
                }

                const stack = await TechStack.findById(item.techStack);
                if (!stack) return handleResponse(res, 400, `TechStack ${item.techStack} not found`);

                const skill = stack.skills.id(item.skillId);
                if (!skill) return handleResponse(res, 400, `Skill ${item.skillId} not found in ${stack.category}`);
            }

            parsedTech = techArray;
        }



        const project = await Project.create({
            projectImage,
            projectName,
            projectDescription,
            technologiesUsed: parsedTech,
            githubLink,
            previewLink,
        });

        return handleResponse(res, 201, "Project created successfully", project);
    } catch (error) {
        return handleResponse(res, 500, error.message);
    }
};

export const getProjects = async (req, res) => {
  try {
    const { skillName, category } = req.query; // e.g., ?skillName=HTML&category=Frontend

    const projects = await Project.find().sort({ createdAt: -1 });

    const formattedProjects = await Promise.all(
      projects.map(async (project) => {
        const formattedTechs = [];

        for (const tech of project.technologiesUsed) {
          if (!tech.techStack || !tech.skillId) continue;

          const stack = await TechStack.findById(tech.techStack);
          if (!stack) continue;

          const skillObj = stack.skills.id(tech.skillId);
          if (!skillObj) continue;

          formattedTechs.push({
            techStack: {
              _id: stack._id,
              category: stack.category,
            },
            skill: {
              _id: skillObj._id,
              name: skillObj.name,
              level: skillObj.level,
            },
          });
        }

        return {
          _id: project._id,
          projectImage: project.projectImage,
          projectName: project.projectName,
          projectDescription: project.projectDescription,
          technologiesUsed: formattedTechs,
          githubLink: project.githubLink,
          previewLink: project.previewLink,
        };
      })
    );

    // Separate filters
    let filteredProjects = formattedProjects;

    if (skillName && category) {
      filteredProjects = formattedProjects.filter((project) =>
        project.technologiesUsed.some(
          (tech) =>
            tech.skill.name.toLowerCase() === skillName.toLowerCase() &&
            tech.techStack.category.toLowerCase() === category.toLowerCase()
        )
      );
    } else if (skillName) {
      filteredProjects = formattedProjects.filter((project) =>
        project.technologiesUsed.some(
          (tech) => tech.skill.name.toLowerCase() === skillName.toLowerCase()
        )
      );
    } else if (category) {
      filteredProjects = formattedProjects.filter((project) =>
        project.technologiesUsed.some(
          (tech) =>
            tech.techStack.category.toLowerCase() === category.toLowerCase()
        )
      );
    }

    return handleResponse(
      res,
      200,
      "Projects fetched successfully",
      filteredProjects
    );
  } catch (error) {
    return handleResponse(res, 500, error.message);
  }
};

export const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return handleResponse(res, 404, "Project not found");
    }

    const formattedTechs = [];

    for (const tech of project.technologiesUsed) {
      if (!tech.techStack || !tech.skillId) continue;

      const stack = await TechStack.findById(tech.techStack);
      if (!stack) continue;

      const skill = stack.skills.id(tech.skillId);
      if (!skill) continue;

      formattedTechs.push({
        techStack: { _id: stack._id, category: stack.category },
        skill: { _id: skill._id, name: skill.name, level: skill.level },
      });
    }

    const formattedProject = {
      _id: project._id,
      projectImage: project.projectImage,
      projectName: project.projectName,
      projectDescription: project.projectDescription,
      technologiesUsed: formattedTechs,
      githubLink: project.githubLink,
      previewLink: project.previewLink,
    };

    return handleResponse(res, 200, "Project fetched successfully", formattedProject);
  } catch (error) {
    return handleResponse(res, 500, error.message);
  }
};

export const updateProject = async (req, res) => {
  try {
    const { projectName, projectDescription, technologiesUsed, githubLink, previewLink } = req.body;

    const updateData = {
      projectName,
      projectDescription,
      githubLink,
      previewLink,
    };

    if (req.file?.path) {
      updateData.projectImage = req.file.path;
    }

    if (technologiesUsed) {
      let techArray = technologiesUsed;

      if (typeof techArray === "string") {
        try {
          techArray = JSON.parse(techArray);

          if (typeof techArray === "string") {
            techArray = JSON.parse(techArray);
          }
        } catch (err) {
          return handleResponse(res, 400, "Invalid JSON format for technologiesUsed");
        }
      }

      if (!Array.isArray(techArray)) {
        return handleResponse(res, 400, "technologiesUsed must be an array");
      }

      for (const [i, item] of techArray.entries()) {
        if (!item.techStack || !item.skillId) {
          return handleResponse(res, 400, `technologiesUsed[${i}] must include techStack and skillId`);
        }

        const stack = await TechStack.findById(item.techStack);
        if (!stack) return handleResponse(res, 400, `TechStack ${item.techStack} not found`);

        const skill = stack.skills.id(item.skillId);
        if (!skill) return handleResponse(res, 400, `Skill ${item.skillId} not found in ${stack.category}`);
      }

      updateData.technologiesUsed = techArray;
    }

    const project = await Project.findByIdAndUpdate(req.params.id, updateData, { new: true });

    if (!project) {
      return handleResponse(res, 404, "Project not found");
    }

    return handleResponse(res, 200, "Project updated successfully", project);
  } catch (error) {
    return handleResponse(res, 500, error.message);
  }
};

export const deleteProject = async (req, res) => {
    try {
        const project = await Project.findByIdAndDelete(req.params.id);

        if (!project) {
            return handleResponse(res, 404, "Project not found");
        }

        return handleResponse(res, 200, "Project deleted successfully", project);
    } catch (error) {
        return handleResponse(res, 500, error.message);
    }
};
