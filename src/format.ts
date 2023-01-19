import { minDigits } from "./display";
import { regex, unEscape } from "./regex";

/**
 * Get a component of the date and perform some formatting
 *
 * @param subject Subject date
 * @return        Date/time component
 */
type Formatter = (subject: Date) => string;

/**
 * Maps format placeholder values to their corresponding formatter
 */
type FormatMap = {
    [placeholder: string]: Formatter
};

/**
 * @internal
 */
const FORMAT: FormatMap = {
    "Y": (subject) => minDigits(subject.getFullYear(), 4),
    "y": (subject) => subject.getFullYear().toString(),
    "M": (subject) => minDigits(subject.getMonth(), 2),
    "m": (subject) => subject.getMonth().toString(),
    "D": (subject) => minDigits(subject.getDate(), 2),
    "d": (subject) => subject.getDate().toString()
};

/**
 * Convert the given date to a string using the format specified
 *
 * Currently accepts the following format placeholder:
 * * `Y` - 4 digit year (with leading zeros)
 * * `y` - Year
 * * `M` - 2 digit month (with leading zeros)
 * * `m` - Month
 * * `D` - 2 digit day (with leading zeros)
 * * `d` - Day
 *
 * If you would like to use any of the above letters literally in your string,
 * placeholders can be escaped using a backslash or the `escape` function.
 *
 * @param subject Subject date
 * @param format  Output format
 * @return        Formatted date string
 */
export const dateToFormat = (subject: Date, format: string): string => {
    const output = format.replace(
        regex,
        (match: string, placeholder: string): string => {
            if (!FORMAT[placeholder])
                throw new Error(`Unknown format placeholder: ${placeholder}`);

            const component = FORMAT[placeholder](subject);

            // Remove leading backslash (if present)
            return match.slice(0, -placeholder.length).concat(component);
        }
    );

    return unEscape(output);
};
