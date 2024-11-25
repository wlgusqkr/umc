import React, { useEffect, useState } from 'react';
import useCustomFetch from '../../../hooks/fetch-hook';
import { PacmanLoader } from 'react-spinners'
import * as S from './main.style'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
const Main = () => {

  const { data, isLoading, isError, refetch } = useCustomFetch();
  const [title, setTitle] = useState("");
  const [searchValue, setSearchValue] = useState();
  const [debouncedValue, setDebouncecdValue] = useState();
  const [contents, setContents] = useState("");
  const [checked, setChecked] = useState(false);
  const isFormEmpty = title === "" || contents === "";
  const [isModify, setIsModify] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncecdValue(searchValue)
    }, 500)

    return () => {
      clearTimeout(timer)
    }
  }, [searchValue])

  useEffect(() => {
    handleSearch();
  }, [debouncedValue])

  const onChangeSearchValue = (e) => {
    setSearchValue(e.target.value)
  }

  if (isError) {
    return (
      <h2>에러났어요</h2>
    )
  }

  const handleTitle = (e) => {
    setTitle(e.target.value);
  }

  const handleContents = (e) => {
    setContents(e.target.value);
  }

  const handleCheck = () => {
    if (checked == false) {
      setChecked(true);
    } else {
      setChecked(false)
    }
  }

  const handleSubmit = async () => {
    await axios.post(import.meta.env.VITE_TODO_API_URL, {
      title: title,
      content: contents,
      checked: checked
    })
    refetch();
    setChecked(false)
    setTitle("");
    setContents("");
    setChecked(false);
  }

  const handleDelete = async (id) => {
    await axios.delete(`${import.meta.env.VITE_TODO_API_URL}/${id}`)
    refetch();
  }

  const handleUpdate = async (e, id) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const title = formData.get('title');
    const content = formData.get('content');
    const checked = formData.get('check');
    const checkeded = checked === 'on' ? true : false;
    console.log(checkeded)
    await axios.patch(`${import.meta.env.VITE_TODO_API_URL}/${id}`, {
      title: title,
      content: content,
      checked: checkeded
    });

    refetch();
    setIsModify(false);
  }

  const handleSearch = async () => {
    await refetch({ params: { title: debouncedValue } })
  }

  const onKeyDownhandleSearch = async (e) => {
    if (e.key == 'Enter') {
      await refetch({ params: { title: searchValue } })
    }
  }
  return (
    <>
      <S.MainBox>

        <S.InputBox>
          <S.CheckBoxInContentBox>
            <S.CheckBoxInput type='checkbox' onChange={handleCheck}></S.CheckBoxInput>
          </S.CheckBoxInContentBox>
          <S.Input placeholder='제목을 입력해주세요' value={title} onChange={handleTitle}></S.Input>
          <S.Input placeholder='내용을 입력해주세요' value={contents} onChange={handleContents}></S.Input>
          <S.SendButton onClick={handleSubmit} $isValid={!(isFormEmpty)} disabled={isFormEmpty}>ToDo 생성</S.SendButton>
        </S.InputBox>
        <S.TotalContentsBox>
          <S.SearchInput onKeyDown={onKeyDownhandleSearch} value={searchValue} onChange={onChangeSearchValue}></S.SearchInput>
          {
            data?.data[0].map((element) => (
              <React.Fragment key={element.id}>
                {
                  isModify ?
                    <form onSubmit={(e) => { handleUpdate(e, element.id) }}>
                      <S.ContentBox >
                        <S.CheckBoxInContentBox>
                          <S.CheckBoxInput type='checkbox' defaultChecked={element.checked} name='check'></S.CheckBoxInput>
                        </S.CheckBoxInContentBox>
                        <S.TextBoxInContentBox>
                          <input type="text" defaultValue={element.title} name='title'></input>
                          <input type="text" defaultValue={element.content} name='content'></input>
                        </S.TextBoxInContentBox>
                        <S.ButtonBoxInContentBox>
                          <button type={'submit'} >수정완료</button>
                          <button onClick={() => { handleDelete(element.id) }}>삭제</button>
                        </S.ButtonBoxInContentBox>
                      </S.ContentBox>
                    </form>
                    :
                    <S.ContentBox>
                      <S.CheckBoxInContentBox>
                        <S.CheckBoxInput readOnly type='checkbox' checked={element.checked} name='check'></S.CheckBoxInput>
                      </S.CheckBoxInContentBox>
                      <S.TextBoxInContentBox>
                        <p onClick={() => { navigate(`/detail/${element.id}`) }} style={{ cursor: 'pointer' }}>{element.title}</p>
                        <p>{element.content}</p>
                      </S.TextBoxInContentBox>
                      <S.ButtonBoxInContentBox>
                        <button onClick={() => { setIsModify(true) }}>수정</button>
                        <button onClick={() => { handleDelete(element.id) }}>삭제</button>
                      </S.ButtonBoxInContentBox>
                    </S.ContentBox>
                }
              </React.Fragment>


            ))
          }
        </S.TotalContentsBox>
      </S.MainBox>
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

export default Main;