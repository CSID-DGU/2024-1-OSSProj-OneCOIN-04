import styled from "styled-components";
import { GoChevronDown } from "react-icons/go";
import Icon from "../common/Icon";
import { useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { categoryState, timeLimitState } from "@/utils/UploadAtom";
import { category, deadline } from "../upload/CategoryNDeadLine";
import PropTypes from "prop-types";

/**
 *
 * @param {*} param
 * @param {array} param.datas
 * @param {string} param.name
 */
const Option = ({ datas, name }) => {
  const downRef = useRef();
  const [list, setList] = useState(false);
  const [categoryStates, setCategoryState] = useRecoilState(categoryState);
  const [timeLimitStates, setTimeLimitState] = useRecoilState(timeLimitState);

  const selectCategory = () => {
    downRef.current?.scrollIntoView({ behavior: "smooth" });
    setList(!list);
  };

  const categoryList = category.filter((element) => {
    if (element.value == categoryStates) {
      return true;
    }
  });

  const deadLineList = deadline.filter((element) => {
    if (element.value == timeLimitStates) {
      return true;
    }
  });

  const onClickCategory = (e) => {
    if (name == "카테고리") {
      const { value } = e.target;
      setCategoryState(value);
      setList(!list);
    } else {
      const { value } = e.target;
      setTimeLimitState(value);
      setList(!list);
    }
  };

  return (
    <div ref={downRef}>
      <Select list={list}>
        <button onClick={selectCategory} className="selectBtn">
          <p>
            {name === "카테고리" ? categoryList[0].name : deadLineList[0].name}
          </p>
          <Icon size="20px" color="#585858">
            <GoChevronDown className="icon" />
          </Icon>
        </button>
        {datas.map((data, index) => {
          const className = () => {
            if (name === "카테고리") {
              return data.value == categoryStates ? "active" : "";
            } else {
              return data.value == timeLimitStates ? "active" : "";
            }
          };

          return (
            <li key={name === "카테고리" ? index + 100 : index} className="Li">
              <button
                onClick={(e) => onClickCategory(e)}
                value={data.value}
                list={list}
                className={`optionLi ${className()}`}
              >
                {" "}
                {data.name}
              </button>
            </li>
          );
        })}
      </Select>
    </div>
  );
};

Option.propTypes = {
  datas: PropTypes.array.isRequired,
  name: PropTypes.string.isRequired,
};

const Select = styled.ul`
  list-style: none;
  padding: 0;
  width: 160px;

  display: flex;
  flex-direction: column;
  justify-content: center;

  font-size: 12px;
  color: #909090;
  cursor: pointer;

  .selectBtn {
    width: 100%;
    height: 30px;
    color: #909090;

    background-color: #ffffff;
    border: none;
    border-bottom: 2px solid #;
    font-weight: 700;

    outline: none;
    display: flex;
    justify-content: space-around;
    align-items: center;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .selectBtn:hover {
    background-color: #ebebeb7a;
  }
  .icon {
    position: relative;
    top: 3px;
  }

  .optionLi {
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: start;

    height: 35px;
    width: 100%;

    padding-left: 18px;
    border: none;

    list-style: none;
    background-color: #FDC48D;
    color: #909090;

    visibility: ${(props) => (props.list ? "visible" : "hidden")};
  }
  .optionLi:hover {
    background-color: #FD9F28;
  }

  .active {
    background-color: #FD9F28;
  }
`;

export default Option;