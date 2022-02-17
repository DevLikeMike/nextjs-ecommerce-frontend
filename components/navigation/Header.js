import { useState, useContext } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
// Component imports
import Hamburger from "./Hamburger";
import SideNav from "./SideNav";
import AuthContext from "@/context/AuthContext";
// External imports
import {
  FaSignOutAlt,
  FaSignInAlt,
  FaUser,
  FaShoppingCart,
  FaTshirt,
} from "react-icons/fa";
import styled from "styled-components";

const Navbar = styled.nav`
  padding: 0 7.5vw;
  width: 100vw;
  height: 3rem;
  position: fixed;
  top: 0;
  background-color: ${({ theme }) => theme.primary400};
  border-bottom: 1px solid hsla(0, 0%, 85.1%, 0.46);
  z-index: 100;
  @media (max-width: 900px) {
    padding: 0 3rem;
  }
  @media (max-width: 500px) {
    padding: 0 1rem;
  }
  .nav-wrapper {
    max-width: ${({ theme }) => theme.maxSize};
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 auto;
    padding: 0 3rem;
    @media (max-width: 500px) {
      padding: 0 1rem;
    }
  }

  svg:hover {
    cursor: pointer;
  }
`;

const NavList = styled.ul`
  height: 3rem;
  color: #333;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 10px;
`;

const NavItem = styled.li`
  justify-content: center;
  align-items: center;
  list-style: none;
  padding: 0 1rem;
  font-size: 1.25rem;
  border-radius: 8px;
  height: 80%;
  display: none;
  color: #fff;
  transition: background-color 0.3s ease;

  &:hover {
    color: #fff;
    background-color: ${({ theme }) => theme.primary600};
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  @media (min-width: 768px) {
    display: flex;
  }
`;

export default function Header() {
  // State variables
  const [sideNavigationOpen, setSideNavigationOpen] = useState(false);

  // Context Init and destruct
  const { user, logout } = useContext(AuthContext);

  // Init Router
  const router = useRouter();

  // openHandler for side Nav
  const openHandler = () => {
    setSideNavigationOpen(!sideNavigationOpen);
  };

  // Logout User and send them to the home page
  const LogoutHandler = () => {
    logout();
    router.push("/");
  };

  const clickHandler = (e) => {
    e.preventDefault();
    router.push(`/`);
  };

  return (
    <Navbar>
      <div className='nav-wrapper'>
        <FaTshirt
          style={{
            fontSize: "2rem",
            color: "white",
            justifySelf: "flex-start",
          }}
          onClick={clickHandler}
        />
        <NavList>
          <NavItem>
            <Link href='/'>
              <a>Home</a>
            </Link>
          </NavItem>

          <NavItem>
            <Link href='/menu'>
              <a>Menu</a>
            </Link>
          </NavItem>

          {user ? (
            // If logged in
            <>
              <NavItem>
                <Link href='/account/dashboard'>
                  <a>
                    {" "}
                    <FaUser
                      style={{ marginRight: "5px", fontSize: "1.2rem" }}
                    />
                    {user.username}
                  </a>
                </Link>
              </NavItem>
              <NavItem>
                <Link href='/cart'>
                  <a>
                    <FaShoppingCart />
                  </a>
                </Link>
              </NavItem>
              <NavItem>
                <button
                  onClick={LogoutHandler}
                  className='flex ai-c btn-secondary'
                >
                  <FaSignOutAlt style={{ marginRight: "5px" }} />
                </button>
              </NavItem>
            </>
          ) : (
            // If logged out
            <>
              <NavItem>
                <Link href='/account/login'>
                  <a className='flex ai-c'>
                    <FaSignInAlt style={{ marginRight: "5px" }} /> Login
                  </a>
                </Link>
              </NavItem>
            </>
          )}

          <Hamburger
            openHandler={openHandler}
            sideNavigationOpen={sideNavigationOpen}
          />
        </NavList>
      </div>
      <SideNav sideOpen={sideNavigationOpen} openHandler={openHandler} />
    </Navbar>
  );
}
