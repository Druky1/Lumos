"use client"
import { ParallaxScroll } from '@/components/ui/parallax-scroll'
import React from 'react'
import doggo from '@/public/images/doggo.jpg'
import flower from '@/public/images/flower.jpg'
import japan from '@/public/images/japan.jpg'
import kimono from '@/public/images/kimono.jpg'
import monument from '@/public/images/monument.jpg'
import penguin from '@/public/images/penguin.jpg'
import snow from '@/public/images/snow.jpg'
import spiderlily from '@/public/images/spider-lily.jpg'
import tree from '@/public/images/tree.jpg'

const images = [
  doggo,
  flower,
  japan,
  kimono,
  monument,
  penguin,
  snow,
  spiderlily,
  tree
]

const Creations = () => {
  return (
    <div className='w-full h-full'>
      <ParallaxScroll images={images} className='w-full'/>
    </div>
  )
}

export default Creations