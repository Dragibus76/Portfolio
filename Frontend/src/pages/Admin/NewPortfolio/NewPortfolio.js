import React, { useState } from "react";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus} from "@fortawesome/free-solid-svg-icons";
import "react-datepicker/dist/react-datepicker.css";
import "./NewPortfolio.css";
import Button from "../../../components/Button/Button";

const NewPortfolio = () => {
  const [title, setTitle] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [categoryInput, setCategoryInput] = useState("");
  const [link, setLink] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [author, setAuthor] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const availableCategories = [
    "HTML",
    "CSS",
    "JavaScript",
    "React JS",
    "UX / UI",
    "Graphisme",
    "Web Design",
    "Illustration",
  ];

  const handleCategoryClick = (category) => {
    if (!selectedCategories.includes(category)) {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const handleRemoveCategory = (category) => {
    setSelectedCategories(selectedCategories.filter((cat) => cat !== category));
  };

  const handleCategoryChange = (e) => {
    setCategoryInput(e.target.value);
    if (e.target.value.trim() !== "") {
      setSelectedCategories([e.target.value.trim()]);
    } else {
      setSelectedCategories([]);
    }
  };

  const handleLinkChange = (e) => {
    setLink(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleImageChange = (e) => {
    const files = e.target.files;
    const updatedImages = [];
    for (let i = 0; i < files.length; i++) {
      updatedImages.push(files[i]);
    }
    setImages(updatedImages);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !title ||
      selectedCategories.length === 0 ||
      !link ||
      !description ||
      images.length === 0 ||
      !selectedDate ||
      !author
    ) {
      setErrorMessage("Veuillez remplir tous les champs requis.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", JSON.stringify(selectedCategories));
    formData.append("link", link);
    formData.append("description", description);
    formData.append("date", selectedDate);
    formData.append("author", author);
    for (let i = 0; i < images.length; i++) {
      formData.append("image[]", images[i], images[i].name);
    }

    fetch("http://localhost:3001/portfolio", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Réponse du serveur :", data);
        if (data.message) {
          setSuccessMessage(data.message);
          setTimeout(() => {
            window.location.href = "http://localhost:3000/admin/dashboard";
          }, 2000);
        } else if (data.error) {
          setErrorMessage(data.error);
        }
        // Réinitialiser les champs du formulaire
        setTitle("");
        setSelectedCategories([]);
        setCategoryInput("");
        setLink("");
        setDescription("");
        setImages([]);
        setSelectedDate(null);
        setAuthor("");
      })
      .catch((error) => {
        console.error("Erreur lors de l'envoi des données :", error);
        setErrorMessage("Une erreur s'est produite lors de l'envoi des données.");
      });
  };

  return (
    <>
    <div className="container">
      <div className="form">
      <div className="form-header">
      </div>
        <h1>Nouveau Portfolio
        </h1>
        {successMessage && <div className="success-message">{successMessage}</div>}
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Titre :</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="category">Catégorie :</label>
            <div className="category-selection">
              <input
                type="text"
                value={categoryInput}
                onChange={handleCategoryChange}
              />
              <ul className="category-list">
                {availableCategories.map((category) => (
                  <li
                    key={category}
                    className={selectedCategories.includes(category) ? "selected" : ""}
                    onClick={() => handleCategoryClick(category)}
                  >
                    {category}
                  </li>
                ))}
              </ul>
            </div>
            {selectedCategories.length > 0 && (
              <div className="selected-category">
                {selectedCategories.map((category) => (
                  <span key={category} className="category">
                    {category}
                    <button
                      type="button"
                      className="remove-category"
                      onClick={() => handleRemoveCategory(category)}
                    >
                      &times;
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="link">Lien :</label>
            <input
              type="text"
              id="link"
              value={link}
              onChange={handleLinkChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description :</label>
            <textarea
              id="description"
              value={description}
              onChange={handleDescriptionChange}
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="date">Date :</label>
            <DatePicker
              id="date"
              selected={selectedDate}
              onChange={handleDateChange}
              dateFormat="dd/MM/yyyy"
              placeholderText="Sélectionner une date"
            />
          </div>
          <div className="form-group">
            <label htmlFor="image">Images :</label>
            <input
              type="file"
              id="image"
              multiple
              onChange={handleImageChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="author">Auteur :</label>
            <input
              type="text"
              id="author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
          </div>
          <Button type="submit" text="Envoyer" />
        </form>
      </div>
    </div>
    </>
  );
};

export default NewPortfolio;
