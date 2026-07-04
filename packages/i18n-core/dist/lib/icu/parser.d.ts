interface ICULiteral {
    type: "literal";
    value: string;
}
interface ICUArgument {
    type: "argument";
    name: string;
}
interface ICUPluralClause {
    selector: string;
    content: ICUNode[];
}
interface ICUPlural {
    type: "plural";
    name: string;
    offset: number;
    clauses: ICUPluralClause[];
}
interface ICUSelectClause {
    selector: string;
    content: ICUNode[];
}
interface ICUSelect {
    type: "select";
    name: string;
    clauses: ICUSelectClause[];
}
interface ICUSelectOrdinal {
    type: "selectOrdinal";
    name: string;
    clauses: ICUSelectClause[];
}
interface ICUNumber {
    type: "number";
    name: string;
    format?: string;
}
interface ICUDate {
    type: "date";
    name: string;
    format?: "short" | "medium" | "long" | "full";
}
interface ICUTime {
    type: "time";
    name: string;
    format?: "short" | "medium" | "long" | "full";
}
type ICUNode = ICULiteral | ICUArgument | ICUPlural | ICUSelect | ICUSelectOrdinal | ICUNumber | ICUDate | ICUTime;
interface ICUParseError {
    message: string;
    position: number;
}
interface ICUParseResult {
    nodes: ICUNode[];
    errors: ICUParseError[];
}

/**
 * file parser.ts
 * description ICU MessageFormat 解析器
 * module @yyc3/i18n-core
 * author YanYuCloudCube Team <admin@0379.email>
 * version 2.3.0
 * created 2026-04-24
 * updated 2026-04-24
 * status active
 * tags [module],[i18n]
 *
 * copyright YanYuCloudCube Team
 * license MIT
 *
 * brief ICU MessageFormat 解析器
 */

declare class ICUParser {
    private pos;
    private input;
    private errors;
    parse(input: string): ICUParseResult;
    private parseMessage;
    private parseEscaped;
    private parseArgument;
    private parseFormat;
    private parsePlural;
    private parseSelect;
    private parseSelectOrdinal;
    private parseSelectLike;
    private parseNumber;
    private parseDate;
    private parseTime;
    private parseClauseContent;
    private parseArgumentInner;
    private parseSelector;
    private parseNumberLiteral;
    private parseIdentifier;
    private peek;
    private skipWhitespace;
    private match;
}

export { ICUParser };
