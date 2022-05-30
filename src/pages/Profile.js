import React, { useEffect, useState } from "react";
import {setDoc, getDocs, collection, doc, query, where, onSnapshot, updateDoc, getDoc } from "firebase/firestore";
import { db, auth } from '../firebase-config'
import ProfilePicture from './ProfilePicture'

/*import { doc, updateDoc, increment } from "firebase/firestore";

const washingtonRef = doc(db, "cities", "DC");

// Atomically increment the population of the city by 50.
await updateDoc(washingtonRef, {
    population: increment(50)
});
cd blog-firebase */

function Profile({ isAuth }) {
  const [user, setUser] = useState(() => {
    const user = auth.currentUser;
    
    return user;
  });
  const [ profile, setProfile ] = useState([]);
  const [ fullname, setFullname ] = useState('');
  const [ surname, setSurname ] = useState('');
  const [ phoneNumber, setPhoneNumber ]  = useState('');

  const q = query(collection(db, "users"), where("uid", "==", user.uid));

  useEffect(() => {
    try {
      const getUser = async () => {
        const data = await getDocs(q);
        setProfile(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
    }
    getUser();
    } catch(error) {
      console.log(error.message);
    }
  })

  const UpdateUserInfo = async()=>{
    const querySnapshot = await getDocs(q);
    let docID = '';
    querySnapshot.forEach((doc) => {
    // if email is you primary key then only document will be fetched so it is safe to continue, this line will get the documentID of user so that we can update it
      docID = doc.id;
    });
    const user = doc(db, "users", docID);

    // Set the "capital" field of the city 'DC'
    await updateDoc(user, {
        fullname: fullname,
        surname: surname,
        phoneNumber: phoneNumber,
    });
}

  return (
    <div className="homePage">
      <ProfilePicture />
      {profile.map((profile) => {
          return (
            <div>
              <div>
                <h1>{profile.fullname}</h1>
                <input
                  placeholder="Change fullname"
                  onChange={(event) => {
                    setFullname(event.target.value);
                  }}
                />
              </div>
              <div>
                <h1>{profile.surname}</h1>
                <input 
                  placeholder="Change surname"
                  onChange={(event) => {
                    setSurname(event.target.value);
                  }}
                />
              </div>
              <div>
                <h1>{profile.phoneNumber}</h1>
                <input 
                  placeholder="Change Phone Number"
                  onChange={(event) => {
                    setPhoneNumber(event.target.value);
                  }}
                />
              </div>
              <button onClick={UpdateUserInfo}>Edit</button>
            </div>
        )
      })}
    </div>
)}

export default Profile;