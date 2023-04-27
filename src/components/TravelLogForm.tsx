'use client';

// letting nextjs know this is client-side code/component

import { useForm, SubmitHandler } from 'react-hook-form';
import { TravelLog, TravelLogProperty } from '@/models/TravelLog/TravelLog';
import { zodResolver } from '@hookform/resolvers/zod';

const travelLogInputs: Record<
  TravelLogProperty,
  {
    label?: string;
    type: 'text' | 'url' | 'textarea' | 'number' | 'date';
  }
> = {
  title: {
    type: 'text',
  },
  description: {
    type: 'textarea',
  },
  image: {
    type: 'url',
  },
  rating: {
    type: 'number',
  },
  latitude: {
    type: 'number',
  },
  longitude: {
    type: 'number',
  },
  visitDate: {
    label: 'Visit Date',
    type: 'date',
  },
};

const now = new Date();
const padNum = (input: number) => input.toString().padStart(2, '0');
const nowString = `${now.getFullYear()}-${padNum(now.getMonth() + 1)}-${padNum(
  now.getDate()
)}`;
console.log(nowString);

export default function TravelLogForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TravelLog>({
    resolver: zodResolver(TravelLog),
    defaultValues: {
      title: '',
      description: '',
      rating: 10,
      latitude: 90,
      longitude: 180,
      // @ts-ignore
      visitDate: nowString,
    },
  });
  const onSubmit: SubmitHandler<TravelLog> = async (data) => {
    const response = await fetch('/api/logs', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(data),
    }); // calling api here && sending json data
    const json = await response.json();
    console.log(json);
    // TODO refresh list of travel logs
    // TODO: handle form submission errors
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md mx-auto flex gap-4 flex-col"
    >
      {Object.entries(travelLogInputs).map(([name, value]) => {
        const property = name as TravelLogProperty; // ???
        return (
          <div key={name} className="form-control w-full">
            <label className="label">
              <span className="label-text">{name}</span>
            </label>
            {value.type === 'textarea' ? (
              <textarea
                className={`textarea  ${
                  errors.description ? 'textarea-error' : ''
                }`}
                {...register(property)}
              />
            ) : (
              <input
                step="any"
                type={value.type}
                className={`input input-bordered w-full  ${
                  errors[property] ? 'input-error' : ''
                }`}
                {...register(property)}
              />
            )}
            {errors[property] && <span>{errors[property]?.message}</span>}
          </div>
        );
      })}
      {/* {
                  <div key={name} className="form-control w-full">
                  <label className="label">
                    <span className="label-text">{name}</span>
                  </label>
                  <textarea
                    className={`textarea  ${
                      errors[property] ? 'textarea-error' : ''
                    }`}
                    {...register(property)}
                  />
                  {errors[property] && <span>{errors[property]?.message}</span>}
                </div>
      } */}
      <button className="btn btn-success">Create</button>
    </form>
  );
}
// function gets called if validation succeeds, if not the component will re-render with error data
