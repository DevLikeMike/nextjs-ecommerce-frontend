// React import
import { useContext, useState } from "react";
import styled from "styled-components";
import CartContext from "@/context/CartContext";

const StyledCartItem = styled.div``;

export default function CartItem({ item, review }) {
  // Destruct Item
  const { name, quantity, price, size, image } = item;
  // Init Context
  const { deleteCartItem, updateQty } = useContext(CartContext);
  const [qty, setQty] = useState(quantity);

  const clickHandler = (e) => {
    deleteCartItem(item);
  };
  const qtyHandler = (e) => {
    setQty(e.target.value);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    updateQty(item, qty);
  };

  return (
    <StyledCartItem className='cart'>
      <div className='cart__img-container'>
        <img src={image} alt={name} />
      </div>
      <div className='cart__content-container'>
        <h2>{name}</h2>
        <p>
          Size: <span className='size'>{size}</span>
        </p>
        {review && (
          <p>
            Quantity: <span className='size'>{quantity}</span>
          </p>
        )}
        {!review && <button onClick={clickHandler}>Remove</button>}
      </div>
      <div className='cart__qty-price'>
        <p>${price}</p>
        {!review && (
          <form onSubmit={submitHandler}>
            <select name='quantity' id='quantity' onChange={qtyHandler}>
              <option value='1'>1</option>
              <option value='2'>2</option>
              <option value='3'>3</option>
            </select>
            <input type='submit' value='Update' />
          </form>
        )}
      </div>
    </StyledCartItem>
  );
}
