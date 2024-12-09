import { MetaFunction, json, LoaderFunction } from '@remix-run/node';
import { useLoaderData, useFetcher } from "@remix-run/react";
import { useEffect, useState } from "react";
import { Testimonial } from "~/components/Testimonial";
import { fetchWithPagination } from "~/utils/fetch-with-pagination";
import { PaginationResponse } from "~/models/dto/pagination-response";
import { TestimonialModel } from "~/models/Testimonial";

export const meta: MetaFunction = () => {
    return { title: "New Remix App", description: "Welcome to Remix!" };
};

export const loader: LoaderFunction = async ({ request }) => {
    const url = new URL(request.url);
    const page = url.searchParams.get('page') || '1';
    const limit = url.searchParams.get('limit') || '10';  // Adjusted the default limit for better pagination
    console.log("Loader is fetching page:", page, "limit:", limit); // Debugging log

    try {
        const testimonials = await fetchWithPagination<TestimonialModel>({
            feature: 'testimonials',
            page: parseInt(page),
            limit: parseInt(limit),
        });
        return json({ testimonials });
    } catch (error) {
        console.error('Failed to fetch data:', error);
        return json({ testimonials: { data: [], meta: {}, links: {} } });
    }
};

export type ItemsResponse = { testimonials: PaginationResponse<TestimonialModel> };

export default function Index() {
    const { testimonials } = useLoaderData<{ testimonials: PaginationResponse<TestimonialModel> }>();
    const [items, setItems] = useState<TestimonialModel[]>(testimonials.data);
    const fetcher = useFetcher<ItemsResponse>();

    useEffect(() => {
        console.log("Fetcher state:", fetcher.state);  // Debugging log
        console.log("Fetcher data:", fetcher.data);    // Debugging log

        if (fetcher.state === "loading") {
            console.log("Fetcher is loading new data...");
            return;
        }

        if (fetcher.data) {
            const newItems = fetcher.data.testimonials.data;
            setItems((prevItems) => [...prevItems, ...newItems]);
            console.log("New items added:", newItems);  // Debugging log
        }
    }, [fetcher.state, fetcher.data]);

    const handleNextPageTestimonial = () => {
        if (testimonials?.links?.next) {
            const nextPage = testimonials.meta.currentPage + 1;
            const query = `?page=${nextPage}&limit=10`;
            console.log("Triggering next page load with query:", query); // Debugging log
            fetcher.load(query);
        }
    };

    const handlePreviousPageTestimonial = () => {
        if (testimonials?.links?.previous) {
            const prevPage = testimonials.meta.currentPage - 1;
            if (prevPage < 1) return;
            const query = `?page=${prevPage}&limit=10`;
            console.log("Triggering previous page load with query:", query); // Debugging log
            fetcher.load(query);
        }
    };

    return (
        <div className="flex h-screen items-center justify-center p-28">

        </div>
    );
}
