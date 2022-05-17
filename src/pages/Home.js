import React, { useEffect, useState } from "react";
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";
import { db } from '../firebase-config'

function Home({ isAuth }) {
  const [ postLists, setPostList ] = useState([]);
  const postsCollectionRef = collection(db, "posts");
  
  useEffect(() => {
      const getPosts = async () => {
          const data = await getDocs(postsCollectionRef);
          setPostList(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
      }
      getPosts();
  })

  const deletePost = async (id) => {
    const postDoc = doc(db, 'posts', id);
    await deleteDoc(postDoc);
  };

  return (
    <div className="homePage">
      {postLists.map((post) => {
          return (
            <div className="post">
                <div>
                    <div className="title">
                        <h1>{post.title}</h1>
                    </div>
                    <div>
                        <button onClick={() => {
                            deletePost(post.id);
                            }
                        }>Delete Post</button>
                    </div>
                </div>
                <div className="postTextContainer">
                    {post.postText}
                </div>
                <h3>{post.name}</h3>
            </div>
        )
      })}
    </div>
  );
}

export default Home;