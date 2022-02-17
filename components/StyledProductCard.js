import styled from "styled-components";
import { API_URL } from "@/config/index";
import { useRouter } from "next/router";
import { Image } from "next/image";

const Card = styled.div`
  width: 32%;
  height: 33.5rem;
  border: 1px solid ${({ theme }) => theme.primary400};
  border-radius: 8px;

  @media (max-width: 900px) {
    width: 100%;
    margin-bottom: 0.5rem;
  }

  .card--image-container {
    height: 300px;
    width: 100%;
    overflow: hidden;
    border-radius: 8px 8px 0 0;

    img {
      object-fit: cover;
      transition: transform 0.5s ease;
      max-width: 100%;
      width: 100%;
      height: 100%;

      &:hover {
        transform: scale(1.2);
        cursor: pointer;
      }
    }
  }

  .card--content-container {
    padding: 0.25rem 0.5rem;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    gap: 1rem;
    height: calc(33.5rem - 300px);

    button {
      margin-top: auto;
      margin-bottom: 1rem;
      display: inline-block;
      border-radius: 4px;
      background-color: ${({ theme }) => theme.primary400};
      border: none;
      color: #ffffff;
      text-align: center;
      font-size: 1rem;
      padding: 16px;
      width: 130px;
      transition: all 0.5s;
      cursor: pointer;
    }

    button span {
      cursor: pointer;
      display: inline-block;
      position: relative;
      transition: 0.5s;
    }

    button span:after {
      content: "»";
      position: absolute;
      opacity: 0;
      top: 0;
      right: -15px;
      transition: 0.5s;
    }

    button:hover span {
      padding-right: 15px;
    }

    button:hover span:after {
      opacity: 1;
      right: 0;
    }
  }
`;

export default function StyledProductCard({ product }) {
  // Init Router
  const router = useRouter();

  const { Name, Price, slug, Description } = product.attributes;

  const { url: photoURL } =
    product.attributes.photo.data.attributes.formats.medium;

  const clickHandler = (e) => {
    e.preventDefault();
    router.push(`/shirts/${slug}`);
  };

  return (
    <Card>
      <div className='card--image-container'>
        <img src={`${API_URL}${photoURL}`} alt={Name} />
      </div>
      <div className='card--content-container'>
        <h4>{Name}</h4>
        <p>{Description}</p>
        <button onClick={clickHandler}>
          <span>Shop Now</span>
        </button>
      </div>
    </Card>
  );
}
