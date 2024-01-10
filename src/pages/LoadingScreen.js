import React ,{ Fragment } from 'react';
import ReactLoading from 'react-loading';

const LoadingScreen = () => {
  return (
    <Fragment>
        <div className='fixed flex items-center justify-center top-0 bottom-0 left-0 right-0 z-40 bg-white opacity-95'></div>
        <div className='fixed flex items-center justify-center top-0 bottom-0 left-0 right-0 z-50 '>
             <div className='flex flex-col items-center justify-center font-bold text-[#52D22E]'>
                <div className='text-3xl animate-bounce'>TheHWorld</div>
                <ReactLoading type="bubbles" color={"#52D22E"} height={"60px"} width={"60px"} />
             </div>
        </div>
    </Fragment>
  )
}

export default LoadingScreen