import * as hl7 from "simple-hl7";
import {handleReceivedHL7Message} from "../controllers/patient.controller";

const port = process.env.MY_CLINIC_TCP_PORT || 7777;
const host = process.env.TCP_HOST || "localhost";

// @ts-ignore
const app = hl7.tcp();

// Event handler for receiving HL7 messages
app.use((req: any, res: any) => {
   handleReceivedHL7Message(req)
})

app.start({
    host: host,
    port: port,
});
console.log(`HL7 server is running on port ${port}`);

