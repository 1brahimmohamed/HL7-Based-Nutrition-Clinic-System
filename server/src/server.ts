import app from './app';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

// handle uncaught exceptions
process.on('uncaughtException', (err: Error) => {
    console.log('UNCAUGHT EXCEPTION! Shutting down...');
    console.log(err.name, err.message);
    process.exit(1);
});

// set up environment variables
dotenv.config({ path: './.env' });


const DB = process.env.DATABASE!.replace(
    '<PASSWORD>',
    process.env.DATABASE_PASSWORD!,
);

const dbName = `${parseInt(process.env.MY_CLINIC_TCP_PORT!) === 7777 ? 'test' : 'clinic2'}`;

mongoose.connect(DB, {
    dbName: dbName,
}).then(con => {
    console.log(`DB connection successful to db: ${dbName}`);
});


const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
    console.log(`Server started & App running on port ${port}`);
    console.log(`Running on Environment: ${process.env.NODE_ENV}`);
});



// handle unhandled rejections
process.on('unhandledRejection', (err: Error) => {
    console.log('UNHANDLED REJECTION! Shutting down...');
    console.log(err.name, err.message);
    server.close(() => {
        process.exit(1);
    });
});
