import { useRecoilState } from "recoil";
import {
  sortState,
  sortNameState,
  segmentState,
  segmentNameState,
} from "@/utils/HeaderAtom";
import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { Palette } from "@/styles/Palette";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { sortList, contentList } from "./DropdownList";
import PropTypes from "prop-types"; // PropTypes 추가

export const CategoryBox = ({ onSortChange, onCategoryChange }) => {
  const [sort, setSort] = useRecoilState(sortState);
  const [sortName, setSortName] = useRecoilState(sortNameState);
  const [content, setContent] = useRecoilState(segmentState);
  const [contentName, setContentName] = useRecoilState(segmentNameState);

  const [drops, setDrops] = useState({ sort: false, content: false });

  const sortDropdownRef = useRef(null);
  const contentDropdownRef = useRef(null);

  const toggleDropdown = (dropdownType) => {
    if (dropdownType === "sort") {
      setDrops({ sort: !drops.sort, content: drops.content });
    } else if (dropdownType === "content") {
      setDrops({ sort: drops.sort, content: !drops.content });
    }
  };

  useEffect(() => {
    // Initialize default values when the component mounts
    setSort(sortList[0].value);
    setSortName(sortList[0].category);
    setContent(contentList[0].value);
    setContentName(contentList[0].category);
  }, []);

  useEffect(() => {}, [sort, content]);

  const handleSort = (num) => {
    const selectedSort = sortList[num];
    setSort(selectedSort.value);
    setSortName(selectedSort.category);
    onSortChange(selectedSort.value); // 부모 컴포넌트에 선택한 정렬 기준 전달
    toggleDropdown("sort");
  };

  const handleContent = (num) => {
    const selectedContent = contentList[num];
    setContent(selectedContent.value);
    setContentName(selectedContent.category);
    onCategoryChange(selectedContent.value); // 부모 컴포넌트에 선택한 카테고리 전달
    toggleDropdown("content");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        sortDropdownRef.current &&
        !sortDropdownRef.current.contains(event.target) &&
        contentDropdownRef.current &&
        !contentDropdownRef.current.contains(event.target)
      ) {
        setDrops({ sort: false, content: false });
      } else if (
        sortDropdownRef.current &&
        !sortDropdownRef.current.contains(event.target)
      ) {
        setDrops({ sort: false, content: drops.content });
      } else if (
        contentDropdownRef.current &&
        !contentDropdownRef.current.contains(event.target)
      ) {
        setDrops({ sort: drops.sort, content: false });
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [drops.sort, drops.content]);

  return (
    <div style={{ paddingLeft: 20 }}>
      <Category className="dropdown" ref={sortDropdownRef}>
        <MainButton onClick={() => toggleDropdown("sort")}>
          {sortName}
          <ExpandMoreIcon style={{ fontSize: 30 }} />
        </MainButton>
        {drops.sort && (
          <Ul>
            {sortList.map((item, index) => (
              <Li key={item.id} className="item">
                <StyledButton className="sort-item">
                  <div
                    onClick={() => handleSort(index)}
                    style={
                      item.value === sort
                        ? { color: Palette.font_blue, fontWeight: "bolder" }
                        : null
                    }
                  >
                    {item.category}
                  </div>
                </StyledButton>
              </Li>
            ))}
          </Ul>
        )}
      </Category>
      <Category className="dropdown" ref={contentDropdownRef}>
        <MainButton onClick={() => toggleDropdown("content")}>
          {contentName}
          <ExpandMoreIcon style={{ fontSize: 30 }} />
        </MainButton>
        {drops.content && (
          <Ul className="content">
            {contentList.map((item, index) => (
              <Li key={item.id} className="item">
                <StyledButton className="content-item">
                  <div
                    onClick={() => handleContent(index)}
                    style={
                      item.value === content
                        ? { color: Palette.font_blue, fontWeight: "bolder" }
                        : null
                    }
                  >
                    {item.category}
                  </div>
                </StyledButton>
              </Li>
            ))}
          </Ul>
        )}
      </Category>
    </div>
  );
};

CategoryBox.propTypes = {
  onSortChange: PropTypes.func.isRequired,
  onCategoryChange: PropTypes.func.isRequired,
};

const Category = styled.div`
  display: inline-block;
  position: relative;
  margin-right: 10px;
  z-index: 1000;
`;

const MainButton = styled.button`
  display: flex;
  align-items: center;
  background-color: #fff;
  color: ${Palette.font_gray};
  border-radius: 10px;
  border-width: 0px;
  padding: 0px;
  font-size: 15px;
  cursor: pointer;
  &:hover {
    background-color: ${Palette.percent_gray};
  }
`;

const StyledButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  color: ${Palette.font_gray};
  padding: 5px;
  width: 6rem; /* 버튼 너비를 10rem로 확대 */
  height: 32px;
  border-width: 0px;
  font-size: 15px;
  cursor: pointer;
  &.sort-item {
    width: 6rem; /* 정렬 항목의 너비를 10rem로 확대 */
  }
  &:hover {
    background-color: ${Palette.percent_gray};
  }
`;

const Ul = styled.ul`
  top: 34px;
  position: absolute;
  list-style: none;
  padding-left: 0;
  padding-bottom: 0;
  border: 1px ${Palette.main_gray} solid;
  border-radius: 2px;
  margin: 0;
  width: 6rem; /* 드롭다운 메뉴 너비를 10rem로 확대 */
  background-color: #fff;
  &.content {
    width: 6rem; /* 카테고리 드롭다운 메뉴 너비를 10rem로 확대 */
  }
`;

const Li = styled.li`
  margin: 0;
  &:hover {
    background-color: ${Palette.percent_gray};
  }
`;
