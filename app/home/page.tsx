"use client";
import React, { useState } from 'react';
import { NavBar } from '@/components/ui/navbar';
import  AirbudsInterface from '@/components/airbudsinterface';
import LeftSidebar from '@/components/leftsidebar';
import RightSidebar from '@/components/rightsidebar';
import InfiniteScroll from 'react-infinite-scroll-component';
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
      setItems(prevItems => [
        ...prevItems,
        ...mockAirbudsData.slice(prevItems.length, prevItems.length + 10)
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
        <div className='h-full flex-1 overflow-y-auto'>
            <InfiniteScroll
              dataLength={items.length}
              next={fetchMoreData}
              hasMore={hasMoreItems}
              loader={<h4>Loading...</h4>}
              endMessage={
                <p style={{ textAlign: 'center' }}>
                  <b>Yay! You have seen it all</b>
                </p>
              }
            >
              {items.map(item => (
                <AirbudsInterface 
                  key={item.key}
                  profileImage={item.profileImage}
                  profileName={item.profileName}
                  profileTime={item.profileTime}
                  albumImage={item.albumImage}
                  songTitle={item.songTitle}
                  songArtist={item.songArtist}
                  songLink={item.songLink}
                />
              ))}
            </InfiniteScroll>
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