import expressRateLimit from 'express-rate-limit';

const setRateLimit = expressRateLimit;

const rateLimitMiddelware = setRateLimit({
    windowMs: 60 * 1000,
    max: 20,
    message: "You have exceeded your 20 requests per minute limit.",
    headers: true,
})

export {rateLimitMiddelware as rateLimit};