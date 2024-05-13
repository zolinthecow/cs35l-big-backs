/**
 * v0 by Vercel.
 * @see https://v0.dev/t/exd5ZTlbvqo
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { AvatarImage, AvatarFallback, Avatar } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { SVGProps } from 'react';

export default function Component() {
  return (
    <div className="grid h-screen w-full grid-cols-[300px_1fr] overflow-hidden">
      <div className="flex flex-col border-r bg-gray-100 dark:border-gray-800 dark:bg-gray-900">
        <div className="flex h-16 items-center justify-between border-b px-4 dark:border-gray-800">
          <div className="flex items-center gap-2">
            <MessageCircleIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            <h3 className="text-lg font-semibold">Chats</h3>
          </div>
          <div className="flex items-center gap-2">
            <Button size="icon" variant="ghost">
              <PlusIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              <span className="sr-only">Add Friend</span>
            </Button>
            <Link
              className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-gray-500 transition-colors hover:bg-gray-300 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"
              href="#"
            >
              <HomeIcon className="h-5 w-5" />
              <span className="sr-only">Return to Home</span>
            </Link>
          </div>
        </div>
        <div className="flex-1 overflow-auto">
          <div className="space-y-2 p-4">
            <div className="flex items-center gap-3 rounded-lg bg-gray-200 p-3 transition-colors hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700">
              <Avatar>
                <AvatarImage alt="Olivia Davis" src="/placeholder-avatar.jpg" />
                <AvatarFallback>OD</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h4 className="font-medium">Olivia Davis</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Hey, how{`'`}s it going?
                </p>
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                9:15 AM
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-lg bg-gray-200 p-3 transition-colors hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700">
              <Avatar>
                <AvatarImage alt="John Doe" src="/placeholder-avatar.jpg" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h4 className="font-medium">John Doe</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Did you see the new update?
                </p>
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                Yesterday
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="relative flex flex-col">
        <div className="flex h-16 items-center justify-between border-b px-4 dark:border-gray-800">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage alt="Olivia Davis" src="/placeholder-avatar.jpg" />
              <AvatarFallback>OD</AvatarFallback>
            </Avatar>
            <div>
              <h4 className="font-medium">Olivia Davis</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">Online</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button size="icon" variant="ghost">
              <PhoneIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              <span className="sr-only">Call</span>
            </Button>
            <Button size="icon" variant="ghost">
              <VideoIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              <span className="sr-only">Video Call</span>
            </Button>
            <Button size="icon" variant="ghost">
              <MoveHorizontalIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              <span className="sr-only">More</span>
            </Button>
          </div>
        </div>
        <div className="flex-1 overflow-auto p-4">
          <div className="grid gap-4">
            <div className="flex items-start gap-3">
              <Avatar>
                <AvatarImage alt="Olivia Davis" src="/placeholder-avatar.jpg" />
                <AvatarFallback>OD</AvatarFallback>
              </Avatar>
              <div className="max-w-[75%] space-y-2">
                <div className="rounded-lg bg-gray-200 p-3 text-sm dark:bg-gray-800">
                  <p>Hey, how{`'`}s it going?</p>
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  9:15 AM
                </div>
              </div>
            </div>
            <div className="flex justify-end items-start gap-3">
              <div className="max-w-[75%] space-y-2">
                <div className="rounded-lg bg-blue-500 p-3 text-sm text-white">
                  <p>I{`'`}m doing great, thanks for asking!</p>
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  9:16 AM
                </div>
              </div>
              <Avatar>
                <AvatarImage alt="You" src="/placeholder-avatar.jpg" />
                <AvatarFallback>JP</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
        <div className="border-t px-4 py-3 dark:border-gray-800">
          <div className="flex items-center gap-2">
            <Input className="flex-1" placeholder="Type your message..." />
            <Button size="icon" variant="ghost">
              <PaperclipIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              <span className="sr-only">Attach file</span>
            </Button>
            <Button size="icon" variant="ghost">
              <SmileIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              <span className="sr-only">Add emoji</span>
            </Button>
            <Button size="icon" variant="ghost">
              <SendIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              <span className="sr-only">Send message</span>
            </Button>
          </div>
        </div>
        <div className="absolute top-4 right-4">
          <Avatar>
            <AvatarImage alt="You" src="/placeholder-avatar.jpg" />
            <AvatarFallback>JP</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </div>
  );
}

function HomeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

function MessageCircleIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
    </svg>
  );
}

function MoveHorizontalIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="18 8 22 12 18 16" />
      <polyline points="6 8 2 12 6 16" />
      <line x1="2" x2="22" y1="12" y2="12" />
    </svg>
  );
}

function PaperclipIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48" />
    </svg>
  );
}

function PhoneIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function PlusIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}

function SendIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m22 2-7 20-4-9-9-4Z" />
      <path d="M22 2 11 13" />
    </svg>
  );
}

function SmileIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M8 14s1.5 2 4 2 4-2 4-2" />
      <line x1="9" x2="9.01" y1="9" y2="9" />
      <line x1="15" x2="15.01" y1="9" y2="9" />
    </svg>
  );
}

function VideoIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5" />
      <rect x="2" y="6" width="14" height="12" rx="2" />
    </svg>
  );
}
