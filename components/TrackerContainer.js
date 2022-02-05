import styled from "styled-components";

const TrackerUl = styled.ul`
  display: flex;
  justify-content: space-around;
  margin: 2rem auto 0.25rem;
  width: 100%;
  max-width: 30rem;
`;

export default function TrackerContainer({ children }) {
  return <TrackerUl>{children}</TrackerUl>;
}
