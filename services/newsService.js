const News = require("../models/News");

const createNews = async (newsData) => {
  try {
    const { section, priority } = newsData;
    const existingNews = await News.findOne({ section, priority });

    if (existingNews) {
      await News.updateOne({ _id: existingNews._id }, { priority: 0 });
    }

    const news = new News(newsData);
    await news.save();

    return news;
  } catch (error) {
    throw new Error("Error creating news: " + error.message);
  }
};

const getAllNews = async () => {
  try {
    const news = await News.find();
    return news;
  } catch (error) {
    throw new Error("Error fetching news: " + error.message);
  }
};

const getNewsById = async (id) => {
  try {
    const news = await News.findById(id); 
    if (!news) {
      return { message: "News not found" };
    }
    return news; 
  } catch (error) {
    console.error("Error fetching news:", error);
    throw new Error("Internal server error");
  }
};

const getNewsBySlug = async (slug) => {
  try {
    const news = await News.findOne({slug}); 
    if (!news) {
      return { message: "News not found" };
    }
    return news; 
  } catch (error) {
    console.error("Error fetching news:", error);
    throw new Error("Internal server error");
  }
};



const deleteNews = async (id) => {
  try {
    const news = await News.findByIdAndDelete(id);
    if (!news) {
      return { message: "News not found" };
    }
    return { message: "News deleted successfully" };
  } catch (error) {
    console.error("Error deleting news:", error);
    throw new Error("Internal server error");
  }
};

const updateNews = async (id, newsData) => {  
  try {
    const news = await News.findById(id);
    if (!news) {
      return { message: "News not found" };
    }

    const { section, priority } = newsData;

    const existingNews = await News.findOne({ section, priority });

    if (existingNews && existingNews._id.toString() !== news._id.toString()) {
      await News.findByIdAndUpdate(existingNews._id, { priority: 0 });
    }

    const updatedNews = await News.findByIdAndUpdate(
      id,
      { $set: newsData },
      { new: true }
    );

    return { message: "News updated successfully", updatedNews };
  } catch (error) {
    console.error("Error updating news:", error);
    throw new Error("Internal server error");
  }
};

module.exports = {
  createNews,
  getAllNews,
  getNewsById,
  deleteNews,
  updateNews,
  getNewsBySlug,
};
