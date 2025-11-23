import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

export default function SearchBar({ value, onChange, placeholder = 'Search...' }) {
  return (
    <div className="relative">
      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="pl-12 py-6 bg-neutral-900 border-neutral-800 text-white rounded-xl"
      />
    </div>
  );
}