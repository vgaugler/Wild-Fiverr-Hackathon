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
      {/* <div>
        <table
          style={{
            width: '90vw',
          }}
        >
          <thead>
            <h2>History</h2>
          </thead>
          <tr>
            <th>Mentor</th>
            <th>Status</th>
            <th>Starting date</th>
            <th>End date</th>
            <th>My rating</th>
          </tr>

          <tr>
            <th>
              <Link to="/progress/1">Jean-Mich-Mich</Link>
            </th>
            <th>Waiting</th>
            <th></th>
            <th></th>
            <th></th>{' '}
          </tr>
          <tr>
            <th>Jean-Mich-Mich</th>
            <th>Active</th>
            <th>20 June 2021</th>
            <th>20 July 2021</th>
            <th>4/5</th>
          </tr>
          <tr>
            <th>Jean-Mich-Mich</th>
            <th>Finished</th>
            <th>20 May 2021</th>
            <th>20 June 2021</th>
            <th>4/5</th>
          </tr>
        </table>
      </div> */}
    </div>
  );
};

export default Progress;
