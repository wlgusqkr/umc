import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useContext} from 'react';
import { UserInformationContext } from '../component/Layout/UserInformationProvider';
import { schema } from '../consts/schema';
import { useMutation } from '@tanstack/react-query';

const Login = () => {
  const { /*userInformation,*/ setUserInformation } = useContext(UserInformationContext);
  const navigate = useNavigate();

  const fetchUserInformation = useMutation({
    mutationFn: async () => {
      const response = await axios.get(import.meta.env.VITE_USER_INFORMATION_API_URL, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
      });
      return response.data;
    },
    onSuccess: (data) => {
      setUserInformation(data.email); // 성공 시 Context API 상태 업데이트
    },
    onError: (error) => {
      console.log("Error fetching user information:", error);
    },
  });


  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(import.meta.env.VITE_LOGIN_API_URL, data);
      const { accessToken, refreshToken } = response.data;

      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);

      await fetchUserInformation.mutateAsync();
      navigate('/')
    } catch (error) {
      console.log(error)
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