import React from 'react';

export default function PriceBox({ title, price }) {
  return (
    <div className='w-max text-center bg-[#fcfcfb] px-[6%] py-[30px] rounded-md'>
      <p>{title}</p>
      <p className='text-stone-500 text-lg font-semibold'>{price}원</p>
    </div>
  );
}

