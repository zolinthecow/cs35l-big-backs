import React from 'react';

export const SkeletonLoader: React.FC = () => {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center">
      <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
      <p className="mt-4 text-gray-500">Loading...</p>
    </div>
  );
};

export const LeftSidebarSkeleton = () => {
  return (
    <div className="h-full w-84 bg-gray-100 overflow-y-auto scrollbar-hide p-4 text-black">
      <div className="mt-4">
        <h1 className="text-xl font-bold mb-4">Pinned Songs</h1>
        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="skeleton-loader">
              <div className="skeleton-loader-thumbnail" />
              <div className="skeleton-loader-content">
                <div className="skeleton-loader-line" />
                <div className="skeleton-loader-line" />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-8">
        <h1 className="text-xl font-bold mb-4">Pinned Artists</h1>
        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="skeleton-loader">
              <div className="skeleton-loader-thumbnail" />
              <div className="skeleton-loader-content">
                <div className="skeleton-loader-line" />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-8">
        <h1 className="text-xl font-bold mb-4">Pinned Playlists</h1>
        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="skeleton-loader">
              <div className="skeleton-loader-thumbnail" />
              <div className="skeleton-loader-content">
                <div className="skeleton-loader-line" />
                <div className="skeleton-loader-line" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const RightSidebarSkeleton = () => {
  return (
    <div className="h-full w-84 bg-gray-100 overflow-y-auto scrollbar-hide p-4 text-black">
      <div className="mt-4">
        <h1 className="text-xl font-bold mb-4">Top Five Songs of the Month</h1>
        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="skeleton-loader">
              <div className="skeleton-loader-thumbnail" />
              <div className="skeleton-loader-content">
                <div className="skeleton-loader-line" />
                <div className="skeleton-loader-line" />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-8">
        <h1 className="text-xl font-bold mb-4"> Recently Played </h1>
        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="skeleton-loader">
              <div className="skeleton-loader-thumbnail" />
              <div className="skeleton-loader-content">
                <div className="skeleton-loader-line" />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-8">
        <h1 className="text-xl font-bold mb-4">Pinned Playlists</h1>
        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="skeleton-loader">
              <div className="skeleton-loader-thumbnail" />
              <div className="skeleton-loader-content">
                <div className="skeleton-loader-line" />
                <div className="skeleton-loader-line" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const AirbudsInterfaceSkeleton = () => {
  return (
    <div className="flex flex-col items-center justify-between h-full w-full p-4 snap-center">
      <div className="flex flex-col items-center mt-4">
        <div
          className="rounded-full bg-gray-200"
          style={{ width: '50px', height: '50px' }}
        />
        <div className="mt-2 text-center">
          <div className="h-4 bg-gray-200 w-24 my-2 rounded"></div>
          <div className="h-3 bg-gray-200 w-16 my-2 rounded"></div>
        </div>
      </div>
      <div className="flex flex-col items-center">
        <div className="w-64 h-64 bg-gray-200 rounded-lg"></div>
        <div className="h-4 bg-gray-200 w-24 my-2 rounded"></div>
        <div className="h-3 bg-gray-200 w-16 my-2 rounded"></div>
      </div>
      <div className="flex items-center space-x-4 justify-center">
        <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
        <div className="h-8 w-24 bg-gray-200 rounded-full"></div>
        <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
      </div>
      <div className="flex justify-around w-full mt-6 px-8">
        <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
        <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
        <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
        <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
      </div>
      <div className="h-8 w-full bg-gray-200 rounded my-2"></div>
    </div>
  );
};

export default AirbudsInterfaceSkeleton;
