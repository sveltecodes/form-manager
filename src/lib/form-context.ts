import type { FormField } from "./form-field";

export type FormContextType = {
  register: (field: FormField) => void;
};
