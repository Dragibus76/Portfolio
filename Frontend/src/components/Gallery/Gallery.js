import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDay } from "@fortawesome/free-solid-svg-icons";
import "./Gallery.css";

const formatDate = (dateString) => {
  const options = { day: "numeric", month: "long", year: "numeric" };
  const date = new Date(dateString);
  return date.toLocaleDateString(undefined, options);
};

const Gallery = ({ portfolioData }) => {
  const itemsPerPage = 12;
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTag, setSelectedTag] = useState("");
  const [sortType, setSortType] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [activeButton, setActiveButton] = useState("");


  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSort = (type) => {
    if (sortType === type) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortType(type);
      setSortOrder("asc");
    }
  
    setActiveButton(type);
  };
  
  const handleTagFilter = (tag) => {
    setSelectedTag(tag);
    setActiveButton(tag);
  };
  

  const sortPortfolioData = (data, type, order) => {
    let sortedData = [...data];

    if (type === "name") {
      sortedData.sort((a, b) => {
        if (order === "asc") {
          return a.title.localeCompare(b.title);
        } else {
          return b.title.localeCompare(a.title);
        }
      });
    } else if (type === "date") {
      sortedData.sort((a, b) => {
        if (order === "asc") {
          return new Date(a.date) - new Date(b.date);
        } else {
          return new Date(b.date) - new Date(a.date);
        }
      });
    }

    return sortedData;
  };

  const filteredItems = selectedTag
    ? portfolioData.filter((item) => item.category.includes(selectedTag))
    : portfolioData;
  const sortedItems = sortPortfolioData(filteredItems, sortType, sortOrder);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedItems.slice(indexOfFirstItem, indexOfLastItem);

  const pageNumbers = Math.ceil(sortedItems.length / itemsPerPage);

  return (
    <div className="gallery-container">
      <div className="gallery">
        <div className="sort-options">
        <button
  onClick={() => handleSort("name")}
  className={activeButton === "name" ? "active" : ""}
>
  Trier par nom
</button>
<button
  onClick={() => handleSort("date")}
  className={activeButton === "date" ? "active" : ""}
>
  Trier par date
</button>
        </div>
        <div className="tag-options">
          <button onClick={() => handleTagFilter("")} className={selectedTag === "" ? "active" : ""}>
            Tous
          </button>
          {Array.from(new Set(portfolioData.flatMap((item) => item.category))).map((tag) => (
            <button
              key={tag}
              onClick={() => handleTagFilter(tag)}
              className={selectedTag === tag ? "active" : ""}
            >
              {tag}
            </button>
          ))}
        </div>
        {currentItems.map((item) => (
          <Link to={`/portfolio/${item.id}`} className="gallery-item" key={item.id}>
            <div className="card-image">
            
              <img
                src={`http://localhost:3001/uploads/portfolioImage/${item.image[0]}`}
                alt={item.title}
              />
            </div>
            <div className="card-details">
      
              <div className="date-container">
              <p className="TileCard">{item.title}</p>
                <p className="date">{formatDate(item.date)}</p>
                
              </div>
              <div className="tags">
                {item.category.map((category) => (
                  <span key={category} className="tag">
                    {category}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>
      <div className="pagination">
        {Array.from({ length: pageNumbers }, (_, index) => index + 1).map((pageNumber) => (
          <button
            key={pageNumber}
            className={pageNumber === currentPage ? "active" : ""}
            onClick={() => handlePageChange(pageNumber)}
          >
            {pageNumber}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
