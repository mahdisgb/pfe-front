import { useTranslation } from '@refinedev/core';

const Footer = () => {
  const { translate: t } = useTranslation();
  
  return (
    <>
     <div className="w-full bg-gray-800 text-white">
        <div className="flex justify-around min-h-[200px] ">
        <div className=" p-8 flex flex-col justify-center items-center text-center max-w-[350px]">
              <div className="flex items-center mb-4">
                <h3 className="ml-2 text-lg font-bold">Wajihni Academy</h3>
              </div>
              <p className="text-gray-400">Wajihni learners worldwide with quality education and accessible courses.</p>
          </div>
            <div className=" p-8 flex flex-col justify-center">
                <h2 className="text-xl font-semibold mb-6">Contact Info</h2>
                <div className="space-y-4">
                    <div className="flex items-center">
                        <svg className="w-5 h-5 mr-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"></path>
                        </svg>
                        <span>Boumerdes, Algeria</span>
                    </div>
                    <div className="flex items-center">
                        <svg className="w-5 h-5 mr-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path>
                        </svg>
                        <span>Phone: +00 151515</span>
                    </div>
                    <div className="flex items-center">
                        <svg className="w-5 h-5 mr-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                        </svg>
                        <span>Email: support@wajihni.com</span>
                    </div>
                </div>
{/*                 
                <div className="mt-8">
                    <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-600 transition-colors">
                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path>
                        </svg>
                    </div>
                </div> */}
            </div>
            
            <div className="p-8 flex flex-col justify-center items-center text-center">
                <h2 className="text-xl font-semibold mb-4">Contact Us</h2>
                <p className="text-gray-200 mb-2">If you have an idea.</p>
                <p className="text-gray-200">What are you waiting for?</p>
            </div>
            
            {/* <div className=" p-8 flex flex-col justify-center items-center text-center">
                <h2 className="text-xl font-semibold">Like Us</h2>
            </div> */}
        </div>
        <div className="my-12 pt-8 border-t border-gray-700 text-center text-gray-400">
            <p>© 2025 Wajihni Academy. All rights reserved.</p>
          </div>
    </div>
{/* 
<div className="w3-row w3-section">
    <div className="w3-third w3-container w3-black w3-large" style={{height:"250px"}}>
    <h2>Contact Info</h2>
    <p><i className="fa fa-map-marker" style={{width:"30px"}}></i> Chicago, US</p>
    <p><i className="fa fa-phone" style={{width:"30px"}}></i> Phone: +00 151515</p>
    <p><i className="fa fa-envelope" style={{width:"30px"}}> </i> Email: mail@mail.com</p>
  </div>
  <div className="w3-third w3-center w3-large w3-dark-grey w3-text-white" style={{height:"250px"}}>
    <h2>Contact Us</h2>
    <p>If you have an idea.</p>
    <p>What are you waiting for?</p>
  </div>
  <div className="w3-third w3-center w3-large w3-grey w3-text-white" style={{height:"250px"}}>
    <h2>Like Us</h2>
 
  </div>
  </div> */}
  </>
  )
}

export default Footer

{/*            
      <footer className="bg-gray-800 text-white py-12 ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <h3 className="ml-2 text-lg font-bold">Wajihni Academy</h3>
              </div>
              <p className="text-gray-400">Wajihni learners worldwide with quality education and accessible courses.</p>
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
            <p>© 2025 Wajihni Academy. All rights reserved.</p>
          </div>
        </div>
      </footer>  */}