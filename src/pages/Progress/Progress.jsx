import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import MentorCard from '../../components/MentorCard/MentorCard';
import firebase from '../../utils/firebaseConfig';
const Progress = () => {
  const [mentorList, setMentorList] = useState([]);

  useEffect(() => {
    const mentor = firebase
      .database()
      .ref('mentor')
      .child(firebase.auth().currentUser.uid);

    // TODO make a filter on the active mentors for this user
    // TODO redirect to sign up/in page if not logged
    // TODO get all the metor services for an user for history

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
    <div style={{ marginTop: '80px' }}>
      <MentorCard mentorList={mentorList} />
    </div>
  );
};

export default Progress;
