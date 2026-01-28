import { Slide} from "@chakra-ui/react"
import JsonData from '../private/data.json'
import { useEffect, useState } from "react";

function Services() {
  const [data, setData] = useState([]);

  useEffect(() => {
    try {
      setData(JsonData);
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  return (
    <div id="services" className="relative my-20">
      <Slide direction="right" in={true} style={{ position: 'sticky' }}>
        <h3 className="text-[#EFFFC8] tracking-widest text-center text-4xl font-black mb-8">
          Lo que ofrecemos
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-10">
          {data?.Services?.map((item, index) => (
            <div key={index} className="flex flex-col flex-wrap items-center text-center">
              <img
                src={item.image}
                alt={item.title}
                className="bg-[#A5CBC3c4] rounded-full p-4 w-32 h-32 object-cover"
              />
              <p className="text-[#EFFFC8] text-xl font-bold mt-4">
                {item.title}
              </p>
              <p className="text-[#EFFFC8c4]">
                {item.subtitle}
              </p>
            </div>
          ))}
        </div>
      </Slide>
    </div>
  )
}

export default Services