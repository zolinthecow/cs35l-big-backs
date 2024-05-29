'use client';
import React, { useState } from 'react';
import { NavBar } from '@/components/ui/navbar';
import SnappingScrollContainer from '@/components/airbudsinterface';
import LeftSidebar from '@/components/leftsidebar';
import RightSidebar from '@/components/rightsidebar';
import { mockAirbudsData } from '@/components/mock_data/airbuds_data';

const HomePage: React.FC = () => {
  const [items, setItems] = useState(mockAirbudsData.slice(0, 10)); // Initial 10 items
  const [hasMoreItems, setHasMoreItems] = useState(true);

  const fetchMoreData = () => {
    if (items.length >= mockAirbudsData.length) {
      setHasMoreItems(false);
      return;
    }

    // Fetch next 10 items
    setTimeout(() => {
      setItems((prevItems) => [
        ...prevItems,
        ...mockAirbudsData.slice(prevItems.length, prevItems.length + 10),
      ]);
    }, 500);
  };
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
        <div className="h-full flex-1 overflow-y-auto border-t border-gray-100 border-b rounded bg-gray-100">
          <SnappingScrollContainer />
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
