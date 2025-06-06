
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import Navbar from "@/components/Navbar";
import { ChevronLeft, ChevronRight, CheckCircle, Clock, FileText, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const LessonView = () => {
  const { courseId, lessonId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isCompleted, setIsCompleted] = useState(false);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

  // Mock lesson data
  const lesson = {
    id: "1",
    title: "Introduction to React",
    duration: "15:30",
    videoUrl: "/placeholder.svg",
    description: `
      In this lesson, we'll introduce you to React, a popular JavaScript library for building user interfaces. 
      You'll learn about what React is, why it's useful, and how it fits into the modern web development ecosystem.
      
      By the end of this lesson, you'll understand:
      - What React is and its core concepts
      - The benefits of using React
      - How React compares to other frameworks
      - Setting up your first React project
    `,
    notes: [
      "React is a JavaScript library for building user interfaces",
      "It was created by Facebook and is now maintained by Facebook and the community",
      "React uses a component-based architecture",
      "Virtual DOM makes React fast and efficient"
    ],
    resources: [
      { name: "React Official Documentation", url: "https://reactjs.org" },
      { name: "Lesson Slides", url: "#" },
      { name: "Practice Exercise", url: "#" }
    ]
  };

  // Mock course data
  const course = {
    id: "1",
    title: "Complete React Development Course",
    lessons: [
      { id: "1", title: "Introduction to React", isCompleted: false },
      { id: "2", title: "Setting up Development Environment", isCompleted: false },
      { id: "3", title: "Your First React Component", isCompleted: false },
      { id: "4", title: "Understanding JSX", isCompleted: false },
      { id: "5", title: "Props and State Management", isCompleted: false }
    ]
  };

  const currentLessonIndex = course.lessons.findIndex(l => l.id === lessonId);
  const completedLessons = course.lessons.filter(l => l.isCompleted).length;
  const progressPercentage = (completedLessons / course.lessons.length) * 100;

  const handleMarkComplete = () => {
    setIsCompleted(true);
    toast({
      title: "Lesson completed!",
      description: "Great job! You've completed this lesson.",
    });
  };

  const handlePrevious = () => {
    if (currentLessonIndex > 0) {
      const prevLesson = course.lessons[currentLessonIndex - 1];
      navigate(`/course/${courseId}/lesson/${prevLesson.id}`);
    }
  };

  const handleNext = () => {
    if (currentLessonIndex < course.lessons.length - 1) {
      const nextLesson = course.lessons[currentLessonIndex + 1];
      navigate(`/course/${courseId}/lesson/${nextLesson.id}`);
    }
  };

  const handleSubmitReview = () => {
    if (rating === 0) {
      toast({
        title: "Please select a rating",
        description: "Choose a star rating before submitting your review.",
        variant: "destructive"
      });
      return;
    }

    console.log("Submitting review:", { rating, review });
    toast({
      title: "Review submitted!",
      description: "Thank you for your feedback.",
    });
    setRating(0);
    setReview("");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              onClick={() => navigate(`/course/${courseId}`)}
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Back to Course
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{lesson.title}</h1>
              <p className="text-gray-600">{course.title}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Clock className="h-4 w-4 text-gray-500" />
            <span className="text-sm text-gray-600">{lesson.duration}</span>
          </div>
        </div>

        {/* Progress Bar */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Course Progress</span>
              <span className="text-sm text-gray-600">
                {completedLessons}/{course.lessons.length} lessons completed
              </span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Video Player */}
            <Card className="mb-6">
              <CardContent className="p-0">
                <div className="relative bg-black rounded-t-lg">
                  <div className="aspect-video flex items-center justify-center">
                    <img
                      src={lesson.videoUrl}
                      alt={lesson.title}
                      className="w-full h-full object-cover rounded-t-lg"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Button size="lg" className="rounded-full w-16 h-16">
                        <span className="text-2xl">▶</span>
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold">{lesson.title}</h2>
                    {!isCompleted ? (
                      <Button onClick={handleMarkComplete}>
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Mark as Complete
                      </Button>
                    ) : (
                      <Badge className="bg-green-500">
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Completed
                      </Badge>
                    )}
                  </div>
                  
                  {/* Navigation */}
                  <div className="flex justify-between">
                    <Button
                      variant="outline"
                      onClick={handlePrevious}
                      disabled={currentLessonIndex === 0}
                    >
                      <ChevronLeft className="h-4 w-4 mr-2" />
                      Previous Lesson
                    </Button>
                    <Button
                      onClick={handleNext}
                      disabled={currentLessonIndex === course.lessons.length - 1}
                    >
                      Next Lesson
                      <ChevronRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Lesson Content Tabs */}
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="notes">Notes</TabsTrigger>
                <TabsTrigger value="resources">Resources</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Lesson Description</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="prose max-w-none">
                      {lesson.description.split('\n').map((paragraph, index) => (
                        <p key={index} className="mb-4 text-gray-700">
                          {paragraph.trim()}
                        </p>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="notes" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Key Points</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {lesson.notes.map((note, index) => (
                        <li key={index} className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-gray-700">{note}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="resources" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Additional Resources</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {lesson.resources.map((resource, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center space-x-3">
                            <FileText className="h-5 w-5 text-blue-600" />
                            <span className="font-medium">{resource.name}</span>
                          </div>
                          <Button variant="outline" size="sm">
                            Download
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Course Playlist */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Course Lessons</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {course.lessons.map((courseLesson, index) => (
                    <div
                      key={courseLesson.id}
                      className={`p-3 rounded-lg cursor-pointer transition-colors ${
                        courseLesson.id === lessonId
                          ? "bg-blue-100 border border-blue-300"
                          : "bg-gray-50 hover:bg-gray-100"
                      }`}
                      onClick={() => navigate(`/course/${courseId}/lesson/${courseLesson.id}`)}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`flex items-center justify-center w-6 h-6 rounded-full text-xs font-medium ${
                          courseLesson.isCompleted
                            ? "bg-green-500 text-white"
                            : courseLesson.id === lessonId
                            ? "bg-blue-600 text-white"
                            : "bg-gray-300 text-gray-600"
                        }`}>
                          {courseLesson.isCompleted ? "✓" : index + 1}
                        </div>
                        <span className={`text-sm ${
                          courseLesson.id === lessonId ? "font-medium text-blue-900" : "text-gray-700"
                        }`}>
                          {courseLesson.title}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Rate this Course */}
            <Card>
              <CardHeader>
                <CardTitle>Rate this Course</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-2">Your rating:</p>
                    <div className="flex space-x-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          onClick={() => setRating(star)}
                          className={`text-2xl ${
                            star <= rating ? "text-yellow-400" : "text-gray-300"
                          } hover:text-yellow-400 transition-colors`}
                        >
                          ★
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-600 mb-2">Your review:</p>
                    <Textarea
                      value={review}
                      onChange={(e) => setReview(e.target.value)}
                      placeholder="Share your thoughts about this course..."
                      rows={3}
                    />
                  </div>
                  
                  <Button onClick={handleSubmitReview} className="w-full">
                    Submit Review
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonView;
