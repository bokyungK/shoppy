import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import useCart from '../hooks/useCart';
import { IoGameController } from "react-icons/io5";
import { GrCart } from "react-icons/gr";
import { PiNotePencil } from "react-icons/pi";
import { AiOutlineProduct } from "react-icons/ai";
import Loading from '../components/ui/Loading';
import Login from './Login';

export default function Header() {
    const { user, handleUser } = useContext(UserContext);
    const { cartQuery: { data: cart, isLoading } } = useCart();

    if (isLoading) return <Loading />
    return (
        <header className='flex w-full justify-between items-center h-[50px] border-b-[1.5px] py-[30px] px-[15px] font-[Paperlogy-7Bold]'>
            <Link className='flex justify-center items-center text-stone-600' to="/">
                <IoGameController className='mr-[5px] text-2xl'/>
                <h1 className='text-xl hidden sm:block'>Game Shop</h1>
            </Link>
            <nav className='flex items-center'>
              <div className='flex items-center sm:mr-[30px]'>
                <Link to='/products' className='text-md flex items-center mr-[10px]'>
                  <AiOutlineProduct className='sm:hidden text-2xl' />
                  <p className='hidden sm:block'>Products</p>
                </Link>
                {
                  user && cart &&
                    <Link to='/cart' className='flex items-center mr-[10px] relative'>
                      <GrCart className='mr-[5px] text-xl' />
                      <div className='rounded-full bg-red-600 text-xs w-[21px] h-[21px] absolute top-[-10px] right-[-5px] text-white font-semibold leading-[21px] text-center'>{cart.length >= 10 ? '+' : cart.length}</div>
                    </Link>
                }
                {
                  user && user.isAdmin && 
                    <Link to='/admin' className='flex items-center mr-[10px]'>
                      <PiNotePencil className='text-2xl' />
                    </Link>
                }
                { user && 
                    <div className='flex items-center'>
                        <img className='rounded-full w-[25px] h-[25px] mr-[10px]' src={user.photoURL} alt="" />
                        <p className='text-lg hidden sm:block'>{user.displayName}</p>
                    </div>
                }
              </div>
              <Login handleUser={handleUser} user={user} />
            </nav>
        </header>
    );
}

