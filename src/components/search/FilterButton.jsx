import { Button } from '@/components/ui/button';

export default function FilterButtons({ filters, activeFilter, onFilterChange }) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2">
      {filters.map(filter => (
        <Button
          key={filter.value}
          onClick={() => onFilterChange(filter.value)}
          variant={activeFilter === filter.value ? 'default' : 'outline'}
          className={activeFilter === filter.value ? 'bg-white text-neutral-900' : 'bg-transparent border-neutral-700'}
        >
          {filter.label}
        </Button>
      ))}
    </div>
  );
}