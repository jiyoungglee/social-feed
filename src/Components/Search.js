import { useEffect, useState } from 'react';
import {useNavigate, createSearchParams, useSearchParams } from 'react-router-dom';
import '../Styles/Search.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

function Search() {
  const [textContent, setTextContent] = useState('');
  let navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("searchQuery");

  useEffect(() => {
    if(searchQuery) {setTextContent(searchQuery)}
    else {setTextContent('')}
  }, [searchQuery]);

  function searchFor() {
    navigate({
      pathname: `/searchResults`,
      search:`?${createSearchParams({searchQuery: textContent})}`
    });
  }

  function handleInputChange(event) {
    setTextContent(event.target.value);
  };

  function handleSubmit(event) {
    if(event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      if (textContent.length !== 0) searchFor();
    }
  }

  return (
    <div className="navbar-search">
      <div className="searchbox">
        <FontAwesomeIcon icon={faMagnifyingGlass}  color= "#f4b5e6" />
        <input 
          type="search"
          placeholder="Search Posts..."
          onChange={handleInputChange}
          value={textContent}
          onKeyDown={handleSubmit}
        />
      </div>
      <button disabled={(textContent.length === 0)} onClick={searchFor}>Search</button>
    </div>
  )
}

export default Search;
