
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Navbar from "@/components/Navbar";
import CourseCard from "@/components/CourseCard";
import { Search, Filter } from "lucide-react";

const Courses = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("popular");

  // Mock categories
  const categories = [
    { value: "all", label: "All Categories" },
    { value: "web-development", label: "Web Development" },
    { value: "data-science", label: "Data Science" },
    { value: "design", label: "Design" },
    { value: "business", label: "Business" },
    { value: "photography", label: "Photography" },
    { value: "music", label: "Music" }
  ];

  // Mock courses data
  const allCourses = [
    {
      id: "1",
      title: "Complete React Development Course",
      description: "Master React from basics to advanced concepts with hands-on projects and real-world applications",
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
      description: "Learn Python programming and data analysis with pandas, numpy, and machine learning basics",
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
      description: "Master the principles of user interface and user experience design from scratch",
      instructor: "Mike Chen",
      thumbnail: "/placeholder.svg",
      category: "Design",
      duration: "8 hours",
      studentsCount: 1245,
      rating: 4.9,
      reviewsCount: 89
    },
    {
      id: "4",
      title: "JavaScript Mastery",
      description: "Complete JavaScript course covering ES6+, async programming, and modern frameworks",
      instructor: "Emily Davis",
      thumbnail: "/placeholder.svg",
      category: "Web Development",
      duration: "20 hours",
      studentsCount: 3120,
      rating: 4.6,
      reviewsCount: 280
    },
    {
      id: "5",
      title: "Machine Learning with Python",
      description: "Comprehensive guide to machine learning algorithms and implementation in Python",
      instructor: "Dr. Robert Wilson",
      thumbnail: "/placeholder.svg",
      category: "Data Science",
      duration: "25 hours",
      studentsCount: 987,
      rating: 4.8,
      reviewsCount: 145
    },
    {
      id: "6",
      title: "Digital Marketing Strategy",
      description: "Learn modern digital marketing techniques including SEO, social media, and analytics",
      instructor: "Lisa Thompson",
      thumbnail: "/placeholder.svg",
      category: "Business",
      duration: "10 hours",
      studentsCount: 1560,
      rating: 4.5,
      reviewsCount: 200
    }
  ];

  // Filter courses based on search and category
  const filteredCourses = allCourses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === "all" || 
                           course.category.toLowerCase().replace(/\s+/g, '-') === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  // Sort courses
  const sortedCourses = [...filteredCourses].sort((a, b) => {
    switch (sortBy) {
      case "rating":
        return b.rating - a.rating;
      case "students":
        return b.studentsCount - a.studentsCount;
      case "newest":
        return b.id.localeCompare(a.id);
      case "popular":
      default:
        return b.studentsCount - a.studentsCount;
    }
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Browse Courses</h1>
          <p className="text-gray-600">Discover your next learning adventure</p>
        </div>

        {/* Search and Filters */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    type="text"
                    placeholder="Search courses, instructors, or topics..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              {/* Category Filter */}
              <div className="lg:w-64">
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.value} value={category.value}>
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              {/* Sort */}
              <div className="lg:w-48">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="popular">Most Popular</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                    <SelectItem value="newest">Newest</SelectItem>
                    <SelectItem value="students">Most Students</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results Summary */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-600">
            Showing {sortedCourses.length} courses
            {selectedCategory !== "all" && (
              <span> in {categories.find(c => c.value === selectedCategory)?.label}</span>
            )}
          </p>
          
          {/* Active Filters */}
          <div className="flex gap-2">
            {searchQuery && (
              <Badge variant="secondary" className="flex items-center gap-1">
                Search: "{searchQuery}"
                <button onClick={() => setSearchQuery("")} className="ml-1 text-xs">×</button>
              </Badge>
            )}
            {selectedCategory !== "all" && (
              <Badge variant="secondary" className="flex items-center gap-1">
                {categories.find(c => c.value === selectedCategory)?.label}
                <button onClick={() => setSelectedCategory("all")} className="ml-1 text-xs">×</button>
              </Badge>
            )}
          </div>
        </div>

        {/* Courses Grid */}
        {sortedCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedCourses.map((course) => (
              <CourseCard key={course.id} {...course} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No courses found</h3>
              <p className="text-gray-600 mb-4">
                Try adjusting your search or filters to find what you're looking for.
              </p>
              <Button onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
              }}>
                Clear Filters
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Courses;
