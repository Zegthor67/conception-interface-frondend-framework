/**
 * @param {{
 *   value: string,
 *   onChange: (value: string) => void,
 *   placeholder?: string
 * }} props
 */
function SearchBar({ value, onChange, placeholder = 'Rechercher...' }) {
  return (
    <div className="search-bar">
      <input
        type="search"
        className="form-control"
        value={value}
        placeholder={placeholder}
        aria-label={placeholder}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  )
}

export default SearchBar