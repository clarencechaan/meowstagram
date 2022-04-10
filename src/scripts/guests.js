import { doc, getDoc } from "firebase/firestore";
import { db } from "../Firebase";

// const blueberry = {
//   username: "blueberry",
//   fullname: "Blueberry Onyx",
//   imgURL: "https://imgur.com/MLoJBiX.jpg",
//   following: [],
//   followers: [],
// };

// const omelette = {
//   username: "omelette",
//   fullname: "Omelette Sapphire II",
//   imgURL: "https://imgur.com/xwFnZFN.jpg",
//   following: [],
//   followers: [],
// };

// const widget = {
//   username: "widget",
//   fullname: "Widget Apollo Jr.",
//   imgURL: "https://imgur.com/1qkpVEx.jpg",
//   following: [],
//   followers: [],
// };

// const critter = {
//   username: "critter",
//   fullname: "Critter Cupcake",
//   imgURL: "https://imgur.com/MEFWOzT.jpg",
//   following: [],
//   followers: [],
// };

// const pumpkin = {
//   username: "pumpkin",
//   fullname: "Pumpkin Pie III",
//   imgURL: "https://imgur.com/5BQjio2.jpg",
//   following: [],
//   followers: [],
// };

// const sushi = {
//   username: "sushi",
//   fullname: "Sushi the Cat",
//   imgURL: "https://imgur.com/faIACfv.jpg",
//   following: [],
//   followers: [],
// };

async function fetchGuests() {
  const blueberryRef = doc(db, "users", "blueberry");
  const omeletteRef = doc(db, "users", "omelette");
  const widgetRef = doc(db, "users", "widget");
  const critterRef = doc(db, "users", "critter");
  const pumpkinRef = doc(db, "users", "pumpkin");
  const blueberrySnap = await getDoc(blueberryRef);
  const omeletteSnap = await getDoc(omeletteRef);
  const widgetSnap = await getDoc(widgetRef);
  const critterSnap = await getDoc(critterRef);
  const pumpkinSnap = await getDoc(pumpkinRef);
  const blueberry = blueberrySnap.data();
  const omelette = omeletteSnap.data();
  const widget = widgetSnap.data();
  const critter = critterSnap.data();
  const pumpkin = pumpkinSnap.data();
  return [blueberry, omelette, widget, critter, pumpkin];
}

const guestsArray = fetchGuests();

export default guestsArray;
