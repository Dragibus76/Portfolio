import React, { useState, useEffect } from "react";
import emailjs from "emailjs-com";
import Button from "../../components/Button/Button";
import "./Contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalType, setModalType] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Vérification des champs
    if (!formData.name || !formData.email || !formData.message) {
      setModalType("error");
      setModalMessage("Veuillez remplir tous les champs.");
      setShowModal(true);
      return;
    }

    // Envoi de l'e-mail
    emailjs
      .send("service_n3chhxl", "template_ytcn84i", formData, "ZFOPm1ciNizht0Ais")
      .then(() => {
        setModalType("success");
        setModalMessage("Votre e-mail a été envoyé avec succès !");
        setShowModal(true);
      })
      .catch((error) => {
        setModalType("error");
        setModalMessage("Une erreur s'est produite. Veuillez réessayer.");
        setShowModal(true);
      });

    // Réinitialisation du formulaire
    setFormData({
      name: "",
      email: "",
      message: "",
    });
  };

  useEffect(() => {
    if (showModal) {
      setTimeout(() => {
        setShowModal(false);
      }, 3000);
    }
  }, [showModal]);

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="contact-container">
      <h1 className="contact-title">Contactez-moi</h1>
      <div className="contact-content">
        <div className="contact-text">
          <p>Vous avez des questions ou des commentaires ? N'hésitez pas à me contacter en utilisant le formulaire ci-dessous :</p>
        </div>
        <div className="contact-form">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Nom" />
            </div>
            <div className="form-group">
              <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
            </div>
            <div className="form-group">
              <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Message"></textarea>
            </div>
            <Button type="submit" text="Envoyer" />
          </form>
        </div>
      </div>
      {showModal && (
        <div className={`modal ${modalType === "success" ? "success" : "error"}`}>
          <div className="modal-content">
            <p className={modalType === "error" ? "modal-error" : "modal-success"}>{modalMessage}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Contact;
