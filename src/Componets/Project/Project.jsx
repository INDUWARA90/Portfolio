import React from 'react'
import { motion } from 'motion/react'

function Project() {
    const variants={
        hidden:{opacity:0,y:50},
        visible:{opacity:1,y:0},
    }

    return (
        <div className='py-28 flex min-h[70vh] w-full flex-col items-center justify-center gap-16 md:gap-32'>
            <motion.h1 
            variants={variants}
            initial="hidden"
            whileInView="visible"
            transition={{duration:0.5}}
            className='text-4xl font-semibold text-white md:text-6xl'>Projects</motion.h1>
            
            
        </div>
    )
}

export default Project