import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function ErrorMessage({ message, onRetry }) {
  return (
    <Alert className="bg-red-950/50 border-red-800 my-4">
      <AlertCircle className="h-4 w-4 text-red-400" />
      <AlertDescription className="text-red-200 flex items-center justify-between">
        <span>{message}</span>
        {onRetry && (
          <button onClick={onRetry} className="text-red-300 underline hover:text-red-100">
            Retry
          </button>
        )}
      </AlertDescription>
    </Alert>
  );
}