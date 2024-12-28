import React from 'react'

function Education() {
  return (
    <div className='text-white mb-36 flex flex-col items-center justify-center p-40' id='education'>
      <h2 className='text-center text-5xl font-semibold mb-32'>Eduaction</h2>

      <ol className="relative border-s border-gray-200 dark:border-gray-700">
        <li className="mb-10 ms-6">
          <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -start-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
            <svg className="w-2.5 h-2.5 text-blue-800 dark:text-blue-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
              <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
            </svg>
          </span>
          <h3 className="flex items-center mb-1 text-lg font-semibold text-gray-900 dark:text-white">University of Ruhuna</h3>
          <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">Bachelor of Information Communication Technology Degree <br /></time>
          <span className='font-semibold block mb-2 text-sm leading-none text-gray-400 dark:text-gray-500'>(Undergraduate)</span>
          <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">

            The Bachelor of Information Communication Technology (ICT) program at the University of Ruhuna provides <br /> students with comprehensive knowledge and practical skills in areas like software development, networking, and data management. <br />The program prepares graduates for diverse roles in the tech industry, equipping them with the expertise to meet evolving technological challenges.

          </p>

        </li>

        <li className="mb-10 ms-6">
          <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -start-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
            <svg className="w-2.5 h-2.5 text-blue-800 dark:text-blue-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
              <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
            </svg>
          </span>
          <h3 className="flex items-center mb-1 text-lg font-semibold text-gray-900 dark:text-white">Institute of Computer Engineering Technology</h3>
          <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">Software Developer <br /></time>
          <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">

          <span className='font-semibold'>Programming Knowledge Mastery:</span> Comprehensive coverage of programming knowledge, spanning Programming Fundamentals, Object-Oriented Programming (OOP) concepts, and Database
            Management Systems (DBMS), plus the latest industrial web frameworks and technologies.
            <br /> <br />
            <span className='font-semibold'>Hands-On Programming Skills:</span> Gain practical, hands-on programming skills through real-world application, ensuring you can confidently apply your knowledge in various scenarios.
            <br /> <br />
           <span className='font-semibold'>Enterprise-Level Application Development:</span> In 6 months, participants of the iCM program will independently develop enterprise-level applications, including web, mobile, and standalone apps from scratch.
           <br /> <br />
            <span className='font-semibold'>Versatility for Various Paths:</span> The skills acquired through the iCM program empower participants to excel in university academics, higher education, or freelancing. Be well-prepared to thrive in your chosen endeavors.




          </p>

        </li>

      </ol>



    </div>
  )
}

export default Education