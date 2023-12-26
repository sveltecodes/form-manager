import type { ReplaySubject } from "rxjs";

export class FormField {
  public name: string;
  public label?: string;
  public placeholder?: string;
  public type?: string;
  public value?: ReplaySubject<string>;
  public touched?: boolean;
  public control?: HTMLInputElement;
}
