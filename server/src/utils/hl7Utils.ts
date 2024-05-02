// @ts-nocheck
import moment from 'moment';
import * as hl7 from 'simple-hl7';


// ADT Message
export function buildHL7ADTMessage(patientRecord: any): hl7.Message {


    const msg = new hl7.Message(
        'MADIMA',                   // MSH.3: Sending Application
        'clinic',                   // MSH.4: Sending Facility
        'AMIDAM',                   // MSH.5: Receiving Application
        'laboratory',               // MSH.6: Receiving Facility
        moment().format('YYYYMMDDHHmmss'), // MSH.7: Date/Time of Message
        '',                         // MSH.8: Security
        'ADT^A02',                  // MSH.9: Message Type (Patient Transfer)
        '1817457',                  // MSH.10: Message Control ID
        'D',                        // MSH.11: Processing ID
        '2.5'                       // MSH.12: Version ID
    );

    msg.addSegment("PID",
        "",                                                               // PID-1: Set ID - PID
        patientRecord._id,                                                // PID-2: Patient ID
        "",                                                               // PID-3: Patient Identifier List
        "",                                                               // PID-4: Alternate Patient ID
        [patientRecord.lastName, patientRecord.firstName],                // PID-5: Patient Name
        "",                                                                // PID-6: Mother's Maiden Name
        moment(patientRecord.birthdate).format('YYYYMMDD'),               // PID-7: Date/Time of Birth
        patientRecord.gender.toUpperCase().charAt(0),                     // PID-8: Sex (Take first character)
        patientRecord.job,                                                // PID-9: Patient Alias
        "",                                                               // PID-10: Race
        patientRecord.address,                                            // PID-11: Patient Address
        "",                                                               // PID-12: County Code
        patientRecord.phoneNumber,                                        // PID-13: Phone Number - Home
        patientRecord.email,                                              // PID-14: Phone Number - Business // used for email

    );

    msg.addSegment('PV1',
        '',     // Set ID (field 1)
        '',    // Patient class (field 2)
        '',    // Assigned patient location (field 3)
        '',     // Admission type (field 4)
        '',     // Preadmit number (field 5)
        '',     // Prior patient location (field 6)
        '277^ALLEN MYLASTNAME^BONNIE^^^^',     // Attending doctor (field 7)
        '', // Referring doctor (field 8)
        '',     // Consulting doctor (field 9)
    );


    // Add AL1 segment if patientRecord contains allergy data
    if (patientRecord.medicalHistory && patientRecord.medicalHistory.allergies && patientRecord.medicalHistory.allergies.length > 0) {
        patientRecord.medicalHistory.allergies.forEach((allergy, index) => {
            msg.addSegment('AL1',
                (index + 1).toString(),
                'AS',
                allergy
            );
        });
    }

    // Add DG1 segment if patientRecord contains diagnosis data
    if (patientRecord.medicalHistory && patientRecord.medicalHistory.medicalConditions && patientRecord.medicalHistory.medicalConditions.length > 0) {
        patientRecord.medicalHistory.medicalConditions.forEach((condition, index) => {
            msg.addSegment('DG1',
                "",                 // DG1-1: Set ID - DG1 (Not specified)
                'I10',              // DG1-2: Diagnosis Coding Method (Defaulting to ICD-10)
                condition,          // DG1-3: Diagnosis Code/Description
                "",                 // DG1-4: Diagnosis Code - DG1 (Not specified)
                "",                 // DG1-5: Diagnosis Description - DG1 (Not specified)
                "",                 // DG1-6: Diagnosis Date/Time - DG1 (Not specified)
                "",                 // DG1-7: Diagnosis Type (Not specified)
                ""                  // DG1-8: Major Diagnostic Category (Not specified)
            );
        });
    }


    // Add OBX segments for medications
    if (patientRecord.medicalHistory.medications && patientRecord.medicalHistory.medications.length > 0) {
        patientRecord.medicalHistory.medications.forEach((medication, index) => {
            msg.addSegment('OBX',
                "",                 // OBX-1: Set ID - OBX (Not specified)
                "ST",               // OBX-2: Value Type (String)
                "Medications",      // OBX-3: Observation Identifier
                index.toString(),   // OBX-4: Observation Sub-ID (Index of the medication)
                medication          // OBX-5: Observation Value (Medication description)
            );
        });
    }


    // Add OBX segments for surgeries
    if (patientRecord.medicalHistory.surgeries && patientRecord.medicalHistory.surgeries.length > 0) {
        patientRecord.medicalHistory.surgeries.forEach((surgery, index) => {
            msg.addSegment('OBX',
                "",                     // OBX-1: Set ID - OBX (Not specified)
                "ST",                   // OBX-2: Value Type (String)
                "Surgeries",            // OBX-3: Observation Identifier
                index.toString(),       // OBX-4: Observation Sub-ID (Index of the surgery)
                surgery                 // OBX-5: Observation Value (Surgery description)
            );
        });
    }
// Add OBX segments for inBodyScores
    if (patientRecord.medicalHistory.inBodyScores && patientRecord.medicalHistory.inBodyScores.length > 0) {
        patientRecord.medicalHistory.inBodyScores.forEach((score, index) => {
            // Add a separate OBX segment for each inBodyScore detail
            msg.addSegment('OBX',
                `${index + 1}.1`,  // OBX-1: Set ID - OBX
                '',              // OBX-2: Value Type (Numeric)
                'date',          // OBX-3: Observation Identifier for Weight
                '',               // OBX-4: Observation Sub-ID (Weight)
                score.date.toString()  // OBX-5: Observation Value (Weight)
            );
            // Add a separate OBX segment for each inBodyScore detail
            msg.addSegment('OBX',
                `${index + 1}.2`,  // OBX-1: Set ID - OBX
                '',              // OBX-2: Value Type (Numeric)
                'score',          // OBX-3: Observation Identifier for Weight
                '1',               // OBX-4: Observation Sub-ID (Weight)
                score.score.toString()  // OBX-5: Observation Value (Weight)
            );
            // Add a separate OBX segment for each inBodyScore detail
            msg.addSegment('OBX',
                `${index + 1}.3`,  // OBX-1: Set ID - OBX
                'NM',              // OBX-2: Value Type (Numeric)
                'Weight',          // OBX-3: Observation Identifier for Weight
                '1',               // OBX-4: Observation Sub-ID (Weight)
                score.weight.toString()  // OBX-5: Observation Value (Weight)
            );

            msg.addSegment('OBX',
                `${index + 1}.4`,  // OBX-1: Set ID - OBX
                'NM',              // OBX-2: Value Type (Numeric)
                'Height',          // OBX-3: Observation Identifier for Height
                '1',               // OBX-4: Observation Sub-ID (Height)
                score.height.toString()  // OBX-5: Observation Value (Height)
            );
            // Add a separate OBX segment for each inBodyScore detail
            msg.addSegment('OBX',
                `${index + 1}.5`,  // OBX-1: Set ID - OBX
                'NM',              // OBX-2: Value Type (Numeric)
                'targetWeight',          // OBX-3: Observation Identifier for Weight
                '1',               // OBX-4: Observation Sub-ID (Weight)
                score.targetWeight.toString()  // OBX-5: Observation Value (Weight)
            );
// Add a separate OBX segment for each inBodyScore detail
            msg.addSegment('OBX',
                `${index + 1}.6`,  // OBX-1: Set ID - OBX
                'NM',              // OBX-2: Value Type (Numeric)
                'weightControl',          // OBX-3: Observation Identifier for Weight
                '1',               // OBX-4: Observation Sub-ID (Weight)
                score.weightControl.toString()  // OBX-5: Observation Value (Weight)
            );
            // Add a separate OBX segment for each inBodyScore detail
            msg.addSegment('OBX',
                `${index + 1}.7`,  // OBX-1: Set ID - OBX
                '',              // OBX-2: Value Type (Numeric)
                'fatPercentage',          // OBX-3: Observation Identifier for Weight
                '',               // OBX-4: Observation Sub-ID (Weight)
                score.fatPercentage.toString()  // OBX-5: Observation Value (Weight)
            );
            // Add a separate OBX segment for each inBodyScore detail
            msg.addSegment('OBX',
                `${index + 1}.8`,  // OBX-1: Set ID - OBX
                '',              // OBX-2: Value Type (Numeric)
                'musclePercentage',          // OBX-3: Observation Identifier for Weight
                '',               // OBX-4: Observation Sub-ID (Weight)
                score.musclePercentage.toString()  // OBX-5: Observation Value (Weight)
            );
            // Add more segments for other inBodyScore details (if any) in a similar manner
        });
    }


    // Add other relevant OBX segments using similar logic

    return msg;
}

////////////////////////////////////////////////////// ORU Message ////////////////////////////////////////////////////////////////////////////////////
export function buildHL7ORUMessage(patientRecord: any, labTestResults: any[]): hl7.Message {

    const msg = new hl7.Message(
        'MADIMA',                   // MSH.3: Sending Application
        'clinic',                   // MSH.4: Sending Facility
        'AMIDAM',                   // MSH.5: Receiving Application
        'laboratory',               // MSH.6: Receiving Facility
        moment().format('YYYYMMDDHHmmss'), // MSH.7: Date/Time of Message
        '',                         // MSH.8: Security
        'ADT^A02',                  // MSH.9: Message Type (Patient Transfer)
        '1817457',                  // MSH.10: Message Control ID
        'D',                        // MSH.11: Processing ID
        '2.5'                       // MSH.12: Version ID
    );

    msg.addSegment("PID",
        "",                                                               // PID-1: Set ID - PID
        patientRecord._id,                                                // PID-2: Patient ID
        "",                                                               // PID-3: Patient Identifier List
        "",                                                               // PID-4: Alternate Patient ID
        [patientRecord.lastName, patientRecord.firstName],                // PID-5: Patient Name
        "",                                                                // PID-6: Mother's Maiden Name
        moment(patientRecord.birthdate).format('YYYYMMDD'),               // PID-7: Date/Time of Birth
        patientRecord.gender.toUpperCase().charAt(0),                     // PID-8: Sex (Take first character)
        "",                                                               // PID-9: Patient Alias
        "",                                                               // PID-10: Race
        patientRecord.address,                                            // PID-11: Patient Address
        "",                                                               // PID-12: County Code
        patientRecord.phoneNumber,                                        // PID-13: Phone Number - Home
    );
    // Add OBX segments for lab test results
    if (labTestResults && labTestResults.length > 0) {
        labTestResults.forEach((test, index) => {
            msg.addSegment("OBX",
                (index + 1).toString(), // OBX-1: Set ID
                "NM",                   // OBX-2: Value Type
                test.testName,          // OBX-3: Observation Identifier
                "1",                    // OBX-4: Observation Sub-ID
                test.result,            // OBX-5: Observation Value
                test.unit               // OBX-6: Units
            );
        });
    }


    return msg;
}


/******************************************************* From HL7 To JSON ****************************************************************/
export function hl7ToJSON(hl7Message: string): Record<string, any> {
    const hl7Parser = new hl7.Parser();
    const parsedMessage = hl7Parser.parse(hl7Message);
    // Define an empty object to hold the parsed MSH segment fields
    const mshFields: Record<string, any> = {};

    // Traverse through each segment in the parsed message
    parsedMessage.segments.forEach((segment: any) => {
        const segmentName = segment.name;

        // Parse MSH segment
        if (segmentName === 'MSH') {
            // Parse MSH segment fields and update the mshFields object
            mshFields.sendingApplication = segment.fields[0].value[0];
            mshFields.sendingFacility = segment.fields[1].value[0][0].value[0];
            mshFields.receivingApplication = segment.fields[2].value[0][0].value[0];
            mshFields.receivingFacility = segment.fields[3].value[0][0].value[0];
            mshFields.dateTimeOfMessage = segment.fields[4].value[0][0].value[0];
            mshFields.messageType = segment.fields[6].value[0][0].value[0];
            mshFields.messageControlId = segment.fields[7].value[0][0].value[0];
            mshFields.processingId = segment.fields[8].value[0][0].value[0];
            mshFields.versionId = segment.fields[9].value[0][0].value[0];
        }
    });

// Construct the desired format
    const result = `Header Message ('${mshFields.sendingApplication}',
        '${mshFields.sendingFacility}',
        '${mshFields.receivingApplication}', 
        '${mshFields.receivingFacility}', 
        '${mshFields.dateTimeOfMessage}', 
        
        '${mshFields.messageType}',
        '${mshFields.messageControlId}', 
        '${mshFields.processingId}',
        '${mshFields.versionId}' 
    )`;

    const patientRecord: any = {
        _id: '',
        firstName: '',
        lastName: '',
        email: '',
        gender: '',
        job: '',
        phoneNumber: '',
        address: '',
        birthdate: '',
        associatedDoctor: [],
        medicalHistory: {
            allergies: [],
            surgeries: [],
            medications: [],
            medicalConditions: [],
            inBodyScores: [{
                date: '',
                score: '',
                weight: '',
                height: '',
                targetWeight: '',
                weightControl: '',
                fatPercentage: '',
                musclePercentage: ''
            }]
        }
    };

    // Traverse through each segment in the parsed message
    parsedMessage.segments.forEach((segment: any) => {
        const segmentName = segment.name;

        // Traverse through each field in the segment
        segment.fields.forEach((field: any, index: number) => {
            var fieldValue = field.value[0][0].value[0];
            // // Store the field value in the segmentData object based on field position
            switch (segmentName) {
                case 'PID':
                    switch (index) {
                        case 1:
                            patientRecord._id = fieldValue;
                            break;
                        case 4: {
                            patientRecord.lastName = fieldValue;
                            patientRecord.firstName = field.value[0][1].value[0];
                        }
                            break;
                        case 6:
                            patientRecord.birthdate = fieldValue;
                            break;
                        case 7:
                            patientRecord.gender = fieldValue;
                            break;
                        case 8:
                            patientRecord.job = fieldValue;
                            break;                            
                        case 10:
                            patientRecord.address = fieldValue;
                            break;
                        case 12:
                            patientRecord.phoneNumber = fieldValue;
                            break;
                        case 13:
                            patientRecord.email = fieldValue;
                            break;                            
                }
                    break;
                case 'PV1':
                    if (index === 7) patientRecord.associatedDoctor = [fieldValue];
                    break;
                case 'AL1':
                    switch (index) {
                        case 2:
                            patientRecord.medicalHistory.allergies.push(fieldValue);
                            break;
                    }
                    break;
                case 'DG1':
                    switch (index) {
                        case 2:
                            patientRecord.medicalHistory.medicalConditions.push(fieldValue);
                            break;
                    }
                    break;

                case 'OBX':
                    switch (index) {
                        case 2:
                            if (fieldValue === 'medications') {
                                patientRecord.medicalHistory.medications.push(field.value[0][0].value[0]);
                            } else if (fieldValue === 'surgeries') {
                                patientRecord.medicalHistory.surgeries.push(field.value[0][0].value[0]);
                            } else if (fieldValue === 'date') {
                                patientRecord.medicalHistory.inBodyScores[0].date = field.value[0][0].value[0];
                            } else if (fieldValue === 'score') {
                                patientRecord.medicalHistory.inBodyScores[0].score = parseInt(field.value[0][0].value[0]);
                            } else if (fieldValue === 'Weight') {
                                patientRecord.medicalHistory.inBodyScores[0].weight = parseInt(field.value[0][0].value[0]);
                            } else if (fieldValue === 'Height') {
                                patientRecord.medicalHistory.inBodyScores[0].height = parseInt(field.value[0][0].value[0]);
                            } else if (fieldValue === 'targetWeight') {
                                patientRecord.medicalHistory.inBodyScores[0].targetWeight = parseInt(field.value[0][0].value[0]);
                            } else if (fieldValue === 'weightControl') {
                                patientRecord.medicalHistory.inBodyScores[0].weightControl = parseInt(field.value[0][0].value[0]);
                            } else if (fieldValue === 'fatPercentage') {
                                patientRecord.medicalHistory.inBodyScores[0].fatPercentage = parseInt(field.value[0][0].value[0]);
                            } else if (fieldValue === 'musclePercentage') {
                                patientRecord.medicalHistory.inBodyScores[0].musclePercentage = parseInt(field.value[0][0].value[0]);
                            }
                            break;
                    }
                    break;
            }
        });
    });

    console.log(patientRecord);
    console.log(result);
    return patientRecord;
}
