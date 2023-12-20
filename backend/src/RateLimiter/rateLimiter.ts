import expressRateLimit from 'express-rate-limit';

const setRateLimit = expressRateLimit;

const rateLimitMiddelware = setRateLimit({
    windowMs: 60 * 1000,
    max: 100,
    message: "You have exceeded your 100 requests per minute limit.",
    headers: true,
})

export {rateLimitMiddelware as rateLimit};