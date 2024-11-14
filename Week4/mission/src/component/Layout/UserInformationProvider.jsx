import { createContext, useContext, useState, useEffect } from 'react';

export const UserInformationContext = createContext();

const UserInformationProvider = ({ children }) => {
    const [userInformation, setUserInformation] = useState(null);

    useEffect(() => {
        // 로컬 스토리지에서 유저 정보 불러오기
        const storedUserInfo = localStorage.getItem('userInformation');
        if (storedUserInfo) {
            setUserInformation(JSON.parse(storedUserInfo));
        }
    }, []);

    const saveUserInformation = (info) => {
        setUserInformation(info);
        localStorage.setItem('userInformation', JSON.stringify(info)); // 로컬 스토리지에 저장
    };
    
    const deleteUserInformation = () => {
        setUserInformation(null);
        localStorage.removeItem('userInformation')
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
    }

    return (
        <UserInformationContext.Provider value={{ userInformation, setUserInformation: saveUserInformation, deleteUserInformation }}>
            {children}
        </UserInformationContext.Provider>
    );
};
export default UserInformationProvider