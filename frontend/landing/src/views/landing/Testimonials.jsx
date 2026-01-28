import { Box, Heading, Image, Slide, Spinner, Stack, Text } from "@chakra-ui/react"
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect, useState } from "react";
import JsonData from '../private/data.json';

function Testimonials() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      setLoading(true);
      setData(JsonData);
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 0,
          prevArrow: <></>,
          nextArrow: <></>
        }
      },
    ]
  };

  if (loading) {
    return <Spinner size="xl" />;
  }

  return (
    <div id="testimonials" className="relative my-20 ">
      <Slide direction="left" in={true} style={{ position: 'sticky' }}>
        <h3 className="text-[#EFFFC8] tracking-widest text-center text-4xl font-black mb-8">
          Testimonios
        </h3>
        <Slider {...settings}>
          {data.Testimonials?.map((t, index) => (
            <Box
              key={index}
              borderRadius="lg"
              className="bg-[#3B341F] text-[#EFFFC8]"
            >
              <Box className="text-center p-4 space-y-4">
                <Image
                  objectFit="cover"
                  boxSize={32}
                  src={t.image}
                  alt={t.name}
                  className="rounded-full mx-auto"
                />
                <Stack>
                  <Heading size="md" className="text-[#85CB33] font-bold">
                    {t.name}
                  </Heading>
                  
                  <Text fontSize="md" className="text-[#EFFFC8]">
                    {t.opinion}
                  </Text>
                </Stack>
              </Box>
            </Box>
          ))}
        </Slider>
      </Slide>
    </div>
  )
}

export default Testimonials