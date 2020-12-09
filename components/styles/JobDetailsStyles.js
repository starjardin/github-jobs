import styled from 'styled-components'

//styles for the job details page.
const JobDetailsStyles = styled.div`
  color : #334680;
  gap : 3rem;
  img {
    width : 3rem;
    height : 3rem;
    border-radius: 4px;
    box-shadow : 1px 1px 1px 1px #B9BDCF;
  }
  a {
    text-decoration : none;
  }
  .backToHome {
    color : #1E86FF;
    padding-bottom : 3rem;
  }
  .backToHome, .company_logo, .icon, .clock-container {
    display : flex;
    gap : 1rem;
    align-items : center;
    h4 {
      margin : 0;
      transform : translateY(-7px) 
    }
    
    small {
      font-weight: 500;
      font-size: 12px;
      line-height: 14px;
      // color: #B9BDCF;
    }
    .icon {
      gap : 2px;
    }
  }
  
  h2 {
    padding-top : 2rem;
  }

  .clock-container {
    padding-bottom : 2rem;
  }

  .howToApply {
    font-weight: bold;
    font-size: 14px;
    line-height: 21px;
    text-transform: uppercase;
    color: #B9BDCF;
    padding-block : 1rem;
  }
  @media (min-width : 720px) {
    display : grid;
    grid-template-columns : 1fr 3fr;
    h2, .backToHome {
      padding : 0;
    }
  }
`

export default JobDetailsStyles