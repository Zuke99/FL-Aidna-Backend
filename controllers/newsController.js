const newsService = require("../services/newsService");

const createNews = async (req, res) => {
  try {
    const newsData = req.body;
    const news = await newsService.createNews(newsData);
    return res.status(201).json({ message: "News created successfully", news });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

const getAllNews = async (req, res) => {
  try {
    const news = await newsService.getAllNews();
    return res.status(200).json(news);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

const getNewsById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "ID is required" });
    }

    const result = await newsService.getNewsById(id);

    if (result.message === "News not found") {
      return res.status(404).json(result);
    }

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteNews = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "ID is required" });
    }

    const result = await newsService.deleteNews(id);

    if (result.message === "News not found") {
      return res.status(404).json(result);
    }

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateNews = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "ID is required" });
    }

    const newsData = req.body;
    const result = await newsService.updateNews(id, newsData);

    if (result.message === "News not found") {
      return res.status(404).json(result);
    }

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createNews,
  getAllNews,
  getNewsById,
  deleteNews,
  updateNews
};
