# A4.3 OSS 프로젝트 제품 구성, 배포 및 운영 자료  

## 1. 프로젝트 제품 구성
- 전체적인 시스템 진행 순서를 나타내는 블록다이어그램

<img src="image/블록다이어그램1.png" alt="블록 다이어그램" width="650" height="350"> 

| 구현여부 |  | 기능 | 구현 상세 설명 | 연결된 컴포넌트 |
|----------|------|------|----------------|-----------------|
| 100% |신규작성| 로그인 | 로그인 기능 | Src/minsimcatch/src/pages/login/LoginPage.jsx |
| 100% |신규작성| 핫 게시물 | 투표가 많이 되어있는 글을 보여줌 | Src/minsimcatch/src/pages/hot/HotPage.jsx |
| 100% |신규작성| 완료된 게시물 | 투표를 완료한(종료한) 글을 보여줌 | Src/minsimcatch/src/pages/complete/CompletePage.jsx |
| 100% |신규작성| 마이 페이지 | 투표 내역, 작성한 글, 정보 수정 화면을 보여줌 | Src/minsimcatch/src/pages/my/Mypage.jsx |
| 100% |신규작성| 메인 페이지 | 로그인하면 보이는 페이지(질문 글들이 보임) | Src/minsimcatch/src/pages/main/MainPage.jsx |
| 100% |신규작성| 검색 | 키워드로 글을 검색할 수 있음 | Src/minsimcatch/src/pages/serach/SearchPage.jsx |
| 100% |신규작성| 회원가입 | 회원가입 기능 | Src/minsimcatch/src/pages/signup/SignUpPage.jsx |
| 100% |신규작성| 업로드 | 글을 작성해 업로드 하는 기능 | Src/minsimcatch/src/pages/upload/UploadPage.jsx |
| 100% |신규작성| 댓글 | 모달을 통해 댓글을 작성하는 기능 | Src/minsimcatch/src/components/common/modal/ChatFrom.jsx |
| 100% |신규작성| 투표 종료 | 투표 종료를 눌러 더 이상 투표를 하지 못하도록 설정 | Src/minsimcatch/src/components/common/VoteButton/EndButton.jsx |
| 100% |신규작성| 내가 투표한 게시물 | 내가 투표한 게시물의 리스트를 보여줌 | Src/minsimcatch/src/pages/my/MyParticipatePage.jsx |
| 100% |신규작성| 내가 작성한 글 | 내가 작성한 글의 리스트를 보여줌 | Src/minsimcatch/src/pages/my/MyQuestionPage.jsx |
  
## 2. 프로젝트 제품 배포 방법  
- 비용의 효율성을 위해서 집 데스크톱을 이용해 서버처럼 활용

## 3. 프로젝트 제품 운영 방법  
- 프로젝트 실행 방법
```
☆실행방법☆

npm install

npm run dev
```
- React 프로젝트를 생성하거나 다양한 라이브러리 및 도구들을 설치할 때 npm을 이용하므로 node.js를 설치
  - npm (Node Package Manager)은 Node.js 환경에서 실행되는 패키지 관리자
- 해당 프로젝트를 local에 받기 위해 <br>```git clone https://github.com/CSID-DGU/2024-1-OSSProj-OneCOIN-04.git```을 진행
- clone을 받으면 해당 프로젝트로 들어가 ```cd src/minsimcatch```명령어를 실행
- ```npm install```명령어 실행
- 패키지가 설치가 되면 ```npm run dev``` 명령어 실행
- 이후 프로젝트가 실행되면 ```http://localhost:3000```로 이동후 사용
## 프로젝트 시연 시나리오
- 시퀀스 다이어그램

<img src="image/PPT용 시퀀스다이어그램.png" alt="블록 다이어그램" width="300" height="300">

- 위 시퀀스 다이어그램처럼 글작성, 투표 진행 후 해당 투표와 글작성이 잘 이루어졌는지 마이페이지에서 투표목록 및 글작성 내역 확인

### 1. 회원가입 및 로그인 진행
<table>
  <tr>
    <td style="text-align: center;">
      <p>로그인</p>
      <img src="../Doc/image/LoginPage.png" alt="로그인" width="230" height="450">
    </td>
    <td style="text-align: center;">
      <p>회원가입</p>
      <img src="../Doc/image/SignupPage.png" alt="회원가입" width="230" height="450">
    </td>
  </tr>
</table>

### 2. 글작성 진행 및 투표 하기
<table>
  <tr>
    <td style="text-align: center;">
      <p>메인 페이지</p>
      <img src="../Doc/image/UploadPage.png" alt="글작성" width="230" height="450">
    </td>
    <td style="text-align: center;">
      <p>글작성</p>
        <img src="../Doc/image/MainPage.png" alt="메인 페이지" width="230" height="450">
    </td>
  </tr>
</table>

### 3. 마이 페이지로 들어가기
<table>
  <tr>
    <td style="text-align: center;">
      <p>마이 페이지</p>
      <img src="../Doc/image/Mypage.png" alt="마이 페이지" width="230" height="450">
    </td>
  </tr>
</table>

### 4.  참여한 투표 및 내가 작성한 글 확인하기
<table>
  <tr>
    <td style="text-align: center;">
      <p>내가 참여한 투표</p>
      <img src="../Doc/image/MyParticipatePage.png" alt="내가 참여한 투표" width="230" height="450">
    </td>
    <td style="text-align: center;">
      <p>내가 작성한 글</p>
      <img src="../Doc/image/MyQuestionPage.png" alt="내가 작성한 글" width="230" height="450">
    </td>
  </tr>
</table>



<hr>

- [메인페이지로 돌아가기](https://github.com/CSID-DGU/2024-1-OSSProj-OneCOIN-04)
