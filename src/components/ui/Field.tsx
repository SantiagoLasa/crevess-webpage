import { cn } from '@/lib/cn';

// Campo de formulario: label + control + error. El control llega como
// children (input/select/textarea) con los estilos de fieldControlClass.
export const fieldControlClass =
  'w-full rounded-[2px] border bg-transparent px-4 py-3 text-body placeholder:text-stone/60 transition-colors duration-200';

export function fieldBorderClass(hasError: boolean): string {
  return hasError ? 'border-ember' : 'border-sand focus:border-gold';
}

type FieldProps = {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
  className?: string;
};

export function Field({ id, label, error, children, className }: FieldProps) {
  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <label htmlFor={id} className="text-caption font-medium">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="text-caption text-ember">
          {error}
        </p>
      )}
    </div>
  );
}
