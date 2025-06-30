import React, { useState, useRef, useEffect } from "react";
import { useController } from "react-hook-form";
import "./Autocomplete.css";

const AutocompleteInput = ({
  name,
  control,
  suggestions = [],
  placeholder = "",
  className = "form-input",
  onSelect,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const inputRef = useRef(null);
  const listRef = useRef(null);

  const {
    field: { onChange, onBlur, value = "", ref },
    fieldState: { error },
  } = useController({
    name,
    control,
    defaultValue: "",
  });

  useEffect(() => {
    if (value && typeof value === "string") {
      const filtered = suggestions.filter((item) =>
        item.client_name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredSuggestions(filtered);
      setIsOpen(filtered.length > 0 && value.length > 0);
    } else {
      setFilteredSuggestions([]);
      setIsOpen(false);
    }
    setHighlightedIndex(-1);
  }, [value, suggestions]);

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    onChange(inputValue);
    onSelect(undefined);
  };

  const handleSuggestionClick = (suggestion) => {
    onChange(suggestion.client_name);
    onSelect(suggestion.id);
    setIsOpen(false);
    setHighlightedIndex(-1);
    inputRef.current?.focus();
  };

  const handleKeyDown = (e) => {
    if (!isOpen) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setHighlightedIndex((prev) =>
          prev < filteredSuggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : prev));
        break;
      case "Enter":
        e.preventDefault();
        if (highlightedIndex >= 0) {
          handleSuggestionClick(filteredSuggestions[highlightedIndex]);
        } else {
          setIsOpen(false);
        }
        break;
      case "Escape":
        setIsOpen(false);
        setHighlightedIndex(-1);
        break;
    }
  };

  const handleBlur = (e) => {
    // Delay to allow click on suggestions
    setTimeout(() => {
      setIsOpen(false);
      setHighlightedIndex(-1);
      onBlur();
    }, 150);
  };

  const handleFocus = () => {
    if (value && filteredSuggestions.length > 0) {
      setIsOpen(true);
    }
  };

  return (
    <div className="autocomplete-container">
      <input
        ref={(el) => {
          ref(el);
          inputRef.current = el;
        }}
        type="text"
        value={value}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
        onFocus={handleFocus}
        placeholder={placeholder}
        className={`autocomplete-input ${error ? "error" : ""} ${className}`}
        autoComplete="off"
        {...props}
      />

      {isOpen && filteredSuggestions.length > 0 && (
        <ul className="autocomplete-suggestions">
          {filteredSuggestions.map((suggestion, index) => (
            <li
              key={suggestion.id || index}
              className={`suggestion-item ${
                index === highlightedIndex ? "highlighted" : ""
              }`}
              onClick={() => handleSuggestionClick(suggestion)}
            >
              <div className="suggestion-name">{suggestion.client_name}</div>
            </li>
          ))}
        </ul>
      )}

      {error && <p className="error-message">{error.message}</p>}
    </div>
  );
};

export default AutocompleteInput;
