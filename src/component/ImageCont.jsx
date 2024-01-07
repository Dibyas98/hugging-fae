import React from 'react'
import { Trash2,Download } from 'lucide-react';

export default function ImageCont({imgInfo}) {
  return (
    <div className=' w-1/4 h-52 border-2 shadow'>
      <a href={imgInfo.src}><img src={imgInfo.src} alt={imgInfo.alt} className='w-full h-44 ' /></a>
      <div className='flex justify-between px-2'>
        <p className='capitalize'>{imgInfo.alt}</p>
        <div className='flex gap-3'>
        {/* <Download /> */}
        {/* <Trash2/> */}
        </div>
      </div>
    </div>
  )
}
