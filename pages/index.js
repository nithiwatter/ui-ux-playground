import React from 'react';

// import CohereMenu from '../components/downshift/cohereMenu';
import CohereMenu from '../components/reach/cohereMenu';
import CohereMenu from '../components/radix/cohereMenu';

export default function Home() {
  return (
    <div className="bg-slate-800 p-8">
      <div className="flex gap-4">
        <CohereMenu />
        <CohereMenu />
      </div>
    </div>
  );
}
