
import { useState, useEffect } from "react";
import { ThumbsUp, MessageCircle, ChevronDown } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import IPhoneImageFetcher from "@/components/IPhoneImageFetcher";

// Define a review type
type Review = {
  name: string;
  avatar: string;
  time: string;
  text: string;
  likes: number;
  comments: number;
  images: string[];
};

// Define sort types
type SortOption = "newest" | "most-likes" | "most-comments";

// Define fallback image to use when image loading fails
const FALLBACK_IMAGE = "/lovable-uploads/92df31cc-3da1-4ac0-abdd-86b665018903.png?q=30&w=300";

// Define the Shein Scheme logo
const SHEIN_LOGO = "/lovable-uploads/92df31cc-3da1-4ac0-abdd-86b665018903.png";

const FacebookReviews = () => {
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [sortOption, setSortOption] = useState<SortOption>("newest");
  const [iphoneImages, setIphoneImages] = useState<Array<{
    src: string;
    alt: string;
  }>>([]);
  const [displayedReviewsData, setDisplayedReviewsData] = useState<Review[]>([]);
  // Store which reviews will have replies (3 random ones instead of 5)
  const [reviewsWithReplies, setReviewsWithReplies] = useState<number[]>([]);
  // Track image loading state for each review
  const [loadedImages, setLoadedImages] = useState<{
    [key: string]: boolean;
  }>({});

  // Preload fallback image
  useEffect(() => {
    const img = new Image();
    img.src = FALLBACK_IMAGE;

    // Also preload the program logo
    const logoImg = new Image();
    logoImg.src = SHEIN_LOGO;
  }, []);

  // Define all reviews in one array - focused on Shein gift card surveys
  const allReviews: Review[] = [{
    name: "Sarah Johnson",
    avatar: "https://i.pravatar.cc/40?img=1",
    time: "2 hours ago",
    text: "I just received my Shein Gift Card! The survey was super easy and processing was fast. So happy with this program!",
    likes: 24,
    comments: 2,
    images: [FALLBACK_IMAGE]
  }, {
    name: "Michael Thomas",
    avatar: "https://i.pravatar.cc/40?img=5",
    time: "Yesterday",
    text: "This is legit! Was skeptical at first but decided to try anyway. Got my Shein Gift Card in just 3 days after completing the survey. Already ordered some amazing clothes!",
    likes: 42,
    comments: 5,
    images: [FALLBACK_IMAGE]
  }, {
    name: "Jessica Williams",
    avatar: "https://i.pravatar.cc/40?img=8",
    time: "2 days ago",
    text: "Just wow! Survey took less than 5 minutes and the Gift Card arrived perfectly. My fashion budget was tight so this came at the perfect time!",
    likes: 19,
    comments: 1,
    images: [FALLBACK_IMAGE]
  }, {
    name: "Robert Chen",
    avatar: "https://i.pravatar.cc/40?img=12",
    time: "3 days ago",
    text: "The whole process was surprisingly simple. I completed the survey during lunch break and received confirmation immediately. Gift Card arrived few days later. 10/10 would recommend!",
    likes: 38,
    comments: 3,
    images: [FALLBACK_IMAGE]
  }, {
    name: "Amanda Rodriguez",
    avatar: "https://i.pravatar.cc/40?img=22",
    time: "Last week",
    text: "Best decision ever! My Shein Gift Card arrived quickly and I love all the items I was able to buy. The Shein Review Scheme is amazing - thank you so much!",
    likes: 57,
    comments: 7,
    images: [FALLBACK_IMAGE]
  },
  // Adding text-only reviews 
  {
    name: "Emma Peterson",
    avatar: "https://i.pravatar.cc/40?img=3",
    time: "4 days ago",
    text: "Thought it was too good to be true, but I'm literally shopping on Shein with my Gift Card! The process was quick and my order arrived in 2 weeks.",
    likes: 21,
    comments: 3,
    images: []
  }, {
    name: "Liam Johnson",
    avatar: "https://i.pravatar.cc/40?img=10",
    time: "5 days ago",
    text: "So grateful for this opportunity! My fashion budget was tight this month. The survey was straightforward and my Shein Gift Card arrived in my email just 2 days later.",
    likes: 17,
    comments: 2,
    images: []
  }, {
    name: "Olivia Rodriguez",
    avatar: "https://i.pravatar.cc/40?img=16",
    time: "Last week",
    text: "My friends didn't believe me when I told them about this scheme, but now they're all signing up after seeing my Shein haul from the Gift Card! The clothes are so trendy.",
    likes: 29,
    comments: 5,
    images: []
  }, {
    name: "Noah Martinez",
    avatar: "https://i.pravatar.cc/40?img=20",
    time: "Last week",
    text: "Just got my Shein Gift Card yesterday. Used it immediately and stocked up on summer outfits. This scheme is seriously awesome!",
    likes: 15,
    comments: 1,
    images: []
  }, {
    name: "Ava Thompson",
    avatar: "https://i.pravatar.cc/40?img=23",
    time: "2 weeks ago",
    text: "After some unexpected bills this month, I couldn't afford new clothes. This Gift Card scheme was a lifesaver! Shein has everything I needed for my summer wardrobe!",
    likes: 33,
    comments: 4,
    images: []
  }, {
    name: "Ethan Wright",
    avatar: "https://i.pravatar.cc/40?img=33",
    time: "3 weeks ago",
    text: "I was hesitant but decided to try the survey anyway. So glad I did! The whole process was smooth and I got my Shein Gift Card right on time as promised.",
    likes: 41,
    comments: 6,
    images: []
  }];

  // ... keep existing code (time conversion functions and sorting logic)

  useEffect(() => {
    // Initialize reviews sorted by newest on first load
    const timeOrder = convertTimeStringsToOrder(allReviews);
    setDisplayedReviewsData([...allReviews].sort((a, b) => timeOrder[b.time] - timeOrder[a.time]));

    // Randomly select 3 reviews to have replies
    const randomReviews = getRandomIndices(allReviews.length, 3);
    setReviewsWithReplies(randomReviews);

    // Preload all review images
    allReviews.forEach(review => {
      if (review.images.length > 0) {
        review.images.forEach(imgSrc => {
          const img = new Image();
          img.onload = () => {
            setLoadedImages(prev => ({
              ...prev,
              [imgSrc]: true
            }));
          };
          img.src = imgSrc;
        });
      }
    });
  }, []);

  // Helper function to get random indices
  const getRandomIndices = (max: number, count: number): number[] => {
    const indices: number[] = [];
    while (indices.length < count) {
      const randomIndex = Math.floor(Math.random() * max);
      if (!indices.includes(randomIndex)) {
        indices.push(randomIndex);
      }
    }
    return indices;
  };

  // Helper function to convert time strings to numeric values for sorting
  const convertTimeStringsToOrder = (reviews: Review[]) => {
    const timeOrder: {
      [key: string]: number;
    } = {};
    const timeValues = {
      "hour": 60,
      "hours": 60,
      "day": 24 * 60,
      "days": 24 * 60,
      "week": 7 * 24 * 60,
      "weeks": 7 * 24 * 60
    };
    reviews.forEach(review => {
      const timeParts = review.time.split(" ");
      if (timeParts.length >= 2) {
        const number = parseInt(timeParts[0]);
        const unit = timeParts[1];
        if (unit === "ago") {
          // Handle "2 hours ago" format
          const actualUnit = timeParts[1];
          if (actualUnit in timeValues) {
            timeOrder[review.time] = number * timeValues[actualUnit];
          }
        } else if (unit === "hour" || unit === "hours" || unit === "day" || unit === "days" || unit === "week" || unit === "weeks") {
          // Handle "2 hours ago", "Yesterday", etc.
          timeOrder[review.time] = number * timeValues[unit];
        } else if (timeParts[0] === "Yesterday") {
          timeOrder[review.time] = 1 * timeValues["day"];
        } else if (timeParts[0] === "Last") {
          timeOrder[review.time] = 1 * timeValues[timeParts[1]];
        }
      }
    });
    return timeOrder;
  };

  // ... keep existing code (refreshComments, handleImagesFetched, handleImageLoad, handleImageError, getSortedReviews functions)

  const refreshComments = () => {
    // Set sort option to newest and sort reviews by newest
    setSortOption("newest");
    const timeOrder = convertTimeStringsToOrder(allReviews);
    setDisplayedReviewsData([...allReviews].sort((a, b) => timeOrder[b.time] - timeOrder[a.time]));

    // Get new random reviews with replies when refreshing
    const randomReviews = getRandomIndices(allReviews.length, 3);
    setReviewsWithReplies(randomReviews);
  };
  
  const handleImagesFetched = (images: Array<{
    src: string;
    alt: string;
  }>) => {
    // Not using the API-fetched images anymore since we're using the specific uploaded images
    setIphoneImages(images);
  };

  // Handle image load event
  const handleImageLoad = (imageSrc: string) => {
    setLoadedImages(prev => ({
      ...prev,
      [imageSrc]: true
    }));
  };

  // Handle image error event
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement;
    target.src = FALLBACK_IMAGE;
    setLoadedImages(prev => ({
      ...prev,
      [FALLBACK_IMAGE]: true
    }));
  };

  // Sort the reviews based on the selected option
  const getSortedReviews = () => {
    switch (sortOption) {
      case "most-likes":
        return [...displayedReviewsData].sort((a, b) => b.likes - a.likes);
      case "most-comments":
        return [...displayedReviewsData].sort((a, b) => b.comments - a.comments);
      case "newest":
      default:
        // Sort by time strings converted to relative minutes
        const timeOrder = convertTimeStringsToOrder(displayedReviewsData);
        return [...displayedReviewsData].sort((a, b) => timeOrder[a.time] !== undefined && timeOrder[b.time] !== undefined ? timeOrder[a.time] - timeOrder[b.time] : 0);
    }
  };
  
  const sortedReviews = getSortedReviews();
  const displayedReviews = showAllReviews ? sortedReviews : sortedReviews.slice(0, 5);

  // Get a unique response for a specific review - Updated for Shein Gift Card
  const getUniqueResponse = (index: number, reviewName: string) => {
    const responses = [
      `Thanks for sharing your experience, ${reviewName}! 😊 We're thrilled you're enjoying your Shein Gift Card. Our team works hard to make processing as fast as possible!`, 
      `We really appreciate your feedback, ${reviewName}! The Shein Gift Card is indeed a fantastic reward, and we're delighted it helped you update your wardrobe.`, 
      `Thank you so much for your kind words, ${reviewName}! We're committed to making this scheme accessible to everyone who qualifies. Enjoy all the amazing fashion from Shein!`, 
      `We're so glad to hear about your positive experience, ${reviewName}! Our goal is to make the survey process as simple as possible. Thank you for being part of our scheme!`, 
      `Your satisfaction means everything to us, ${reviewName}! We're happy that the Shein Gift Card meets your expectations. Don't hesitate to reach out if you have any questions!`, 
      `Thanks for trusting our scheme, ${reviewName}! Many people are skeptical at first, but we're dedicated to delivering quality rewards to all our qualified participants.`, 
      `We love hearing success stories like yours, ${reviewName}! Shein has so many great fashion items to choose from. Thanks for sharing your experience with our community!`, 
      `Thank you for your wonderful feedback, ${reviewName}! We're glad the process was smooth and you're enjoying your Gift Card. That's exactly what we aim for!`
    ];

    // Use modulo to cycle through responses if there are more reviews than responses
    return responses[index % responses.length];
  };

  // Get a random time string for replies
  const getRandomTime = (index: number): string => {
    const times = ['1h ago', '3h ago', '5h ago', '1d ago', '2d ago', '3d ago'];
    return times[index % times.length];
  };
  
  return (
    <div className="mt-8 bg-white rounded-lg shadow-md p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-[#3b5998] rounded-full flex items-center justify-center">
            <span className="text-white font-bold">f</span>
          </div>
          <span className="ml-2 font-semibold text-[#3b5998]">Read what others say about our scheme:</span>
        </div>
        <span className="text-sm text-gray-600 font-medium">134 comments</span>
      </div>

      {/* Hidden iPhone Image Fetcher */}
      <div className="hidden">
        <IPhoneImageFetcher onComplete={handleImagesFetched} />
      </div>

      <div className="flex items-center justify-between mb-2">
        <DropdownMenu>
          <DropdownMenuTrigger className="text-sm text-gray-500 flex items-center">
            Sort by: {sortOption === "newest" ? "Newest" : sortOption === "most-likes" ? "Highest Liked" : "Most Comments"}
            <ChevronDown className="w-3 h-3 ml-1" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setSortOption("newest")}>
              Newest
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSortOption("most-likes")}>
              Highest Liked
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSortOption("most-comments")}>
              Most Comments
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        
        {/* Changed to refresh and sort by newest */}
        <button onClick={refreshComments} className="text-sm text-pink-600 hover:underline">
          Show Newest Comments
        </button>
      </div>

      <Separator className="mb-4" />

      {/* Display sorted reviews */}
      {displayedReviews.map((review, index) => (
        <div className="mb-4" key={index}>
          <div className="flex items-start">
            <img src={review.avatar} alt="User" className="w-8 h-8 rounded-full mr-2" loading="eager" onError={handleImageError} />
            <div className="flex-1">
              <div className="flex justify-between">
                <h4 className="font-semibold text-sm">{review.name}</h4>
                <span className="text-xs text-gray-500">{review.time}</span>
              </div>
              <p className="text-sm mt-1">{review.text}</p>
              
              {/* Images if any */}
              {review.images.length > 0}
              
              <div className="flex items-center mt-1 text-xs text-gray-500">
                <ThumbsUp className="w-3 h-3 mr-1" /> {review.likes}
                <MessageCircle className="w-3 h-3 ml-3 mr-1" /> {review.comments}
              </div>
            </div>
          </div>
          
          {/* Shein Review Scheme Replies - only show for randomly selected reviews */}
          {reviewsWithReplies && reviewsWithReplies.includes(index) && (
            <div className="ml-10 mt-2 border-l-2 border-gray-200 pl-3">
              <div className="flex items-start">
                <div className="relative">
                  <Avatar className="w-6 h-6 mr-2">
                    <AvatarImage src={SHEIN_LOGO} alt="Shein Review Scheme" loading="eager" fetchPriority="high" />
                    <AvatarFallback>SRS</AvatarFallback>
                  </Avatar>
                  <div className="absolute -bottom-1 -right-1 bg-pink-500 rounded-full w-2 h-2 border border-white"></div>
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    <h5 className="text-xs font-semibold text-[#3b5998]">Shein Review Scheme</h5>
                    <span className="text-[10px] bg-pink-100 text-pink-800 px-1 rounded">Verified</span>
                  </div>
                  <p className="text-xs mt-0.5">
                    {getUniqueResponse(index, review.name.split(" ")[0])}
                  </p>
                  <div className="flex items-center mt-1 text-[10px] text-gray-500">
                    <span>Like</span>
                    <span className="mx-1.5">·</span>
                    <span>Reply</span>
                    <span className="mx-1.5">·</span>
                    <span>{getRandomTime(index)}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}

      {/* Show more link */}
      <div className="text-center mt-2">
        <button className="text-pink-600 text-sm font-semibold" onClick={() => setShowAllReviews(!showAllReviews)}>
          {showAllReviews ? 'Show less reviews' : 'Show more reviews'}
        </button>
      </div>
    </div>
  );
};

export default FacebookReviews;
