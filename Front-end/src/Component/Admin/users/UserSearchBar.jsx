import React, { useState } from "react";
import "../../../Styles/admin/searchBar.css";

export default function UserSearchBar({ setSearchTerm, setSearchOption }) {
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

  const getInputType = () => {
    switch (selectedOption) {
      case 1: // Nom et Prénom
        return "text";
      case 2: // E-mail
        return "email";
      case 3: // Date de naissance
        return "date";
      case 4: // Téléphone
        return "tel";
      default:
        return "text";
    }
  };

  return (
    <div className="app_search_bar_container">
      <div className="app_search_bar_content">
        <select onChange={handleOptionChange}>
          <option value={0}>Sélectionnez l'option de recherche</option>
          <option value={1}>Nom et Prénom</option>
          <option value={2}>E-mail</option>
          <option value={3}>Date de naissance</option>
          <option value={4}>Téléphone</option>
        </select>

        <input
          type={getInputType()}
          value={searchInput}
          onChange={handleSearchChange}
          disabled={selectedOption === 0}
          placeholder="Entrez votre recherche..."
        />
      </div>
    </div>
  );
}
