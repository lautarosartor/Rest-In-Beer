import { Slide } from '@chakra-ui/react'
import banner2 from '../../assets/banner2.jpg'

function About() {
  return (
    <div id="about" className="relative">
      <Slide direction="right" in={true} style={{ position: 'sticky' }}>
        <div className="flex flex-wrap-reverse justify-center lg:justify-between lg:flex-nowrap gap-12">
          <img src={banner2} alt="banner" className="rounded-3xl lg:w-1/2 object-cover object-left" />
          <div className="lg:w-1/2 self-center">
            <div className="text-center xl:text-left space-y-4 mb-8">
              <h2 className="text-[#EFFFC8] tracking-widest text-balance text-4xl font-black">
                Nuestra historia está <span className="underline decoration-[#85CB33] underline-offset-8">comenzado</span>
              </h2>
              <mark className="bg-[#3B341F] text-[#EFFFC8] text-pretty text-2xl italic p-2 inline-block transform -skew-x-12">
                Más que un bar, un lugar para compartir.
              </mark>
            </div>
            
            <p className="leading-8 text-[#A5CBC3] font-medium mb-8">
              Nacimos en el interior de <span className="bg-[#3B341F] text-[#85CB33] font-bold">Santa Fe</span>, inspirados por la idea de crear un espacio donde todos puedan sentirse como en casa.
              <br />
              Nos apasiona ofrecer <span className="bg-[#3B341F] text-[#85CB33] font-bold">buena comida, bebidas únicas y momentos inolvidables.</span>
              <br />
              Cada detalle, desde la decoración hasta el menú, está pensado para brindarte una <span className="bg-[#3B341F] text-[#85CB33] font-bold">experiencia auténtica y diferente.</span>
            </p>
          </div>
        </div>
      </Slide>
    </div>
  )
}

export default About