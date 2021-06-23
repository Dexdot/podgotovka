import { useWindowLocation } from '@/hooks/useWindowLocation';
import { DOMAINS } from '@/utils/consts';
import { useEffect, useState } from 'react';

type ReturnData = {
  isAdmin: boolean;
  isSchool: boolean;
};

const { NODE_ENV } = process.env;
const isLocalDev = NODE_ENV === 'development';

export function useDomain(): ReturnData {
  const windowLocation = useWindowLocation();
  const subdomain = process.browser ? window.location.host.split('.')[0] : '';
  const [isAdmin, setAdmin] = useState(
    isLocalDev ? true : subdomain === DOMAINS.admin
  );
  const [isSchool, setSchool] = useState(
    isLocalDev ? false : subdomain === DOMAINS.school
  );

  useEffect(() => {
    if (windowLocation && !isLocalDev) {
      const subDomain = windowLocation.host.split('.')[0];
      setAdmin(subDomain === DOMAINS.admin);
      setSchool(subDomain === DOMAINS.school);
    }
  }, [windowLocation]);

  return { isAdmin, isSchool };
}
