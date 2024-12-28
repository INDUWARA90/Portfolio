import React from 'react'
import { motion } from 'motion/react'
import ProjectCard from '../ProjectCard/ProjectCard'
import projectArray from '../../Data/project'


function Project() {

    return (

        <section className='flex min-h-screen w-full flex-col items-center justify-center gap-16 p-4 md:py-24' id='project'>

                <h1 className='text-4xl font-semibold text-white md:text-6xl'>Projects</h1>
                


            <div className="flex flex-col w-full max-[1000px] gap-16 text-white">

                {
                    projectArray.map((project, i) => {
                        return <ProjectCard key={i} project={project} />
                    })
                }

            </div>

        </section>
    )
}

export default Project