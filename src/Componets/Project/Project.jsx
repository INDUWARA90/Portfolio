import React from 'react'
import { motion } from 'motion/react'
import ProjectCard from '../ProjectCard/ProjectCard'
import projectArray from '../../Data/project'


function Project() {
    const variants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0 },
    }



    const ScrollReveal = ({ children }) => {
        return (
            <motion.div
                initial={{ opacity: 0, }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}

            >
                {children}
            </motion.div>
        )
    }


    return (

        <div className='flex min-h-screen w-full flex-col items-center justify-center gap-16 p-4 md:py-24' id='project'>

                <h1 className='text-4xl font-semibold text-white md:text-6xl'>Projects</h1>
                


            <div className="flex flex-col w-full max-[1000px] gap-16 text-white">

                {
                    projectArray.map((project, i) => {
                        return <ProjectCard key={i} project={project} />
                    })
                }

            </div>

        </div>
    )
}

export default Project