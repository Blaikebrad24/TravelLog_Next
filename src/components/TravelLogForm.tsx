'use client';

// letting nextjs know this is client-side code/component

import { useState } from 'react';

export default function TravelLogForm() {
  const [title, setTitle] = useState('');
  return (
    <form>
      <label>Title</label>
      <input
        value={title}
        onChange={(e) => {
          setTitle(e.currentTarget.value);
          // console.log(title);
        }}
      />
      <button>Create</button>
    </form>
  );
}
