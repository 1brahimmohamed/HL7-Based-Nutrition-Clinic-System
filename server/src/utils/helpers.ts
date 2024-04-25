export const filterObj = (obj: any, ...allowedFields: any) => {
    const newObj: any = {};
    Object.keys(obj).forEach((el) => {
        if (allowedFields.includes(el)) newObj[el] = obj[el];
    });
    return newObj;
};
