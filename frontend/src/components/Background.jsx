import React from 'react'
import bg1 from "../assets/bg1.png"
import bg2 from "../assets/bg2.png"
import bg3 from "../assets/bg3.png"

function Background({ heroCount }) {
    if (heroCount === 0) {
        return <img src={bg1} className='w-[100%] h-[100%] float-left overflow-auto object-cover ' />
    } else if (heroCount === 1) {
        return <img src={bg2} className='w-[100%] h-[100%] float-left overflow-auto object-cover ' />
    } else if (heroCount === 2) {
        return <img src={bg3} className='w-[100%] h-[100%] float-left overflow-auto object-cover ' />
    } else if (heroCount === 3) {
        return <img src={bg3} className='w-[100%] h-[100%] float-left overflow-auto object-cover ' />
    }
}

export default Background