import React, { useEffect, useState } from "react";
import styled from "styled-components";
import netflixLogo from "./Images/netflix-logo.png";

export const NavCont = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  background: transparent;
  width: 100%;
  top: 0;
  z-index: 2;
  padding: 0 1rem;
  transition: 1000ms all cubic-bezier(0.175, 0.885, 0.32, 1.275);
  height: auto;
  &.show-background {
    background: black;
    transition: 1000ms all cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }
  img {
    width: 80px;
    // height: 50px
    object-fit: contain;
    &:nth-child(2) {
      width: 40px;
    }
  }
`;

export const NavTop = (props) => {
  const [show, handleShow] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () =>
      window.scrollY > 200 ? handleShow(true) : handleShow(false)
    );
  });
  console.log(show);
  return (
    <NavCont className={show && "show-background"}>
      <img src={netflixLogo} alt="netflix-logo" />
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
        alt="netflix-avater"
      />
    </NavCont>
  );
};

export default NavTop;
