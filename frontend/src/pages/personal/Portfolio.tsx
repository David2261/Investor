import React from 'react';

const Portfolio = () => {
    return <>
        <div className="w-full h-full">
            <div className="flex w-full px-24 mt-10 mb-10">
                <div className='w-full flex flex-col border rounded-lg bg-slate-100 pt-10 pb-10 px-24'>
                    <div className='flex flex-row justify-center mb-10'>
                        <h1 className="font-bold text-3xl px-4">Аккаунт</h1>
                        <p className='uppercase text-lg font-light bg-cyan-100 rounded-lg'>free</p>
                    </div>
                    {/* Options subscribe and settings for login */}
                    <div className='flex justify-center'>
                        <div className='flex flex-row bg-slate-300 rounded-lg'>
                            <button className='py-2 px-3 my-1 ml-1 uppercase font-bold text-lg bg-white rounded-lg'>подписка</button>
                            <button className='py-2 px-3 uppercase font-light text-lg'>данные для входа</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default Portfolio;