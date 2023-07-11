import React, { useState } from "react";
import axios from "axios";
import './AddRecommandation.css'
import Button from "../../components/Button/Button";

const AddRecommandation = () => {
  const [formData, setFormData] = useState({
    name: "",
    rating: "",
    message: "",
    avatar: null,
  });

  const handleChange = (e) => {
    if (e.target.name === "avatar") {
      setFormData({ ...formData, [e.target.name]: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const uploadImage = async (imageFile) => {
    try {
      const imageFormData = new FormData();
      imageFormData.append("avatar", imageFile);
  
      const response = await axios.post(
        "http://localhost:3001/uploads/portfolioImage/",
        imageFormData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
  
      console.log(response.data);
    } catch (error) {
      console.error(error);
      alert("Une erreur s'est produite lors du téléchargement de l'image. Veuillez réessayer.");
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3001/recommendations",
        {
          name: formData.name,
          note: formData.rating,
          message: formData.message
        }
      );

      console.log(response.data);

      setFormData({
        name: "",
        rating: "",
        message: "",
        avatar: null,
      });

      alert("Recommandation ajoutée avec succès !");
    } catch (error) {
      console.error(error);
      alert("Une erreur s'est produite. Veuillez réessayer.");
    }
  };

  return (
    <div className="recommandationHead">
      <h1 className="recommandationTitle">Ajouter une recommandation</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nom :</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Note :</label>
          <input
            type="number"
            name="rating"
            min="1"
            max="5"
            value={formData.rating}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Message :</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
          ></textarea>
        </div>
        <div>
          <label>Avatar :</label>
          <input
            type="file"
            name="avatar"
            accept="image/*"
            onChange={(e) => {
              handleChange(e);
              uploadImage(e.target.files[0]);
            }}
          />
        </div>
        <Button type="submit" text="Envoyer" />
      </form>
    </div>
  );
};

export default AddRecommandation;
