import * as hl7 from "simple-hl7";
import {handleReceivedHL7Message} from "../controllers/patient.controller";
import ErrorHandler from "./ErrorHandler";

const port = process.env.MY_CLINIC_TCP_PORT || 7777;
const host = process.env.TCP_HOST || "localhost";

// @ts-ignore
const app = hl7.tcp();

// Event handler for receiving HL7 messages
app.use((req: any, res: any, next: any) => {

    handleReceivedHL7Message(req)
        .then((response: any) => {
            next()
        }).catch((e: any) => {
            next(new ErrorHandler(e.message, 500));
        });
})

app.use((req: any, res: any) => {
    console.log('****** Sending Ack *****')
    res.end()
})

app.use(function (err: any, req: any, res: any, next: any) {
    //error handler
    //standard error middleware would be
    console.log('****** ERROR *****')
    console.log(err.message);

    res.ack.addSegment('ERR', err.message);
    res.end();
});

app.start({
    host: host,
    port: port,
});
console.log(`HL7 server is running on port ${port}`);

