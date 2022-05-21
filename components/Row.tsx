import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid'
import React, { useRef, useState } from 'react'
import { Movie } from '../typing'
import Thumbnail from './Thumbnail'
interface Props {
  title: string
  movies: Movie[]
}

const Row = ({ title, movies }: Props) => {
  const movieRowRef = useRef<HTMLDivElement>()
  const [moved, setMoved] = useState(false)
  const clickHandler = (direction: string) => {
    setMoved(true)
    if (movieRowRef.current) {
      const { scrollLeft, clientWidth } = movieRowRef.current
      console.log(scrollLeft, clientWidth)
      const scrollTo =
        direction === 'left'
          ? scrollLeft - clientWidth
          : scrollLeft + clientWidth

          movieRowRef.current.scrollTo({
            left:scrollTo, behavior:"smooth" 
          })
    }
  }

  return (
    <div className="h-40 space-y-0.5 md:space-y-2">
      <h2 className="text-semibold w-56 cursor-pointer text-sm text-[#e5e5e5] transition duration-200 hover:text-white md:text-2xl ">
        {title}
      </h2>
      <div className="group relative md:-ml-2  ">
        <ChevronLeftIcon
          onClick={() => clickHandler('left')}
          className={`absolute top-0 left-2 bottom-0 z-40 m-auto  h-9 w-9 cursor-pointer opacity-0 transition hover:scale-125 group-hover:opacity-100 ${!moved&& "hidden"}`}
        />
        <div
          ref={movieRowRef}
          className="flex items-center space-x-0.5 overflow-x-scroll scrollbar-hide md:space-x-2.5 md:p-2 "
        >
          {movies.map((movie) => (
            <Thumbnail key={movie.id} movie={movie} />
          ))}
        </div>

        <ChevronRightIcon
          onClick={() => clickHandler('right')}
          className="absolute top-0 right-2 bottom-0 z-40 m-auto  h-9 w-9 cursor-pointer opacity-0 transition hover:scale-125 group-hover:opacity-100 "
        />
      </div>
    </div>
  )
}

export default Row
