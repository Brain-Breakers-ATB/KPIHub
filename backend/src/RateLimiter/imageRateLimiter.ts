import expressRateLimit from 'express-rate-limit';

const setRateLimit = expressRateLimit;

const imageRateLimitMiddelware = setRateLimit({
    windowMs: 60 * 1000,
    max: 500,
    message: "You have exceeded your 500 requests per minute limit.",
    headers: true,
})

export {imageRateLimitMiddelware as imageRateLimit};