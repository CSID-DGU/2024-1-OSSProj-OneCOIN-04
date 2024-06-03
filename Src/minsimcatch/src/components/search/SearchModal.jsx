import Portal from "../common/modal/Portal";
import styled from "styled-components";
import SearchInput from "./SearchInput";
import { ModalWrapper, ModalInner } from "../common/modal/Modal";
import PropTypes from "prop-types";

/**
 * @param {object} props
 * @param {function} props.onClose
 * @param {string} props.markClosable
 *
 **/

const SearchModal = ({ onClose, maskClosable }) => {
  const onMaskClick = (e) => {
    // target : 모달 배경, currentTarget : 유저가 클릭한 것
    if (e.target === e.currentTarget) {
      onClose(e);
    }
  };
  return (
    <Portal elementId="modal">
      <ModalWrapper onClick={maskClosable ? onMaskClick : null} visible={true}>
        <SearchModalInner>
          <SearchInput></SearchInput>
        </SearchModalInner>
      </ModalWrapper>
    </Portal>
  );
};

SearchModal.propTypes = {
  onClose: PropTypes.func,
  maskClosable: PropTypes.bool,
};

const SearchModalInner = styled(ModalInner)`
  top: 5.5%;
  width: 100%;
  height: 0px;
  background-color: #fff;
  padding: 50px 0px 30px 0px;
  border-radius: 0;
  display: flex;
  justify-content: center;
  align-items: flex-start;
`;

export default SearchModal;
