import { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, Circle  } from 'lucide-react';

function App() {
  const [currentData, setCurrentData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  async function getData() {
    try {
      const response = await fetch(
        'https://fakestoreapi.com/products',
        {mode: "cors"}
      );
      const fullData = await response.json();
      const menClothingData = fullData.filter(info => info.category === "men's clothing");
      const menClothingImages = menClothingData.map((item) => item.image);
      setCurrentData(menClothingImages);
    } catch(err){
      console.log(err);
      return;
    }
  }

  useEffect(() => {
    getData();
  }, []);

  function showNext() {
    if (currentIndex > currentData.length - 1) {
      setCurrentIndex(0)
    } else {
      setCurrentIndex(currentIndex + 1)
    }
  }

  function showPrev() {
    if (currentIndex === 0) {
      setCurrentIndex(currentData.length - 1)
    } else {
      setCurrentIndex(currentIndex - 1)
    }
  }

  return (
    <div 
      className='max-w-[1400px] h-[780px] w-full m-auto py-16 px-4 relative group'>
      <dir 
        className='w-full h-full rounded-2xl bg-center bg-cover duration-500'
        style={{backgroundImage: `url(${currentData[currentIndex]})`}}
        >
      </dir>
      <button 
        className='hidden group-hover:block absolute top-[50%] translate-x-0 translate-y-[-50%] left-5
         text-2xl rounded-full p-2 bg-black/20 text-white'
         onClick={showNext}
         >
        <ArrowLeft />
      </button>
      <button
        className='hidden absolute group-hover:block top-[50%] translate-x-0 translate-y-[-50%] right-5
         text-2xl rounded-full p-2 bg-black/20 text-white'
         onClick={showPrev}
      >
        <ArrowRight />
      </button>
      <div className='flex gap-2 top-4 justify-center py-2'>
        {currentData.map((image, index )=> (
          <div className='cursor-pointer' key={index}>
            <Circle 
              onClick={() =>setCurrentIndex(index)} 
              className={index === currentIndex ? 'bg-black rounded-full duration-75' : ''}/>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
