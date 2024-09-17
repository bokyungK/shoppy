import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useUserContext } from '../context/UserContext';
import { IoIosArrowForward } from "react-icons/io";
import Loading from '../components/ui/Loading';
import useCart from '../hooks/useCart';
import useItem from '../hooks/useItem';

export default function Details() {
  const { uid } = useUserContext();
  const { productId } = useParams();
  const { state } = useLocation();

  const [size, setSize] = useState();
  const [product, setProduct] = useState(null);
  const [notice, setNotice] = useState();

  const { addCartMutation } = useCart();
  const { itemQuery: { data: itemData } } = useItem({ state, productId });

  useEffect(() => {
    if (state) {
      setProduct(state);
    } else {
      setProduct(itemData);
    }
  }, [itemData, state])

  const handleSubmit = (e) => {
    e.preventDefault();
    const selected = size ? size : product.options[0];
    
    addCartMutation.mutate({uid, productId, productInfo: {...state, options: selected, count: 1}}, {
      onSuccess: () => {
        setNotice('➕장바구니에 추가되었습니다.')
        setTimeout(() => {
          setNotice('');
        }, 3000)
      }
    })
  }
    
  const handleOptionChange = (e) => {
    setSize(e.target.value);
  }

  if (!product) return <Loading />
  const { category, imageUrl, name, description, price, options } = product;
  return (
    <section>
      <div className='flex items-center h-[45px] mb-[15px]'>
        <IoIosArrowForward className='text-gray-400'/>
        <div className='text-gray-400'>{category}</div>
      </div>
      <div className='md:flex h-max justify-center'>
        <img className='w-full mb-[50px] md:w-[50%] md:max-w-[500px] md:mb-0 mr-[5px] object-contain' src={imageUrl} alt={name} />
        <form className='px-[10%] md:w-[50%] flex-1 flex flex-col md:border-l md:px-[15px]' onSubmit={handleSubmit}>
          <div className='border-b-[1.5px] flex-1 flex flex-col'>
            <div className='flex-1'>
              <h2 className='!h-auto !justify-start !mt-0 !mb-[5px]'>{name}</h2>
              <p className='text-gray-400'>{description}</p>
            </div>
            <p className='text-right h-[45px] leading-[45px]'>{price}원</p>
          </div>
          <div className=''>
            <div className='flex flex-col items-left md:h-[45px] md:flex-row md:items-center'>
              <label htmlFor="select" className='basis-[35px] flex items-end pl-[4px] md:basis-auto md:block'>옵션 :</label>
              <select id='select' name="select" className='basis-[50px] outline-none md:flex-1' onChange={handleOptionChange} value={size}>
                { options.map((size) => {
                    return <option key={size}>{size.trim().toUpperCase()}</option>
                })}
              </select>
            </div>
            {
              notice && <p className='w-max mx-auto my-[10px]'>{notice}</p>
            }
            <button className='text-white w-full h-[45px] font-semibold bg-stone-600 hover:bg-stone-700 transition-colors mb-[50px]'>장바구니에 추가</button>
          </div>
        </form>
      </div>
    </section>
  );
}

