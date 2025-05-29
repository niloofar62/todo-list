
import styled from "styled-components";

function TextInputWithLabel({ elementId, label, onChange, inputRef, value }) {
  return (
    <>
      <StyledLabel htmlFor={elementId}>{label}</StyledLabel>
      <StyledInput
        type="text"
        id={elementId}
        ref={inputRef}
        value={value}
        onChange={onChange}
      />
    </>
  );
}

export default TextInputWithLabel;

const StyledLabel = styled.label`
  margin-bottom: 0.25rem;
`;

const StyledInput = styled.input`
  padding: 0.5rem;
  margin-bottom: 1rem;
  font-size: 1rem;
`;
