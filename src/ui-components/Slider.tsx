import React, { useState, useRef, useEffect } from 'react';
import './css/Slider.css';



interface SliderProps {
    min: number;
    max: number;
    onChange: (value: { min: number; max: number }) => void;
    currencyText?: string;
    resetSlider: boolean;
}

const Slider: React.FC<SliderProps> = ({
    min,
    max,
    onChange,
    currencyText = "$",
    resetSlider = false,
}) => {

   const [minValue, setMinValue] = useState(min); // Initialize with min value
   const [maxValue, setMaxValue] = useState(max); // Initialize with max value
   const sliderRef = useRef<HTMLInputElement>(null);

   
   useEffect(() => {
    setMinValue(min); // Update min value when min prop changes
    setMaxValue(max); // Update max value when max prop changes
}, [min, max]);

useEffect(() => {
    const resetRangeSlider = () => {
        setMinValue(min); // Reset min value to min
        setMaxValue(max); // Reset max value to max
        if (sliderRef.current) {
            sliderRef.current.value = min.toString(); // Reset slider value to min
        }
        onChange({ min, max }); // Call onChange with min and max values
    };

    if(resetSlider) {
        resetRangeSlider();
    }
}, [resetSlider, min, max, onChange]);



    

 

   const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value);
        if (value <= maxValue) {
            setMinValue(value);
            console.log('Min value:', value);
            onChange({ min: minValue, max: maxValue });
        } else {
            setMinValue(maxValue-2);
            console.log('Min value:', value);
            onChange({ min: minValue, max: maxValue });
        }
   };

   const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value);
        if (maxValue <= minValue) {
            setMaxValue(value + 2);
            console.log('Max value:', value);
            onChange({ min: minValue, max: maxValue });
        } else if (value > max) {
            setMaxValue(max);
            onChange({ min: minValue, max: maxValue });
        } else {
            setMaxValue(value);
            onChange({ min: minValue, max: maxValue });
        }
   };

   const handleMinInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value.replace(currencyText, '');
        const value = parseInt(inputValue);
        console.log('Min Input value:', inputValue);
        if (inputValue === '' || (!isNaN(value) && value >= min && value <= max)) {
            setMinValue(inputValue === '' ? 0 : value);
            
        }
        if(inputValue === ''){
            setMinValue(0);
            onChange({ min: minValue, max: maxValue });
        }
   };

   const handleMaxInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value.replace(currencyText, '');
        const value = parseInt(inputValue);
        if (inputValue === '' || (!isNaN(value) && value >= min && value <= max)) {
            setMaxValue(inputValue === '' ? 0 : value);
        } else if(value > max) {
            setMaxValue(max);
            e.target.value = max.toString();
        } else {
            handleMaxChange(e);
        }
   };

   const getMinThumbPosition = () => {
        const percentage = ((minValue - min) / (max - min)) * 100;
        return percentage;
   };

   const getMaxThumbPosition = () => {
        const percentage = ((maxValue - min) / (max - min)) * 100;
        return percentage;
   };



    return (
        <div>
            
        </div>
    );
}

export default Slider;