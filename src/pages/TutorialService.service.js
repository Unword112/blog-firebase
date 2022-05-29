import { db } from '../firebase-config'
import { collection } from "firebase/firestore";

const users = collection(db, "/users");
const getAll = () => {
  return users;
};
const create = (data) => {
  return users.add(data);
};
const update = (id, value) => {
  return users.doc(id).update(value);
};
const remove = (id) => {
  return users.doc(id).delete();
};
const TutorialService = {
  getAll,
  create,
  update,
  remove
};
export default TutorialService;