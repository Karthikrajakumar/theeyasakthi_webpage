import React from "react";

export default function SearchBar({
  value,
  onChange,
  placeholder = "Search..."
}) {
  const handleSubmit = (e) => e.preventDefault();

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        className="search-input"
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />

      <button type="submit" className="search-icon-btn" aria-label="Search">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <path d="M11.742 10.344a6.5 6.5 0 10-1.397 1.398h-.001l3.85 3.85a1 1 0 001.415-1.414l-3.85-3.85zm-5.242.656a5 5 0 110-10 5 5 0 010 10z" />
        </svg>
      </button>
    </form>
  );
}
