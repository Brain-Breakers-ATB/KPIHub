import express, { Request, Response } from 'express';
import { SearchResult, SearchResponse } from '../models/search';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
    try {
        // Extract query parameters with validation and default values
        const {
            sites,
            keywords,
            sort = 'relevance',
            maxResultsPerPage = '10',
            page = '1'
        } = req.query;

        // Convert comma-separated strings into arrays
        const siteList = (sites as string)?.split(',') || [];
        const keywordList = (keywords as string)?.split(',') || [];

        // Validate required parameters
        if (!sites || !keywords) {
            return res.status(400).json({
                status: 'error',
                message: 'Sites and keywords are required query parameters.'
            });
        }

        // Validate and convert optional numeric parameters
        const maxResults = parseInt(maxResultsPerPage as string, 10) || 10;
        const pageNumber = parseInt(page as string, 10) || 1;

        const searchResults: SearchResult[] = []; // Replace with actual search results
        const totalResults = 0; // Replace with actual total result count

        // Generate paginated results based on `page` and `maxResultsPerPage`
        const paginatedResults = searchResults.slice((pageNumber - 1) * maxResults, pageNumber * maxResults);

        // Construct success response
        const response: SearchResponse = {
            status: 'success',
            data: {
                results: paginatedResults,
                totalResults: totalResults
            }
        };

        res.json(response);
    } catch (error: any) {
        res.status(500).json({
            status: 'error',
            message: error.message || 'An internal error occurred.'
        });
    }
});

export default router;
