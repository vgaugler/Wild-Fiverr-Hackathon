import React, { useState, useEffect } from 'react';
import firebase from '../../utils/firebaseConfig';

import './SingleProduct.css';

const SingleProduct = (props) => {
  const [product, setProduct] = useState({});
  const id = props.match.params.id;
  const { mentorAttribut } = props.location.mentorProps;
  const [language, setLanguage] = useState([]);
  const [availabel, setAvailabel] = useState();
  const [skills, setSkills] = useState([]);
  const [name, setName] = useState();
  useEffect(() => {
    const mentor = firebase.database().ref('user').child(`${id}`);

    mentor.on('value', (snapshot) => {
      setProduct(snapshot.val());

      setLanguage(snapshot.val().language);

      setSkills(snapshot.val().skill);
      setName(snapshot.val().name);
      setAvailabel(snapshot.val().disponibility);
      console.log(mentorAttribut);
    });
  }, []);

  function choose() {
    let count = availabel - 1;
    setAvailabel(count);
    const mentor = {
      name: name,
      id: `${id}`,
      skill: skills,
      language: language,
    };

    firebase
      .database()
      .ref('mentor')
      .child(firebase.auth().currentUser.uid)
      .child(`${id}`)
      .set(mentor);
  }

  return (
    <div>
      <div
        className='product-center'
        key={product.id}
        style={{ marginTop: '80px' }}
      >
        <img className='prod-photo' src={product.image} alt={product.name} />
        <section className='content-prod'>
          <div class='title_name'>
            <h2>{product.name}</h2>

            <h5>@{product.nationality}</h5>
          </div>
          <span class='fa fa-star review'></span>
          <span class='fa fa-star review'></span>
          <span class='fa fa-star review'></span>
          <span class='fa fa-star review'></span>
          <span class='fa fa-star-half-o review'></span>
          <p>60 Reviews</p>
          <h5 className='price-prod'>{product.activity}</h5>

          {language.map((el) => (
            <p>{el}</p>
          ))}
          {skills.map((el) => (
            <span>{el} </span>
          ))}

          <p className='description'>{product.description}</p>

          <hr />
          <p>availability:</p>
          <p>{availabel}/5</p>
          <button type='button' className='btnChoose' onClick={choose}>
            To choose this Mentor
          </button>
        </section>
      </div>
    </div>
  );
};

export default SingleProduct;
