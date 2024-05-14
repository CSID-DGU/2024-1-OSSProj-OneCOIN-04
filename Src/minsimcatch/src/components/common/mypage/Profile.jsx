import styled from "styled-components";
import { Palette } from "@/styles/Palette";
import PropTypes from "prop-types";

/**
 * @param {object} props
 * @param {string} props.userName
 * @param {string} props.email
 * @param {string} props.src
 * @return {JSX.Element}
 */

const Profile = ({ userName, email, src }) => {
  return (
    <ProfileStyle>
      <div className="userImg">
        <img src={`/image/${src}`} alt="user_image" />
      </div>
      <div className="userInfo">
        <div>{userName}</div>
        <div>{email}</div>
      </div>
    </ProfileStyle>
  );
};

Profile.propTypes = {
  userName: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  src: PropTypes.string,
};

const ProfileStyle = styled.div`
  width: 100%;
  height: 157px;

  display: flex;
  align-items: center;
  justify-content: flex-start;

  gap: 30px;

  border-bottom: 16px solid #f3f2f3;

  .userImg {
    width: 95px;
    height: 95px;
    margin-left: 35px;

    overflow: hidden;

    display: flex;
    justify-content: center;
    align-items: center;

    border-radius: 1000000000px;
    box-shadow: 0 0 0 2.3px #ffffff, 0 0 0 4.6px ${Palette["point_blue"]};
  }

  img {
    width: 100%;
  }

  .userInfo {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
  }

  .userInfo > div:first-child {
    font-size: 23px;
    color: #7684b0;
  }
  .userInfo > div:last-child {
    font-size: 16px;
    color: rgba(99, 99, 99, 0.67);
    border-bottom: 1px solid rgba(99, 99, 99, 0.67);
    padding: 0;
  }
`;

export default Profile;
