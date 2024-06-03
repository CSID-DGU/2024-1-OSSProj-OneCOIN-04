import styled from "styled-components";
import Icon from "@/components/common/Icon";
import { Palette } from "@/styles/Palette";
import { FaSearch } from "react-icons/fa";
import { useState } from "react";
import SearchModal from "@/components/search/SearchModal";

const SearchButton = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const clickModal = () => {
    setModalVisible(true);
  };
  const closeModal = () => {
    setModalVisible(false);
  };
  return (
    <div>
      <Search>
        <Icon
          size="23px"
          color={Palette.point_blue}
          onClick={() => {
            clickModal();
          }}
        >
          <FaSearch />
        </Icon>
      </Search>
      {modalVisible && (
        <SearchModal maskClosable={true} onClose={closeModal}></SearchModal>
      )}
    </div>
  );
};

const Search = styled.button`
  position: absolute;
  right: 20px;
  top: 15px;
  color: #7192ff;
  background-color: #fff;
  border-width: 0px;
  cursor: pointer;
`;

export default SearchButton;
