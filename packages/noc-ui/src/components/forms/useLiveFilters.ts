import { useEffect, useRef } from "react";
import type { FieldValues, UseFormReturn } from "react-hook-form";

export interface UseLiveFiltersOptions<TInput extends FieldValues, TOutput extends FieldValues> {
  /** Result of `useNocForm` holding the filter fields. */
  form: UseFormReturn<TInput, unknown, TOutput>;
  /**
   * Called with the parsed values after the user stops changing the filters for `debounceMs`, only when
   * the whole form is valid. Invalid input shows its error and keeps the previous results.
   */
  onChange: (values: TOutput) => void;
  /** @default 400 */
  debounceMs?: number;
}

/**
 * Applies filters while the user types – no search button. Debounces changes, validates the form against
 * its zod schema and emits only valid values. This is the standard filtering pattern of NoC list screens;
 * do not build it with `useEffect` + `setTimeout` in the application.
 */
export function useLiveFilters<TInput extends FieldValues, TOutput extends FieldValues>({
  form,
  onChange,
  debounceMs = 400,
}: UseLiveFiltersOptions<TInput, TOutput>) {
  const onChangeRef = useRef(onChange);
  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout> | undefined;
    const subscription = form.watch(() => {
      clearTimeout(timeout);
      timeout = setTimeout(async () => {
        // trigger() validates without moving focus; handleSubmit then yields the parsed schema output
        if (await form.trigger()) {
          await form.handleSubmit((values) => onChangeRef.current(values))();
        }
      }, debounceMs);
    });
    return () => {
      clearTimeout(timeout);
      subscription.unsubscribe();
    };
  }, [form, debounceMs]);
}
