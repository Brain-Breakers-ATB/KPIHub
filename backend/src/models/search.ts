export interface SearchResult {
    title: string;
    url: string;
    snippet: string;
}

export interface SearchResponse {
    status: 'success' | 'error';
    data?: {
        results: SearchResult[];
        totalResults: number;
    };
    message?: string;
}
