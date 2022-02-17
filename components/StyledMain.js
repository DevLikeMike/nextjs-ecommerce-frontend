import styled from "styled-components";

/********************************
 * Dynamic padding for mobile
 * Margin top for the header size (possible move this to a variable)
 *********************************/

const Main = styled.main`
  margin: 3rem auto 0;
  padding: 1rem 3rem 0;
  min-height: 100vh;
  max-width: ${({ theme }) => theme.maxSize};

  @media (max-width: 500px) {
    padding: 1rem 1rem 0;
  }
`;

function StyledMain({ children }) {
  return <Main>{children}</Main>;
}

export default StyledMain;
