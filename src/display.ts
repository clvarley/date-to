/**
 * Converts the given number to a string of `digits` length with leadings zeros
 *
 * @internal
 * @param value  Numeric value
 * @param digits Number of digits
 */
export const minDigits = (value: number, digits: number): string => {
    const output = value.toString();

    if (output.length > digits) return output;

    return "0".repeat(digits - output.length).concat(output);
};
