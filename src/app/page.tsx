'use client';

import '@xyflow/react/dist/style.css';
import '@radix-ui/themes/styles.css';

import { Flow } from '@/components/Flow';
import { Theme } from '@radix-ui/themes';

export default function Home() {
  return (
    <Theme>
      <div className="w-full h-full flex flex-col items-center">
        <h1 className="text-gray-900 text-3xl lg:text-5xl font-bold leading-none mt-11 mb-6 lg:mb-6">
          Build Your Team Structure with Ease
        </h1>
        <h2 className="text-gray-700 text-xl lg:text-2xl mb-6">
          Start creating and connecting roles in just a few clicks.
        </h2>
        <Flow />
      </div>
    </Theme>
  );
}
