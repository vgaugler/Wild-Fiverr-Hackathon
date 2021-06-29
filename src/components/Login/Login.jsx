/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useContext } from 'react';
import firebase from '../../utils/firebaseConfig';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import './Login.css';
import CloseSvg from '../../images/CloseSvg';
import { NameContext } from '../../context/NameProvider';
import Logo from '../../images/Fiverr_Symbol_Green_RGB.png';
import { UserContext } from '../../context/UserProvider';
import { BlurContext } from '../../context/BlurProvider';
import { BoxLogContext2 } from '../../context/LogProvider2';

function Login() {
  const { isSignedIn, updateSignedIn } = useContext(UserContext);
  const { updateBlurStatus } = useContext(BlurContext);
  const { loginStatus2, updateLoginStatus2 } = useContext(BoxLogContext2);
  const { name, updateName } = useContext(NameContext);

  const uiConfig = {
    signInFlow: 'popup',
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,

      firebase.auth.EmailAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
      signInSuccess: () => false,
    },
  };

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      updateSignedIn(!!user);
      if (isSignedIn === true) {
        updateName(firebase.auth().currentUser.displayName);
      }
    });
  }, []);

  return (
    <div className={loginStatus2 ? 'BoxLog2 Active' : 'BoxLog2'}>
      {isSignedIn ? (
        <div>
          <h2 className='titleBoxLog'>
            Bonjour {firebase.auth().currentUser.displayName}
          </h2>
          <img
            src={firebase.auth().currentUser.photoURL}
            alt=''
            className='photoProfil'
          />
        </div>
      ) : (
        <div>
          <h4 style={{ fontSize: '2rem', marginBottom: '25px' }}>
            Log in with Fiverr
          </h4>
          <StyledFirebaseAuth
            uiConfig={uiConfig}
            firebaseAuth={firebase.auth()}
          />
        </div>
      )}
      <div>
        {' '}
        <img src={Logo} alt='' className='logoLog' />
      </div>
      <div
        className='closeBoxLog'
        style={{ cursor: 'pointer' }}
        onClick={() => {
          updateLoginStatus2(false);
          updateBlurStatus(false);
        }}
      >
        <CloseSvg />
      </div>
    </div>
  );
}

export default Login;
