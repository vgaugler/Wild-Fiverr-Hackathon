import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import firebase from '../../utils/firebaseConfig';
import AddToCart from '../../components/Cart/AddToCart';
import PageHero from '../../components/PageHero/PageHero';
import '../../App.css';

const ProductList = () => {
  const [mentorList, setMentorList] = useState([]);

  useEffect(() => {
    const mentor = firebase.database().ref('user');

    mentor.on('value', (snapshot) => {
      let previousList = snapshot.val();
      let list = [];
      for (let id in previousList) {
        list.push({ id, ...previousList[id] });
      }
      setMentorList(list);
      console.log(mentorList);
    });
  }, []);
  return (
    <>
      <PageHero />
      <div className='cocktails-center'>
        {mentorList.map((product) => {
          const { id, image, name, activity, language, skill } = product;
          return (
            <article
              key={id}
              className='cocktail'
              style={{ position: 'relative' }}
            >
              <div className='img-container'>
                <img src={image} alt={name} />
              </div>
              <div className='cocktail-footer'>
                <div className='product'>
                  <h4>{name}</h4>
                  <h4 className='price'>{activity}</h4>
                </div>
                <div
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
                      className='tag2'
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
                </div>
                <Link
                  to={`/products/${id}`}
                  className='add-cart'
                  style={{
                    color: '#17252A',
                    background: '#fff',
                    border: '2px solid #17252A',
                  }}
                >
                  {/*className="prod-details">*/}
                  View
                </Link>
              </div>
            </article>
          );
        })}
      </div>
    </>
  );
};
export default ProductList;
