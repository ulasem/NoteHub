'use client';

interface ErrorProps {
  error: Error;
}

function Error({ error }: ErrorProps) {
  return <p>Not found! {error.message}</p>;
}

export default Error;
