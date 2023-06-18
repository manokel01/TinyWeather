function SearchBar(props) {
    return (
      <input type="text" placeholder="Search grower by name" value={props.searchTerm} onChange={props.onSearchTermChange} />
    );
  }
  
  export default SearchBar;
  