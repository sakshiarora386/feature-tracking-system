'use client';

import Link from 'next/link';
import FeatureRequestList from '../../components/organisms/FeatureRequestList';
import Button from '../../components/atoms/Button';

export default function Home() {
  return (
    <main className="p-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Feature Request Tracker</h1>
        <Link href="/feature-requests/create">
          <Button>New Request</Button>
        </Link>
      </div>
      <FeatureRequestList />
    </main>
  );
}
