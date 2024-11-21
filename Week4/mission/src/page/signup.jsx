import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import styled from 'styled-components';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { schema } from '../consts/schema';
import { useMutation } from '@tanstack/react-query';
const SignUp = () => {
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const signUpMutation = useMutation({
    mutationFn : async (data) => {
      const response = await axios.post(import.meta.env.VITE_SIGNUP_API_URL, data);
      console.log(response)
      return response;
    },
    onSuccess : () => {
      navigate('/login', { replace: true });
    },
    onError : () => {

    },
    onMutate : () => {

    }
  })


  return (
    <MainBox>
      <div>
        <Title>회원가입</Title>
        <form onSubmit={handleSubmit(signUpMutation.mutate)} noValidate>
          <Input placeholder={`이메일을 입력해주세요!`} type={'email'} {...register("email")} />
          <p style={{ color: 'red' }}>{errors.email?.message}</p>
          <Input placeholder={`비밀번호를 입력해주세요!`} type={'password'} {...register("password")} />
          <p style={{ color: 'red' }}>{errors.password?.message}</p>
          <Input placeholder={`비밀번호를 입력해주세요!`} type={'passwordCheck'} {...register("passwordCheck")} />
          <p style={{ color: 'red' }}>{errors.passwordCheck?.message}</p>
          <CustomSubmitInput backgroundcolor={'grey'} value={`회원가입`} type={'submit'} />
        </form>
      </div>
    </MainBox>
  )
}

export default SignUp;

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