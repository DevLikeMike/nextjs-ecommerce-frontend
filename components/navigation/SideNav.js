import { useContext } from "react";
import Link from "next/link";
import router from "next/router";
// Component
import AuthContext from "@/context/AuthContext";
// Icons
import {
  FaSignOutAlt,
  FaSignInAlt,
  FaUser,
  FaShoppingCart,
} from "react-icons/fa";

const SideNav = ({ sideOpen, openHandler }) => {
  // Context Init
  const { user, logout } = useContext(AuthContext);

  // Click Handler
  const onClick = () => {
    openHandler();
  };

  // Logout User and send them to the home page
  const LogoutHandler = () => {
    logout();
    router.push("/");
  };

  return (
    <div className={sideOpen ? "sideNav open" : "sideNav"}>
      <ul className='sideNav-links'>
        <li className='sideNav-item' onClick={onClick}>
          <Link href='/'>Home</Link>
        </li>
        <li className='sideNav-item' onClick={onClick}>
          <Link href='/menu'>Menu</Link>
        </li>
        {user ? (
          // If logged in
          <>
            <li className='sideNav-item' onClick={onClick}>
              <Link href='/account/dashboard'>
                <a>
                  {" "}
                  <FaUser
                    style={{ marginRight: "5px", fontSize: "1.2rem" }}
                  />{" "}
                  {user.username}
                </a>
              </Link>
            </li>
            <li>
              <Link href='/cart'>
                <a>
                  <FaShoppingCart /> Cart
                </a>
              </Link>
            </li>
            <li className='sideNav-item' onClick={onClick}>
              <button
                onClick={LogoutHandler}
                className='flex ai-c btn-secondary'
              >
                <FaSignOutAlt style={{ marginRight: "5px" }} /> Logout
              </button>
            </li>
          </>
        ) : (
          // If logged out
          <>
            <li className='sideNav-item' onClick={onClick}>
              <Link href='/account/login'>
                <a className='flex ai-c'>
                  <FaSignInAlt style={{ marginRight: "5px" }} /> Login
                </a>
              </Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default SideNav;
