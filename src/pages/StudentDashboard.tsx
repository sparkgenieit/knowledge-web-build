
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import CourseCard from "@/components/CourseCard";
import { BookOpen, Clock, Trophy, PlayCircle } from "lucide-react";
import { Link } from "react-router-dom";

const StudentDashboard = () => {
  // Mock user data
  const user = {
    name: "John Doe",
    role: "student" as const,
    email: "john@example.com"
  };

  // Mock enrolled courses data
  const enrolledCourses = [
    {
      id: "1",
      title: "Complete React Development Course",
      description: "Master React from basics to advanced concepts",
      instructor: "John Smith",
      thumbnail: "/placeholder.svg",
      category: "Web Development",
      duration: "12 hours",
      studentsCount: 2340,
      rating: 4.8,
      reviewsCount: 156,
      progress: 65,
      isEnrolled: true
    },
    {
      id: "2",
      title: "Python for Data Science",
      description: "Learn Python programming and data analysis",
      instructor: "Sarah Johnson",
      thumbnail: "/placeholder.svg",
      category: "Data Science",
      duration: "15 hours",
      studentsCount: 1890,
      rating: 4.7,
      reviewsCount: 203,
      progress: 30,
      isEnrolled: true
    }
  ];

  const stats = [
    { icon: BookOpen, label: "Courses Enrolled", value: "3", color: "bg-blue-500" },
    { icon: Clock, label: "Hours Learned", value: "47", color: "bg-green-500" },
    { icon: Trophy, label: "Certificates", value: "2", color: "bg-yellow-500" },
    { icon: PlayCircle, label: "Lessons Completed", value: "124", color: "bg-purple-500" }
  ];

  const recentActivity = [
    { course: "React Development", lesson: "React Hooks Deep Dive", time: "2 hours ago" },
    { course: "Python for Data Science", lesson: "Pandas DataFrames", time: "1 day ago" },
    { course: "UI/UX Design", lesson: "Color Theory", time: "3 days ago" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar user={user} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user.name}! 👋
          </h1>
          <p className="text-gray-600">Continue your learning journey</p>
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Continue Learning */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Continue Learning</CardTitle>
                <CardDescription>Pick up where you left off</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {enrolledCourses.map((course) => (
                    <div key={course.id} className="border rounded-lg p-4">
                      <div className="flex items-start space-x-4">
                        <img
                          src={course.thumbnail}
                          alt={course.title}
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg mb-1">{course.title}</h3>
                          <p className="text-sm text-gray-600 mb-2">by {course.instructor}</p>
                          <div className="flex items-center space-x-4 mb-3">
                            <Badge variant="secondary">{course.category}</Badge>
                            <span className="text-sm text-gray-500">{course.progress}% complete</span>
                          </div>
                          <Progress value={course.progress} className="mb-3" />
                          <Link to={`/course/${course.id}`}>
                            <Button size="sm">Continue Course</Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <div>
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                      <div className="flex-1">
                        <p className="font-medium text-sm">{activity.lesson}</p>
                        <p className="text-xs text-gray-600">{activity.course}</p>
                        <p className="text-xs text-gray-500">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link to="/courses">
                  <Button variant="outline" className="w-full justify-start">
                    <BookOpen className="mr-2 h-4 w-4" />
                    Browse Courses
                  </Button>
                </Link>
                <Button variant="outline" className="w-full justify-start">
                  <Trophy className="mr-2 h-4 w-4" />
                  View Certificates
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Clock className="mr-2 h-4 w-4" />
                  Learning History
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
