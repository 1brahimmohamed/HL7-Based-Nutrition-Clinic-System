import express, {Application, Request, Response, NextFunction } from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import hpp from 'hpp';
import mongoSanitize from 'express-mongo-sanitize';
import xss from 'xss-clean';
import cors from 'cors';

import {
    doctorRoutes,
    patientRoutes,
    appointmentRoutes,
    authRoutes
} from './routes';

const app : express.Application = express();

// Enable CORS for all routes
app.use(cors());

// serving static files
app.use(express.static(`${__dirname}/public`));

// set security HTTP headers
app.use(helmet());

app.use(helmet.contentSecurityPolicy({
    useDefaults: true,
    directives: {
        "img-src": ["'self'", "https: data:", "http"],
    }
}));

// limit requests from same IP
const limiter = rateLimit({
    max: 100,
    windowMs: 60 * 60 * 1000, // 1 hour
    message: 'Too many requests from this IP, please try again in an hour!'
});


if (process.env.NODE_ENV == 'production') {
    app.use(limiter);
}

// development logging
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));

// data sanitization against NoSQL query injection
app.use(mongoSanitize());

// data sanitization against XSS
app.use(xss());

app.use(hpp({
    whitelist: [
        // @TODO add whitelist
    ]
}))

// routes
app.use('/api/doctor', doctorRoutes);
app.use('/api/patient', patientRoutes);
app.use('/api/appointment', appointmentRoutes);
app.use('/api/auth', authRoutes);

// handle undefined routes
app.all('*', (req: Request, res: Response, next: NextFunction) => {
    res.status(404).json({
        status: 'fail',
        message: `Can't find ${req.originalUrl} on this server!`
    });
});

export default app;
