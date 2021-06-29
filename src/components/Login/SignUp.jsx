/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useContext, useState } from 'react';
import firebase from '../../utils/firebaseConfig';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import './Login.css';
import CloseSvg from '../../images/CloseSvg';
import { NameContext } from '../../context/NameProvider';
import Logo from '../../images/Fiverr_Symbol_Green_RGB.png';
import { UserContext } from '../../context/UserProvider';
import { BlurContext } from '../../context/BlurProvider';
import { BoxLogContext } from '../../context/LogProvider';
import { useHistory } from 'react-router-dom';

function SignUp() {
  const { isSignedIn, updateSignedIn } = useContext(UserContext);
  const { updateBlurStatus } = useContext(BlurContext);
  const { loginStatus, updateLoginStatus } = useContext(BoxLogContext);
  const { name, updateName } = useContext(NameContext);
  const [role, setRole] = useState(null);
  let history = useHistory();

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
  const handleSubmit = (e) => {
    e.preventDefault();

    firebase
      .database()
      .ref('abo/' + firebase.auth().currentUser.uid)
      .child(role);
    updateBlurStatus(false);
    updateLoginStatus(false);
    history.push('/');
  };
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      // !! ensure boolean
      updateSignedIn(!!user);

      if (isSignedIn === true) {
        firebase
          .database()
          .ref('abo/' + firebase.auth().currentUser.uid)
          .set({
            Username: firebase.auth().currentUser.displayName,
            email: firebase.auth().currentUser.email,
            role: role,
          });
        updateName(firebase.auth().currentUser.displayName);
      } else {
        updateName('unknown');
      }
    });
  }, [name, role]);

  return (
    <div className={loginStatus ? 'BoxLog Active' : 'BoxLog'}>
      {isSignedIn ? (
        <div>
          <h2 className='titleBoxLog' style={{ marginBottom: '2.5rem' }}>
            Bonjour {firebase.auth().currentUser.displayName}
          </h2>
          <div>
            <p>Choose your freelance level</p>
            <form
              onSubmit={handleSubmit}
              style={{
                display: 'flex',
                flexDirection: 'column',

                justifyContent: 'space-evenly',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-evenly',
                  marginBottom: '2.5rem',
                }}
              >
                <input
                  type='radio'
                  value='Newbie'
                  name='role'
                  onClick={() => setRole('Newbie')}
                />{' '}
                Newbie
                <input
                  type='radio'
                  value='Expert'
                  name='role'
                  onClick={() => setRole('Expert')}
                />{' '}
                Expert
              </div>
              <button
                className='submit'
                type='submit'
                style={{
                  width: '150px',
                }}
              >
                Valider
              </button>
            </form>{' '}
          </div>
        </div>
      ) : (
        <div>
          <h4 style={{ fontSize: '2rem', marginBottom: '25px' }}>
            Sign Up with Fiverr
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
          updateLoginStatus(false);
          updateBlurStatus(false);
        }}
      >
        <CloseSvg />
      </div>
    </div>
  );
}

export default SignUp;
