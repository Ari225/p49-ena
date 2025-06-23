
import React from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

const AssembleesHeader = () => {
  const isMobile = useIsMobile();

  return (
    <section className={`bg-primary text-white py-16 ${isMobile ? 'px-[25px]' : 'px-[100px]'}`}>
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-4">Assemblées Générales</h1>
        <p className="text-xl opacity-90">
          Les moments forts de la démocratie participative de la P49
        </p>
      </div>
    </section>
  );
};

export default AssembleesHeader;
