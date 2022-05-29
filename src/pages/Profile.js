import React, { useEffect, useState } from "react";
import { getDocs, collection, doc, query, where, onSnapshot, updateDoc } from "firebase/firestore";
import { db, auth } from '../firebase-config'

import { useNavigate } from "react-router-dom";
 
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

  const [ fullname, setFullname ] = useState('')

const q = query(collection(db, "users"), where("email", "==", user.email));
const unsubscribe = onSnapshot(q, (querySnapshot) => {
  const name = [];
  querySnapshot.forEach((doc) => {
    name.push(doc.data().fullname);
  });
  return setFullname(name)
});


const editProfile = async () => {
  await updateDoc(q, {
    fullname: setFullname(fullname),
  })
}

  return (
    <div className="homePage">
      {setFullname.map((fullname => {
        return <div>
          {fullname.name}
          <button></button>
        </div>
      }))}
    </div>
  );
}

export default Profile;