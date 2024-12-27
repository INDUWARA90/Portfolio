import { motion } from 'motion/react'
import React from 'react'


function ProjectCard({project}) {

    const variants={
        hidden:{opacity:0,y:50},
        visible:{opacity:1,y:0},
    }

    return (

        <motion.div 
            variants={variants}
            initial="hidden"
            whileInView="visible"
            transition={{duration:0.5}}
        
        className='flex flex-col items-center justify-center gap-8 md:flex-row md:gap-23'>
            
            <img src={project.image} alt="" className='w-full cursor-pointer rounded-2xl transition-all duration-300 hover:scale-105 md:w-[300px]' />
            <div className='flex flex-col gap-5'>

                <div className="flex flex-col gap-3">

                    <div className='text-xl font-semibold'>{project.title}</div>
                    <p className='text-gray-400 '>{project.description}</p>

                </div>
                <div className="flex flex-wrap gap-5">
                    {
                        project.techstack.map((tech, i) => {
                          return  <span key={i} className='rounded-lg bg-black p-3'>
                                {
                                    tech
                                }
                            </span>
                        })
                    }

                </div>
                <div className="flex items-center flex-wrap gap-4">
                
                   <a href={project.clink} target='_blank'><button className='p-3 bg-red-500 rounded-md '>View Code</button></a> 
                   <a href={project.dlink} target='_blank'><button className='p-3 bg-red-500 rounded-md '>Demo</button></a> 
                
                </div>
            </div>
        </motion.div>
    )
}

export default ProjectCard