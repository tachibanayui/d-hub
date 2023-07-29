import { FieldErrors } from "react-hook-form";

export function getUnknownError<T extends FieldErrors>(errors: T) {
    return errors[""]?.message?.toString();
}
