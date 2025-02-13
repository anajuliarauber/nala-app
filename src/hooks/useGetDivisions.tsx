import { useEffect, useState } from 'react';

interface Division {
  id: number;
  name: string;
}

export function useGetDivisions() {
  const [divisions, setDivisions] = useState<Division[]>([]);
  useEffect(() => {
    fetch('/api/divisions')
      .then((res) => res.json())
      .then((data) => setDivisions(data));
  }, []);

  return divisions as Division[]
}
