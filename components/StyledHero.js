import styled from "styled-components";
import { useRouter } from "next/router";

const StyledHero = styled.section`
  background-image: url("/hero.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  height: 50vh;
  width: 100%;
  position: relative;

  .hero--content-wrapper {
    position: absolute;
    top: 0;
    right: 0;
    width: 40%;
    height: 100%;
    padding: 5rem 2rem;
    background-color: rgba(0, 0, 0, 0.4);

    @media (max-width: 1252px) {
      width: 55%;
    }
    @media (max-width: 560px) {
      width: 75%;
    }
    @media (max-width: 900px) {
      padding: 1rem 0.25rem;
    }
  }

  .content--heading {
    line-height: 0.8;
  }

  .content--heading,
  .content--para {
    color: ${({ theme }) => theme.white};
    margin-bottom: 1rem;
  }

  .content--button {
    background: ${({ theme }) => theme.primary400};
    color: white;
    font-family: inherit;
    padding: 0.35em;
    padding-left: 1.2em;
    font-size: 17px;
    font-weight: 500;
    border-radius: 0.9em;
    border: none;
    letter-spacing: 0.05em;
    display: flex;
    align-items: center;
    box-shadow: inset 0 0 1.6em -0.6em #714da6;
    overflow: hidden;
    position: relative;
    height: 2.8em;
    padding-right: 3.3em;
  }

  .content--button .icon {
    background: white;
    margin-left: 1em;
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 2.2em;
    width: 2.2em;
    border-radius: 0.7em;
    box-shadow: 0.1em 0.1em 0.6em 0.2em ${({ theme }) => theme.primary600};
    right: 0.3em;
    transition: all 0.3s;
  }

  .content--button:hover .icon {
    width: calc(100% - 0.6em);
  }

  .content--button .icon svg {
    width: 1.1em;
    transition: transform 0.3s;
    color: ${({ theme }) => theme.primary600};
  }

  .content--button:hover .icon svg {
    transform: translateX(0.1em);
  }

  .content--button:active .icon {
    transform: scale(0.95);
  }
`;

export default function Hero() {
  // Init Router
  const router = useRouter();

  const clickHandler = (e) => {
    e.preventDefault();
    router.push("/shirts");
  };

  return (
    <StyledHero>
      <div className='hero--content-wrapper'>
        <h1 className='content--heading'>TechShirt TShirt company</h1>
        <p className='content--para'>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nobis
          aperiam nemo facere optio sint animi odio architecto! Quod, quas hic?
        </p>
        <button className='content--button' onClick={clickHandler}>
          {" "}
          Shop Now
          <div className='icon'>
            <svg height='24' width='24' viewBox='0 0 24 24'>
              <path d='M0 0h24v24H0z' fill='none'></path>
              <path
                d='M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z'
                fill='currentColor'
              ></path>
            </svg>
          </div>
        </button>
      </div>
    </StyledHero>
  );
}
