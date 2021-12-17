export type FieldValidatorType = (values: string) => string | undefined;

export const required: FieldValidatorType = (values) => {
    if (!values) {
        return 'Field is required';
    }
};

export const maxLengthCreator = (maxLength: number): FieldValidatorType => {
    return (values) => {
        if (values.length > maxLength) {
            return `Max length ${maxLength} symbols`;
        }
    }
};