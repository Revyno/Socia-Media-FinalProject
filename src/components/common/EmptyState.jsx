import { ImageIcon } from 'lucide-react';
import React from 'react';
// import {Icon} from '@/components/ui/icon';
export default function EmptyState({ icon: Icon = ImageIcon, title, description }) {
  return (
    <div className="text-center py-20">
      <Icon className="w-16 h-16 text-neutral-600 mx-auto mb-4" />
      <p className="text-neutral-400 text-lg">{title}</p>
      {description && <p className="text-neutral-500 text-sm mt-2">{description}</p>}
    </div>
  );
}