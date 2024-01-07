import React, { useEffect, useState } from 'react';
import ImageCont from './ImageCont';
import { CirclesWithBar } from 'react-loader-spinner'
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

export default function Screen() {
    const [text, setText] = useState('');
    const [imageDataUrl, setImageDataUrl] = useState(() => {
        const store = localStorage.getItem('imageDataUrl');
        return store ? JSON.parse(store) : []
    });
    const[load,setLoad] =useState(false)

    const handleText = (e) => {
        setText(e.target.value);
    };

    useEffect(() => {
        localStorage.setItem('imageDataUrl', JSON.stringify(imageDataUrl))
    }, [imageDataUrl]);

    async function query(data) {
        const response = await fetch(
            "https://api-inference.huggingface.co/models/prompthero/openjourney-v4",
            {
                headers: { Authorization: "Bearer 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" },
                method: "POST",
                body: JSON.stringify(data),
            }
        );
        const result = await response.blob();
        return result;
    }

    const handleSubmit = () => {
        if(text===''){
            toast.warning('please enter some text')
            return
        }
        setLoad(true)
        query({ "inputs": `${text}` }).then((response) => {
            const imgu = URL.createObjectURL(response);
            setImageDataUrl((pre) =>
                [
                    {
                        src: imgu,
                        alt: text
                    },
                    ...pre
                ]
            );
            setLoad(false)
        });
        
        setText('')
    }

    return (
        <div className='flex justify-center items-center pt-10 flex-col w-full'>
            <div className='w-1/3 h-56 border-2 p-8 rounded-xl insha'>
                <h1 className='text-3xl font-semibold pb-5'>Image Generation App</h1>
                <input
                    type="text"
                    onChange={handleText}
                    value={text}
                    className='border-2 rounded-md border-[#ddd] w-full text-xl p-3'
                />
                 <ToastContainer />
                <button onClick={handleSubmit} className='border-2 mt-3 w-20 button-10 '>submit</button>
                

            </div>
            
            {load ? <div className='pt-5'>
            <CirclesWithBar
                    height="100"
                    width="100"
                    color="#4fa94d"
                    outerCircleColor="#4fa94d"
                    innerCircleColor="#4fa94d"
                    barColor="#4fa94d"
                    ariaLabel="circles-with-bar-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                    
                />
            </div>:null}
            <div className='flex w-10/12 gap-3 flex-wrap justify-center mt-6 pb-20'>
                {imageDataUrl.map((ele) => {
                    return <ImageCont key={Math.random()} imgInfo={ele} />
                })}
            </div>
        </div>
    );
}
