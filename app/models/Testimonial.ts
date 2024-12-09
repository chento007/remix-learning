import { BgImage } from './bg-image.model';

export interface TestimonialModel {
    id: string;
    createdAt: string;
    updatedAt: string;
    isActive: boolean;
    name: string;
    date: string;
    rate: string;
    source: string;
    review: string;
    profileImage: BgImage;
}
