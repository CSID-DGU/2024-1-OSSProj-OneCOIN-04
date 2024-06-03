import { useRecoilState } from "recoil";
import {
  completeSortState,
  completeSortNameState,
  completeSegmentState,
  completeSegmentNameState,
} from "@/utils/HeaderAtom";
import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { Palette } from "@/styles/Palette";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { sortList, contentList } from "./DropdownList";

export const CompleteCategoryBox = () => {
  const [sort, setSort] = useRecoilState(completeSortState);
  const [sortName, setSortName] = useRecoilState(completeSortNameState);
  const [content, setContent] = useRecoilState(completeSegmentState);
  const [contentName, setContentName] = useRecoilState(
    completeSegmentNameState
  );

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

  useEffect(() => {}, [sort, content]);
  const handleSort = (num) => {
    setSort(sortList[num].value);
    setSortName(sortList[num].category);
    toggleDropdown("sort");
  };

  const handleContent = (num) => {
    setContent(contentList[num].value);
    setContentName(contentList[num].category);
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
    // Add
    document.addEventListener("mousedown", handleClickOutside);

    // Remove
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [drops.sort, drops.content]);

  return (
    <div style={{ paddingLeft: 20 }}>
      {/* 정렬 카테고리 */}
      <Category className="dropdown" ref={sortDropdownRef}>
        <MainButton onClick={() => toggleDropdown("sort")}>
          {sortName}
          <ExpandMoreIcon style={{ fontSize: 30 }} />
        </MainButton>
        {drops.sort ? (
          <Ul>
            {sortList.map((item) => (
              <Li key={item.id} className="item">
                <StyledButton className="sort-item">
                  <div
                    onClick={() => handleSort(item.id)}
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
        ) : null}
      </Category>
      {/* 컨텐츠 카테고리 */}
      <Category className="dropdown" ref={contentDropdownRef}>
        <MainButton onClick={() => toggleDropdown("content")}>
          {contentName}
          <ExpandMoreIcon style={{ fontSize: 30 }} />
        </MainButton>
        {drops.content ? (
          <Ul className="content">
            {contentList.map((item) => (
              <Li key={item.id} className="item">
                <StyledButton className="content-item">
                  <div
                    onClick={() => handleContent(item.id)}
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
        ) : null}
      </Category>
    </div>
  );
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
  background-color: #fff;
  color: ${Palette.font_gray};
  padding: 5px;
  width: 6.6rem;
  height: 32px;
  border-width: 0px;
  font-size: 15px;
  cursor: pointer;
  &.sort-item {
    width: 4.2rem;
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
  width: 4.2rem;
  background-color: #fff;
  &.content {
    width: 6.6rem;
  }
`;

const Li = styled.li`
  margin: 0;
  &:hover {
    background-color: ${Palette.percent_gray};
  }
`;
