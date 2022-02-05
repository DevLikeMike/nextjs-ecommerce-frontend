import styled from "styled-components";

const Form = styled.div`
  max-width: 500px;
  margin: 6rem auto 0;
  padding: 30px;
  box-shadow: 0px 10px 20px 0px rgba(50, 50, 50, 0.52);

  label {
    display: block;
    margin-bottom: 10px;
  }

  input[type="text"],
  input[type="email"],
  input[type="password"] {
    display: block;
    width: 100%;
    height: 40px;
    padding: 5px;
    font-size: 18px;
  }

  input[type="submit"] {
    margin-top: 20px;
    width: 100%;
    font-size: 1.2rem;
    border: none;
    background-color: ${({ theme }) => theme.primaryYellow};
    padding: 0.25rem 1rem;
    border-radius: 5px;
    color: #333;
    padding: 3rem auto;
    height: auto;
  }

  form {
    margin-bottom: 1rem;
  }

  div {
    margin-bottom: 20px;
  }
`;

export default function AuthForm({ children }) {
  return <Form>{children}</Form>;
}
