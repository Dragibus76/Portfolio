import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./PortfolioListId.css";
import Button from '../../../components/Button/Button'

const PortfolioListId = () => {
  const { id } = useParams();

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
  const [formErrors, setFormErrors] = useState({});

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

  useEffect(() => {
    // Effectuez ici une requête pour récupérer les données du portfolio avec l'ID spécifié
    fetch(`http://localhost:3001/portfolio/${id}`)
      .then((response) => response.json())
      .then((data) => {
        const { title, category, link, description, date, author } = data;
        setTitle(title);
        setSelectedCategories(category);
        setLink(link);
        setDescription(description);
        setSelectedDate(new Date(date));
        setAuthor(author);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des données :", error);
        setErrorMessage("Une erreur s'est produite lors de la récupération des données.");
      });
  }, [id]);

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

  const validateForm = () => {
    const errors = {};

    if (title.trim() === "") {
      errors.title = "Le champ Titre est obligatoire";
    }

    if (selectedCategories.length === 0) {
      errors.category = "Veuillez sélectionner au moins une catégorie";
    }

    if (link.trim() === "") {
      errors.link = "Le champ Lien est obligatoire";
    }

    if (description.trim() === "") {
      errors.description = "Le champ Description est obligatoire";
    }

    if (selectedDate === null) {
      errors.date = "Veuillez sélectionner une date";
    }

    if (images.length === 0) {
      errors.image = "Veuillez sélectionner au moins une image";
    }

    if (author.trim() === "") {
      errors.author = "Le champ Auteur est obligatoire";
    }

    setFormErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const isFormValid = validateForm();

    if (isFormValid) {
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

      fetch(`http://localhost:3001/portfolio/${id}`, {
        method: "PUT",
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
        })
        .catch((error) => {
          console.error("Erreur lors de l'envoi des données :", error);
          setErrorMessage("Une erreur s'est produite lors de l'envoi des données.");
        });
    } else {
      setErrorMessage("Veuillez remplir tous les champs obligatoires");
    }
  };

  return (
    <>
   
    
    <div className="container">
      
      <div className="form">
        
        <h1>Modifier l'entrée du portfolio</h1>
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
            {formErrors.title && <div className="error">{formErrors.title}</div>}
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
            {formErrors.category && <div className="error">{formErrors.category}</div>}
          </div>
          <div className="form-group">
            <label htmlFor="link">Lien :</label>
            <input
              type="text"
              id="link"
              value={link}
              onChange={handleLinkChange}
            />
            {formErrors.link && <div className="error">{formErrors.link}</div>}
          </div>
          <div className="form-group">
            <label htmlFor="description">Description :</label>
            <textarea
              id="description"
              value={description}
              onChange={handleDescriptionChange}
            ></textarea>
            {formErrors.description && <div className="error">{formErrors.description}</div>}
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
            {formErrors.date && <div className="error">{formErrors.date}</div>}
          </div>
          <div className="form-group">
            <label htmlFor="image">Images :</label>
            <input
              type="file"
              id="image"
              multiple
              onChange={handleImageChange}
            />
            {formErrors.image && <div className="error">{formErrors.image}</div>}
          </div>
          <div className="form-group">
            <label htmlFor="author">Auteur :</label>
            <input
              type="text"
              id="author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
            {formErrors.author && <div className="error">{formErrors.author}</div>}
          </div>
          <Button type="submit" text="Enregister" />
        </form>
      </div>
    </div>
    </>
  );
};

export default PortfolioListId;
