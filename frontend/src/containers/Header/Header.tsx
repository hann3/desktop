import netlifyIdentity from 'netlify-identity-widget';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

import { authLogIn, authLogOut, AuthType, selectAuth } from 'src/contexts/auth';
import { useAppSelector } from 'src/contexts/state.type';
import { createUser } from 'src/utils/users';
import { StyledHeader } from './Header.style';

const Header = () => {
  const dispatch = useDispatch();
  const { id } = useAppSelector(selectAuth) as AuthType;

  const { pathname } = useLocation();

  const login = () => {
    netlifyIdentity.open('login');
  };

  const logout = () => {
    netlifyIdentity.logout();
  };

  netlifyIdentity.on('login', async ({ id, email, user_metadata: { full_name: nickname } }) => {
    let authorizedUser = {};

    let data = sessionStorage.getItem('persist:root');
    if (data) {
      const { auth } = JSON.parse(sessionStorage.getItem('persist:root'));
      data = JSON.parse(auth);
    }
    if (!data || !data.id) data = await createUser({ id, email, nickname });

    authorizedUser = {
      id: data.id,
      reservations: data.reservation,
      myReviews: data.myReviews,
    };

    dispatch(authLogIn({ ...authorizedUser }));
    netlifyIdentity.close();
  });

  netlifyIdentity.on('logout', () => {
    dispatch(authLogOut());
    sessionStorage.clear();
  });

  useEffect(() => {
    netlifyIdentity.init();
  }, []);

  return (
    <StyledHeader>
      <Link to="/">
        <h1>
          <img src="/src/img/AnyConv.com__logo.webp" alt="더놀자" />
        </h1>
      </Link>

      {!id ? (
        <button onClick={login}>로그인</button>
      ) : pathname.includes('reservation') ? null : (
        <div>
          <button onClick={logout}>로그아웃</button>
          <Link to="/mypage">마이페이지</Link>
          <Link to="/cart">장바구니</Link>
        </div>
      )}
    </StyledHeader>
  );
};

export default Header;
