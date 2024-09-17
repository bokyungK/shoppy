import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query'
import { useUserContext } from '../context/UserContext';
import { PiEquals } from "react-icons/pi";
import { FaCirclePlus } from "react-icons/fa6";
import { getCart } from '../api/firebase';
import PriceBox from '../components/PriceBox';
import Loading from '../components/ui/Loading';
import CartItem from './CartItem';

const DELIVERY_CHARGE = 3000;

export default function Cart() {
  const [notice, setNotice] = useState('');
  const { uid } = useUserContext();
  const { data: cart, isLoading } = useQuery({
    queryKey: ['cart', uid || ''],
    queryFn: () => getCart(uid),
    enabled: Boolean(uid),
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
  });
  const handleNotice = () => {
    setNotice('✔️장바구니가 업데이트 되었습니다.');
    setTimeout(() => {
      setNotice('');
    }, 3000)
  }

  if (isLoading) return <Loading />

  const productTotal = cart.reduce((prev, current) => prev + current.price * current.count, 0)
  const priceTotal = productTotal + DELIVERY_CHARGE;

  return (
    <section className='max-w-[1000px] px-[20px] mx-auto'>
      <h2>내 장바구니</h2>
      {
        cart && cart.length > 0 && 
        <>
          <ul className='mb-[50px]'>
            { cart.map((info) => <CartItem info={info} uid={uid} handleNotice={handleNotice}/>) }
          </ul>
          <div className='flex justify-between items-center mb-[40px] px-[6%]'>
            <PriceBox title='상품 총액' price={productTotal} />
            <FaCirclePlus className='shrink-0' />
            <PriceBox title='배송비' price={DELIVERY_CHARGE} />
            <PiEquals className='shrink-0' />
            <PriceBox title='총 가격' price={priceTotal} />
          </div>
          { notice && <p className='w-max mx-auto my-[10px]'>{notice}</p> }
          <button type='button' className='border-none text-white font-semibold p-[10px] w-[88%] mx-[6%]'>주문하기</button>
        </>
      }
      {
        cart.length < 1 && <p>장바구니가 비었습니다.</p>
      }
    </section>
  );
}

