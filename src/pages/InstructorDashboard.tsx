
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Navbar from "@/components/Navbar";
import { Plus, BookOpen, Users, Star, TrendingUp, Video, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const InstructorDashboard = () => {
  const [isCreatingCourse, setIsCreatingCourse] = useState(false);
  const { toast } = useToast();

  // Mock user data
  const user = {
    name: "John Smith",
    role: "instructor" as const,
    email: "john.smith@example.com"
  };

  // Mock instructor stats
  const stats = [
    { icon: BookOpen, label: "Total Courses", value: "12", color: "bg-blue-500" },
    { icon: Users, label: "Total Students", value: "4,230", color: "bg-green-500" },
    { icon: Star, label: "Average Rating", value: "4.8", color: "bg-yellow-500" },
    { icon: TrendingUp, label: "This Month", value: "+245", color: "bg-purple-500" }
  ];

  // Mock courses data
  const myCourses = [
    {
      id: "1",
      title: "Complete React Development Course",
      students: 2340,
      rating: 4.8,
      reviews: 156,
      revenue: "$12,450",
      status: "Published",
      lessons: 24
    },
    {
      id: "2",
      title: "Advanced JavaScript Concepts",
      students: 1890,
      rating: 4.7,
      reviews: 203,
      revenue: "$9,870",
      status: "Published", 
      lessons: 18
    },
    {
      id: "3",
      title: "Node.js Backend Development",
      students: 456,
      rating: 4.9,
      reviews: 67,
      revenue: "$2,340",
      status: "Draft",
      lessons: 12
    }
  ];

  // Mock recent reviews
  const recentReviews = [
    {
      id: "1",
      course: "React Development Course",
      student: "Alice Johnson",
      rating: 5,
      comment: "Excellent course! The instructor explains everything clearly.",
      date: "2 hours ago"
    },
    {
      id: "2",
      course: "Advanced JavaScript",
      student: "Bob Wilson",
      rating: 4,
      comment: "Great content, helped me understand complex concepts.",
      date: "1 day ago"
    },
    {
      id: "3",
      course: "React Development Course",
      student: "Carol Davis",
      rating: 5,
      comment: "Best React course I've taken. Highly recommended!",
      date: "3 days ago"
    }
  ];

  const [courseForm, setCourseForm] = useState({
    title: "",
    description: "",
    category: "",
    level: "",
    duration: "",
    thumbnail: null as File | null,
    promoVideo: null as File | null
  });

  const handleCreateCourse = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Creating course:", courseForm);
    toast({
      title: "Course created!",
      description: "Your new course has been created successfully.",
    });
    setIsCreatingCourse(false);
    setCourseForm({
      title: "",
      description: "",
      category: "",
      level: "",
      duration: "",
      thumbnail: null,
      promoVideo: null
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar user={user} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Instructor Dashboard
            </h1>
            <p className="text-gray-600">Manage your courses and track your performance</p>
          </div>
          <Button onClick={() => setIsCreatingCourse(true)} className="mt-4 sm:mt-0">
            <Plus className="h-4 w-4 mr-2" />
            Create New Course
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className={`p-2 rounded-lg ${stat.color} text-white mr-4`}>
                    <stat.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <p className="text-sm text-gray-600">{stat.label}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="courses" className="space-y-6">
          <TabsList>
            <TabsTrigger value="courses">My Courses</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>
          
          <TabsContent value="courses" className="space-y-6">
            {/* Create Course Form */}
            {isCreatingCourse && (
              <Card>
                <CardHeader>
                  <CardTitle>Create New Course</CardTitle>
                  <CardDescription>Fill in the details to create your new course</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleCreateCourse} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="title">Course Title</Label>
                        <Input
                          id="title"
                          value={courseForm.title}
                          onChange={(e) => setCourseForm({...courseForm, title: e.target.value})}
                          placeholder="Enter course title"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="category">Category</Label>
                        <Select value={courseForm.category} onValueChange={(value) => setCourseForm({...courseForm, category: value})}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="web-development">Web Development</SelectItem>
                            <SelectItem value="data-science">Data Science</SelectItem>
                            <SelectItem value="design">Design</SelectItem>
                            <SelectItem value="business">Business</SelectItem>
                            <SelectItem value="photography">Photography</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        value={courseForm.description}
                        onChange={(e) => setCourseForm({...courseForm, description: e.target.value})}
                        placeholder="Describe your course"
                        rows={3}
                        required
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="level">Level</Label>
                        <Select value={courseForm.level} onValueChange={(value) => setCourseForm({...courseForm, level: value})}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select level" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="beginner">Beginner</SelectItem>
                            <SelectItem value="intermediate">Intermediate</SelectItem>
                            <SelectItem value="advanced">Advanced</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="duration">Duration</Label>
                        <Input
                          id="duration"
                          value={courseForm.duration}
                          onChange={(e) => setCourseForm({...courseForm, duration: e.target.value})}
                          placeholder="e.g., 12 hours"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="thumbnail">Course Thumbnail</Label>
                        <Input
                          id="thumbnail"
                          type="file"
                          accept="image/*"
                          onChange={(e) => setCourseForm({...courseForm, thumbnail: e.target.files?.[0] || null})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="promo-video">Promo Video</Label>
                        <Input
                          id="promo-video"
                          type="file"
                          accept="video/*"
                          onChange={(e) => setCourseForm({...courseForm, promoVideo: e.target.files?.[0] || null})}
                        />
                      </div>
                    </div>
                    
                    <div className="flex space-x-4">
                      <Button type="submit">Create Course</Button>
                      <Button type="button" variant="outline" onClick={() => setIsCreatingCourse(false)}>
                        Cancel
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            )}

            {/* Courses List */}
            <Card>
              <CardHeader>
                <CardTitle>Your Courses</CardTitle>
                <CardDescription>Manage and track your course performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {myCourses.map((course) => (
                    <div key={course.id} className="border rounded-lg p-4">
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                        <div className="flex-1 mb-4 sm:mb-0">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="font-semibold text-lg">{course.title}</h3>
                            <Badge variant={course.status === "Published" ? "default" : "secondary"}>
                              {course.status}
                            </Badge>
                          </div>
                          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-600">
                            <div>
                              <span className="font-medium">Students:</span> {course.students}
                            </div>
                            <div>
                              <span className="font-medium">Rating:</span> {course.rating} ⭐ ({course.reviews})
                            </div>
                            <div>
                              <span className="font-medium">Revenue:</span> {course.revenue}
                            </div>
                            <div>
                              <span className="font-medium">Lessons:</span> {course.lessons}
                            </div>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <Video className="h-4 w-4 mr-2" />
                            Add Lesson
                          </Button>
                          <Button variant="outline" size="sm">
                            Edit
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="reviews" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Reviews</CardTitle>
                <CardDescription>See what students are saying about your courses</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {recentReviews.map((review) => (
                    <div key={review.id} className="border-b pb-4 last:border-b-0">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-medium">{review.course}</h4>
                          <p className="text-sm text-gray-600">by {review.student}</p>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < review.rating ? "text-yellow-400 fill-current" : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          <p className="text-xs text-gray-500 mt-1">{review.date}</p>
                        </div>
                      </div>
                      <p className="text-gray-700">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Enrollment Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-gray-500">
                    Chart visualization would go here
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Revenue Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-gray-500">
                    Revenue chart would go here
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default InstructorDashboard;
