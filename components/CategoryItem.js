import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";

const Card = styled.a`
  display: grid;
  grid-template-columns: 10rem auto;
  text-align: left;
  margin: 1rem 0;
  position: relative;
  padding: 0.5rem;
  gap: 0.5rem;
  transition: all 0.3s ease-in-out;

  &:hover {
    cursor: pointer;
    box-shadow: 0 3px 8px 0 rgba(0, 0, 0, 0.2);
  }

  img {
    object-fit: cover;
    border-radius: 50%;
    grid-column-start: 1;
    grid-column-end: 2;
  }

  .card__content {
    grid-column-start: 2;
    grid-column-end: 3;
  }
`;

export default function CategoryItem({ category }) {
  const { type, image, slug } = category;

  return (
    <Link href={`/categories/${slug}`}>
      <Card>
        <Image
          src={image.formats.large.url}
          alt={image.name}
          width='100'
          height='100'
          className='thumbnail'
          layout='fixed'
        />
        <div className='card__content flex jc-fs ai-c'>
          <h3 className='title'>{type}</h3>
        </div>
      </Card>
    </Link>
  );
}
