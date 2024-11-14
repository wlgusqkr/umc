import * as yup from 'yup';


const schema = yup.object().shape({
  email: yup.string().matches(/^[A-Za-z0-9_\.\-/]+@[A-Za-z0-9\-]+\.[A-Za-z0-9_\-]+/, '올바른 이메일형식이 아닙니다. 다시 확인해주세요').required('이메일을 반드시 입력해주세요'),
  password: yup.string().min(8, '비밀번호는 8자 이상이여야합니다.').max(16, '비밀번호는 16자 이하여야합니다.').required(),
})

export { schema }