const Webinar = require("../models/Webinar");

const createWebinar = async (webinarData) => {
  try {
    const webinar = new Webinar(webinarData);
    await webinar.save();
    return webinar;
  } catch (error) {
    throw new Error("Error creating webinar: " + error.message);
  }
};

const getAllWebinars = async () => {
  try {
    return await Webinar.find();
  } catch (error) {
    throw new Error("Error fetching webinars: " + error.message);
  }
};

const getWebinarById = async (id) => {
  try {
    return await Webinar.findById(id);
  } catch (error) {
    throw new Error("Error fetching webinar: " + error.message);
  }
};

const updateWebinar = async (id, webinarData) => {
  try {
    const updatedWebinar = await Webinar.findByIdAndUpdate({_id:id}, webinarData, { new: true });
    return updatedWebinar;
  } catch (error) {
    throw new Error("Error updating webinar: " + error.message);
  }
};

const deleteWebinar = async (id) => {
  console.log(id)
  try {
    const deletedWebinar = await Webinar.findByIdAndDelete(id);
    return deletedWebinar;
  } catch (error) {
    throw new Error("Error deleting webinar: " + error.message);
  }
};

module.exports = {
  createWebinar,
  getAllWebinars,
  getWebinarById,
  updateWebinar,
  deleteWebinar,
};
