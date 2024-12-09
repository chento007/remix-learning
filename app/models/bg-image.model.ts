export interface BgImage {
    id: string;
    createdAt: string;
    updatedAt: string;
    filename: string;
    contentType: string;
    size: number;
    dimension: Record<string, unknown>;
    signedUrl: string;
}
