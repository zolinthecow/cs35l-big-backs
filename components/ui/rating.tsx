import { FC } from "react";

const StarIcon: FC<{ filled: boolean }> = ({ filled }) => (
  <svg
    className={`h-5 w-5 ${filled ? "fill-primary" : "fill-muted stroke-muted-foreground"}`}
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
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const HalfStarIcon: FC = () => (
  <svg
    className="h-5 w-5 fill-primary stroke-primary"
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <defs>
      <linearGradient id="half-fill" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="50%" style={{ stopColor: "currentColor", stopOpacity: 1 }} />
        <stop offset="50%" style={{ stopColor: "transparent", stopOpacity: 1 }} />
      </linearGradient>
    </defs>
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" fill="url(#half-fill)" />
  </svg>
);

const Rating: FC<{ rating: number }> = ({ rating }) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (rating >= i) {
      stars.push(<StarIcon key={i} filled={true} />);
    } else if (rating >= i - 0.5) {
      stars.push(<HalfStarIcon key={i} />);
    } else {
      stars.push(<StarIcon key={i} filled={false} />);
    }
  }

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-0.5">
        {stars}
      </div>
      <span className="text-sm font-medium">{rating.toFixed(1)}</span>
    </div>
  );
};

export { Rating };
