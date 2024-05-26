
import React from 'react';
import { NavBar } from '@/components/ui/navbar';
import  AirbudsInterface from '@/components/airbudsinterface';
import LeftSidebar from '@/components/leftsidebar';
import RightSidebar from '@/components/rightsidebar';

const HomePage: React.FC = () => {
  return (
    <div className="h-screen w-screen flex flex-col">
      <NavBar />
      <div className="flex flex-1 overflow-hidden">
        <LeftSidebar
          profileImage="/profile-page.webp"
          profileName="Caroline Xin"
          profileTime="39 minutes ago"
          albumImage="/album.jpeg"
          albumTitle="m.A.A.d City"
          albumArtist="Kendrick Lamar"
        />
        <div className='h-full flex-1 overflow-y-auto'>
          <AirbudsInterface 
            profileImage="/profile-page.webp"
            profileName="Caroline Xin"
            profileTime="39 minutes ago"
            albumImage="/album.jpeg"
            albumTitle="m.A.A.d City"
            albumArtist="Kendrick Lamar"
          />
        </div>
        <RightSidebar
          profileImage="/profile-page.webp"
          profileName="Caroline Xin"
          profileTime="39 minutes ago"
          albumImage="/album.jpeg"
          albumTitle="m.A.A.d City"
          albumArtist="Kendrick Lamar"
        />
      </div>
    </div>
  );
};

export default HomePage;