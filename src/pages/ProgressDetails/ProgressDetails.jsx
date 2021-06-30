import { useParams } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
import Chat from '../../components/Chat/Chat';
import { UserContext } from '../../context/UserProvider';
import firebase from '../../utils/firebaseConfig';

const ProgressionDetails = () => {
  const { id } = useParams();
  console.log(id);
  const { isSignedIn } = useContext(UserContext);
  const [product, setProduct] = useState({});
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
        className="product-center"
        key={product.id}
        style={{ marginTop: '80px' }}
      >
        <img className="prod-photo" src={product.image} alt={product.name} />
      </div>
      <Chat id={id} />
    </div>
  );
};

export default ProgressionDetails;
