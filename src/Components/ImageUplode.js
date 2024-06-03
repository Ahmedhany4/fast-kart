import React, { useState } from 'react';

function ImageUplode({ setUploadImage }) {
  const [imgs,setImgs] =useState('');
       
  const handleChnage=(e)=>{
      console.log(e.target.files)
      const data = new FileReader()
      data.addEventListener('load',()=>{
          setImgs(data.result)
      })
      data.readAsDataURL(e.target.files[0])
      setUploadImage(imgs);
  }

  console.log(imgs)
  return (

<div className="mb-3">
      <label htmlFor="formFile" className="form-label">Image</label>
      <input type='file' className="form-control" onChange={handleChnage} id="formFile" /><br/>
      {(imgs) ? <img src={imgs} height="200px" width="200px" /> : <img src="https://placehold.co/200x200/0DA487/FFF" height="200px" width="200px" />}
      </div>
  );
}

export default ImageUplode;
