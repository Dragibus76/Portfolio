import React from "react";
import "./Tableau.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const handleDeleteEntry = async (id) => {
  if (window.confirm("Êtes-vous sûr de vouloir supprimer cette entrée ?")) {
    try {
      await axios.delete(`http://localhost:3001/portfolio/${id}`);
      window.location.reload();
    } catch (error) {
      console.log("Erreur lors de la suppression :", error);
    }
  }
};

const handleDeleteEntryRecommendations = async (id) => {
  if (window.confirm("Êtes-vous sûr de vouloir supprimer cette entrée ?")) {
    try {
      await axios.delete(`http://localhost:3001/recommendations/${id}`);
      window.location.reload();
    } catch (error) {
      console.log("Erreur lors de la suppression :", error);
    }
  }
};

const Tableau = ({
  data,
  useStyle1,
  categoryHeaderText,
  showDateHeader,
  pageActive,
}) => {
  if (useStyle1) {
    return (
      <table className="tableau-style1">
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  } else {
    return (
      <table className="tableau-style2">
        <thead>
          <tr>
            <th>Id</th>
            <th>Titre</th>
            {categoryHeaderText && <th>{categoryHeaderText}</th>}
            {showDateHeader && <th>Date</th>}
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.title}</td>
              {categoryHeaderText === "Note" && <td>{item.note}</td>}
              {categoryHeaderText === "Tags" && <td>{item.category}</td>}
              {showDateHeader && <td>{item.date}</td>}
              <td className="icons-dash">
                {pageActive === "portfolio" && (
                  <Link to={`/admin/dashboard/portfoliolist/${item.id}`}>
                    <FontAwesomeIcon icon={faEdit} className="edit-icon" />
                  </Link>
                )}
                {pageActive === "recommendations" && (
                  <Link to={`/admin/dashboard/recommendationslist/${item.id}`}>
                    <FontAwesomeIcon icon={faEdit} className="edit-icon" />
                  </Link>
                )}
                {pageActive === "portfolio" && (
                  <FontAwesomeIcon
                    icon={faTrashAlt}
                    className="delete-icon"
                    onClick={() => handleDeleteEntry(item.id)} // Add onClick handler for delete
                  />
                )}

                {pageActive === "recommendations" && (
                  <FontAwesomeIcon
                    icon={faTrashAlt}
                    className="delete-icon"
                    onClick={() => handleDeleteEntryRecommendations(item.id)} // Add onClick handler for delete
                  />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
};

export default Tableau;
