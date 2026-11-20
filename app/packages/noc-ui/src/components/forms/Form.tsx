import { zodResolver } from "@hookform/resolvers/zod";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import {
  type DefaultValues,
  type FieldValues,
  FormProvider,
  type Resolver,
  type UseFormReturn,
  useForm,
} from "react-hook-form";
import type { z } from "zod";
import { cx } from "../../utils/cx";

export interface UseNocFormOptions<TSchema extends z.ZodType<FieldValues, FieldValues>> {
  /** zod schema – the single source of truth for validation rules and messages. */
  schema: TSchema;
  defaultValues: DefaultValues<z.input<TSchema>>;
  /**
   * When fields validate. `onTouched` validates a field after the user leaves it, then on every change.
   * @default "onTouched"
   */
  mode?: "onTouched" | "onChange" | "onBlur" | "onSubmit" | "all";
}

/** The form object returned by `useNocForm`. It is a react-hook-form `UseFormReturn`. */
export type NocForm<TSchema extends z.ZodType<FieldValues, FieldValues>> = UseFormReturn<
  z.input<TSchema>,
  unknown,
  z.output<TSchema>
>;

/**
 * Creates a form bound to a zod schema. Validation messages come from the schema, e.g.
 * `z.string().min(2, "Enter at least 2 characters")`. Do not call react-hook-form's `useForm` directly.
 */
export function useNocForm<TSchema extends z.ZodType<FieldValues, FieldValues>>({
  schema,
  defaultValues,
  mode = "onTouched",
}: UseNocFormOptions<TSchema>): NocForm<TSchema> {
  return useForm<z.input<TSchema>, unknown, z.output<TSchema>>({
    resolver: zodResolver(schema) as unknown as Resolver<z.input<TSchema>, unknown, z.output<TSchema>>,
    defaultValues,
    mode,
  });
}

export interface FormProps<TInput extends FieldValues, TOutput extends FieldValues> extends Omit<
  ComponentPropsWithoutRef<"form">,
  "onSubmit" | "children"
> {
  /** Result of `useNocForm`. */
  form: UseFormReturn<TInput, unknown, TOutput>;
  /** Called with the parsed (schema output) values when the form is submitted and valid. */
  onSubmit?: (values: TOutput) => void | Promise<void>;
  children: ReactNode;
}

/**
 * Provides the form to `Form*` fields and renders a `<form noValidate>`. Fields find the form by `name`;
 * no extra wiring needed.
 */
export function Form<TInput extends FieldValues, TOutput extends FieldValues>({
  form,
  onSubmit,
  children,
  className,
  ...props
}: FormProps<TInput, TOutput>) {
  return (
    <FormProvider {...form}>
      <form
        noValidate
        className={cx("noc-form", className)}
        onSubmit={onSubmit ? form.handleSubmit(onSubmit) : (event) => event.preventDefault()}
        {...props}
      >
        {children}
      </form>
    </FormProvider>
  );
}
