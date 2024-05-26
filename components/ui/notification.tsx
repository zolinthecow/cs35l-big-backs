import Image from 'next/image';

interface NotificationIconProps {
  count: number;
}

const NotificationIcon: React.FC<NotificationIconProps> = ({ count }) => (
  <div className="relative">
    <Image src="/notification-bell.svg" alt="Notification" width={32} height={32} />
    {count > 0 && (
      <span className="absolute top-0 right-0 inline-block bg-red-500 text-white text-xs rounded-full min-w-min px-1 py-0">
        {count}
      </span>
    )}
  </div>
);

export { NotificationIcon };