import { RadioGroup, RadioGroupItem } from '@radix-ui/react-radio-group';
import { Label } from '@radix-ui/react-label';
import React from 'react';

const filterData = [
  {
    filterType: "Location",
    array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"]
  },
  {
    filterType: "Industry",
    array: ["Frontend Developer", "Backend Developer", "FullStack Developer"]
  },
  {
    filterType: "Salary",
    array: ["0-40k", "42-1lakh", "1lakh to 5lakh"]
  },
];

const FilterCard = () => {
  const [selectedValue, setSelectedValue] = React.useState('');

  return (
    <div className='w-full bg-white p-3 rounded-md'>
      <h2 className='font-bold text-lg'>Filter Jobs</h2>
      <hr className='mt-3' />
      <RadioGroup 
        value={selectedValue} 
        onValueChange={setSelectedValue}
        className="space-y-4"
      >
        {filterData.map((data, index) => (
          <div key={`filter-group-${index}`}>
            <h3 className='font-medium text-md mb-2'>{data.filterType}</h3>
            <div className="space-y-2">
              {data.array.map((item, idx) => {
                const itemId = `filter-${index}-${idx}`;
                return (
                  <div key={itemId} className="flex items-center space-x-2">
                    <RadioGroupItem value={item} id={itemId} />
                    <Label htmlFor={itemId}>{item}</Label>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default FilterCard;