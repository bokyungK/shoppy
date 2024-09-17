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

const app = initializeApp(firebaseConfig);
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
      // 유저 정보 등록
      // writeUserData(uid, displayName, email, photoURL, false);
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
  // get(child(dbRef, `cart/${uid}/${productId}`))
  // .then((snapshot) => {
  //   if (snapshot.exists()) {
  //     // const cartInfo = snapshot.val();
  //     // const cartSizes = Object.keys(cartInfo);

  //     // if (cartSizes.includes(size)) cartInfo[size] = cartInfo[size] + 1;
  //     // else cartInfo[size] = 1;

  //     // setNotice('장바구니에 등록되었습니다.');
  //     // setTimeout(() => {
  //     //   setNotice(null);
  //     // }, 3000);
  //   } else {
  //     // 새로운 장바구니 데이터로 갱신하기
  //     console.log("data empty");
  //     writeUserData(uid, productId, {[size]: 1});
  //   }
  // }).catch((error) => {
  //   console.error(error);
  // });

  // // 새로운 장바구니 데이터로 갱신하기
  // writeUserData(uid, productId, cartInfo);
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
      // console.log("상품이 없거나 가져오는데 일시적인 에러");
  }).catch(console.error)
}

export async function updateCart(uid, info) {
  const productId = info.id;
  return set(ref(db, `cart/${uid}/${productId}`), info);
}

export async function removeCart(uid, productId) {
  return remove(ref(db, `cart/${uid}/${productId}`));
}