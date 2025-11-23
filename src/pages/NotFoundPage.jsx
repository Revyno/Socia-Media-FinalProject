import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Home } from 'lucide-react';

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-neutral-950 flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-neutral-800">404</h1>
        <h2 className="text-3xl font-bold text-white mt-4 mb-2">Page Not Found</h2>
        <p className="text-neutral-400 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Button
          onClick={() => navigate('/')}
          className="bg-white text-neutral-900 hover:bg-neutral-100"
        >
          <Home className="w-4 h-4 mr-2" />
          Go Home
        </Button>
      </div>
    </div>
  );
}