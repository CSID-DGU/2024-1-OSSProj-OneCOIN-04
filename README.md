# 2024-1-OSSProj-OneCOIN-04
![header](https://capsule-render.vercel.app/api?type=Waving&color=30:FCB249,100:43BFFC&height=300&section=header&text=One%20COIN&fontSize=100)

<!-- ### 2024-1-OSSProj-OneCOIN-04 팀의 리파지토리입니다.
    - 팀 구성 - (팀장) 최해관 
               (팀원) 송원종
               (팀원) 이종주 -->




## 팀 구성

| OneCOIN   | 이름   | 학과             | 학번       | Github ID     |
| :-------- | :----- | :--------------- | :--------- | :------------ |
| 팀장      | 최해관 |      불교학부      | 2019110026 | Heagwan-Choe  |
| 팀원      | 송원종 |      철학과      | 2018110398 | songmachi     |
| 팀원      | 이종주 | 산업시스템공학과 | 2021112456 | LJongJoo      |

## 문서 바로가기🔎
- [수행 계획서](https://github.com/CSID-DGU/2024-1-OSSProj-OneCOIN-04/blob/main/Doc/1_1_OSSProj_04_OneCOIN_%EC%88%98%ED%96%89%EA%B3%84%ED%9A%8D%EC%84%9C.md)
- [중간 보고서](https://github.com/CSID-DGU/2024-1-OSSProj-OneCOIN-04/blob/main/Doc/2_1_OSSProj_04_OneCOIN_%EC%A4%91%EA%B0%84%EB%B3%B4%EA%B3%A0%EC%84%9C.md)
- [범위 / 일정 관리](https://github.com/CSID-DGU/2024-1-OSSProj-OneCOIN-04/blob/main/Doc/4_1_OSSProj_04_OneCOIN_%EB%B2%94%EC%9C%84_%EC%9D%BC%EC%A0%95_%EC%9D%B4%EC%8A%88%EA%B4%80%EB%A6%AC.md)
- [회의록](https://github.com/CSID-DGU/2024-1-OSSProj-OneCOIN-04/blob/main/Doc/4_2_OSSProj_04_OneCOIN_%ED%9A%8C%EC%9D%98%EB%A1%9D.md)
- [제품의 구성, 배포 및 운영 관련 문서 자료](https://github.com/CSID-DGU/2024-1-OSSProj-OneCOIN-04/blob/main/Doc/4_3_OSSProj_04_OneCOIN_%EC%A0%9C%ED%92%88%EA%B5%AC%EC%84%B1%EB%B0%B0%ED%8F%AC%EC%9A%B4%EC%98%81%EC%9E%90%EB%A3%8C.md)

# 질문을 하면 답을 알려줄게 민심캐치! <img src="Doc/image/logo.png" alt="간트차트" width="50" height="50">

## 프로젝트 목표💯
- 온라인 투표 커뮤니티 서비스로, 작성자의 질문을 모두가 공유하고 고민할 수 있는 웹앱을 만드는 것을 목표로합니다.

## 개발내용🖥️
- 대표기능
    - 메인페이지 : 가장 최신의 글을 먼저 보여주고 스크롤을 통해 다음 글을 볼 수 있다.
    - 고민글 작성 : 로그인을 진행한 회원을 대상으로 고민글을 작성할 수 있도록 한다.
      - 고민글 제목 , 고민글 내용 , 투표 안건(최대 6개),카테고리 지정
    - 투표 기능 : 로그인을 진행한 회원을 대상으로 투표를 진행할 수 있도록 한다.
    - 댓글 기능 : 고민글에 대해서 댓글을 통해 서로 소통을 하도록 한다.
    - 마이페이지
      - 내가 참여한 투표 : 내가 어떤 글에 투표를 참여했는지 글 목록을 표시해준다.
      - 내가 작성한 질문 : 내가 어떤 글을 작성했는지 글 목록을 표시해준다.
      - 내정보 수정 : 나의 이름,이메일을 수정할 수 있다.
    - 검색기능 : 글의 제목을 검색할 수 있도록 기능
### 순서를 나타내는 블록다이어그램
<img src="Doc/image/블록다이어그램최종.png" alt="블록 다이어그램" width="650" height="350"> 

## 기대효과👨‍👩‍👧‍👧
1. 자유로운 플랫폼 제공
    - 젊은 10~20대 사용자들이 자신의 의견을 쉽게 공유할 수 있게 하여, 주로 가벼운 주제들로 더욱 활발한 참여를 유도
2. 효율적 의견 수집
    - 간단하고 직관적인 사용자 인터페이스(UI)를 통해 사용자는 복잡한 절차 없이 원하는 설문을 신속하게 생성하고 공유할 수 있음

## 데이터 구조
<img src="Doc/image/ER다이어그램_피그마.png" alt="블록 다이어그램" width="650" height="350">

## 최종 결과물✅


## 사용한 기술 스택 🛠️
### Frontend
<img src="https://img.shields.io/badge/react -61DAFB?style=for-the-badge&logo=react&logoColor=black"> <img src="https://img.shields.io/badge/recoil-3578E5?style=for-the-badge&logo=recoil&logoColor=white"> <img src="https://img.shields.io/badge/reactrouter-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white"> <img src="https://img.shields.io/badge/vite-646CFF?style=for-the-badge&logo=vite&logoColor=black"> <img src="https://img.shields.io/badge/HTML-E34F26?style=for-the-badge&logo=html5&logoColor=white"> <img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black">
   
### Backend
<img src="https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=white">

## 나머지는 추후 업데이트 예정


