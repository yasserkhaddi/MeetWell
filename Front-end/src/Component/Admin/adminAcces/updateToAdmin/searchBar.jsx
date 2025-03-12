import React, { useState } from "react";
import "../../../../Styles/admin/searchBar.css";

export default function SearchBar({ setSearchTerm, setSearchOption }) {
  const [searchInput, setSearchInput] = useState("");
  const [selectedOption, setSelectedOption] = useState(0);

  const handleOptionChange = (e) => {
    const option = Number(e.target.value);
    setSelectedOption(option);
    setSearchOption(option);
    setSearchInput(""); // Reset search input when changing filter
    setSearchTerm("");
  };

  const handleSearchChange = (e) => {
    setSearchInput(e.target.value);
    setSearchTerm(e.target.value);
  };

  const getInputType = () => {
    switch (selectedOption) {
      case 1:
        return "text"; // Nom et Prénom
      case 2:
        return "email"; // Email
      case 3:
        return "date"; // Date de naissance
      case 4:
        return "tel"; // Téléphone
      default:
        return "text"; // Default text
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
          <option value={5}>Statut (Admin / Normal)</option> {/* NEW OPTION */}
        </select>

        {selectedOption === 5 ? ( // Show dropdown for admin status
          <select onChange={handleSearchChange}>
            <option value="">Tous</option>
            <option value="admin">Administrateur</option>
            <option value="normal">Utilisateur normal</option>
          </select>
        ) : (
          <input
            type={getInputType()}
            value={searchInput}
            onChange={handleSearchChange}
            disabled={selectedOption === 0}
            placeholder="Entrez votre recherche..."
          />
        )}
      </div>
    </div>
  );
}
