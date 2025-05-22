import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  ChevronDown, 
  X, 
  DollarSign, 
  Clock, 
  Star, 
  GraduationCap,
} from 'lucide-react';
import { useCreate, useGetIdentity, useList, useTranslation } from '@refinedev/core';
import { Button, message, Card, Row, Col, Typography, Input, Tag, Select, InputNumber, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

export const CoursesPage = () => {
  const [selectedCategory, setSelectedCategory] = useState();
  const[minPrice,setMinPrice] = useState("");
  const[maxPrice,setMaxPrice] = useState("");

  const navigate=useNavigate();
  const{data:categories}= useList({
    resource:"categories"
  });
  
  const{data:courses,isLoading} = useList({
    resource:"courses",
    // pagination: {
    //   mode: "off",
    // },
    filters: [
      {
        field: "categoryId",
        operator: "eq",
        value: selectedCategory,
      },
      // {
      //   field: "price",
      //   operator: "gte",
      //   value: minPrice,
      // },
      // {
      //   field: "price",
      //   operator: "lte",
      //   value: maxPrice,
      // },  
    ],
  })

  const { translate: t } = useTranslation();

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

const handleGetMin=async(value:any)=>{
  console.log(value);
  setMinPrice(value);
}

const handleGetMax=async(value:any)=>{
  setMaxPrice(value);
}
  // Course card component
  const CourseCard = ({ course }:any) => (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 min-h-[300px]">
       <Link to={`/course/${course.id}`}>
      
         {course.thumbnail && <img 
        src={course.thumbnail} 
        alt={course.title} 
        className="w-full h-40 object-cover"
      />} 
        </Link>

      <div className="p-4">
       <Link to={`/course/${course.id}`}>
       <p className="mb-2">
        <Tag color='blue'>
           {course.category.name}
        </Tag>
        </p>
        <div className="flex justify-end items-start  flex-wrap ">
        <h3 className="font-bold text-lg mb-1 w-full">{course.title}</h3>
        <p className="text-gray-600 text-sm mb-1">{course.professor.firstName} {course.professor.lastName} </p>
        </div>
        <div style={{
           WebkitLineClamp: 1,
           WebkitBoxOrient: "vertical",
           overflow: "hidden",
           textOverflow: "ellipsis",
           maxWidth: "90ch",
        }} className="text-gray-500 mb-1 truncate max-w-[200px]">
          <span>{course.description}</span>
        </div>
        <div className="flex items-center text-sm text-gray-500 mb-2">
          <span className="mr-3 block">{course.lessonCount} {t('courses.lessonsCount')}</span>
        </div>
        </Link>
        <div className="flex justify-between items-center">
          <span className="font-bold text-lg">{course.price} DZD </span>
          
          <Button 
            onClick={()=>navigate(`/course/${course.id}`)}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
            {t('courses.enroll')}
          </Button>
        </div>
      </div>
    </div>
   

  );
  const[searchResults,setSearchResults] = useState<any>(null);
  const [search, setSearch] = useState("");
  const [searchClick,setSearchClick] = useState("");
  const { data: results} = useList({
    resource: "search",
    queryOptions: {
      enabled: !!searchClick,
    },
    pagination: {
      mode: "off",
    },
    filters: [
      {
        field: "query",
        operator: "eq",
        value: searchClick,
      },
    ],
  });
  useEffect(()=>{
    if(results?.data){
      setSearchResults(results?.data);
    }
  },[results]);
  const handleSearch = (e:any) => {
    setSearch(e.target.value);
  };
  // useEffect(() => {
  //   setSearchClick(search);

  // },[search])
  if(isLoading){
    return <div className="container mx-auto py-12 px-4 text-center">
      <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
    </div>
  }
  return (
    <div className="min-h-screen bg-gray-50">
      <Row style={
            {
              width:"100%",
              background:"#f9f9f9",
              padding:15
            } }
            justify={"end"}
            gutter={10}
          >
            <Col>
            <Select
            value={selectedCategory}
            onChange={(value)=>setSelectedCategory(value)}
            placeholder={t('courses.selectCategory')}
            allowClear
            showSearch
            optionFilterProp='children'
            >
              {categories?.data?.map((category:any)=>(
                <Select.Option value={category.id}>{category.name}</Select.Option>
              ))}
            </Select>
            </Col>
            <Col style={{
              display:"flex",
              alignItems:"center",
              gap:10
            }}>
            <Input
              value={search}
              placeholder={t('search.placeholder')}
              allowClear
              onChange={handleSearch}
              style={{ width: 304 }}
            />
            <Button type='primary'
            onClick={()=>{setSearchClick(search)}}
            >
              {t('courses.search')}
            </Button>
            <Button 
            onClick={()=>{setSearchResults(null)}}
            >
              {t('courses.reset')}
            </Button>
            </Col>
            
            {/* <Col>
            <InputNumber
            // type='number'
              value={minPrice}
              onChange={handleGetMin}
              placeholder="Min Price" />
            </Col>
            <Col>
            <InputNumber
              value={maxPrice}
              onChange={handleGetMax}
              placeholder="Max Price"/>
            </Col> */}
          </Row>

          <div className="max-w-full px-4 py-6 sm:px-6 lg:px-8">
   
        <div className="flex flex-col lg:flex-row">
        
          {/* <div className="lg:hidden mb-4">
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
 
          <div className={`lg:w-64 lg:pr-8 ${showMobileFilters ? 'block' : 'hidden'} lg:block`}>
            <div className="sticky top-4 bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-800">Filters</h2>
                <button
                  // onClick={resetFilters}
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
             
              </div>
            </div>
          </div>
           */}
          <div className="flex-1">
            {searchClick && !results ? 
             <div className="container mx-auto py-12 px-4 text-center">
        <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
      </div>
      :
      <>
          {searchResults ? 
            <>
            {searchResults?.courses && searchResults?.courses.length>0 ? searchResults?.courses ? (
              <div className="grid grid-cols-12 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
                {searchResults?.courses?.map((course:any) => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            ) : (
              <div className="bg-white p-8 rounded-lg shadow-sm text-center">
                <h3 className="text-xl font-medium text-gray-800 mb-2">{t('courses.noCoursesFound')}</h3>
                <p className="text-gray-600">{t('courses.tryAdjustingFiltersOrSearchTerms')}</p>
              </div>
            ): null}
            {searchResults?.lessons && searchResults?.lessons.length>0 ? searchResults?.lessons ? (
              <div className="grid grid-cols-12 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
                {searchResults?.lessons?.map((lesson:any) => (
                  <CourseCard key={lesson.id} course={lesson} />
                ))}
              </div>
            ) : (
              <div className="bg-white p-8 rounded-lg shadow-sm text-center">
                <h3 className="text-xl font-medium text-gray-800 mb-2">{t('courses.noCoursesFound')}</h3>
                <p className="text-gray-600">{t('courses.tryAdjustingFiltersOrSearchTerms')}</p>
              </div>
            ): null}
              
             
            </>
          :
          <>
            <p className="text-gray-600 mb-6">{t('courses.results.showing', {count: courses?.data?.length})}</p>
            
            {courses?.data ? (
              <div className="grid grid-cols-12 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
                {courses?.data?.map(course => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            ) : (
              <div className="bg-white p-8 rounded-lg shadow-sm text-center">
                <h3 className="text-xl font-medium text-gray-800 mb-2">{t('courses.noCoursesFound')}</h3>
                <p className="text-gray-600">{t('courses.tryAdjustingFiltersOrSearchTerms')}</p>
              </div>
            )}
            </>
            }
            </> }

          </div>
        </div>
      </div>

    
    </div>
  );
}