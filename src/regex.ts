/**
 * Regex used to match against format placeholder/replacement values
 *
 * @internal
 */
export const regex = /(?:^|[^\\])([Y|y|M|m|D|d])/g;

/**
 * Escape the given string allowing it to be used inside a parse or format call
 *
 * For example: the string "Today" has both the "d" and "y" placeholders, which
 * would normally be expanded to the day and year respectively.
 *
 * This function escapes the string so no expansions will be applied
 *
 * @param subject String to be escaped
 * @return        Escaped string
 */
export const escape = (subject: string): string => {
    return subject.replace(/[Y|y|M|m|D|d]/g, (match: string): string => {
        return "\\" + match;
    });
};

/**
 * Unescapes a string, removing any leading backslashes
 *
 * @internal
 * @param subject String to be un-escaped
 * @return        Un-escaped string
 */
export const unEscape = (subject: string): string => {
    return subject.replace(/\\[Y|y|M|m|D|d]/g, (match: string): string => {
        return match.slice(1);
    });
};
