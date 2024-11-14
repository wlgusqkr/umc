import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { UserInformationContext } from '../component/Layout/UserInformationProvider';

const Login = () => {
  const { userInformation, setUserInformation } = useContext(UserInformationContext);
  const navigate = useNavigate();

  const schema = yup.object().shape({
    email: yup.string().matches(/^[A-Za-z0-9_\.\-/]+@[A-Za-z0-9\-]+\.[A-Za-z0-9_\-]+/, '올바른 이메일형식이 아닙니다. 다시 확인해주세요').required('이메일을 반드시 입력해주세요'),
    password: yup.string().min(8, '비밀번호는 8자 이상이여야합니다.').max(16, '비밀번호는 16자 이하여야합니다.').required(),
  })

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(import.meta.env.VITE_LOGIN_API_URL, data);
      const { accessToken, refreshToken } = response.data;

      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      navigate('/')
    } catch (error) {
      console.log(error)
    }
    try {
      const responseUserInformation = await axios.get(import.meta.env.VITE_USER_INFORMATION_API_URL, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`

        }
      });
      setUserInformation(responseUserInformation.data.email)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <MainBox>
      <div>
        <Title>로그인</Title>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Input placeholder={`이메일을 입력해주세요!`} type={'email'} {...register("email")} />
          <p style={{ color: 'red' }}>{errors.email?.message}</p>
          <Input placeholder={`비밀번호를 입력해주세요!`} type={'password'} {...register("password")} />
          <p style={{ color: 'red' }}>{errors.password?.message}</p>
          <CustomSubmitInput backgroundcolor={'grey'} value={`로그인`} type={'submit'} />
        </form>
      </div>
    </MainBox>
  )
}

export default Login;

const MainBox = styled.div`
    width: 100%;
    height: 60%;
    display: flex;
    justify-content: center;
    align-items: center;
`

const Input = styled.input`
    width: 300px;
    height: 40px;
    color: black;
    padding-left: 10px;
    border-radius: 8px;
    border: 1px solid black;
    background: white;
`
const CustomSubmitInput = styled.input`
    width: 300px;
    height: 40px;
    color: white;
    padding-left: 10px;
    border-radius: 8px;
    border: 1px solid black;
    background: #DB4455;
`

const Title = styled.h4`
    text-align: center;
    font-size: 20px;
`