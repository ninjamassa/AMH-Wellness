import {
  fieldControlClass,
  fieldErrorClass,
  fieldHintClass,
  fieldLabelClass,
} from "@/components/forms/form-styles";
import type {
  EligibilityDraft,
  EligibilityField,
  EligibilityStep,
  EligibilityStepErrors,
} from "@/lib/eligibility-flow";

type NumericField = "age" | "heightCm" | "weightKg";
type BooleanField =
  | "ukResident"
  | "hasWeightRelatedCondition"
  | "needsClinicalReview";

const progressLabels: Record<EligibilityStep, string> = {
  "about-you": "About you",
  measurements: "Measurements",
  "health-context": "Health context",
};

export function EligibilityProgress({ step }: { step: EligibilityStep }) {
  const steps = Object.entries(progressLabels) as [EligibilityStep, string][];

  return (
    <ol aria-label="Eligibility check progress" className="grid grid-cols-3 gap-2">
      {steps.map(([id, label], index) => {
        const isCurrent = id === step;
        return (
          <li
            key={id}
            aria-current={isCurrent ? "step" : undefined}
            className={isCurrent ? "text-indigo-600" : "text-ink-500"}
          >
            <span
              aria-hidden="true"
              className={`mb-2 block h-1.5 rounded-pill ${
                isCurrent ? "bg-indigo-600" : "bg-sand-200"
              }`}
            />
            <span className="text-xs font-semibold sm:text-sm">
              {index + 1}. {label}
            </span>
          </li>
        );
      })}
    </ol>
  );
}

function NumberField({
  field,
  id,
  label,
  inputMode,
  step,
  value,
  error,
  onChange,
}: {
  field: NumericField;
  id: string;
  label: string;
  inputMode: "numeric" | "decimal";
  step: string;
  value: string;
  error?: string;
  onChange: (field: NumericField, value: string) => void;
}) {
  const errorId = `${id}-error`;
  return (
    <div>
      <label htmlFor={id} className={fieldLabelClass}>{label}</label>
      <input
        id={id}
        name={field}
        type="number"
        inputMode={inputMode}
        min="1"
        step={step}
        value={value}
        onChange={(event) => onChange(field, event.target.value)}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className={fieldControlClass}
      />
      {error ? <p id={errorId} role="alert" className={fieldErrorClass}>{error}</p> : null}
    </div>
  );
}

function BooleanQuestion({
  name,
  legend,
  value,
  onChange,
  description,
  error,
}: {
  name: BooleanField;
  legend: string;
  value: boolean | null;
  onChange: (field: BooleanField, value: boolean) => void;
  description?: string;
  error?: string;
}) {
  const descriptionId = description ? `${name}-description` : undefined;
  const errorId = error ? `${name}-error` : undefined;
  const describedBy = [descriptionId, errorId].filter(Boolean).join(" ") || undefined;

  return (
    <fieldset
      aria-describedby={describedBy}
      aria-invalid={error ? true : undefined}
    >
      <legend className={fieldLabelClass}>{legend}</legend>
      {description ? <p id={descriptionId} className={fieldHintClass}>{description}</p> : null}
      <div className="mt-3 grid grid-cols-2 gap-3">
        {[true, false].map((option) => (
          <label
            key={String(option)}
            className="flex min-h-touch cursor-pointer items-center gap-3 rounded-control border border-sand-200 bg-white px-4 py-3 font-medium text-ink-700 shadow-card transition-colors duration-[var(--duration-fast)] hover:border-indigo-200 has-checked:border-indigo-600 has-checked:bg-indigo-50"
          >
            <input
              type="radio"
              name={name}
              value={option ? "yes" : "no"}
              checked={value === option}
              onChange={() => onChange(name, option)}
              className="size-5 shrink-0 accent-indigo-600"
            />
            {option ? "Yes" : "No"}
          </label>
        ))}
      </div>
      {error ? <p id={errorId} role="alert" className={fieldErrorClass}>{error}</p> : null}
    </fieldset>
  );
}

export function EligibilityStepFields({
  step,
  draft,
  errors,
  showErrors,
  relatedConditions,
  onNumericChange,
  onBooleanChange,
}: {
  step: EligibilityStep;
  draft: EligibilityDraft;
  errors: EligibilityStepErrors;
  showErrors: boolean;
  relatedConditions: readonly string[];
  onNumericChange: (field: NumericField, value: string) => void;
  onBooleanChange: (field: BooleanField, value: boolean) => void;
}) {
  const errorFor = (field: EligibilityField) => showErrors ? errors[field] : undefined;

  if (step === "about-you") {
    return (
      <fieldset className="space-y-7">
        <legend className="mb-6 text-h3 font-semibold text-indigo-600">About you</legend>
        <NumberField field="age" id="eligibility-age" label="Age" inputMode="numeric" step="1" value={draft.age} error={errorFor("age")} onChange={onNumericChange} />
        <BooleanQuestion name="ukResident" legend="Do you live in the UK?" value={draft.ukResident} error={errorFor("ukResident")} onChange={onBooleanChange} />
      </fieldset>
    );
  }

  if (step === "measurements") {
    return (
      <fieldset className="space-y-7">
        <legend className="mb-6 text-h3 font-semibold text-indigo-600">Your measurements</legend>
        <NumberField field="heightCm" id="eligibility-height" label="Height in centimetres" inputMode="decimal" step="0.1" value={draft.heightCm} error={errorFor("heightCm")} onChange={onNumericChange} />
        <NumberField field="weightKg" id="eligibility-weight" label="Weight in kilograms" inputMode="decimal" step="0.1" value={draft.weightKg} error={errorFor("weightKg")} onChange={onNumericChange} />
      </fieldset>
    );
  }

  return (
    <fieldset className="space-y-7">
      <legend className="mb-6 text-h3 font-semibold text-indigo-600">Health context</legend>
      <BooleanQuestion name="hasWeightRelatedCondition" legend="Do you have a weight-related health condition?" description={`Examples include ${relatedConditions.join(", ")}.`} value={draft.hasWeightRelatedCondition} error={errorFor("hasWeightRelatedCondition")} onChange={onBooleanChange} />
      <BooleanQuestion
        name="needsClinicalReview"
        /* TODO(human): Akila must confirm this clinical-review question and its triggers before launch. */
        legend="Is there anything in your health history you would like Akila to review before you book?"
        value={draft.needsClinicalReview}
        error={errorFor("needsClinicalReview")}
        onChange={onBooleanChange}
      />
    </fieldset>
  );
}
