import styled from 'styled-components'

const SearchContainer = styled.div`
    display: flex;
    justify-content : center;

    input {
        color: black;
        flex: 1px;
        padding: 15px;
        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;
        
        border: 1px solid rgb(220, 220, 220)
    }

    button {
        width: 80px;
        background-color: #F82E62;
        color: white;
        cursor: pointer;
        border: none;
        border-top-right-radius: 5px;
        border-bottom-right-radius: 5px
    }
`

const Container = styled.div`
    padding-top: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 10px;
`
const MovidCard = styled.div`
    width: 15%;
    display: flex;
    flex-direction: column;
`

export { SearchContainer, Container, MovidCard }