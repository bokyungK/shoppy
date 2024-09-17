import React from 'react';
import Products from './Products';

export default function Home() {
    return (
        <main>
            <section className='relative'>
                <div className='w-full h-[300px] contrast-75 bg-banner bg-cover bg-center'></div>
                <div className='absolute w-full h-full flex flex-col justify-center items-center top-0 text-white'>
                    <h2 id='intro' className='text-4xl mb-[8px]'>Play With Us</h2>
                    <p>Best Products, High Quality</p>
                </div>
            </section>
            <Products isHome />
        </main>
    );
}

