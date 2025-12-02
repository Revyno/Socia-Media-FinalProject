import { TrendingUp } from 'lucide-react';
import { TRENDING_TAGS } from '@/utils/constants';
export default function TrendingTags(TrendingTags) {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp className="w-5 h-5 text-neutral-400" />
        <h3 className="text-lg font-semibold text-white">Trending Tags</h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {TRENDING_TAGS.map(tag => (
          <button
            key={tag}
            onClick={() => onTagClick?.(tag)}
            className="px-4 py-2 bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white rounded-full text-sm transition-all border border-neutral-800"
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
}