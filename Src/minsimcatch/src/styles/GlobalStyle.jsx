import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

  body {
    font-family: "NanumGothic";
    line-height: 1.5;
    margin:0;
    outline: none;

  }
  * {
    text-decoration: none;
    font-family: "NanumGothic";
  }
  #root {
  max-width: 390px;
  max-height: 844px;
  margin: 0 auto;
  
  text-align: center;
  margin-top: 55px;
  padding-bottom: 6rem;
  }

  @media screen and (min-width: 1100px ) {

  #background{
    width:1280px;
    height: 832px;
    background-image: url('/image/background2.png');
    background-size:530px;
    background-repeat:no-repeat;
    position: fixed;
    top:20%;
    left:10%;
    }
    #root{
      position: relative;
      left: 25%;
    }

  } 
  @media screen and (min-width: 1500px ) {

#background{
  width:1280px;
  height: 832px;
  background-image: url('/image/background2.png');
  background-size:630px;
  background-repeat:no-repeat;
  position: fixed;
  top:23%;
  left:15%;
  }
  #root{
    position: relative;
    left: 25%;
  }

} 
@media screen and (min-width: 1750px ) {

#background{
  width:1280px;
  height: 832px;
  background-image: url('/image/background2.png');
  background-size:800px;
  background-repeat:no-repeat;
  position: fixed;
  top:25%;
  left:15%;
  }
  #root{
    position: relative;
    left: 25%;
  }

} 

`;

export default GlobalStyle;
