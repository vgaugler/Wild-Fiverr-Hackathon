import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import ProgressBar from '@ramonak/react-progress-bar';

import './MentorCard.css';

const MentorCard = ({ mentorList }) => {
  const history = useHistory().location.pathname;
  return (
    <>
      <div className="cocktails-center">
        {mentorList &&
          mentorList.map((product, i) => {
            const { id, image, name, activity, language, skill } = product;
            return (
              <div>
                <article
                  key={id}
                  className="cocktail"
                  style={{ position: 'relative' }}
                >
                  <div className="img-container">
                    <img src={image} alt={name} />
                  </div>
                  <div className="cocktail-footer">
                    <div className="product">
                      <h4>{name}</h4>
                      <h4 className="price">{activity}</h4>
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
                    </div>
                    <Link
                      to={
                        history === '/products'
                          ? `/products/${id}`
                          : {
                              pathname: `/progress/${id}`,
                              mentorProps: {
                                id: product.id,
                                name: product.name,
                              },
                            }
                      }
                      className="add-cart"
                    >
                      {history === '/progress' ? 'Chat now' : 'View'}
                    </Link>
                  </div>
                </article>{' '}
                {history === '/progress' ? (
                  <ProgressBar
                    completed={product.name === 'Fedor' ? 30 : 100}
                  />
                ) : null}
              </div>
            );
          })}
      </div>
    </>
  );
};
export default MentorCard;
