

export interface Paginater<T> {
    data: T[];
    meta: {
        itemsPerPage: number;
        totalItems: number;
        totalPages: number;
        currentPage: number;
    },
    links: {
        first: string;
        previous: string;
        next: string;
        last: string;
        current: string;
    }
}