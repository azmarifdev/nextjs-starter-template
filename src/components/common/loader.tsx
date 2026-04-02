interface LoaderProps {
  label?: string;
}

export function Loader({ label = "Loading" }: LoaderProps) {
  return (
    <div className="loader-wrap" role="status" aria-live="polite" aria-label={label}>
      <span className="spinner" />
    </div>
  );
}
