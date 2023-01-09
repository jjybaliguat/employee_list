import styled from "styled-components";

export const ContactsContainer = styled.div`
    height: 100vh;
    padding: 1rem 3rem;
    background: #000;
    @media screen and (max-width: 880px) {
      padding: 1rem 1rem;
    }
`
export const MainContact = styled.div`
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    margin-top: 2rem;
    padding: 1rem;
`
export const FormContainer = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    padding: 2rem 0 4rem 0;
    width: 500px;
    height: fit-content;
    background: #1f1f1f;
    border-radius: 10px;
    box-shadow: 5px 10px 20px 3px rgba(2552,255,255,0.3);
    margin-bottom: 3rem;
`
export const MyForm = styled.form`
   display: flex;
   flex-direction: column;
   align-items: center;
   width: 90%;
`
export const H1 = styled.h1`
    color: #fff;
    font-size: 3rem;
    text-align: center;
    @media screen and (max-width: 880px){
        font-size: 2rem;
    }
`
export const FormGroup = styled.div`
   width: 100%;
   margin-bottom: 10px;
`
export const FormInput = styled.input`
   width: 100%;
   height: 3rem;
   border-radius: 10px;
   background: #2f2f2f;
   border: none;
   outline: ${({invalidInput}) => (invalidInput? '1px solid red': 'none')};
   color: rgba(255, 255, 255, 0.8);
   padding: 10px;
   /* &:focus{
    outline: 1px solid #039be5;
   } */
`
export const TextArea = styled.textarea`
   width: 100%;
   height: 8rem;
   background: #2f2f2f;
   border-radius: 10px;
   border: none;
   color: #fff;
   outline: ${({invalidInput}) => (invalidInput? '1px solid red': 'none')};
   padding: 10px;
   /* &:focus{
    outline: 1px solid #039be5;
   } */
`
export const BtnSubmit = styled.button`
   border: none;
   outline: ${({disable}) => (disable? '1px solid #6f6f6f': '1px solid #039be5')};
   padding: 10px 15px;
   border-radius: 5px;
   color: ${({disable}) => (disable? '#6f6f6f': '#fff')};
   cursor: ${({disable}) => (disable? 'not-allowed': 'pointer')};;
   /* background: #5f5f5f; */
   background: transparent;
   position: absolute;
   bottom: 0;
   right: 0;
   transform: translate(-25px, -20px);
   box-shadow: 3px 5px 5px 2px rgba(0,0,0,0.5);
   &:hover{
    background: ${({disable}) => (disable? 'none': '#039be5')};
    color: #000;
   }
`
export const Error = styled.p`
   color: red;
   margin-left: 10px;
   /* position: absolute; */
`
export const ContactDetails = styled.div`
   display: flex;
   flex-direction: column;
   align-items: center;
   justify-content: center;
   outline: 1px solid #2f2f2f;
   width: 500px;
   height: 355px; 
   border-radius: 10px;
   padding: 10px;
`
export const Details = styled.a`
   color: rgba(255,255,255,0.8);
   text-decoration: none;
   font-size: 18px;
   cursor: pointer;
   margin-bottom: 2rem;
   &:hover{
      color: #fff;
   }
`
export const Detail = styled.span`
   margin-left: 1rem;
`
export const AlertMessage = styled.h3`
   color: #0f9f0f;
   padding: 10px;
`