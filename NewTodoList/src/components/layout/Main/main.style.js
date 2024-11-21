import styled from "styled-components";

const MainBox = styled.div`
    display: flex;
    flex-direction : column;
    padding: 0 30px;
    min-width : 1000px;
    margin-top : 80px;
`

const InputBox = styled.div`
    display: flex;
    flex-direction : column;
    gap: 10px;
`
const SendButton = styled.button`
    text-align : center;
    width : 100%;
    height: 50px;
    /* background-color : #DB4455; */
    color: black;
    background-color : ${(props) => props.$isValid ? '#DB4455' : 'lightgray'}; 
    cursor: ${(props) => !props.$isValid && 'not-allowed' };
    opacity: 0.7;
    border-radius: 7px;
    border : 0px;

`
const Input = styled.input`
    padding: 0 10px;
    width : 100%;
    height: 50px;
    border-radius: 7px;
    border : 1px solid rgba(226, 226, 226, 1);
`
const TotalContentsBox = styled.div`
    display: flex;
    flex-direction : column;
    gap: 10px;
    margin-top: 50px;
`

const ContentBox = styled.div`
    width : 100%;
    min-height: 80px;
    padding: 5px 0px;
    border : 1px solid rgba(226, 226, 226, 1);
    border-radius : 10px;
    display: flex;
`

const CheckBoxInContentBox = styled.div`
    width : 5%;
    display : flex;
    align-items : center;
    justify-content : center;
`

const CheckBoxInput = styled.input`
  appearance: none;
  border: 1.5px solid gainsboro;
  border-radius: 0.35rem;
  width: 1.5rem;
  height: 1.5rem;
  &:checked {
    border-color: transparent;
    background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L7 8.586 5.707 7.293z'/%3e%3c/svg%3e");
    background-size: 100% 100%;
    background-position: 50%;
    background-repeat: no-repeat;
    background-color: limegreen;
  }
`;
const TextBoxInContentBox = styled.div`
    display : flex;
    flex-direction : column;
    justify-content : center;
    gap : 10px;
    width : 60%;
`

const SearchInput = styled.input`
    text-align : center;
`

const ButtonBoxInContentBox = styled.div`
    display : flex;
    width: 35%;
    gap: 10px;
    align-items: center;
    padding: 0 10px;
    button {
        border-radius: 10px;
        border : 0px;
        width : 50%;
        height : 50px;
    } 
`

export { MainBox, InputBox, Input, CheckBoxInput, SearchInput, SendButton, ContentBox, TotalContentsBox, CheckBoxInContentBox, TextBoxInContentBox, ButtonBoxInContentBox }