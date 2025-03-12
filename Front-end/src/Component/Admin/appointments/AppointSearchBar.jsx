import React, { useState } from "react";
import "../../../Styles/admin/searchBar.css";

export default function AppointSearchBar({ setSearchTerm, setSearchOption }) {
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
    const value = e.target.value;
    setSearchInput(value);
    setSearchTerm(value.trim().toLowerCase());
  };

  const inputTypes = ["text", "text", "tel", "date", "text"];

  return (
    <div className="app_search_bar_container">
      <div className="app_search_bar_content">
        <select onChange={handleOptionChange}>
          <option value={0}>Sélectionnez l'option de recherche</option>
          <option value={1}>Id</option>
          <option value={2}>Numéro de téléphone</option>
          <option value={3}>Date</option>
          <option value={4}>Nom et Prénom</option>{" "}
        </select>

        <input
          type={inputTypes[selectedOption]}
          value={searchInput}
          onChange={handleSearchChange}
          disabled={selectedOption === 0}
          placeholder="Entrez votre recherche..."
        />
      </div>
    </div>
  );
}
