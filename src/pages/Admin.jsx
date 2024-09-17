import React, { useState } from 'react';
import { uploadImage } from '../api/cloudinary';
import useProducts from '../hooks/useProducts';

const initialNewProduct = {
  name: '',
  price: '',
  category: '',
  description: '',
  options: '',
  file: '',
}

export default function Admin() {
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [newProduct, setNewProduct] = useState(initialNewProduct);
  const { addProductsMutation } = useProducts(); 

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === 'file') {
      setImage(files && files[0]);
    }
    setNewProduct({...newProduct, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    uploadImage(image)
    .then(imageUrl => {
      addProductsMutation.mutate({...newProduct, imageUrl}, {
        onSuccess: () => {
          setIsSuccess(true);
          setImage(null);
          setNewProduct(initialNewProduct);
          setTimeout(() => setIsSuccess(false), 3000);
        }
      });
    }).finally(() => setIsLoading(false))
  }

  return (
    <section className='admin max-w-[1000px] mx-auto'>
      <h2>새로운 제품 등록</h2>
      {
        isSuccess && <p className='w-max mx-auto my-[10px]'>✔️제품이 등록되었습니다.</p>
      }
      {
        image && <img className='w-full max-w-[600px] mx-auto mt-[10px] mb-[20px]' src={URL.createObjectURL(image)} alt="selected file" />
      }
      <form method="post" encType="multipart/form-data" onSubmit={handleSubmit} className='w-full flex flex-col mx-auto px-[8%]'>
        <input onChange={handleChange} type="file" accept="image/*" name="file" className='p-[5px]' value={newProduct.file} required />
        <input onChange={handleChange} type="text" name="name" placeholder='제품명' value={newProduct.name} required />
        <input onChange={handleChange} type="number" name="price" placeholder='가격' value={newProduct.price} required />
        <input onChange={handleChange} type="text" name="category" placeholder='카테고리' value={newProduct.category} required />
        <input onChange={handleChange} type="text" name="description" placeholder='제품 설명' value={newProduct.description} required />
        <input onChange={handleChange} type="text" name="options" placeholder='옵션들(콤마(,)로 구분)' value={newProduct.options} required />
        <button type="submit" className='h-[50px] p-[10px] mx-auto w-full mt-[15px] text-lg' disabled={isLoading}>{isLoading ? '제품 등록중' : '제품 등록하기'}</button>
      </form>
    </section>
  );
}

