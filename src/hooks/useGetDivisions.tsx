import { Routes } from '@/services/routes';
import { useEffect, useState } from 'react';

interface Division {
  id: number;
  name: string;
}

export function useGetDivisions() {
  const [divisions, setDivisions] = useState<Division[]>([]);
  
  useEffect(() => {
    fetch(Routes.Divisions)
      .then((res) => res.json())
      .then((data) => setDivisions(data));
  }, []);

  return divisions as Division[]
}
