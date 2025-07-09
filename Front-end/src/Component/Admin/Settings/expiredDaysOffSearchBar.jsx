import React, { useState } from "react";
import "../../../Styles/admin/searchBar.css";

export default function ExpiredDaysOffSearchBar({
  setSearchTerm,
  setSearchOption,
}) {
  const [searchInput, setSearchInput] = useState("");
  const [selectedOption, setSelectedOption] = useState(0);

  const handleOptionChange = (e) => {
    const option = Number(e.target.value);
    setSelectedOption(option);
    setSearchOption(option);
    setSearchInput("");
    setSearchTerm("");
  };

  const handleSearchChange = (e) => {
    setSearchInput(e.target.value);
    setSearchTerm(e.target.value);
  };

  const inputTypes = ["text", "text", "", "date", "text"];

  return (
    <div className="app_search_bar_container">
      <div className="app_search_bar_content">
        <select onChange={handleOptionChange} value={selectedOption}>
          <option value={0}>Sélectionnez l'option de recherche</option>
          <option value={1}>ID</option>
          <option value={3}>Date</option>
          <option value={4}>Description</option>
        </select>

        <input
          type={inputTypes[selectedOption] || "text"}
          value={searchInput}
          onChange={handleSearchChange}
          disabled={selectedOption === 0}
          placeholder="Entrez votre recherche..."
        />
      </div>
    </div>
  );
}
