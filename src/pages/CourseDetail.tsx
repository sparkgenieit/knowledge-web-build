
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Navbar from "@/components/Navbar";
import { Star, Clock, Users, PlayCircle, Download, Heart, Share } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const CourseDetail = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const [isEnrolled, setIsEnrolled] = useState(false);

  // Mock course data
  const course = {
    id: "1",
    title: "Complete React Development Course",
    description: "Master React from basics to advanced concepts with hands-on projects and real-world applications. This comprehensive course covers everything you need to know to become a professional React developer.",
    instructor: {
      name: "John Smith",
      bio: "Senior Frontend Developer with 8+ years of experience at top tech companies",
      avatar: "/placeholder.svg",
      courses: 12,
      students: 45000,
      rating: 4.8
    },
    thumbnail: "/placeholder.svg",
    promoVideo: "/placeholder.svg",
    category: "Web Development",
    duration: "12 hours",
    studentsCount: 2340,
    rating: 4.8,
    reviewsCount: 156,
    lastUpdated: "November 2024",
    language: "English",
    level: "Beginner to Advanced",
    requirements: [
      "Basic understanding of HTML and CSS",
      "JavaScript fundamentals",
      "A computer with internet connection"
    ],
    whatYouWillLearn: [
      "Build modern React applications from scratch",
      "Master React Hooks and Context API",
      "Implement state management with Redux",
      "Create responsive and interactive UIs",
      "Deploy applications to production",
      "Write clean and maintainable code"
    ]
  };

  // Mock lessons data
  const lessons = [
    {
      id: "1",
      title: "Introduction to React",
      duration: "15:30",
      type: "video",
      isCompleted: true,
      isPreview: true
    },
    {
      id: "2", 
      title: "Setting up Development Environment",
      duration: "22:15",
      type: "video",
      isCompleted: true,
      isPreview: false
    },
    {
      id: "3",
      title: "Your First React Component",
      duration: "28:45",
      type: "video",
      isCompleted: false,
      isPreview: false
    },
    {
      id: "4",
      title: "Understanding JSX",
      duration: "18:20",
      type: "video", 
      isCompleted: false,
      isPreview: false
    },
    {
      id: "5",
      title: "Props and State Management",
      duration: "35:10",
      type: "video",
      isCompleted: false,
      isPreview: false
    }
  ];

  // Mock reviews data
  const reviews = [
    {
      id: "1",
      user: "Alice Johnson",
      rating: 5,
      comment: "Excellent course! The instructor explains everything clearly and the projects are very practical.",
      date: "2 weeks ago"
    },
    {
      id: "2", 
      user: "Bob Wilson",
      rating: 4,
      comment: "Great content and well-structured. Helped me land my first React job!",
      date: "1 month ago"
    },
    {
      id: "3",
      user: "Carol Davis",
      rating: 5,
      comment: "Best React course I've taken. The hands-on approach really works.",
      date: "2 months ago"
    }
  ];

  const handleEnroll = () => {
    setIsEnrolled(true);
    toast({
      title: "Successfully enrolled!",
      description: "You can now access all course materials.",
    });
  };

  const completedLessons = lessons.filter(lesson => lesson.isCompleted).length;
  const progressPercentage = (completedLessons / lessons.length) * 100;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Course Header */}
            <div className="mb-8">
              <Badge className="mb-4">{course.category}</Badge>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{course.title}</h1>
              <p className="text-xl text-gray-600 mb-6">{course.description}</p>
              
              <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 mb-6">
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                  <span className="font-medium">{course.rating}</span>
                  <span className="ml-1">({course.reviewsCount} reviews)</span>
                </div>
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-1" />
                  {course.studentsCount} students
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  {course.duration}
                </div>
                <span>Last updated {course.lastUpdated}</span>
              </div>

              {/* Instructor Info */}
              <div className="flex items-center space-x-4 p-4 bg-white rounded-lg border">
                <Avatar className="h-12 w-12">
                  <AvatarFallback>{course.instructor.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold">{course.instructor.name}</h3>
                  <p className="text-sm text-gray-600">{course.instructor.bio}</p>
                  <div className="flex items-center space-x-4 mt-1 text-xs text-gray-500">
                    <span>{course.instructor.courses} courses</span>
                    <span>{course.instructor.students.toLocaleString()} students</span>
                    <div className="flex items-center">
                      <Star className="h-3 w-3 text-yellow-400 fill-current mr-1" />
                      {course.instructor.rating}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Course Content Tabs */}
            <Tabs defaultValue="curriculum" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
                <TabsTrigger value="about">About</TabsTrigger>
              </TabsList>
              
              <TabsContent value="curriculum" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Course Content</CardTitle>
                    {isEnrolled && (
                      <div className="flex items-center space-x-2">
                        <Progress value={progressPercentage} className="flex-1" />
                        <span className="text-sm text-gray-600">
                          {completedLessons}/{lessons.length} lessons completed
                        </span>
                      </div>
                    )}
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {lessons.map((lesson, index) => (
                        <div key={lesson.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                          <div className="flex items-center space-x-3">
                            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 text-sm font-medium">
                              {index + 1}
                            </div>
                            <div>
                              <h4 className="font-medium">{lesson.title}</h4>
                              <div className="flex items-center space-x-2 text-sm text-gray-500">
                                <PlayCircle className="h-4 w-4" />
                                <span>{lesson.duration}</span>
                                {lesson.isPreview && <Badge variant="outline" className="text-xs">Preview</Badge>}
                              </div>
                            </div>
                          </div>
                          
                          {isEnrolled || lesson.isPreview ? (
                            <Link to={`/course/${course.id}/lesson/${lesson.id}`}>
                              <Button size="sm" variant="outline">
                                {lesson.isCompleted ? "Review" : "Watch"}
                              </Button>
                            </Link>
                          ) : (
                            <Button size="sm" variant="outline" disabled>
                              Locked
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="reviews" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Student Reviews</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {reviews.map((review) => (
                        <div key={review.id} className="border-b pb-4 last:border-b-0">
                          <div className="flex items-start space-x-4">
                            <Avatar>
                              <AvatarFallback>{review.user.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-2">
                                <h4 className="font-medium">{review.user}</h4>
                                <div className="flex">
                                  {[...Array(5)].map((_, i) => (
                                    <Star
                                      key={i}
                                      className={`h-4 w-4 ${
                                        i < review.rating ? "text-yellow-400 fill-current" : "text-gray-300"
                                      }`}
                                    />
                                  ))}
                                </div>
                                <span className="text-sm text-gray-500">{review.date}</span>
                              </div>
                              <p className="text-gray-700">{review.comment}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="about" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>What you'll learn</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {course.whatYouWillLearn.map((item, index) => (
                        <div key={index} className="flex items-start space-x-2">
                          <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-sm">{item}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Requirements</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {course.requirements.map((req, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-sm">{req}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardContent className="p-6">
                {/* Preview Video */}
                <div className="relative mb-6">
                  <img
                    src={course.promoVideo}
                    alt="Course preview"
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Button size="lg" className="rounded-full w-16 h-16">
                      <PlayCircle className="h-8 w-8" />
                    </Button>
                  </div>
                </div>

                {/* Enrollment */}
                <div className="space-y-4 mb-6">
                  {isEnrolled ? (
                    <div className="space-y-3">
                      <Badge className="w-full justify-center py-2" variant="default">
                        ✓ Enrolled
                      </Badge>
                      <Link to={`/course/${course.id}/lesson/${lessons[0].id}`}>
                        <Button className="w-full" size="lg">
                          Continue Learning
                        </Button>
                      </Link>
                    </div>
                  ) : (
                    <Button className="w-full" size="lg" onClick={handleEnroll}>
                      Enroll Now
                    </Button>
                  )}
                  
                  <div className="flex space-x-2">
                    <Button variant="outline" className="flex-1">
                      <Heart className="h-4 w-4 mr-2" />
                      Wishlist
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <Share className="h-4 w-4 mr-2" />
                      Share
                    </Button>
                  </div>
                </div>

                {/* Course Info */}
                <div className="space-y-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Skill level:</span>
                    <span className="font-medium">{course.level}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Language:</span>
                    <span className="font-medium">{course.language}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Duration:</span>
                    <span className="font-medium">{course.duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Lessons:</span>
                    <span className="font-medium">{lessons.length}</span>
                  </div>
                </div>

                {/* Certificate */}
                <div className="mt-6 p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Download className="h-4 w-4 text-blue-600" />
                    <span className="text-sm text-blue-600 font-medium">
                      Certificate of completion
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
