import { ModalMainContainer } from "@/styles/Container";
import ButtonLayout from "@/components/common/voteButton/ButtonLayout";
import VoteHead from "@/components/common/voteButton/VoteHead";
import MainContent from "@/components/home/MainContent";
import VoteBottom from "@/components/common/voteButton/VoteBottom";
import { useEffect, useState } from "react";
import Modal from "./Modal";
import ShareForm from "./ShareForm";
import styled from "styled-components";
import ChatForm from "./ChatForm";
import PropTypes from "prop-types";

/**
 * @param {object} props
 * @param {object} props.detailData
 * @param {string} props.what
 * @param {function} props.click
 *
 **/

const ModalTemplate = ({ detailData, click, what }) => {
  const {
    totalCount,
    participate,
    isOwner,
    title,
    content,
    endDate,
    active,
    options,
    username,
    category,
    id,
  } = detailData;

  const [optionState, setOptionState] = useState(options);
  const [participateState, setParticipate] = useState(participate);

  useEffect(() => {
    setOptionState(options);
    setParticipate(participate);
  }, [detailData, participate]);

  const [modalVisible, setModalVisible] = useState(false);
  const shareCloseModal = () => {
    setModalVisible(false);
  };
  const shareOpenModal = () => {
    setModalVisible(true);
  };

  const [totalCountState, setTotalCountState] = useState(totalCount);

  const changeVotes = (participate, result) => {
    click && click(participate, result);
    const resultData = result?.result;
    setParticipate(participate);

    const copyOptions = optionState?.map((choice, index) => {
      return {
        ...choice,
        optionCount: resultData[index]?.optionCount,
        optionRatio: resultData[index]?.optionRatio,
        choice: resultData[index].choice,
      };
    });

    setOptionState(copyOptions);
    setTotalCountState(result?.total);
  };

  return (
    <div>
      <ModalMainContainer className="modal">
        <Container>
          <VoteHead
            totalCount={totalCountState}
            endDate={endDate}
            what={what}
            isOwner={isOwner}
            active={active}
            username={username}
            categoryValue={category}
            id={id}
            modal={true}
          ></VoteHead>
          <MainContent title={title} content={content}></MainContent>

          <ButtonLayout
            participate={participateState}
            isOwner={isOwner}
            active={active}
            options={optionState}
            changeVotes={changeVotes}
          ></ButtonLayout>

          <VoteBottom
            onClickShare={shareOpenModal}
            modal={true}
            id={id}
          ></VoteBottom>
          {modalVisible && (
            <Modal
              visible={modalVisible}
              closable={true}
              maskClosable={true}
              onClose={shareCloseModal}
            >
              <ShareForm />
            </Modal>
          )}
        </Container>
        <Chat>
          <ChatForm participate={participateState || isOwner} />
        </Chat>
      </ModalMainContainer>
    </div>
  );
};

ModalTemplate.propTypes = {
  detailData: PropTypes.object.isRequired,
  click: PropTypes.func.isRequired,
  what: PropTypes.string.isRequired,
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: space-between;
  width: 100%;
  height: auto;
  border-bottom: 2px solid #e2e2e2;
  margin-top: 1.5rem;
  padding-bottom: 1rem;
`;
const Chat = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-bottom: 30px;
`;

export default ModalTemplate;
