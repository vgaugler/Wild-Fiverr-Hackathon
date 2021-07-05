/* eslint-disable no-unused-vars */
import React from 'react';
import { useState } from 'react/cjs/react.development';
import CloseSvg from '../../images/CloseSvg';
import firebase from '../../utils/firebaseConfig';
import { useAlert } from 'react-alert';

function DeleteMentor({ product }) {
  const alert = useAlert();

  const deleteMentor = () => {
    const favoriteRef = firebase
      .database()
      .ref('mentor')
      .child(firebase.auth().currentUser.uid)
      .child(product.name);

    favoriteRef.on('value', (snapshot) => {
      let previousList = snapshot.val();
      let list = [];
      for (let id in previousList) {
        list.push({ id, ...previousList[id] });
      }
    });
    favoriteRef.remove();
    alert.show(
      `you remove ${product.name} from your program. That's too bad !`,
    );
  };

  return (
    <>
      <CloseSvg
        onClick={deleteMentor}
        style={{
          position: 'absolute',
          top: '15px',
          right: '15px',
          fill: 'var(--pinkLightColor)',
          cursor: 'pointer',
        }}
      />
    </>
  );
}

export default DeleteMentor;
