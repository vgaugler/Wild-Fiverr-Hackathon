/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useContext } from 'react';
import firebase from '../../utils/firebaseConfig';
import './SingleProduct.css';
import { UserContext } from '../../context/UserProvider';

const SingleProduct = (props) => {
  const { isSignedIn } = useContext(UserContext);
  const [product, setProduct] = useState({});
  const id = props.match.params.id;
  const [language, setLanguage] = useState([]);
  const [availabel, setAvailabel] = useState();
  const [skills, setSkills] = useState([]);
  const [name, setName] = useState();
  const [value, setValue] = useState();
  const [ids, setIds] = useState();

  useEffect(() => {
    const mentor = firebase.database().ref('user').child(`${id}`);

    mentor.on('value', (snapshot) => {
      setProduct(snapshot.val());
      setLanguage(snapshot.val().language);
      setSkills(snapshot.val().skill);
      setName(snapshot.val().name);
      setAvailabel(snapshot.val().disponibility);
    });
  }, []);

  useEffect(() => {
    if (isSignedIn) {
      const mentor = firebase
        .database()
        .ref('mentor')
        .child(firebase.auth().currentUser.uid)
        .child(`${id}`);

      mentor.on('value', (snapshot) => {
        let previousList = snapshot.val();
        setIds(previousList);
        setValue(!!previousList);
      });
    }
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
          <h5 className='price-prod' style={{ marginBottom: '40px' }}>
            {product.activity}
          </h5>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'left',
            }}
          >
            {language.map((el) => (
              <p
                className='tag'
                style={{
                  backgroundColor: 'var(--primaryColor)',
                  color: 'white',
                  padding: '10px',
                  marginRight: '10px',
                  borderRadius: '20px',
                  cursor: 'pointer',
                }}
              >
                {el}
              </p>
            ))}
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'left',
              marginBottom: '40px',
            }}
          >
            {skills.map((el) => (
              <span
                style={{
                  border: '1px solid rgba(119, 119, 119, 0.65)',
                  color: 'var(--primaryDarkColor)',
                  borderRadius: '3px',
                  fontSize: '11px',
                  padding: '5px 12px',
                  margin: '4px',
                  cursor: 'pointer',
                  display: 'inline-block',
                }}
              >
                {el}{' '}
              </span>
            ))}
          </div>
          <p className='description'>{product.description}</p>

          <hr />
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'left',
              margin: '20px',
            }}
          >
            {' '}
            <p
              style={{
                margin: '0 20px 0 0',
              }}
            >
              availability:
            </p>
            <a
              style={{
                backgroundColor: 'var(--primaryDarkColor)',
                color: 'white',
                padding: '10px',
                marginRight: '10px',
                borderRadius: '20px',
                cursor: 'pointer',
              }}
            >
              {availabel}/5
            </a>
          </div>
          {value && ids.id != 1 ? (
            <button type='button' className='btnWait' disabled={true}>
              Waiting for approbation
            </button>
          ) : value && id == 1 ? (
            <button type='button' className='btnAlready' disabled={true}>
              Already in your program
            </button>
          ) : (
            <button type='button' className='btnChoose' onClick={choose}>
              Choose this mentor
            </button>
          )}
        </section>
      </div>
    </div>
  );
};

export default SingleProduct;
