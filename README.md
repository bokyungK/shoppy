## 📄 Service Introduction
- 콘솔 게이머를 위한 쇼핑 사이트를 제작했습니다.
- 상품 리스트, 장바구니, 로그인/로그아웃 기능을 사용할 수 있습니다.
- URL : https://bobo-gamer-shop.netlify.app/
<br />

## 🧰 Tech
<div>
  <img src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB">
  <img src="https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white">
  <img src="https://img.shields.io/badge/-React%20Query-FF4154?style=for-the-badge&logo=react%20query&logoColor=white">
  <img src="https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white">
  <img src="https://img.shields.io/badge/firebase-a08021?style=for-the-badge&logo=firebase&logoColor=ffcd34">
  <img src="https://img.shields.io/badge/cloudianry-3448c5.svg?style=for-the-badge&logo=cloudinary&logoColor=white">
</div>
<br />

## 🗃️ Architecture
<pre>
📦shoppy
 ┣ 📂public
 ┣ 📂src
 ┃ ┣ 📂api
 ┃ ┃ ┣ 📜cloudinary.js
 ┃ ┃ ┗ 📜firebase.js
 ┃ ┣ 📂components
 ┃ ┃ ┣ 📂ui
 ┃ ┃ ┃ ┗ 📜Loading.jsx
 ┃ ┃ ┣ 📜Header.jsx
 ┃ ┃ ┣ 📜Login.jsx
 ┃ ┃ ┣ 📜PriceBox.jsx
 ┃ ┃ ┗ 📜ProtectedRoute.jsx
 ┃ ┣ 📂context
 ┃ ┃ ┗ 📜UserContext.jsx
 ┃ ┣ 📂hooks
 ┃ ┃ ┣ 📜useCart.jsx
 ┃ ┃ ┣ 📜useItem.jsx
 ┃ ┃ ┗ 📜useProducts.jsx
 ┃ ┣ 📂pages
 ┃ ┃ ┣ 📜Admin.jsx
 ┃ ┃ ┣ 📜Cart.jsx
 ┃ ┃ ┣ 📜CartItem.jsx
 ┃ ┃ ┣ 📜Details.jsx
 ┃ ┃ ┣ 📜Error.jsx
 ┃ ┃ ┣ 📜Home.jsx
 ┃ ┃ ┗ 📜Products.jsx
 ┃ ┣ 📜App.js
 ┃ ┣ 📜index.css
 ┗ ┗📜index.js
</pre>
<br />

## 🧑🏻 Members
- 김보경
    - 기획 : 서비스 아이템 및 기능 선정, 기능별 요구 사항 정리, 스케줄 관리
    - 디자인 : 페이지별 시안 작업
    - 프론트엔드 : 마크업부터 동적 개발까지 담당
    - 백엔드 : Firebase api 기반 통신
<br />

## 💻  More about service
- 전체 페이지 스타일링, 모바일 기반 반응형 페이지 작업
- Firebase auth api 기반 google 로그인, 로그아웃 기능 구현
- Firebase realtime Database 기반 상품 데이터 불러오기, 사용자별 장바구니 기능 구현
- 사용자에게 판매할 상품을 추가 및 삭제할 수 있는 Admin 기능 개발
- 상품 카드, 상품 리스트 등 공통 UI를 재사용하여 상품 리스트를 표시
- TanStack Query를 사용하여 불필요한 데이터 재요청 방지
<br />

<p align="center">
  <img src="https://res.cloudinary.com/dxm4cqfuw/image/upload/v1728306349/shoppy_banner_xh1dym.jpg" align="center" width="45%">
  <img src="https://res.cloudinary.com/dxm4cqfuw/image/upload/v1728306349/shoppy_products_m3qtw0.jpg" align="center" width="45%">
</p>
<p align="center">
  <img src="https://res.cloudinary.com/dxm4cqfuw/image/upload/v1728306349/shoppy_detail_zxtzhk.jpg" align="center" width="45%">
  <img src="https://res.cloudinary.com/dxm4cqfuw/image/upload/v1728306349/shoppy_login_bpuo6p.jpg" align="center" width="45%">
</p>
<p align="center">
  <img src="https://res.cloudinary.com/dxm4cqfuw/image/upload/v1728306349/shoppy_cart_motvgh.jpg" align="center" width="45%">
  <img src="https://res.cloudinary.com/dxm4cqfuw/image/upload/v1728306349/shoppy_admin_pbv3lx.jpg" align="center" width="45%">
</p>
