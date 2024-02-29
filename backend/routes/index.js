const express = require('express');

const performanceTimer = require('../middleware/end-performance-timer');

const asyncHandler = require('../utils/async-handler');
const httpOperations = require('../lib/http-operations');

const logger = require('../utils/logger');

const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).json({ ok: true });
});

router.post(
    '/',
    asyncHandler(async (req, res, next) => {
        try {
            const data = await httpOperations.makeHttpCall(req.body);
            logger.info({ message: 'Created post', data });
            res.status(200).send(data);
            req.routeTimer({ statusCode: 200 });
            return next();
        } catch (error) {
            logger.error({
                message: 'Error occurred.',
                companyId: 'CompanyID',
                error: error.message,
            });
            req.routeTimer({ statusCode: 500 });
            return next(error);
        }
    }),
    performanceTimer
);

module.exports = router;
