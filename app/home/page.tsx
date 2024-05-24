
import React from 'react';
import { NavBar } from '@/components/ui/navbar';
import  AirbudsInterface from '@/components/airbudsinterface';

const HomePage: React.FC = () => {
  return (
    <div>
      <NavBar />
      <div className='grid gird-cols-[auto,1fr] flex-grow-1 overflow-auto'>
        <div>Sidebar</div>
        <div className='h-full'>
        <AirbudsInterface 
          profileImage="/profile-page.webp"
          profileName="Caroline Xin"
          profileTime="39 minutes ago"
          albumImage="/album.jpeg"
          albumTitle="m.A.A.d City"
          albumArtist="Kendrick Lamar"
        />
        </div>
      </div>
    </div>
  );
};

export default HomePage;