import React from 'react';

interface Props {
    name: string;
    date: string;
    rate: string;
    review: string;
    profileImageUrl: string;
}

export const TestimonialCard: React.FC<Props> = ({
                                                     name,
                                                     rate,
                                                     review,
                                                     profileImageUrl,
                                                     date,
                                                 }) => {
    return (
        <div className='container flex p-3'>
            <div className='flex flex-col gap-4 border-2 border-solid border-gray-200 p-6 md:border-none md:shadow-[0px_0px_12px_0px_rgba(0,0,0,0.1)]'>
                <div className='flex flex-col items-center gap-4'>
                    <div className='avatar'>
                        <div className='w-24 rounded-full'>
                            <img src={profileImageUrl} />
                        </div>
                    </div>
                    <div className='text-center'>
                        <h2 className='text-md font-bold'>{name}</h2>
                        {/*<h3 className='text-sm font-medium'>{Utils.formatDate(date)}</h3>*/}
                    </div>
                </div>
                <div className='flex flex-row justify-between'>
                    {/*<Rating value={_.random(1, parseInt(rate, 10), false)} />*/}
                    <img className='wd:h-5 h-6 w-6 md:w-5' src='icons/google.svg' />
                </div>
                <div>
                    <p className='text-justify text-sm font-semibold'>{review}</p>
                </div>
            </div>
        </div>
    );
};
