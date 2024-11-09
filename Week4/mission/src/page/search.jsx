import { useRef } from "react";

const Search = () => {
    const ref = useRef(5);
    console.log(ref.current)
    return (
        <h2>검색페이지 야호</h2>
    )
}

export default Search;