import { PaginationResponse } from '~/models/dto/pagination-response';

interface PaginationParams {
    feature: string;
    page: number;
    limit: number;
    sortBy?: string;
}

export async function fetchWithPagination<T>({
                                                 feature,
                                                 page,
                                                 limit,
                                                 sortBy = 'createdAt:DESC',
                                             }: PaginationParams): Promise<PaginationResponse<T>> {
    try {
        const response = await fetch(
            `https://api.nitrokartcircuit.com/${feature}?page=${page}&limit=${limit}&sortBy=${sortBy}`,
        );
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }

        return await response.json();
    } catch (error) {
        console.log('error: ', error);
        throw new Error('Error in fetching data');
    }
}
