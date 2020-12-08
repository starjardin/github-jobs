import styled from 'styled-components'

const JobDetailsStyles = styled.div`
  color : #334680;
  display : flex;
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
    small {color : #1E86FF;}
  }
  .backToHome, .company_logo, .icon {
    display : flex;
    gap : 1rem;
    align-items : cemter;
    h4 {
      margin : 0;
      transform : translateY(-7px) 
    }
    small {
      font-weight: 500;
      font-size: 12px;
      line-height: 14px;
      color: #B9BDCF;
    }
    .icon {
      gap : 2px;
    }
    h2 {
      
    }
  }

  .howToApply {
    font-weight: bold;
    font-size: 14px;
    line-height: 21px;
    text-transform: uppercase;
    color: #B9BDCF;
  }
`

export default JobDetailsStyles