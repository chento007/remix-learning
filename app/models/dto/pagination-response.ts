import { PaginationMeta } from './pagination-meta';

export interface PaginationResponse<T> {
  data: T[];
  meta: PaginationMeta;
  links: {
    first: string;
    previous: string;
    current: string;
    next: string;
    last: string;
  };
}
