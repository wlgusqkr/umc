import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import styled from 'styled-components';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
const SignUp = () => {
    const navigate = useNavigate();

    const schema = yup.object().shape({
        email: yup.string().matches(/^[A-Za-z0-9_\.\-/]+@[A-Za-z0-9\-]+\.[A-Za-z0-9_\-]+/, '올바른 이메일형식이 아닙니다. 다시 확인해주세요').required('이메일을 반드시 입력해주세요'),
        password: yup.string().min(8, '비밀번호는 8자 이상이여야합니다.').max(16, '비밀번호는 16자 이하여야합니다.').required(),
        passwordCheck: yup.string().oneOf([yup.ref('password'), null], '비밀번호가 일치하지않습니다.').required()
    })
    
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = async (data) => {
        try {
            const result = await axios.post(import.meta.env.VITE_SIGNUP_API_URL, data)
            console.log(result);
        } catch {
            console.log('api에러')

        }
        navigate('/login', { replace: true }); 
    }

    return (
        <MainBox>
            <div>
            <Title>회원가입</Title>
                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    <Input  placeholder={`이메일을 입력해주세요!`} type={'email'} {...register("email")} />
                    <p style={{ color: 'red' }}>{errors.email?.message}</p>
                    <Input placeholder={`비밀번호를 입력해주세요!`} type={'password'} {...register("password")} />
                    <p style={{ color: 'red' }}>{errors.password?.message}</p>
                    <Input placeholder={`비밀번호를 입력해주세요!`} type={'passwordCheck'} {...register("passwordCheck")} />
                    <p style={{ color: 'red' }}>{errors.passwordCheck?.message}</p>
                    <CustomSubmitInput backgroundcolor={'grey'} value={`회원가입`} type={'submit'}/>
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