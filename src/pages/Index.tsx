
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import CourseCard from "@/components/CourseCard";
import { Search, PlayCircle, Users, Award, BookOpen } from "lucide-react";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // Mock data for featured courses
  const featuredCourses = [
    {
      id: "1",
      title: "Complete React Development Course",
      description: "Master React from basics to advanced concepts with hands-on projects",
      instructor: "John Smith",
      thumbnail: "/placeholder.svg",
      category: "Web Development",
      duration: "12 hours",
      studentsCount: 2340,
      rating: 4.8,
      reviewsCount: 156
    },
    {
      id: "2",
      title: "Python for Data Science",
      description: "Learn Python programming and data analysis with real-world projects",
      instructor: "Sarah Johnson",
      thumbnail: "/placeholder.svg",
      category: "Data Science",
      duration: "15 hours",
      studentsCount: 1890,
      rating: 4.7,
      reviewsCount: 203
    },
    {
      id: "3",
      title: "UI/UX Design Fundamentals",
      description: "Master the principles of user interface and user experience design",
      instructor: "Mike Chen",
      thumbnail: "/placeholder.svg",
      category: "Design",
      duration: "8 hours",
      studentsCount: 1245,
      rating: 4.9,
      reviewsCount: 89
    }
  ];

  const stats = [
    { icon: Users, label: "Students", value: "50,000+" },
    { icon: BookOpen, label: "Courses", value: "1,200+" },
    { icon: Award, label: "Instructors", value: "500+" },
    { icon: PlayCircle, label: "Hours", value: "10,000+" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Learn Without Limits
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Discover thousands of courses from expert instructors
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-8">
              <div className="flex gap-2">
                <Input
                  type="text"
                  placeholder="What do you want to learn?"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 h-12 text-gray-900"
                />
                <Button size="lg" className="bg-orange-500 hover:bg-orange-600">
                  <Search className="h-5 w-5" />
                </Button>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/signup">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                  Get Started
                </Button>
              </Link>
              <Link to="/courses">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                  Browse Courses
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <stat.icon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Featured Courses
            </h2>
            <p className="text-xl text-gray-600">
              Start learning with our most popular courses
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCourses.map((course) => (
              <CourseCard key={course.id} {...course} />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link to="/courses">
              <Button size="lg">View All Courses</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Learning?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of students already learning on LearnHub
          </p>
          <Link to="/signup">
            <Button size="lg" className="bg-orange-500 hover:bg-orange-600">
              Sign Up Now
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">LearnHub</h3>
              <p className="text-gray-300">
                Empowering learners worldwide with quality education.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-gray-300">
                <li><Link to="/courses" className="hover:text-white">Browse Courses</Link></li>
                <li><Link to="/signup" className="hover:text-white">Become a Student</Link></li>
                <li><Link to="/instructor-dashboard" className="hover:text-white">Teach on LearnHub</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-white">Help Center</a></li>
                <li><a href="#" className="hover:text-white">Contact Us</a></li>
                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-white">Twitter</a></li>
                <li><a href="#" className="hover:text-white">LinkedIn</a></li>
                <li><a href="#" className="hover:text-white">YouTube</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
            <p>&copy; 2024 LearnHub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
