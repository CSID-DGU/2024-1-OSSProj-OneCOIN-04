import { Link } from "react-router-dom";
import styled from "styled-components";
import routes from "@/routes";
import { GoHome, GoHomeFill, GoPlusCircle } from "react-icons/go";
import { AiOutlineFire, AiFillFire } from "react-icons/ai";
import { BsClipboardCheck, BsClipboardCheckFill, BsPerson, BsPersonFill } from "react-icons/bs";
import { Palette } from "@/styles/Palette";
import PropTypes from "prop-types";
import useLogin from "@/hooks/useLogin";

/**
 * @param {string} page 각 페이지 이름
 */
const Footer = ({ page }) => {
  const { isLoginIn } = useLogin();

  return (
    <Nav>
      <LinkBox>
        <LinkNav to={routes.home}>
          {page === "main" ? (
            <>
              <div>
                <GoHomeFill style={{ fontSize: 28, color: Palette.point_blue }} />
              </div>
              <div style={{ color: Palette.point_blue }}>홈</div>
            </>
          ) : (
            <>
              <div>
                <GoHome fontSize={28} />
              </div>
              <div style={{ color: Palette.button_gray }}>홈</div>
            </>
          )}
        </LinkNav>
        <LinkNav to={routes.hot}>
          {page === "hot" ? (
            <>
              <div>
                <AiFillFire style={{ fontSize: 28, color: Palette.point_blue }} />
              </div>
              <div style={{ color: Palette.point_blue }}>HOT</div>
            </>
          ) : (
            <>
              <div>
                <AiOutlineFire fontSize={28} />
              </div>
              <div style={{ color: Palette.button_gray }}>HOT</div>
            </>
          )}
        </LinkNav>
        <UploadLink to={routes.upload} className="upload-button">
          <div>
            <GoPlusCircle fontSize={40} />
          </div>
        </UploadLink>
        <LinkNav to={routes.complete}>
          {page === "complete" ? (
            <>
              <div>
                <BsClipboardCheckFill style={{ fontSize: 28, color: Palette.point_blue }} />
              </div>
              <div style={{ color: Palette.point_blue }}>완료</div>
            </>
          ) : (
            <>
              <div>
                <BsClipboardCheck fontSize={28} />
              </div>
              <div style={{ color: Palette.button_gray }}>완료</div>
            </>
          )}
        </LinkNav>
        {isLoginIn ? (
          <LinkNav to={routes.mypage}>
            {page === "mypage" ? (
              <>
                <div>
                  <BsPersonFill style={{ fontSize: 28, color: Palette.point_blue }} />
                </div>
                <div style={{ color: Palette.point_blue }}>MY</div>
              </>
            ) : (
              <>
                <div>
                  <BsPerson fontSize={28} />
                </div>
                <div style={{ color: Palette.button_gray }}>MY</div>
              </>
            )}
          </LinkNav>
        ) : (
          <LinkNav to={routes.login}>
            <div>
              <BsPerson fontSize={28} />
            </div>
            <div style={{ color: Palette.button_gray }}>로그인</div>
          </LinkNav>
        )}
      </LinkBox>
    </Nav>
  );
};

Footer.propTypes = {
  page: PropTypes.string.isRequired,
};

const Nav = styled.nav`
  position: fixed;
  bottom: 0px;
  width: 390px;
  height: 68px;
  background-color: #fff;
  font-size: 12px;
  z-index: 500;
`;

const LinkBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 30px;
`;

const LinkNav = styled(Link)`
  margin-top: 15px;
  color: ${Palette.button_gray};
  > div {
    height: 26px;
  }
`;

const UploadLink = styled(Link)`
  color: ${Palette.button_gray};
  margin-top: 7px;
`;

export default Footer;
