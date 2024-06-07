import React, { useState } from "react";
import styled from "styled-components";
import { CategoryBox } from "./CategoryBox";
import SearchButton from "./SearchButton";
import { CompleteCategoryBox } from "./CompleteCategoryBox";
import PropTypes from "prop-types";

/**
 * @param {object} props
 * @param {string} props.page
 * @param {function} props.onSortChange
 * @param {function} props.onCategoryChange
 */
const Main = ({ page, onSortChange, onCategoryChange }) => {
  return (
    <Nav>
      {page === "main" ? (
        <CategoryBox onSortChange={onSortChange} onCategoryChange={onCategoryChange} />
      ) : (
        <CompleteCategoryBox onSortChange={onSortChange} onCategoryChange={onCategoryChange} />
      )}
      <SearchButton />
    </Nav>
  );
};

Main.propTypes = {
  page: PropTypes.string.isRequired,
  onSortChange: PropTypes.func.isRequired,
  onCategoryChange: PropTypes.func.isRequired,
};

const Nav = styled.nav`
  height: 55px;
  position: fixed;
  top: 0px;
  width: 390px;
  background-color: #fff;
  color: #000;
  display: flex;
  align-items: center;
  z-index: 500;
`;

export default Main;
