import { useEffect, useState } from "react";
import styled from "styled-components";

// Styled Components
const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const StyledFieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  padding: 0.5rem 0;
`;

const StyledInput = styled.input`
  padding: 0.5rem;
`;

const StyledSelect = styled.select`
  padding: 0.5rem;
`;

const StyledButton = styled.button`
  padding: 0.5rem;
`;

function TodosViewForm({
  sortDirection,
  setSortDirection,
  sortField,
  setSortField,
  queryString,
  setQueryString,
}) {
  // Local input state
  const [localQueryString, setLocalQueryString] = useState(queryString);

  function preventRefresh(e) {
    e.preventDefault();
  }

  // Debounced update
  useEffect(() => {
    const debounce = setTimeout(() => {
      setQueryString(localQueryString);
    }, 500);
    return () => clearTimeout(debounce);
  }, [localQueryString, setQueryString]);

  return (
    <StyledForm onSubmit={preventRefresh}>
      <StyledFieldGroup>
        <label htmlFor="search">Search todos:</label>
        <StyledInput
          id="search"
          type="text"
          value={localQueryString}
          onChange={(e) => setLocalQueryString(e.target.value)}
        />
        <StyledButton type="button" onClick={() => setLocalQueryString("")}>
          Clear
        </StyledButton>
      </StyledFieldGroup>

      <StyledFieldGroup>
        <label htmlFor="sortField">Sort by</label>
        <StyledSelect
          id="sortField"
          value={sortField}
          onChange={(e) => setSortField(e.target.value)}
        >
          <option value="title">Title</option>
          <option value="createdTime">Time added</option>
        </StyledSelect>
      </StyledFieldGroup>

      <StyledFieldGroup>
        <label htmlFor="sortDirection">Direction</label>
        <StyledSelect
          id="sortDirection"
          value={sortDirection}
          onChange={(e) => setSortDirection(e.target.value)}
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </StyledSelect>
      </StyledFieldGroup>
    </StyledForm>
  );
}

export default TodosViewForm;


  


  
