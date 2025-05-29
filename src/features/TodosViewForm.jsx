

import { useEffect, useState } from "react";
function TodosViewForm({ sortDirection,
    setSortDirection,
    sortField,
    setSortField,
    queryString,
    setQueryString,}) {
//localQueryString: Handles real-time typing locally
      const [localQueryString, setLocalQueryString] = useState(queryString);

    function preventRefresh(e) {
      e.preventDefault();
    }

        //useEffect + setTimeout: Waits 500ms after typing stops to update the actual queryString in App.jsx

    useEffect(() => {
      const debounce = setTimeout(() => {
        setQueryString(localQueryString);
      }, 500);
  //clearTimeout: Cancels the old timeout if the user keeps typing, which avoids flooding updates
      return () => clearTimeout(debounce);
    }, [localQueryString, setQueryString]);
  

    return (
        <form onSubmit={preventRefresh}>
        <div>
          <label htmlFor="search">Search todos:</label>
          <input
            id="search"
            type="text"
            value={localQueryString}
            onChange={(e) => setLocalQueryString(e.target.value)}
          />
          <button
            type="button"
            onClick={() => setLocalQueryString('')}
          >
            Clear
          </button>
        </div>
      
        <div>
          <label htmlFor="sortField">Sort by</label>
          <select
            id="sortField"
            value={sortField}
            onChange={(e) => setSortField(e.target.value)}
          >
            <option value="title">Title</option>
            <option value="createdTime">Time added</option>
          </select>
        </div>
      
        <div>
          <label htmlFor="sortDirection">Direction</label>
          <select
            id="sortDirection"
            value={sortDirection}
            onChange={(e) => setSortDirection(e.target.value)}
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </form>
      
    );
  }
  
  export default TodosViewForm;
  


  
