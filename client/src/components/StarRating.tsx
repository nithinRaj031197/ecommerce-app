import { FaStar } from "react-icons/fa";

type StarRatingProps = {
  rating: number | undefined;
};

const StarRating = ({ rating }: StarRatingProps) => {
  return (
    <div className="flex  ">
      {[...Array(5)].map((_, index) => {
        const starIndex = index + 1;
        return <FaStar key={index} color={starIndex <= Math.floor(rating || 0) ? "#ffc107" : "e4e5e9"} />;
      })}
    </div>
  );
};

export default StarRating;
