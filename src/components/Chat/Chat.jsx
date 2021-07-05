/* eslint-disable no-unused-vars */
/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useContext, useEffect, useRef } from 'react';
import { UserContext } from '../../context/UserProvider';
import firebase from '../../utils/firebaseConfig';
import { Scrollbars } from 'react-custom-scrollbars';
import './Chat.css';
import { useAlert } from 'react-alert';

function Chat({ id, name }) {
  const { isSignedIn } = useContext(UserContext);
  const [commentary, setCommentary] = useState('');
  //user comment
  const [comment, setComment] = useState();
  const [role, setRole] = useState();
  //mentor comment
  const [commentMentor, setCommentMentor] = useState();
  const isMounted = useRef(false);
  const [allComment, setAllComment] = useState([]);
  const maxLength = 150;
  const myChangeHandlerCommentary = (event) => {
    setCommentary(event.target.value);
  };
  const alert = useAlert();

  useEffect(() => {
    if (isSignedIn) {
      const comment = firebase
        .database()
        .ref('message')
        .child(firebase.auth().currentUser.uid)
        .child(name);
      comment.on('value', (snapshot) => {
        let previousList = snapshot.val();
        let list = [];
        for (let id in previousList) {
          list.push({ id, ...previousList[id] });
        }
        setComment(list);
      });
    }
    isMounted.current = true;
    return () => (isMounted.current = false);
  }, []);

  useEffect(() => {
    if (isSignedIn) {
      const comment = firebase
        .database()
        .ref('message')
        .child(name)
        .child(firebase.auth().currentUser.uid);
      comment.on('value', (snapshot) => {
        let previousList = snapshot.val();
        let list = [];
        for (let id in previousList) {
          list.push({ id, ...previousList[id] });
        }
        setCommentMentor(list);
      });
    }
    isMounted.current = true;
    return () => (isMounted.current = false);
  }, []);

  useEffect(() => {
    if (isSignedIn) {
      const comment = firebase
        .database()
        .ref('role')
        .child(firebase.auth().currentUser.uid);
      comment.on('value', (snapshot) => {
        let previousList = snapshot.val();
        setRole(previousList);
      });
    }
  }, []);

  useEffect(() => {
    const temp = comment && commentMentor ? [...comment, ...commentMentor] : [];
    const temp2 = temp.sort((a, b) =>
      a.timeStamp < b.timeStamp ? -1 : a.timeStamp > b.timeStamp ? 1 : 0,
    );
    setAllComment(temp2);
  }, [comment, commentMentor]);

  const handleSubmitCommentary = (e) => {
    e.preventDefault();
    const date1 = new Date();
    const date2 = Date.now();
    const dateLocale = date1.toLocaleString('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    });
    const comment = {
      date: dateLocale,
      commentary,
      id: firebase.auth().currentUser.uid,
      name: firebase.auth().currentUser.displayName,
      timeStamp: date2,
    };
    if (commentary)
      firebase
        .database()
        .ref('message')
        .child(firebase.auth().currentUser.uid)
        .child(name)
        .child(date2)
        .set(comment);
    else alert.show('You must type a message');
    setCommentary('');
  };

  return (
    <Scrollbars
      className="boxComment"
      style={{
        width: '50%',
        height: '100vh',
        position: 'relative',
        margin: '0 10px 0 10px',
      }}
    >
      {isSignedIn ? (
        <div style={{ marginRight: '73px' }}>
          {allComment
            ? allComment.map((m, index) => (
                <div
                  key={index}
                  className={
                    m.id === firebase.auth().currentUser.uid
                      ? 'boxGreen'
                      : 'boxGrey'
                  }
                >
                  <h5>
                    {m.id == firebase.auth().currentUser.uid ? 'You' : m.name}{' '}
                  </h5>
                  <div>{m.commentary}</div>
                  <div
                    style={{
                      marginTop: '15px',
                      textAlign: 'end',
                      fontSize: '10px',
                    }}
                  >
                    {m.date}
                  </div>
                </div>
              ))
            : null}
        </div>
      ) : null}
      <div>
        <form
          onSubmit={(e) => {
            isSignedIn
              ? handleSubmitCommentary(e)
              : alert('Vous devez être connecté pour poster un commentaire');
          }}
        >
          <input
            type="text"
            placeholder="votre commentaire"
            onChange={myChangeHandlerCommentary}
            className="input-comment1"
            value={commentary}
            maxLength={maxLength}
          />{' '}
          {commentary ? (
            <div>
              ({maxLength - commentary.length} caractères restants /{maxLength})
            </div>
          ) : null}
          <button
            className="publishButton"
            type="submit"
            // onClick={() => {
            //   isSignedIn
            //     ? handleSubmitCommentary()
            //     : alert('Vous devez être connecté pour poster un commentaire');
            // }}
          >
            Publier
          </button>
        </form>
      </div>
    </Scrollbars>
  );
}

export default Chat;
