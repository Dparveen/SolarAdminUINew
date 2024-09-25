import React, { useContext, useEffect, useRef } from 'react';

// project import
import Breadcrumb from './Breadcrumb';
import NavBar from './NavBar';
import Navigation from './Navigation';

import { useNavigate } from 'react-router-dom';
import { ConfigContext } from '../../contexts/ConfigContext';
import useOutsideClick from '../../hooks/useOutsideClick';
import useWindowSize from '../../hooks/useWindowSize';
import * as actionType from '../../store/actions';

// ==============================|| ADMIN LAYOUT ||============================== //

const AdminLayout = ({ children }) => {
  const windowSize = useWindowSize();
  const ref = useRef();
  const configContext = useContext(ConfigContext);
  const navigate = useNavigate();
  const { collapseMenu, layout } = configContext.state;
  const { dispatch } = configContext;
  useEffect(() => {
    const token = sessionStorage.getItem('authToken'); // Assuming authToken is stored in sessionStorage
    if (!token) {
      navigate('/auth/signin'); // Redirect to /auth/signin if no token is found
    }
  }, [navigate]);
  useOutsideClick(ref, () => {
    if (collapseMenu) {
      dispatch({ type: actionType.COLLAPSE_MENU });
    }
  });

  useEffect(() => {
    if (windowSize.width > 992 && windowSize.width <= 1024) {
      dispatch({ type: actionType.COLLAPSE_MENU });
    }

    if (windowSize.width < 992) {
      dispatch({ type: actionType.CHANGE_LAYOUT, layout: 'vertical' });
    }
  }, [dispatch, layout, windowSize]);

  const mobileOutClickHandler = () => {
    if (windowSize.width < 992 && collapseMenu) {
      dispatch({ type: actionType.COLLAPSE_MENU });
    }
  };

  let mainClass = ['pcoded-wrapper'];

  let common = (
    <React.Fragment>
      <Navigation />
      <NavBar />
    </React.Fragment>
  );

  if (windowSize.width < 992) {
    let outSideClass = ['nav-outside'];
    if (collapseMenu) {
      outSideClass = [...outSideClass, 'mob-backdrop'];
    }
    outSideClass = [...outSideClass, 'mob-fixed'];

    common = (
      <div className={outSideClass.join(' ')} ref={ref}>
        {common}
      </div>
    );
  }

  return (
    <React.Fragment>
      {common}
      <div className="pcoded-main-container" onClick={() => mobileOutClickHandler} onKeyDown={() => mobileOutClickHandler}>
        <div className={mainClass.join(' ')}>
          <div className="pcoded-content">
            <div className="pcoded-inner-content">
              <Breadcrumb />
              {children}
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default AdminLayout;
