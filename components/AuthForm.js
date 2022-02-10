import styled from "styled-components";

const Form = styled.div`
  max-width: 500px;
  margin: 6rem auto 0;
  padding: 30px;
  box-shadow: 5px 10px 20px 0 rgb(0 0 0 / 20%);
  border-radius: 5px;

  h1 {
    font-size: 2rem;
  }

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
    padding: 0.25rem 1rem;
    margin-top: 20px;
    width: 100%;
    font-size: 1.2rem;
    border: none;
    background-color: ${({ theme }) => theme.primary400};
    border-radius: 5px;
    color: #000;
    height: auto;
    transition: all 0.3s ease;

    &:hover {
      transform: scale(0.98);
      background-color: ${({ theme }) => theme.primary200};
    }
  }

  form {
    margin-bottom: 1rem;
  }

  div {
    margin-bottom: 20px;
  }

  p {
    font-size: 0.85rem;
  }
`;

export default function AuthForm({ children }) {
  return <Form>{children}</Form>;
}
