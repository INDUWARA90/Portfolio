import React from 'react'
import './contact.css'
import Swal from 'sweetalert2'

function Contact() {

    const onSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
    
        formData.append("access_key", "0039c595-6a81-46f7-8cba-c790ceb4b732");
    
        const object = Object.fromEntries(formData);
        const json = JSON.stringify(object);
    
        const res = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          },
          body: json
        }).then((res) => res.json());
        

        if (res.success) {
          console.log("Success", res);
          Swal.fire({
            title: "Success!",
            text: "Message Sent Successfully!",
            icon: "success"
          });
        }
      };


    return (
        <section className='mt-40' id='contact'>
            <h3 className='text-white text-1xl hover:opacity-70 text-center'>Get in touch</h3>
            <h1 className='text-white text-5xl hover:opacity-70 text-center'>Contact Me</h1>

            <div className="mt-8 mb-40">

                <form onSubmit={onSubmit} className='grid grid-flow-row gap-3'>
                    <div className="flex flex-col gap-2">
                        <p className='text-white'>Enter Name :</p>
                        <input type="text" className='outline-none p-2 rounded-md feilds' name='name' required/>
                    </div>
                    <div className="flex flex-col gap-2">
                        <p className='text-white'>Enter Email :</p>
                        <input type="email" className='outline-none p-2 rounded-md feilds' name='email' required/>
                    </div>
                    <div className="flex flex-col gap-2">
                        <p className='text-white'>Enter Message :</p>
                        <textarea name="message" id="" className='outline-none h-[300px] p-5 resize-none rounded-md feilds' required></textarea>
                    </div>

                    <div className="flex flex-col items-center mt-6">
                        <button type='submit' className='text-1xl text-white font-semibold bg-gradient-to-r from-violet-600 to-indigo-600 p-2 w-48 rounded-md hover:text-black '>Submit</button>
                    </div>
                    
                </form>


            </div>
        </section>
    )
}

export default Contact