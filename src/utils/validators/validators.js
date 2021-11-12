export const required = (values) => {
    if (!values) {
        return 'Field is required';
    }
};

export const maxLengthCreator = (maxLength) => {
    return (values) => {
        if (values.length > maxLength) {
            return `Max length ${maxLength} symbols`;
        }
    }
};