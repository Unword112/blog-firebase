import React, { useEffect, useState } from "react";
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";
import { db } from '../firebase-config'

function Home({ isAuth }) {
    const userRef = db.collection('users')
    const unsub = userRef.onSnapshot(docSnapshot => {
      if (docSnapshot.empty) {
        console.log('No matching documents.')
        return
      }
      docSnapshot.forEach(doc => {
        console.log(doc.id, '=>', doc.data())
      })
    }, err => {
      console.log(`Encountered error: ${err}`)
    })
    
    unsub();
    
  return (
    <div className="homePage">
      
    </div>
  );
}

export default Home;