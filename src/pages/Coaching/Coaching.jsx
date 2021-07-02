import React, { useEffect } from 'react';
import { useState } from 'react/cjs/react.development';
import firebase from '../../utils/firebaseConfig';
import { Link, useHistory } from 'react-router-dom';

function Coaching() {
  const history = useHistory().location.pathname;
  const [abo, setAbo] = useState();
  useEffect(() => {
    const abo = firebase
      .database()
      .ref('mentor')
      .child(firebase.auth().currentUser.displayName);

    abo.on('value', (snapshot) => {
      let previousList = snapshot.val();
      console.log(previousList);
      let list = [];
      for (let id in previousList) {
        list.push({ id, ...previousList[id] });
      }
      setAbo(list);
      console.log(abo);
    });
  }, []);

  return (
    <>
      <div style={{ marginTop: '130px' }}>
        <div
          className='heading-center'
          style={{
            backgroundColor: '#0D084D',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              justifyContent: 'space-around',
            }}
          >
            <h3
              style={{
                marginBottom: '25px',
                fontFamily: 'Macan',
                color: 'white',
              }}
            >
              {abo && abo.length} newbie available
            </h3>
            <h1
              style={{
                margin: '0',
                fontFamily: 'Macan',
                fontSize: '4rem',
                color: 'white',
              }}
            >
              Your{' '}
              <span
                style={{
                  fontFamily: 'Domaine',
                  fontSize: '4rem',
                  color: 'white',
                }}
              >
                Newbie's
              </span>
            </h1>
          </div>
          <img
            src='images/prof.jpeg'
            alt=''
            style={{ width: '353px', objectFit: 'cover' }}
          ></img>
        </div>
      </div>
      <div className='cocktails-center'>
        {abo &&
          abo.map((m, i) => {
            return (
              <div>
                <article
                  key={m.id}
                  className='cocktail'
                  style={{ position: 'relative' }}
                >
                  <div className='img-container'>
                    <img src={m.image} alt={m.abo} />
                  </div>
                  <div className='cocktail-footer'>
                    <div className='product'>
                      <h4>{m.abo}</h4>
                      <h4 className='price'>Abo n°{i + 1}</h4>
                    </div>
                    {/* <div
                      style={{
                        position: 'absolute',
                        top: '15px',
                        left: '10px',
                        display: 'flex',
                        justifyContent: 'space-around',
                      }}
                    >
                      {language.map((m) => (
                        <div
                          className="tag"
                          style={{
                            backgroundColor: '#1dbf7361',
                            color: 'white',
                            padding: '10px',
                            marginRight: '10px',
                            borderRadius: '20px',
                            cursor: 'pointer',
                          }}
                        >
                          {m}
                        </div>
                      ))}
                    </div>
                    <div
                      style={{
                        margin: '15px auto',
                        display: 'flex',
                        flexWrap: 'wrap',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {skill.map((m) => (
                        <div
                          className="tag2"
                          style={{
                            border: '1px solid hsla(0, 0%, 46.7%, 0.65)',
                            color: 'var(--primaryDarkColor)',
                            borderRadius: '3px',
                            fontSize: '11px',
                            padding: '5px 12px',
                            margin: '4px',
                            cursor: 'pointer',
                            display: 'inline-block',
                          }}
                        >
                          {m}
                        </div>
                      ))}
                    </div> */}
                    <Link
                      to={
                        history === '/coaching'
                          ? `/coaching/${m.userId}`
                          : {
                              pathname: `/coaching/${m.userId}`,
                              mentorProps: {
                                id: m.id,
                                name: m.name,
                              },
                            }
                      }
                      className='add-cart'
                    >
                      {history === '/progress'
                        ? 'Chat now'
                        : history === '/coaching'
                        ? 'Chat now'
                        : 'View'}
                    </Link>
                  </div>
                </article>{' '}
                {/* {history === '/progress' ? (
                <ProgressBar completed={product.name === 'Fedor' ? 30 : 100} />
              ) : null} */}
              </div>
            );
          })}
      </div>
    </>
  );
}

export default Coaching;
