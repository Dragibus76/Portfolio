const express = require("express");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const fs = require("fs");

const app = express();
const port = 3001;

app.use(cors());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/portfolioImage");
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(" ").join("-");
    cb(null, fileName);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(new Error("Seuls les fichiers PNG, JPG et JPEG sont autorisés."));
    }
  },
});

app.use(express.json());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));


app.get("/recommendations", (req, res) => {
  try {
    const recommendationsData = fs.readFileSync(
      path.join(__dirname, "recommendations.json")
    );

    let recommendations = JSON.parse(recommendationsData);
    recommendations.sort((a, b) => a.id - b.id);
    res.status(200).json(recommendations);
  } catch (err) {
    console.error("Erreur lors de la lecture du fichier JSON :", err);
    res.status(500).json({ error: "Erreur lors de la lecture des données." });
  }
});

app.get("/recommendations/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const recommendationsData = fs.readFileSync(
    path.join(__dirname, "recommendations.json")
  );
  const recommendations = JSON.parse(recommendationsData);
  const recommendation = recommendations.find((item) => item.id === id);

  if (recommendation) {
    res.json(recommendation);
  } else {
    res.status(404).json({ error: "Recommandation non trouvée" });
  }
});

app.post("/recommendations", upload.single("avatar"), (req, res) => {
  const { name, message, note } = req.body;
  const avatar = req.file ? req.file.filename : null;

  let recommendations = [];
  try {
    const recommendationsData = fs.readFileSync(
      path.join(__dirname, "recommendations.json")
    );
    recommendations = JSON.parse(recommendationsData);
  } catch (err) {
    console.error("Erreur lors de la lecture du fichier JSON :", err);
  }

  const id = recommendations.length + 1;

  const newRecommendation = {
    id,
    name,
    message,
    note,
    avatar,
  };
  recommendations.push(newRecommendation);

  try {
    fs.writeFileSync(
      path.join(__dirname, "recommendations.json"),
      JSON.stringify(recommendations, null, 2)
    );
    console.log("Recommandation ajoutée avec succès !");
    res.status(200).json({ message: "Recommandation ajoutée avec succès !" });
  } catch (err) {
    console.error("Erreur lors de l'enregistrement des données :", err);
    res.status(500).json({ error: "Erreur lors de l'enregistrement des données." });
  }
});

app.delete("/recommendations/:id", (req, res) => {
  const id = req.params.id;
  const recommendationsData = fs.readFileSync(
    path.join(__dirname, "recommendations.json")
  );
  let recommendations = JSON.parse(recommendationsData);
  const entryIndex = recommendations.findIndex(
    (item) => item.id.toString() === id
  );

  if (entryIndex !== -1) {
    recommendations.splice(entryIndex, 1);

    fs.writeFileSync(
      path.join(__dirname, "recommendations.json"),
      JSON.stringify(recommendations, null, 2)
    );

    res.json({ message: "Recommandation supprimée avec succès" });
  } else {
    res.json({ error: "Recommandation non trouvée" });
  }
});

app.put("/recommendations/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { name, message, note } = req.body;

  try {
    const recommendationsData = fs.readFileSync(
      path.join(__dirname, "recommendations.json")
    );
    let recommendations = JSON.parse(recommendationsData);
    const entryIndex = recommendations.findIndex((item) => item.id === id);

    if (entryIndex !== -1) {
      recommendations[entryIndex].name = name;
      recommendations[entryIndex].message = message;
      recommendations[entryIndex].note = note;

      fs.writeFileSync(
        path.join(__dirname, "recommendations.json"),
        JSON.stringify(recommendations, null, 2)
      );

      console.log("Recommandation mise à jour avec succès !");
      res.status(200).json({ message: "Recommandation mise à jour avec succès !" });
    } else {
      res.status(404).json({ error: "Recommandation non trouvée" });
    }
  } catch (err) {
    console.error("Erreur lors de la mise à jour des données :", err);
    res.status(500).json({ error: "Erreur lors de la mise à jour des données." });
  }
});


app.get("/portfolio", (req, res) => {
  try {
    const portfolioData = fs.readFileSync(
      path.join(__dirname, "portfolio.json")
    );
    let portfolio = JSON.parse(portfolioData);
    portfolio.sort((a, b) => a.id - b.id);
    res.status(200).json(portfolio);
  } catch (err) {
    console.error("Erreur lors de la lecture du fichier JSON :", err);
    res.status(500).json({ error: "Erreur lors de la lecture des données." });
  }
});

app.post("/portfolio", upload.array("image[]", 5), (req, res) => {
  const { title, category, link, date, author, description } = req.body;
  const images = req.files ? req.files.map((file) => file.filename) : [];
  const categories = req.body.category ? req.body.category.split(",") : [];

  let portfolio = [];
  try {
    const portfolioData = fs.readFileSync(
      path.join(__dirname, "portfolio.json")
    );
    portfolio = JSON.parse(portfolioData);
  } catch (err) {
    console.error("Erreur lors de la lecture du fichier JSON :", err);
  }

  const id = portfolio.length + 1;

  const newPortfolioEntry = {
    id,
    title,
    image: images,
    category: JSON.parse(categories),
    link,
    date,
    author,
    description,
  };
  portfolio.push(newPortfolioEntry);

  try {
    fs.writeFileSync(
      path.join(__dirname, "portfolio.json"),
      JSON.stringify(portfolio, null, 2)
    );
    console.log("Entrée de portfolio ajoutée avec succès !");
    res.status(200).json({ message: "Entrée de portfolio ajoutée avec succès !" });
  } catch (err) {
    console.error("Erreur lors de l'enregistrement des données :", err);
    res.status(500).json({ error: "Erreur lors de l'enregistrement des données." });
  }
});

app.get("/portfolio/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const portfolioData = fs.readFileSync(path.join(__dirname, "portfolio.json"));
  const portfolio = JSON.parse(portfolioData);
  const entry = portfolio.find((item) => item.id === id);

  if (entry) {
    res.json(entry);
  } else {
    res.json({ error: "Entrée du portfolio non trouvée" });
  }
});

app.delete("/portfolio/:id", (req, res) => {
  const id = req.params.id;
  const portfolioData = fs.readFileSync(path.join(__dirname, "portfolio.json"));
  let portfolio = JSON.parse(portfolioData);
  const entryIndex = portfolio.findIndex((item) => item.id.toString() === id);

  if (entryIndex !== -1) {
    portfolio.splice(entryIndex, 1);

    fs.writeFileSync(
      path.join(__dirname, "portfolio.json"),
      JSON.stringify(portfolio, null, 2)
    );

    res.json({ message: "Entrée du portfolio supprimée avec succès" });
  } else {
    res.json({ error: "Entrée du portfolio non trouvée" });
  }
});

app.put("/portfolio/:id", upload.array("image[]", 5), (req, res) => {
  const id = parseInt(req.params.id);
  const { title, category, link, date, author, description } = req.body;
  const images = req.files ? req.files.map((file) => file.filename) : [];
  const categories = req.body.category ? req.body.category.split(",") : [];

  try {
    const portfolioData = fs.readFileSync(
      path.join(__dirname, "portfolio.json")
    );
    let portfolio = JSON.parse(portfolioData);
    const entryIndex = portfolio.findIndex((item) => item.id === id);

    if (entryIndex !== -1) {
      const updatedEntry = {
        id,
        title,
        image: images,
        category: JSON.parse(categories),
        link,
        date,
        author,
        description,
      };

      portfolio[entryIndex] = updatedEntry;

      fs.writeFileSync(
        path.join(__dirname, "portfolio.json"),
        JSON.stringify(portfolio, null, 2)
      );

      console.log("Entrée du portfolio mise à jour avec succès !");
      res.status(200).json({ message: "Entrée du portfolio mise à jour avec succès !" });
    } else {
      res.status(404).json({ error: "Entrée du portfolio non trouvée" });
    }
  } catch (err) {
    console.error("Erreur lors de la mise à jour des données :", err);
    res.status(500).json({ error: "Erreur lors de la mise à jour des données." });
  }
});

app.listen(port, () => {
  console.log(`Serveur backend en cours d'exécution sur le port ${port}`);
});
