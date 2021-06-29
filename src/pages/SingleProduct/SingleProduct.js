import React, {useState, useEffect} from "react";
import firebase from '../../utils/firebaseConfig';

import "./SingleProduct.css";

const SingleProduct = (props) => {
  const [product, setProduct] = useState({});
  const id = props.match.params.id;
  const [language, setLanguage] = useState([]);
  const [skills, setSkills] = useState([]);
  useEffect(() => {
    const mentor = firebase.database().ref('user').child(`${id}`);

    mentor.on('value', (snapshot) => {
      setProduct(snapshot.val());
      console.log(product);
      setLanguage(snapshot.val().language);
      console.log(language);
      setSkills(snapshot.val().skill);
    });
  }, []);
  

  return (
    <div>
      
        
          <div className="product-center" key={product.id}>
            <img className="prod-photo" src={product.image} alt={product.name} />
            <section className="content-prod">
              <div class="title_name">
              <h2>{product.name}</h2>
              
              <h5>@{product.nationality}</h5>
              </div>
              <span class="fa fa-star review"></span>
              <span class="fa fa-star review"></span>
              <span class="fa fa-star review"></span>
              <span class="fa fa-star review"></span>
              <span class="fa fa-star-half-o review"></span>
              <p>60 Reviews</p>
              <h5 className="price-prod">{product.activity}</h5>
              
              {language.map((el) =>               
                 <p>{el}</p>                
               )}
               {skills.map((el) =>               
                 <span>{el} </span>                
               )}
              
              

              <p className="description">{product.description}</p>

              <hr />
              
            </section>
          </div>
        
      
    </div>
    );
  
};

export default SingleProduct;
