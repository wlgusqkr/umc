import { useNavigate, useParams } from "react-router-dom"
import useCustomFetch from "../hooks/fetch-hook";
import styled from "styled-components"
import * as S from '../components/layout/Main/main.style'
import axios from "axios";
import { useState } from "react";
import { PacmanLoader } from "react-spinners";
const TodoDetail = () => {

  const params = useParams();
  const navigate = useNavigate();
  const [isModify, setIsModify] = useState(false);
  const { data, isLoading, isError, refetch } = useCustomFetch(`${import.meta.env.VITE_TODO_API_URL}/${params.id}`)

  const handleUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const title = formData.get('title');
    const content = formData.get('content');
    const checked = formData.get('check');
    const checkeded = checked === 'on' ? true : false;
    console.log(checkeded)
    await axios.patch(`${import.meta.env.VITE_TODO_API_URL}/${params.id}`, {
      title: title,
      content: content,
      checked: checkeded
    });

    refetch();
    setIsModify(false);
  }

  const handleDelete = async (id) => {
    await axios.delete(`${import.meta.env.VITE_TODO_API_URL}/${id}`)
    navigate('/main')
  }

  if (isError) {
    return (
      <h2>에러났어요</h2>
    )
  }
  return (
    <>
      <ContentBox>
        {
          isModify ?
            <form onSubmit={(e) => { handleUpdate(e) }}>
              <S.ContentBox >
                <S.CheckBoxInContentBox>
                  <S.CheckBoxInput type='checkbox' defaultChecked={data?.data.checked} name='check'></S.CheckBoxInput>
                </S.CheckBoxInContentBox>
                <S.TextBoxInContentBox>
                  <input type="text" defaultValue={data?.data.title} name='title'></input>
                  <input type="text" defaultValue={data?.data.content} name='content'></input>
                </S.TextBoxInContentBox>
                <S.ButtonBoxInContentBox>
                  <button type={'submit'} >수정완료</button>
                  <button onClick={() => { handleDelete(data?.data.id) }}>삭제</button>
                </S.ButtonBoxInContentBox>
              </S.ContentBox>
            </form>
            :
            <S.ContentBox>
              <S.CheckBoxInContentBox>
                <S.CheckBoxInput readOnly type='checkbox' checked={data?.data.checked} name='check'></S.CheckBoxInput>
              </S.CheckBoxInContentBox>
              <S.TextBoxInContentBox>
                <p> Id : {data?.data.id}</p>
                <p>{data?.data.title}</p>
                <p>{data?.data.content}</p>
                <p>생성일 : {data?.data.createdAt}</p>
                <p>업데이트 : {data?.data.updatedAt}</p>
              </S.TextBoxInContentBox>
              <S.ButtonBoxInContentBox>
                <button onClick={() => { setIsModify(true) }}>수정</button>
                <button onClick={() => { handleDelete(data?.data.id) }}>삭제</button>
              </S.ButtonBoxInContentBox>
            </S.ContentBox>
        }

      </ContentBox>
      {
        isLoading && (
          <div style={{ width: '100%', height: '100%', position: 'fixed', top: '45%', left: '45%' }}>
            <h3>잠시만 기다려주세요.</h3>
            <PacmanLoader />
          </div>
        )

      }
    </>
  )
}

export default TodoDetail

const ContentBox = styled.div`
    padding : 0 60px;
    text-align : center;
    display : flex;
    flex-direction: column;
`