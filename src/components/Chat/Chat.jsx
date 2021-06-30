/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from '../../context/UserProvider';
import firebase from '../../utils/firebaseConfig';
import './Chat.css';

function Chat({ id }) {
  const { isSignedIn } = useContext(UserContext);
  const [commentary, setCommentary] = useState('');
  const [comment, setComment] = useState();
  const [role, setRole] = useState();
  const [commentMentor, setCommentMentor] = useState();
  const allComment = [];
  const maxLength = 150;
  const myChangeHandlerCommentary = (event) => {
    setCommentary(event.target.value);
  };

  useEffect(() => {
    if (isSignedIn) {
      const comment = firebase
        .database()
        .ref('message')
        .child(firebase.auth().currentUser.uid)
        .child(id);

      comment.on('value', (snapshot) => {
        let previousList = snapshot.val();
        console.log(previousList);
        let list = [];
        for (let id in previousList) {
          list.push({ id, ...previousList[id] });
        }
        console.log(list);
        setComment(list);
        console.log(comment);
        allComment.push(comment);
      });
    }
  }, []);
  useEffect(() => {
    if (isSignedIn) {
      const comment = firebase.database().ref('message').child(id).child(id);

      comment.on('value', (snapshot) => {
        let previousList = snapshot.val();
        console.log(previousList);
        let list = [];
        for (let id in previousList) {
          list.push({ id, ...previousList[id] });
        }
        console.log(list);
        setCommentMentor(list);
        console.log(commentMentor);
        allComment.push(commentMentor);
        console.log(allComment);
      });
    }
  }, []);

  useEffect(() => {
    if (isSignedIn) {
      const comment = firebase
        .database()
        .ref('message')
        .child(firebase.auth().currentUser.uid)
        .child(id);

      comment.on('value', (snapshot) => {
        let previousList = snapshot.val();
        console.log(previousList);
        let list = [];
        for (let id in previousList) {
          list.push({ id, ...previousList[id] });
        }
        console.log(list);
        setComment(list);
        console.log(comment);
      });
    }
  }, []);

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
  }, []);

  const handleSubmitCommentary = () => {
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
    };
    firebase
      .database()
      .ref('message')
      .child(role.role == 'Newbie' ? firebase.auth().currentUser.uid : id)
      .child(id)
      .child(date2)
      .set(comment);

    setCommentary('');
  };

  return (
    <div>
      {isSignedIn ? (
        <div>
          {comment
            ? comment.map((m) => (
                <div className={role.role == 'Newbie' ? 'boxGreen' : 'boxGrey'}>
                  <div>
                    {m.id == firebase.auth().currentUser.uid ? 'Vous' : null}{' '}
                  </div>
                  <div>{m.commentary}</div>
                  <div>{m.date}</div>
                </div>
              ))
            : null}
        </div>
      ) : null}

      {isSignedIn ? (
        <div>
          {commentMentor
            ? commentMentor.map((m) => (
                <div className={commentMentor ? 'boxGrey' : 'boxGreen'}>
                  <div>
                    {m.id == firebase.auth().currentUser.uid ? 'Vous' : m.name}{' '}
                  </div>
                  <div>{m.commentary}</div>
                  <div>{m.date}</div>
                </div>
              ))
            : null}
        </div>
      ) : null}
      <div>
        <form>
          <input
            type='text'
            placeholder='votre commentaire'
            onChange={myChangeHandlerCommentary}
            className='input-comment1'
            value={commentary}
            maxLength={maxLength}
          />{' '}
          {commentary ? (
            <div>
              ({maxLength - commentary.length} caractères restants /{maxLength})
            </div>
          ) : null}
          <button
            className='publishButton'
            type='button'
            onClick={() => {
              isSignedIn
                ? handleSubmitCommentary()
                : alert('Vous devez être connecté pour poster un commentaire');
            }}
          >
            Publier
          </button>
        </form>
      </div>
    </div>
  );
}

export default Chat;
