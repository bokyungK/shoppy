import React from 'react';
import { FaTrashCan } from "react-icons/fa6";
import { CiSquareMinus } from "react-icons/ci";
import { CiSquarePlus } from "react-icons/ci";
import useCart from '../hooks/useCart';

const BUTTON_CLASS = 'bg-transparent text-stone-600 hover:text-stone-900 hover:bg-transparent';

export default function CartItem({ info, uid, handleNotice }) {
  const { imageUrl, name, price, options, count, id } = info;
  const { updateCartMutation, removeCartMutation } = useCart();

  const handleUp = () => {
    updateCartMutation.mutate({ uid, cartInfo: {...info, count: count+1}}, {
      onSuccess: handleNotice,
    })
  }

  const handleDown = () => {
    if (count === 1) return;

    updateCartMutation.mutate({ uid, cartInfo: {...info, count: count-1}}, {
      onSuccess: handleNotice,
    })
  }

  const handleRemove = () => {
    removeCartMutation.mutate({uid, productId: id}, {
      onSuccess: handleNotice,
    })
  }

  return (
    <li className='flex mb-[20px]' key={id}>
      <img className='w-[33%]' src={imageUrl} alt={name} />
      <div className='w-full flex-1 flex justify-between items-between p-[10px] border-l mr-[6%]'>
        <div className='flex flex-col items-around'>
          <p className='text-md line-clamp-2 word-break font-medium'>{name}</p>
          <div className='flex-1 flex flex-col justify-end'>
            <p className='text-sm text-stone-500'>{options}</p>
            <p className='text-sm mt-[3px]'>{price}원</p>
          </div>
        </div>
        <div className='flex items-center *:mr-[5px]'>
          <button className={BUTTON_CLASS} onClick={handleDown}>
            <CiSquareMinus className='text-xl' />
          </button>
          <div className='text-sm'>{count}</div>
          <button className={BUTTON_CLASS} onClick={handleUp}>
            <CiSquarePlus className='text-xl' />
          </button>
          <button className={BUTTON_CLASS} onClick={handleRemove}>
            <FaTrashCan  className='text-md' />
          </button>
        </div>
      </div>
    </li>
  );
}

