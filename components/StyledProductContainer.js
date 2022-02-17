import styled from "styled-components";

const Container = styled.section`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  gap: 0.25rem;
  margin-top: 1rem;

  @media (max-width: 900px) {
    flex-direction: column;
  }
`;

export default function StyledProductContainer({ children }) {
  return <Container>{children}</Container>;
}
