import styled from "styled-components";

const CardItem = styled.a`
  .card__imageCotainer {
    height: 300px;
    width: 200px;

    img {
      object-fit: cover;
    }
  }
`;

function ProductCard({ product }) {
  const { image, name, price, slug, description } = product;

  return (
    <CardItem href={`/shirts/${slug}`}>
      <div className='card__imageCotainer'>
        <img src={{ image }} alt={{ name }} />
      </div>
      <div className='card__contentContainer'>
        <h3 className='content__header'>{name}</h3>
        <p className='content__description'>{description}</p>
        <p className='content__price'>{price}</p>
      </div>
    </CardItem>
  );
}

export default ProductCard;
