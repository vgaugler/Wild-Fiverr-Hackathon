/* eslint-disable eqeqeq */
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import Logo from '../../images/fiversenpai.png';
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
  const [role, setRole] = useState();

  useEffect(() => {
    if (isSignedIn) {
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
    } else {
      setValue(0);
    }
  }, [isSignedIn]);

  useEffect(() => {
    if (isSignedIn) {
      const comment = firebase
        .database()
        .ref('role')
        .child(firebase.auth().currentUser.uid);
      comment.on('value', (snapshot) => {
        let previousList = snapshot.val();
        console.log(previousList);
        setRole(previousList);
      });
    }
  }, [isSignedIn]);
  return (
    <div className={blurStatus ? 'nav blur' : 'nav'}>
      <div className={visible ? 'nav-container-fixed' : 'nav-container'}>
        <img src={Logo} alt='' style={{ width: '250px', height: 'auto' }}></img>
        {role && role.role === 'Newbie' ? (
          <ul className='links'>
            <Link to='/'>
              <li>Home</li>
            </Link>

            <Link to='/products'>
              <li>Mentors</li>
            </Link>
            <Link to='/progress'>
              <li>My Learning</li>
            </Link>
          </ul>
        ) : (
          <ul className='links'>
            <Link to='/'>
              <li>Home</li>
            </Link>
            <Link to='/coaching'>
              <li>My newbies</li>
            </Link>{' '}
          </ul>
        )}

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
                className='connect'
                style={{
                  marginBottom: '0',
                  marginRight: '5px',
                  display: 'inline-flex',
                }}
              >
                First Connection ?{' '}
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
            <div className='amount-container'>
              <p className='total-amount'>{isSignedIn ? value.length : '0'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
