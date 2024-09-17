import React from 'react';
import { Link } from 'react-router-dom';
import Loading from '../components/ui/Loading';
import useProducts from '../hooks/useProducts';

export default function Products({ isHome }) {
  const { productsQuery: { data: products, isLoading }} = useProducts();

  if (isLoading) return <Loading isHome={isHome} />
  return (
    <section className='p-[20px]'>
      <ul className='grid grid-cols-flow justify-center gap-[20px] justify-center'>
        {
          products && products.map((item) => {
            const { id, name, price, category, imageUrl } = item;

            return <Link to={`/products/${id}`} state={item} key={id} id='productCard' className='overflow-hidden shadow-md hover:shadow-lg transition-shadow'>
              <li>
                <div className='w-full overflow-hidden'>
                  <img className='w-full' src={imageUrl} alt={name} />
                </div>
                <div className='h-[85px] p-[10px] flex flex-col justify-between bg-[#fdfdfc]'>
                  <p className='w-full break-all line-clamp-1 text-lg font-medium'>{name}</p>
                  <div className='flex justify-between flex items-end font-medium'>
                    <p className='text-stone-500 text-sm'>{category}</p>
                    <p className='text-md'>{price}</p>
                  </div>
                </div>
              </li>
            </Link>
          })
        }
      </ul>
    </section>
  );
}

