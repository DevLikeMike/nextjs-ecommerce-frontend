import styled from "styled-components";
import Link from "next/link";

const Card = styled.a`
  display: block;
  text-align: center;
  margin: 1rem 0 0;
  padding: 0.5rem 0;
  overflow: hidden;
  width: 100%;
  height: 250px;

  h3 {
    max-height: 3rem;
    overflow: auto;
  }

  &:hover {
    cursor: pointer;

    img {
      transform: translateY(10%);
      box-shadow: 0px 0px 10px 8px rgba(0, 0, 0, 0.1);
    }
  }

  img {
    object-fit: cover;
    border-radius: 50%;
    transition: ease all 0.4s;
    display: block;
    margin: 0 auto;
    transform: translateY(15%);
  }
`;

export default function FavoriteItem({ coffee }) {
  const { name, image, slug } = coffee;

  return (
    <Link href={`/beverages/${slug}`}>
      <Card>
        <h3 className='title'>{name}</h3>
        <img
          src={image.formats.large.url}
          alt={image.name}
          width='275'
          height='275'
          className='thumbnail'
          layout='fixed'
        />
      </Card>
    </Link>
  );
}
