import styled from "styled-components";
import Icon from "../common/Icon";
import { FaSearch, FaArrowLeft } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";
import { Palette } from "@/styles/Palette";
import routes from "@/routes";
import { useRef, useState } from "react";

const SearchInput = () => {
  let { query } = useParams();
  const navigate = useNavigate();
  const searchRef = useRef();
  const [value, setValue] = useState(query || "");

  const goToSearch = (e) => {
    e.preventDefault();
    if (value.trim() === "") {
      alert("검색어를 입력해주세요");
      return;
    }
    navigate(`${routes.search}/${value}`);
  };

  const searchOnChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <>
      <SearchStyle onSubmit={goToSearch}>
        <Icon
          size="21px"
          color={Palette.point_blue}
          onClick={() => navigate(routes.home)}
          className="searchIcon"
        >
          <FaArrowLeft />
        </Icon>
        <input
          type="text"
          placeholder="검색어를 입력해주세요."
          value={value}
          onChange={searchOnChange}
          autoFocus
          ref={searchRef}
        />
        {value && (
          <Icon
            size="14px"
            className="searchXIcon"
            color={Palette.font_gray}
            onClick={() => {
              setValue("");
              searchRef.current.focus();
            }}
          >
            <AiOutlineClose />
          </Icon>
        )}
        <Icon
          size="23px"
          color={Palette.point_blue}
          onClick={goToSearch}
          className="searchIcon"
        >
          <FaSearch />
        </Icon>
      </SearchStyle>
    </>
  );
};

const SearchStyle = styled.form`
  background-color: white;
  z-index: 10000000;
  display: flex;
  align-items: center;
  position: fixed;
  top: 0rem;
  padding-top: 1rem;

  & input {
    width: 230px;
    height: 49px;
    border-radius: 100px;
    border: 1.5px solid rgba(113, 146, 255, 1);
    font-size: 16px;
    padding: 0 50px;
    background-color: transparent;
  }
  .searchIcon:first-child {
    position: relative;
    top: 0.2rem;
    left: 2.5rem;
  }
  .searchIcon:last-child {
    position: relative;
    top: 0.2rem;
    right: 3rem;
  }
  .searchXIcon {
    position: absolute;
    top: 2.1rem;
    right: 5rem;
  }
  .searchXIcon:hover {
    background-color: #d8d8d8;
  }
`;
export default SearchInput;
