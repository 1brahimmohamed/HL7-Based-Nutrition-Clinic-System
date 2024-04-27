export const filterObj = (obj: any, ...allowedFields: any) => {
    const newObj: any = {};
    Object.keys(obj).forEach((el) => {
        if (allowedFields.includes(el)) newObj[el] = obj[el];
    });
    return newObj;
};


export const generateTimeOptions = () => {
    const options = [];
    for (let hour = 9; hour <= 21; hour++) {
        // Loop from 9 AM to 9 PM
        for (let minutes = 0; minutes < 60; minutes += 30) {
            // Loop for 30-minute intervals
            const time = `${hour.toString().padStart(2, "0")}:${minutes
                .toString()
                .padStart(2, "0")}`;
            options.push(
                <option key={time} value={time}>
                    {time}
                </option>
            );
        }
    }
    return options;
};
