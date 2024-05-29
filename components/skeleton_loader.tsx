import React from 'react';

const SkeletonLoader: React.FC = () => {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center">
      <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
      <p className="mt-4 text-gray-500">Loading...</p>
    </div>
  );
};

export default SkeletonLoader;
