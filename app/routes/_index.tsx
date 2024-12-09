import type {MetaFunction} from "@remix-run/node";
import {Testimonial} from "~/components/Testimonial";
import {fetchWithPagination} from "~/utils/fetch-with-pagination";
import {json, LoaderFunction, type MetaFunction} from '@remix-run/node';
import {TestimonialModel} from "~/models/Testimonial";
import {useFetcher, useLoaderData} from "@remix-run/react";
import {PaginationResponse} from "~/models/dto/pagination-response";
import {useEffect, useState} from "react";

export const meta: MetaFunction = () => {
    return [
        {title: "New Remix App"},
        {name: "description", content: "Welcome to Remix!"},
    ];
};

export const loader = async ({ request }) => {
    const url = new URL(request.url);
    const page = url.searchParams.get('page') || '1';
    const limit = url.searchParams.get('limit') || '1';
    try {
        const testimonials = await fetchWithPagination<TestimonialModel>({
            feature: 'testimonials',
            page: parseInt(page),
            limit: parseInt(limit),
        });
        return json({
            testimonials
        });
    } catch (error) {
        console.error('Failed to fetch data:', error);
        return json({ testimonials: { data: [], meta: {}, links: {} } });
    }
};
export type ItemsResponse = { testimonials: PaginationResponse<TestimonialModel> };

export default function Index() {
    const { testimonials} = useLoaderData<{ testimonials: PaginationResponse<TestimonialModel> }>();
    const [items, setItems] = useState<TestimonialModel[]>(testimonials.data);
    const fetcher = useFetcher<ItemsResponse>();
    useEffect(() => {
        if (!fetcher.data || fetcher.state === "loading") {
            return;
        }

        if (fetcher.data) {
            const newItems = fetcher.data.testimonials.data;
            setItems((prevItems) => [...prevItems, ...newItems]);
        }

        console.log("items: ", items);
    }, [fetcher.data, fetcher.state, items]);


    const handleNextPageTestimonial = () => {
        try {
            if (testimonials?.links?.next) {
                const nextPage = testimonials.meta.currentPage + 1;
                const query = `?page=${nextPage}&limit=1`;
                fetcher.load(query);
            }
        } catch (e) {
            console.log("error: ", e);
        }
    }

    const handlePreviousPageTestimonial = () => {
        if (testimonials?.links?.previous) {
            const prevPage = testimonials.meta.currentPage - 1;
            if (prevPage < 1) return;
            const query = `?page=${prevPage}&limit=1`;
            fetcher.load(query);
        }
    };


    return (
        <div className="flex h-screen items-center justify-center p-28">
            <Testimonial
                testimonials={items}
                onNext={handleNextPageTestimonial}
                onPrevious={handlePreviousPageTestimonial}
            />
        </div>
    );
}
