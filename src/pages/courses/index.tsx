import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  ChevronDown, 
  X, 
  DollarSign, 
  Clock, 
  Star, 
  GraduationCap,
  Tag
} from 'lucide-react';
import { useList } from '@refinedev/core';

// Mock course data
const courseData = [
  {
    id: 1,
    title: "Introduction to Web Development",
    instructor: "Prof. Sarah Johnson",
    category: "Development",
    level: "Beginner",
    rating: 4.8,
    duration: "8 weeks",
    students: 2453,
    price: 49.99,
    image: "/api/placeholder/280/160",
    tags: ["HTML", "CSS", "JavaScript"]
  },
  {
    id: 2,
    title: "Advanced React Patterns",
    instructor: "David Chen",
    category: "Development",
    level: "Advanced",
    rating: 4.9,
    duration: "10 weeks",
    students: 1872,
    price: 79.99,
    image: "/api/placeholder/280/160",
    tags: ["React", "JavaScript", "Frontend"]
  },
  {
    id: 3,
    title: "Data Science Fundamentals",
    instructor: "Dr. Emily Rodriguez",
    category: "Data Science",
    level: "Intermediate",
    rating: 4.7,
    duration: "12 weeks",
    students: 3214,
    price: 69.99,
    image: "/api/placeholder/280/160",
    tags: ["Python", "Statistics", "ML"]
  },
  {
    id: 4,
    title: "UI/UX Design Principles",
    instructor: "Michael Torres",
    category: "Design",
    level: "Beginner",
    rating: 4.6,
    duration: "6 weeks",
    students: 1653,
    price: 59.99,
    image: "/api/placeholder/280/160",
    tags: ["Figma", "UX Research", "Design"]
  },
  {
    id: 5,
    title: "Machine Learning Applications",
    instructor: "Dr. Alan Turing",
    category: "Data Science",
    level: "Advanced",
    rating: 4.9,
    duration: "14 weeks",
    students: 1286,
    price: 89.99,
    image: "/api/placeholder/280/160",
    tags: ["Python", "TensorFlow", "ML"]
  },
  {
    id: 6,
    title: "Digital Marketing Strategies",
    instructor: "Jessica White",
    category: "Marketing",
    level: "Intermediate",
    rating: 4.5,
    duration: "8 weeks",
    students: 2187,
    price: 54.99,
    image: "/api/placeholder/280/160",
    tags: ["SEO", "Social Media", "Analytics"]
  }
];

// const categories = ["All Categories", "Development", "Data Science", "Design", "Marketing", "Business"];
const levels = ["All Levels", "Beginner", "Intermediate", "Advanced"];
const durations = ["Any Duration", "1-4 weeks", "5-8 weeks", "9-12 weeks", "12+ weeks"];
const ratings = ["Any Rating", "4.5 & above", "4.0 & above", "3.5 & above"];

const priceRanges = [
  { label: "Any Price", min: 0, max: Infinity },
  { label: "Under $50", min: 0, max: 50 },
  { label: "$50 - $100", min: 50, max: 100 },
  { label: "$100 - $200", min: 100, max: 200 },
  { label: "Over $200", min: 200, max: Infinity }
];

export const CoursesPage = () => {
  // const [courses, setCourses] = useState();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedLevel, setSelectedLevel] = useState("All Levels");
  const [selectedDuration, setSelectedDuration] = useState("Any Duration");
  const [selectedRating, setSelectedRating] = useState("Any Rating");
  const [selectedPriceRange, setSelectedPriceRange] = useState("Any Price");
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  
  const{data:categories,isFetched}= useList({
    resource:"categories"
  });
  
  const{data:courses} = useList({
    resource:"courses"
  })
  useEffect(() => {
    let filteredResults = courseData;
    
    // Apply search filter
    if (searchTerm) {
      filteredResults = filteredResults.filter(course => 
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        course.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    // Apply category filter
    if (selectedCategory !== "All Categories") {
      filteredResults = filteredResults.filter(course => 
        course.category === selectedCategory
      );
    }
    
    // Apply level filter
    if (selectedLevel !== "All Levels") {
      filteredResults = filteredResults.filter(course => 
        course.level === selectedLevel
      );
    }
    
    // Apply duration filter
    if (selectedDuration !== "Any Duration") {
      if (selectedDuration === "1-4 weeks") {
        filteredResults = filteredResults.filter(course => 
          parseInt(course.duration) <= 4
        );
      } else if (selectedDuration === "5-8 weeks") {
        filteredResults = filteredResults.filter(course => 
          parseInt(course.duration) >= 5 && parseInt(course.duration) <= 8
        );
      } else if (selectedDuration === "9-12 weeks") {
        filteredResults = filteredResults.filter(course => 
          parseInt(course.duration) >= 9 && parseInt(course.duration) <= 12
        );
      } else if (selectedDuration === "12+ weeks") {
        filteredResults = filteredResults.filter(course => 
          parseInt(course.duration) > 12
        );
      }
    }
    
    // Apply rating filter
    if (selectedRating !== "Any Rating") {
      const minRating = parseFloat(selectedRating.split(" ")[0]);
      filteredResults = filteredResults.filter(course => 
        course.rating >= minRating
      );
    }

    // Apply price range filter
    if (selectedPriceRange !== "Any Price") {
      const range = priceRanges.find(r => r.label === selectedPriceRange);
      if (range) {
        filteredResults = filteredResults.filter(course => 
          course.price >= range.min && course.price <= range.max
        );
      }
    }
    
    // setCourses(filteredResults);

    // Update active filters
    const newActiveFilters = [];
    if (selectedCategory !== "All Categories") newActiveFilters.push(selectedCategory);
    if (selectedLevel !== "All Levels") newActiveFilters.push(selectedLevel);
    if (selectedDuration !== "Any Duration") newActiveFilters.push(selectedDuration);
    if (selectedRating !== "Any Rating") newActiveFilters.push(selectedRating);
    if (selectedPriceRange !== "Any Price") newActiveFilters.push(selectedPriceRange);
    setActiveFilters(newActiveFilters);
  }, [searchTerm, selectedCategory, selectedLevel, selectedDuration, selectedRating, selectedPriceRange]);

  const FilterSection = ({ title, options, selected, setSelected, icon: Icon }: any) => (
    <div className="mb-6">
      <div className="flex items-center mb-3">
        <Icon className="w-5 h-5 text-gray-500 mr-2" />
        <h3 className="font-medium text-lg text-gray-800">{title}</h3>
      </div>
      <div className="space-y-2">
        {options ? options.map((option: any) => (
          <div 
            key={option.id} 
            className={`cursor-pointer p-2 rounded-md transition-colors ${
              selected === option.name 
                ? "bg-blue-100 text-blue-700 font-medium" 
                : "text-gray-700 hover:bg-gray-50"
            }`}
            onClick={() => setSelected(option.name)}
          >
            {option.name}
          </div>
        )) : null}
      </div>
    </div>
  );

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedCategory("All Categories");
    setSelectedLevel("All Levels");
    setSelectedDuration("Any Duration");
    setSelectedRating("Any Rating");
    setSelectedPriceRange("Any Price");
  };

  // Course card component
  const CourseCard = ({ course }:any) => (
    <Link to={"/course/1"}>
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* <img 
        src={course.image} 
        alt={course.title} 
        className="w-full h-40 object-cover"
      /> */}
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-md">
           {course.category.name}
          </span>
          <div className="flex items-center">
            <span className="ml-1 text-sm font-medium">course.rating</span>
          </div>
        </div>
        <h3 className="font-bold text-lg mb-1 line-clamp-2">{course.title}</h3>
        <p className="text-gray-600 text-sm mb-2">Professor name</p>
        <div className="flex items-center text-sm text-gray-500 mb-3">
          <span className="mr-3 block">course duration if times</span>
          <span>number of  students enrolled</span>
        </div>
        <div className="flex flex-wrap gap-1 mb-3">
            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
              tags
            </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-bold text-lg">${course.price}</span>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
            Enroll
          </button>
        </div>
      </div>
    </div>
    </Link>

  );

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-full px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row">
          <div className="lg:hidden mb-4">
            <button 
              className="w-full flex items-center justify-between p-3 border border-gray-300 rounded-md bg-white shadow-sm"
              onClick={() => setShowMobileFilters(!showMobileFilters)}
            >
              <div className="flex items-center">
                <Filter className="w-5 h-5 text-gray-500 mr-2" />
                <span>Filters</span>
              </div>
              <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${showMobileFilters ? 'transform rotate-180' : ''}`} />
            </button>
          </div>

          {activeFilters.length > 0 && (
            <div className="mb-4 flex flex-wrap gap-2">
              {activeFilters.map((filter) => (
                <div
                  key={filter}
                  className="h-[50px] flex items-center bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
                >
                  <span>{filter}</span>
                  <button
                    onClick={() => {
                      if (filter === selectedCategory) setSelectedCategory("All Categories");
                      if (filter === selectedLevel) setSelectedLevel("All Levels");
                      if (filter === selectedDuration) setSelectedDuration("Any Duration");
                      if (filter === selectedRating) setSelectedRating("Any Rating");
                      if (filter === selectedPriceRange) setSelectedPriceRange("Any Price");
                    }}
                    className="ml-2 hover:text-blue-900"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
              <button
                onClick={resetFilters}
                className="text-sm text-gray-600 hover:text-gray-900"
              >
                Clear all
              </button>
            </div>
          )}
 
          <div className={`lg:w-64 lg:pr-8 ${showMobileFilters ? 'block' : 'hidden'} lg:block`}>
            <div className="sticky top-4 bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-800">Filters</h2>
                <button
                  onClick={resetFilters}
                  className="text-sm text-gray-600 hover:text-gray-900"
                >
                  Reset all
                </button>
              </div>
              
              <div className="mb-6">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search courses..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
              </div>
              
              <div className="space-y-6">
                <FilterSection 
                  title="Category" 
                  options={categories?.data} 
                  selected={selectedCategory} 
                  setSelected={setSelectedCategory} 
                  icon={Tag}
                />
                {/* <FilterSection 
                  title="Level" 
                  options={levels} 
                  selected={selectedLevel} 
                  setSelected={setSelectedLevel} 
                  icon={GraduationCap}
                />
                <FilterSection 
                  title="Duration" 
                  options={durations} 
                  selected={selectedDuration} 
                  setSelected={setSelectedDuration} 
                  icon={Clock}
                />
                <FilterSection 
                  title="Rating" 
                  options={ratings} 
                  selected={selectedRating} 
                  setSelected={setSelectedRating} 
                  icon={Star}
                />
                <FilterSection 
                  title="Price Range" 
                  options={priceRanges.map(r => r.label)} 
                  selected={selectedPriceRange} 
                  setSelected={setSelectedPriceRange} 
                  icon={DollarSign}
                /> */}
              </div>
            </div>
          </div>
          
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <h2 className="text-2xl font-bold text-gray-800">Browse Courses</h2>
              <div className="flex items-center w-full sm:w-auto">
                <span className="text-gray-600 mr-2 whitespace-nowrap">Sort by:</span>
                <select className="w-full sm:w-auto border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Most Popular</option>
                  <option>Highest Rated</option>
                  <option>Newest</option>
                  <option>Price: High to Low</option>
                  <option>Price: Low to High</option>
                </select>
              </div>
            </div>
            
            <p className="text-gray-600 mb-6">Showing {courses?.data?.length} courses</p>
            
            {courses?.data ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {courses?.data?.map(course => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            ) : (
              <div className="bg-white p-8 rounded-lg shadow-sm text-center">
                <h3 className="text-xl font-medium text-gray-800 mb-2">No courses found</h3>
                <p className="text-gray-600">Try adjusting your filters or search terms</p>
              </div>
            )}
             
            <div className="mt-8 flex justify-center">
              <nav className="flex items-center space-x-1">
                <button className="px-3 py-2 rounded-md border border-gray-300 text-gray-500 hover:bg-gray-50">Previous</button>
                <button className="px-3 py-2 rounded-md bg-blue-600 text-white">1</button>
                <button className="px-3 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50">2</button>
                <button className="px-3 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50">3</button>
                <span className="px-3 py-2 text-gray-500">...</span>
                <button className="px-3 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50">8</button>
                <button className="px-3 py-2 rounded-md border border-gray-300 text-gray-500 hover:bg-gray-50">Next</button>
              </nav>
            </div>
          </div>
        </div>
      </main>
      
      <footer className="bg-gray-800 text-white py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <h3 className="ml-2 text-lg font-bold">EduLearn Academy</h3>
              </div>
              <p className="text-gray-400">Empowering learners worldwide with quality education and accessible courses.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">About Us</a></li>
                <li><a href="#" className="hover:text-white">Careers</a></li>
                <li><a href="#" className="hover:text-white">Blog</a></li>
                <li><a href="#" className="hover:text-white">Press</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Resources</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Help Center</a></li>
                <li><a href="#" className="hover:text-white">Contact Us</a></li>
                <li><a href="#" className="hover:text-white">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Subscribe</h3>
              <p className="text-gray-400 mb-4">Get the latest updates and offers</p>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="px-4 py-2 rounded-l-md flex-1 text-gray-800 focus:outline-none"
                />
                <button className="bg-blue-600 px-4 py-2 rounded-r-md hover:bg-blue-700 transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-700 text-center text-gray-400">
            <p>© 2025 EduLearn Academy. All rights reserved.</p>
          </div>
        </div>
      </footer>
    
    </div>
  );
}