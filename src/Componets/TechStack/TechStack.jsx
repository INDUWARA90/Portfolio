import { motion } from 'motion/react'
import React from 'react'
import { BiLogoAngular, BiLogoBootstrap, BiLogoJavascript, BiLogoNodejs, BiLogoReact, BiLogoTailwindCss, BiLogoTypescript } from 'react-icons/bi'
import { GrMysql } from 'react-icons/gr'
import { SiExpress, SiPostman } from 'react-icons/si'


function TechStack() {

    const variants={
        hidden:{opacity:0,y:50},
        visible:{opacity:1,y:0},
    }

    return (
        <div className='flex min-h[70vh] w-full flex-col items-center justify-center gap-16 md:gap-30' id='tech'>

            <motion.h1 
            variants={variants}
            initial="hidden"
            whileInView="visible"
            transition={{duration:0.5}}

            className='text-4xl text-white font-semibold md:text-5xl'>Technologies</motion.h1>

            <div className='flex flex-wrap items-center justify-center gap-7 p-5'>

                <motion.div variants={variants} initial="hidden" whileInView="visible" transition={{duration:0.5}}>
                  <BiLogoTypescript className='cursor-pointer text-[80px] text-sky-500 transition-all duration-300 hover:translate-y-5 sm:text-[100px] md:text-[100px]' />
                </motion.div>

                <motion.div variants={variants} initial="hidden" whileInView="visible" transition={{duration:0.5}}>
                  <BiLogoJavascript className='cursor-pointer text-[80px] text-yellow-500 transition-all duration-300 hover:translate-y-5 sm:text-[100px] md:text-[100px]' />
                </motion.div>

                <motion.div variants={variants} initial="hidden" whileInView="visible" transition={{duration:0.5}}>
                  <BiLogoReact className='cursor-pointer text-[80px] text-blue-300 transition-all duration-300 hover:translate-y-5 sm:text-[100px] md:text-[100px]' />
                </motion.div>

                <motion.div variants={variants} initial="hidden" whileInView="visible" transition={{duration:0.5}}>
                  <BiLogoAngular className='cursor-pointer text-[80px] text-red-500 transition-all duration-300 hover:translate-y-5 sm:text-[100px] md:text-[100px]' />
                </motion.div>

                <motion.div variants={variants} initial="hidden" whileInView="visible" transition={{duration:0.5}}>
                  <BiLogoTailwindCss className='cursor-pointer text-[80px] text-blue-400 transition-all duration-300 hover:translate-y-5 sm:text-[100px] md:text-[100px]' />
                </motion.div>

                <motion.div variants={variants} initial="hidden" whileInView="visible" transition={{duration:0.5}}>
                  <BiLogoBootstrap className='cursor-pointer text-[80px] text-purple-500 transition-all duration-300 hover:translate-y-5 sm:text-[100px] md:text-[100px]' />
                </motion.div>

                <motion.div variants={variants} initial="hidden" whileInView="visible" transition={{duration:0.5}}>
                  <GrMysql className='cursor-pointer text-[80px] text-blue-300 transition-all duration-300 hover:translate-y-5 sm:text-[100px] md:text-[100px]' />
                </motion.div>

                <motion.div variants={variants} initial="hidden" whileInView="visible" transition={{duration:0.5}}>
                  <BiLogoNodejs className='cursor-pointer text-[80px] text-green-600 transition-all duration-300 hover:translate-y-5 sm:text-[100px] md:text-[100px]' />
                </motion.div>

                
                <motion.div variants={variants} initial="hidden" whileInView="visible" transition={{duration:0.5}}>
                  <SiExpress  className='cursor-pointer text-[80px] text-white transition-all duration-300 hover:translate-y-5 sm:text-[100px] md:text-[100px]' />
                </motion.div>
                

                <motion.div variants={variants} initial="hidden" whileInView="visible" transition={{duration:0.5}}>
                  <SiPostman  className='cursor-pointer text-[80px] text-orange-500 transition-all duration-300 hover:translate-y-5 sm:text-[100px] md:text-[85px]' />
                </motion.div>
                 
                 


            </div>

        </div>
    )
}

export default TechStack