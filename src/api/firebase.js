import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, set, get, child, remove } from "firebase/database";
import createId from "create-id";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DB_URL,
  projectId: process.env.REACT_APP_FIREBASE_PJ_ID,
};

initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
const auth = getAuth();
const db = getDatabase();
const dbRef = ref(getDatabase());

provider.setCustomParameters({ prompt: 'select_account' });

export function login() {
  signInWithPopup(auth, provider).catch(console.error);
}

export function logout() {
  signOut(auth).catch(console.error);
}

export function changeUser(callback) {
  onAuthStateChanged(auth, async (userInfo) => {
    if (userInfo) {
      const isAdmin = await checkAdmin(userInfo);
      callback({...userInfo, isAdmin});
    } else {
      callback(null);
    }
  });
}

async function checkAdmin(userInfo) {
  return get(child(dbRef, `admins`))
  .then((snapshot) => {
    if (snapshot.exists()) {
      const admins = snapshot.val();
      return admins.includes(userInfo.uid);
    } else {
      return false;
    }
  }).catch(console.error);
}

export async function addProducts({ name, price, category, description, options, imageUrl }) {
  const id = createId();
  return set(ref(db, 'products/' + id), {
    name,
    price: parseInt(price),
    category,
    description,
    options: options.split(',').map((text) => text.trim()),
    imageUrl,
    id,
  })
  .catch(console.error);
}

export async function getProducts() {
  return get(child(dbRef, `products/`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        const productInfo = snapshot.val();
          const products = Object.values(productInfo);
          return products;
      } else {
          console.log("No 'product' data available");
          return [];
    }})
    .catch(console.error);
}

export async function addCart(uid, productId, cart) {
  return set(ref(db, `cart/${uid}/${productId}`), cart);
}

export async function getCart(uid) {
  return get(child(dbRef, `cart/${uid}`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        const cartInfo = snapshot.val();
        return Object.values(cartInfo);
      }
      return [];
    }).catch(console.error);
}

export async function getDetailProduct(productId) {
  return get(child(dbRef, `products/${productId}`))
  .then((snapshot) => {
      if (snapshot.exists()) {
        return snapshot.val();
      }
      return [];
  }).catch(console.error)
}

export async function updateCart(uid, info) {
  const productId = info.id;
  return set(ref(db, `cart/${uid}/${productId}`), info);
}

export async function removeCart(uid, productId) {
  return remove(ref(db, `cart/${uid}/${productId}`));
}