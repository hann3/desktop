import React, { useEffect, useRef, useState } from 'react';
import { UserInfoFormContainer } from './Profile.style';
import { AuthType, authUpdate, selectAuth } from 'src/contexts/auth';
import { useAppSelector } from 'src/contexts/state.type';
import { useDispatch } from 'react-redux';
import { fetchUserInfo, isValidProfile, updateUser } from 'src/utils/users';
import { ProfileEditor, User } from './User.type';

const UserInfoForm = ({ isEditingMode, setEditingMode }: ProfileEditor) => {
  const { id } = useAppSelector(selectAuth) as AuthType;

  const [user, setUserInfo] = useState<User>({ id: id, email: '', nickname: '', phone: '' });

  useEffect(() => {
    fetchUserInfo(id).then(data => {
      setUserInfo(data[0]);
    });
  }, []);

  const nicknameRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);

  const dispatch = useDispatch();

  const updateProfile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isEditingMode) {
      setEditingMode(true);
      return;
    }
    if (!nicknameRef.current || !phoneRef.current) return;

    if (isValidProfile(nicknameRef.current.value, phoneRef.current.value)) {
      const updatedProfile = await updateUser(id, nicknameRef.current.value, phoneRef.current.value);
      dispatch(authUpdate({ ...updatedProfile }));
      setEditingMode(false);
    }
  };

  return (
    <UserInfoFormContainer onSubmit={updateProfile}>
      <fieldset>
        <legend>
          <strong>{user.nickname}</strong>님의 프로필
        </legend>
        <div>
          <span>이메일</span>
          <span>{user.email}</span>
        </div>
        {isEditingMode ? (
          <>
            <div>
              <label htmlFor="nickname">닉네임</label>
              <input
                id="nickname"
                type="text"
                required
                minLength={1}
                maxLength={6}
                ref={nicknameRef}
                defaultValue={user.nickname}
                placeholder="닉네임(최대 6자리까지)"
              ></input>
            </div>
            <div>
              <label htmlFor="phone">전화번호</label>
              <input
                id="phone"
                type="tel"
                required
                minLength={11}
                maxLength={11}
                ref={phoneRef}
                defaultValue={user.phone}
                placeholder={'11자리 숫자를 입력하세요'}
              ></input>
            </div>
          </>
        ) : (
          <>
            <div>
              <span>닉네임</span>
              <span>{user.nickname}</span>
            </div>
            <div>
              <span>전화번호</span>
              <span>{!user.phone ? '입력된 정보가 없습니다' : user.phone}</span>
            </div>
          </>
        )}
        <button className="submit">{isEditingMode ? '확인' : '수정'}</button>
      </fieldset>
    </UserInfoFormContainer>
  );
};
export default UserInfoForm;
