import React, {useState} from 'react';
import {cva, VariantProps} from 'class-variance-authority';
import {TestimonialModel} from "~/models/Testimonial";
import {TestimonialCard} from "~/components/TestimonialCard";

const itemVariants = cva('carousel-item', {
    variants: {
        numberOfItem: {
            default: 'w-full md:w-[calc(100%/3)]',
        },
    },
    defaultVariants: {
        numberOfItem: 'default',
    },
});

interface Props extends VariantProps<typeof itemVariants> {
    testimonials: TestimonialModel[];
    onNext: () => void; // Callback for next button
    onPrevious: () => void; // Callback for previous button
}

export const Testimonial: React.FC<Props> = ({
                                                 numberOfItem,
                                                 testimonials,
                                                 onNext,
                                                 onPrevious,
                                             }) => {

    const components = () => {
        return testimonials.map((item, index) => {
            return (
                <div key={index} className={itemVariants({numberOfItem})}>
                    <TestimonialCard
                        name={item.name}
                        date={item.date}
                        rate={item.rate}
                        profileImageUrl={item?.profileImage?.signedUrl}
                        review={item.review}
                    />
                </div>
            );
        });
    };

    return (
        <div className='relative mt-6 flex w-full px-12'>
            <div className='absolute left-0 right-0 top-1/2 flex -translate-y-1/2 transform justify-between'>
                <button
                    className={`btn btn-circle btn-primary btn-sm rotate-180`}
                    onClick={onPrevious}
                >
                    <img src='icons/arrow-right.svg' alt='Previous'/>
                </button>
                <button
                    className={`btn btn-circle btn-primary btn-sm`}
                    onClick={onNext} // Bind next button to the handler
                >
                    <img src='icons/arrow-right.svg' alt='Next'/>
                </button>
            </div>
            <div className='carousel carousel-center flex w-full'>{components()}</div>
        </div>
    );
};
