
import React from 'react';
import { NavBar } from '@/components/ui/navbar';
import  AirbudsInterface from '@/components/airbudsinterface';

const HomePage: React.FC = () => {
  return (
    <div>
      <NavBar />
      <div className='grid gird-cols-[auto,1fr] flex-grow-1 overflow-auto'>
        <div>Sidebar</div>
        <div>
          <AirbudsInterface />
        </div>
      </div>
    </div>
  );
};

export default HomePage;