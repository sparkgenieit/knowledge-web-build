
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Navbar from "@/components/Navbar";
import { Users, BookOpen, Star, TrendingUp, UserCheck, Shield } from "lucide-react";

const AdminDashboard = () => {
  // Mock user data
  const user = {
    name: "Admin User",
    role: "admin" as const,
    email: "admin@learnhub.com"
  };

  // Mock admin stats
  const stats = [
    { icon: Users, label: "Total Users", value: "12,450", color: "bg-blue-500", change: "+5.2%" },
    { icon: BookOpen, label: "Total Courses", value: "1,234", color: "bg-green-500", change: "+12.1%" },
    { icon: Star, label: "Total Reviews", value: "8,567", color: "bg-yellow-500", change: "+8.7%" },
    { icon: TrendingUp, label: "Revenue", value: "$245,890", color: "bg-purple-500", change: "+15.3%" }
  ];

  // Mock users data
  const recentUsers = [
    {
      id: "1",
      name: "Alice Johnson",
      email: "alice@example.com",
      role: "student",
      joinDate: "2024-01-15",
      coursesEnrolled: 3,
      status: "active"
    },
    {
      id: "2",
      name: "Bob Wilson",
      email: "bob@example.com",
      role: "instructor",
      joinDate: "2024-01-12",
      coursesCreated: 5,
      status: "active"
    },
    {
      id: "3",
      name: "Carol Davis",
      email: "carol@example.com",
      role: "student",
      joinDate: "2024-01-10",
      coursesEnrolled: 7,
      status: "active"
    },
    {
      id: "4",
      name: "David Brown",
      email: "david@example.com",
      role: "instructor",
      joinDate: "2024-01-08",
      coursesCreated: 2,
      status: "pending"
    }
  ];

  // Mock courses data
  const recentCourses = [
    {
      id: "1",
      title: "Complete React Development Course",
      instructor: "John Smith",
      category: "Web Development",
      students: 2340,
      rating: 4.8,
      reviews: 156,
      status: "published",
      createdDate: "2024-01-14"
    },
    {
      id: "2",
      title: "Python for Data Science",
      instructor: "Sarah Johnson",
      category: "Data Science",
      students: 1890,
      rating: 4.7,
      reviews: 203,
      status: "published",
      createdDate: "2024-01-12"
    },
    {
      id: "3",
      title: "UI/UX Design Fundamentals",
      instructor: "Mike Chen",
      category: "Design",
      students: 1245,
      rating: 4.9,
      reviews: 89,
      status: "published",
      createdDate: "2024-01-10"
    },
    {
      id: "4",
      title: "Advanced JavaScript",
      instructor: "Emily Davis",
      category: "Web Development",
      students: 0,
      rating: 0,
      reviews: 0,
      status: "draft",
      createdDate: "2024-01-15"
    }
  ];

  // Mock reviews data
  const recentReviews = [
    {
      id: "1",
      course: "Complete React Development Course",
      student: "Alice Johnson",
      instructor: "John Smith",
      rating: 5,
      comment: "Excellent course! The instructor explains everything clearly and the projects are very practical.",
      date: "2024-01-15"
    },
    {
      id: "2",
      course: "Python for Data Science",
      student: "Bob Wilson",
      instructor: "Sarah Johnson",
      rating: 4,
      comment: "Great content and well-structured. Helped me understand complex concepts.",
      date: "2024-01-14"
    },
    {
      id: "3",
      course: "UI/UX Design Fundamentals",
      student: "Carol Davis",
      instructor: "Mike Chen", 
      rating: 5,
      comment: "Best design course I've taken. The hands-on approach really works.",
      date: "2024-01-13"
    },
    {
      id: "4",
      course: "Complete React Development Course",
      student: "David Brown",
      instructor: "John Smith",
      rating: 3,
      comment: "Good course but could use more advanced examples.",
      date: "2024-01-12"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar user={user} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Admin Dashboard
          </h1>
          <p className="text-gray-600">Manage and monitor your platform</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className={`p-2 rounded-lg ${stat.color} text-white mr-4`}>
                      <stat.icon className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                      <p className="text-sm text-gray-600">{stat.label}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-medium text-green-600">{stat.change}</span>
                    <p className="text-xs text-gray-500">vs last month</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="users" className="space-y-6">
          <TabsList>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="courses">Courses</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>
          
          <TabsContent value="users" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Users</CardTitle>
                <CardDescription>Latest user registrations and activity</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentUsers.map((user) => (
                    <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <Avatar>
                          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-medium">{user.name}</h4>
                          <p className="text-sm text-gray-600">{user.email}</p>
                          <p className="text-xs text-gray-500">Joined {user.joinDate}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center space-x-2 mb-2">
                          <Badge variant={user.role === "instructor" ? "default" : "secondary"}>
                            {user.role}
                          </Badge>
                          <Badge variant={user.status === "active" ? "default" : "secondary"}>
                            {user.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600">
                          {user.role === "instructor" 
                            ? `${user.coursesCreated || 0} courses created`
                            : `${user.coursesEnrolled || 0} courses enrolled`
                          }
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="courses" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Course Management</CardTitle>
                <CardDescription>Overview of all courses on the platform</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentCourses.map((course) => (
                    <div key={course.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="font-semibold text-lg">{course.title}</h4>
                          <p className="text-sm text-gray-600">by {course.instructor}</p>
                          <p className="text-xs text-gray-500">Created {course.createdDate}</p>
                        </div>
                        <div className="flex space-x-2">
                          <Badge variant={course.status === "published" ? "default" : "secondary"}>
                            {course.status}
                          </Badge>
                          <Badge variant="outline">{course.category}</Badge>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-600">
                        <div>
                          <span className="font-medium">Students:</span> {course.students}
                        </div>
                        <div>
                          <span className="font-medium">Rating:</span> {course.rating > 0 ? `${course.rating} ⭐` : "No ratings"}
                        </div>
                        <div>
                          <span className="font-medium">Reviews:</span> {course.reviews}
                        </div>
                        <div>
                          <span className="font-medium">Category:</span> {course.category}
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
                <CardDescription>Latest course reviews from students</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {recentReviews.map((review) => (
                    <div key={review.id} className="border-b pb-4 last:border-b-0">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-medium">{review.course}</h4>
                          <p className="text-sm text-gray-600">
                            by {review.student} • Instructor: {review.instructor}
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center mb-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < review.rating ? "text-yellow-400 fill-current" : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          <p className="text-xs text-gray-500">{review.date}</p>
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
                  <CardTitle>User Growth</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-gray-500">
                    User growth chart would go here
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Course Statistics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-gray-500">
                    Course statistics chart would go here
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Revenue Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-gray-500">
                    Revenue trends chart would go here
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Platform Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-gray-500">
                    Activity metrics would go here
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

export default AdminDashboard;
