import { useState, useEffect } from 'react';

export const useResize = componentRef => {
  const [ width, setWidth ] = useState(0);
  const [ height, setHeight ] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      if (componentRef.current) {
        setWidth(componentRef.current.offsetWidth);
        setHeight(componentRef.current.offsetHeight);
      }
    }
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    }
  }, [componentRef]);

  return { width, height };
}
