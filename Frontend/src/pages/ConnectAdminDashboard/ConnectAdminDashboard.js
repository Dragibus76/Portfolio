import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ConnectAdminDashboard.css";
import Logo from '../../assets/images/logo/CodeDragi.png';
import Button from "../../components/Button/Button";

const ConnectAdminDashboard = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    // Vérifier les informations d'identification ici
    // Par exemple, vous pouvez utiliser une API pour authentifier les utilisateurs

    // Simulons une authentification réussie si le nom d'utilisateur est "admin" et le mot de passe est "password"
    if (username === "admin" && password === "password") {
      localStorage.setItem("loggedIn", "true"); // Enregistrer l'état de connexion dans le stockage local
      navigate("/admin/dashboard"); // Rediriger vers la page Admin
    } else {
      alert("Identifiants incorrects");
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <>
      <div className="centered-form">
        <div className="form-container">
          <h1>PANNEAU ADMIN</h1>
          <img src={Logo} className="AdminLogo" />
          <div>
            <input
              className="admininput-username"
              type="text"
              placeholder="Nom d'utilisateur"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyPress={handleKeyPress} // Ajout du gestionnaire d'événements sur le champ de saisie
            />
            <input
              className="admininput-password"
              type="password"
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={handleKeyPress} // Ajout du gestionnaire d'événements sur le champ de saisie
            />
             <Button type="submit" text="Connexion" onClick={handleLogin} />
            {/* <button onClick={handleLogin}>Connexion</button> */}
          </div>
        </div>
      </div>
    </>
  );
};
// onClick={handleLogin}

export default ConnectAdminDashboard;
