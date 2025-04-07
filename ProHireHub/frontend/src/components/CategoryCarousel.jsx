import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import { Button } from './ui/button';

const category = [
    "Frontend Developer",
    "Backend Developer",
    "Data Science",
    "Graphic Designer",
    "FullStack Developer",
    "UX Designer",
    "DevOps Engineer",
    "Mobile Developer",
    "QA Engineer"
];

const CategoryCarousel = () => {
  return (
    <div className="px-4 md:px-6 lg:px-8 py-8 md:py-12">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-gray-800 dark:text-white">
        Browse Categories
      </h2>
      
      <div className="relative">
        <Carousel 
          className="w-full max-w-7xl mx-auto"
          opts={{
            align: "start",
            slidesToScroll: "auto",
            breakpoints: {
              "(min-width: 640px)": { active: true, slidesToScroll: 2 },
              "(min-width: 1024px)": { active: true, slidesToScroll: 3 },
            },
          }}
        >
          <CarouselContent className="-ml-1">
            {category.map((cat, index) => (
              <CarouselItem 
                key={index}
                className="pl-1 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5"
              >
                <div className="p-1">
                  <Button 
                    variant="outline" 
                    className="w-full rounded-full whitespace-nowrap text-sm md:text-base hover:bg-gray-100 transition-colors"
                  >
                    {cat}
                  </Button>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          
          {/* Improved Navigation Buttons */}
          <div className="hidden sm:flex">
            <CarouselPrevious 
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-6 h-10 w-10 rounded-full bg-white shadow-md border border-gray-200 hover:bg-gray-50"
              variant="ghost"
              size="icon"
            />
            <CarouselNext 
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-6 h-10 w-10 rounded-full bg-white shadow-md border border-gray-200 hover:bg-gray-50"
              variant="ghost"
              size="icon"
            />
          </div>
        </Carousel>
      </div>
    </div>
  );
};

export default CategoryCarousel;