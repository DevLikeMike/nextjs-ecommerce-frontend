import Image from "next/image";
import styled from "styled-components";

const Item = styled.div`
  padding: 1rem 0.5rem;
  min-height: 10rem;
  h2 {
    font-size: 2.44rem;
    text-align: center;
    margin-bottom: 1rem;
  }

  .card {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .content-container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    gap: 0.25rem;
    flex: 1;
    max-width: 20rem;

    button {
      background-color: transparent;
      border: #333 1px solid;
      border-radius: 8px;
      padding: 0.5rem 1rem;
      width: 100%;
      transition: 0.3s ease all;

      &:hover {
        background-color: #e32d2d;
        color: #fff;
        border-color: #e32d2d;
      }
    }
  }

  .thumbnail {
    border-radius: 50%;
  }
`;

export default function CartItem({ item, deleteCartItem }) {
  const { name, quantity, price, size, image } = item;

  const clickHandler = (e) => {
    deleteCartItem(item);
  };

  return (
    <Item>
      <h2 className='text-center'>{name}</h2>
      <div className='card'>
        <div className='image-container'>
          <Image
            src={image.formats.thumbnail.url}
            alt={image.name}
            width='100'
            height='100'
            className='thumbnail'
            layout='fixed'
          />
        </div>
        <div className='content-container'>
          <p>Size - {size}</p>
          <p>Quantity - {quantity}</p>
          <p>Subtotal - ${(price * quantity).toFixed(2)}</p>
          {deleteCartItem && <button onClick={clickHandler}>Delete</button>}
        </div>
      </div>
    </Item>
  );
}
