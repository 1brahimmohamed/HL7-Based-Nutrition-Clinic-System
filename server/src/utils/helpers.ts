export const filterObj = (obj: any, ...allowedFields: any) => {
    const newObj: any = {};
    Object.keys(obj).forEach((el) => {
        if (allowedFields.includes(el)) newObj[el] = obj[el];
    });
    return newObj;
};

export const correctParsedMessage =  (patientParsedData: any) => {
    switch (patientParsedData.gender) {
        case "M":
            patientParsedData.gender = "male";
            break;
        case "F":
            patientParsedData.gender = "female";
            break;
        default:
            patientParsedData.gender = "other";
    }

    patientParsedData.associatedDoctor = null;

    return patientParsedData
}


