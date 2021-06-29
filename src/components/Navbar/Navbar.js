import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import Logo from '../../images/logo.jpg';
import { BoxLogContext } from '../../context/LogProvider';
import { UserContext } from '../../context/UserProvider';
import { BlurContext } from '../../context/BlurProvider';
import SignUp from '../Login/SignUp';
import { NameContext } from '../../context/NameProvider';
import firebase from '../../utils/firebaseConfig';

export default function Navbar({ visible }) {
  const { updateLoginStatus } = useContext(BoxLogContext);
  const { isSignedIn } = useContext(UserContext);
  const { blurStatus, updateBlurStatus } = useContext(BlurContext);
  const { name } = useContext(NameContext);
  const [value, setValue] = useState();

  useEffect(() => {
    const mentor = firebase
      .database()
      .ref('mentor')
      .child(firebase.auth().currentUser.uid);

    mentor.on('value', (snapshot) => {
      let previousList = snapshot.val();
      let list = [];
      for (let id in previousList) {
        list.push({ id, ...previousList[id] });
      }
      setValue(list);
    });
  }, []);
  return (
    <div className={blurStatus ? 'nav blur' : 'nav'}>
      <div className={visible ? 'nav-container-fixed' : 'nav-container'}>
        <img src={Logo} alt='' style={{ width: '150px', height: 'auto' }}></img>

        <ul className='links'>
          <Link to='/'>
            <li>Home</li>
          </Link>
          <Link to='/products'>
            <li>Mentor</li>
          </Link>
          <Link to='/progress'>
            <li>Ma progression</li>
          </Link>
        </ul>
        <SignUp />
        <div className='user'>
          {' '}
          {isSignedIn ? (
            <h4
              className='pseudoTitle'
              style={{ marginRight: '10px', marginBottom: '0' }}
            >
              {name}
            </h4>
          ) : (
            <div>
              <p
                style={{
                  marginBottom: '0',
                  marginRight: '5px',
                  display: 'inline-flex',
                }}
              >
                First Connexion ?{' '}
                <div
                  className='signup'
                  style={{
                    cursor: 'pointer',
                    marginLeft: '15px',
                    marginRight: '15px',
                  }}
                  onClick={() => {
                    updateLoginStatus(true);
                    updateBlurStatus(true);
                  }}
                >
                  Sign up
                </div>{' '}
                or
              </p>
            </div>
          )}
          {isSignedIn ? (
            <button
              className='login'
              style={{ marginRight: '10px' }}
              onClick={() => {
                firebase.auth().signOut();
              }}
            >
              Log out
            </button>
          ) : (
            <button
              className='login'
              style={{ cursor: 'pointer', marginRight: '10px' }}
              onClick={() => {
                updateLoginStatus(true);
                updateBlurStatus(true);
              }}
            >
              Log in
            </button>
          )}
          <Link to='/cart'>
            <i className='fa fa-graduation-cap fa-2x cart-icon'></i>{' '}
          </Link>
          <div className='nav-item'>
            <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'>
              <path d='M16 6v2h2l2 12H0L2 8h2V6a6 6 0 1 1 12 0zm-2 0a4 4 0 1 0-8 0v2h8V6zM4 10v2h2v-2H4zm10 0v2h2v-2h-2z' />
            </svg>
            <div className='amount-container'>
              <p className='total-amount'>{value.length}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
