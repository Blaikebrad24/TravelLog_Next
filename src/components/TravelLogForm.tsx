'use client';

// letting nextjs know this is client-side code/component

import { useState } from 'react';

export default function TravelLogForm() {
  const [title, setTitle] = useState('');
  return (
    <form>
      <div className="form-control w-full max-w-xs">
        <label className="label">
          <span className="label-text">Title</span>
        </label>
        <input
          type="text"
          className="input input-bordered input-primary w-full max-w-xs"
          value={title}
          onChange={(e) => {
            setTitle(e.currentTarget.value);
            // console.log(title);
          }}
        />
      </div>

      <button className="btn btn-success">Create</button>
    </form>
  );
}
