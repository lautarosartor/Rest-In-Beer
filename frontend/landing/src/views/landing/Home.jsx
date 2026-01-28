import { Slide } from "@chakra-ui/react"
import { ArrowDownIcon, PhoneIcon } from "@chakra-ui/icons"
import banner from '../../assets/banner2.webp'

function Home() {
  return (
    <div id="home" className="relative">
      <Slide direction="left" in={true} style={{ position: 'sticky' }}>
        <div className="flex flex-wrap justify-center lg:justify-between lg:flex-nowrap gap-12">
          <div className="lg:w-1/2 self-center jusitfy-self-center">
            <div className="text-center space-y-4 mb-8">
              <h1 className="text-[#EFFFC8] tracking-widest text-balance text-4xl font-black">
                ¡Bienvenidos a
                &nbsp;<span className="text-[#85CB33]">R</span>est
                &nbsp;<span className="text-[#85CB33]">I</span>n
                &nbsp;<span className="text-[#85CB33]">B</span>eer!
              </h1>
              <mark className="bg-[#3B341F] text-[#EFFFC8] text-pretty text-2xl italic p-2 inline-block transform -skew-x-12">
                El lugar perfecto para compartir momentos inolvidables
              </mark>
            </div>
            
            <p className="leading-8 text-[#A5CBC3] font-medium mb-8 text-center md:text-left">
              En R.I.B te ofrecemos un ambiente único donde cada rincón está pensado para que disfrutes con amigos, pareja o familia.
            </p>

            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              <a href="#menu" className="flex gap-2 py-3 px-5 bg-[#85CB33] text-[#EFFFC8] font-bold rounded-md hover:bg-[#EFFFC8] hover:text-[#85CB33] transition delay-50">
                Ver menú <ArrowDownIcon className="text-2xl" />
              </a>
              <a href="#" className="text-[#A5CBC3] flex gap-2 py-3 px-5 font-bold rounded-md hover:scale-105 transition delay-50">
                <PhoneIcon className="text-2xl" /> Reservá tu mesa
              </a>
            </div>
          </div>
          <img src={banner} alt="banner" className="rounded-3xl lg:w-1/2 object-cover" />
        </div>
      </Slide>
    </div>
  )
}

export default Home