export default function LoadingSpinner({ size = 'md' }) {
  const sizeClasses = {
    sm: 'h-6 w-6',
    md: 'h-12 w-12',
    lg: 'h-16 w-16',
  };

  return (
    <div className="flex items-center justify-center min-h-[200px]">
      <div className={`animate-spin rounded-full border-t-2 border-b-2 border-neutral-400 ${sizeClasses[size]}`}></div>
    </div>
  );
}