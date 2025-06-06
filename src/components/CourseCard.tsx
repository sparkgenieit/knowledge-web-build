
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Clock, Users } from "lucide-react";
import { Link } from "react-router-dom";

interface CourseCardProps {
  id: string;
  title: string;
  description: string;
  instructor: string;
  thumbnail: string;
  category: string;
  duration: string;
  studentsCount: number;
  rating: number;
  reviewsCount: number;
  price?: number;
  isEnrolled?: boolean;
}

const CourseCard = ({
  id,
  title,
  description,
  instructor,
  thumbnail,
  category,
  duration,
  studentsCount,
  rating,
  reviewsCount,
  isEnrolled = false
}: CourseCardProps) => {
  return (
    <Link to={`/course/${id}`}>
      <Card className="h-full hover:shadow-lg transition-shadow duration-300 cursor-pointer group">
        <div className="relative">
          <img
            src={thumbnail}
            alt={title}
            className="w-full h-48 object-cover rounded-t-lg group-hover:scale-105 transition-transform duration-300"
          />
          {isEnrolled && (
            <Badge className="absolute top-2 right-2 bg-green-500">
              Enrolled
            </Badge>
          )}
          <Badge variant="secondary" className="absolute top-2 left-2">
            {category}
          </Badge>
        </div>
        
        <CardContent className="p-4">
          <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
            {title}
          </h3>
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {description}
          </p>
          <p className="text-sm text-gray-500 mb-3">
            By {instructor}
          </p>
          
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              {duration}
            </div>
            <div className="flex items-center">
              <Users className="h-4 w-4 mr-1" />
              {studentsCount}
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="p-4 pt-0">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center">
              <Star className="h-4 w-4 text-yellow-400 fill-current" />
              <span className="text-sm font-medium ml-1">{rating}</span>
              <span className="text-sm text-gray-500 ml-1">({reviewsCount})</span>
            </div>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default CourseCard;
