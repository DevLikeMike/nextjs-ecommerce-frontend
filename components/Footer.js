import styled from "styled-components";

const Foot = styled.section`
  text-align: center;
  padding: 2rem;
  background-color: ${({ theme }) => theme.primaryYellow};
  color: #fff;
`;

export default function Footer() {
  return (
    <Foot>
      <p>This is the footer</p>
    </Foot>
  );
}
