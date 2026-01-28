import { Slide } from "@chakra-ui/react"

function Contact() {
  return (
    <div id="contact" className="relative my-20">
      <Slide direction="left" in={true} style={{ position: 'sticky' }}>
        <div className="text-center w-full">
          <h3 className="text-[#EFFFC8] tracking-widest text-4xl font-black mb-8">
            ¡Hablemos!
          </h3>
          <p className="text-[#A5CBC3] text-pretty text-xl leading-10 mb-8">
            <span className="font-bold">Estamos aca para ayudarte.</span>
            <br />
            ¿Tenés alguna consulta, querés hacer una reserva, o simplemente saber más sobre nosotros?
            <br />
            Escribinos y te responderemos a la brevedad.
            También podés visitarnos en nuestro local.
          </p>
        </div>

        <div className="text-[#85CB33] text-center space-y-4 self-center w-full">
          <p>Calle Ficticia 1234, Avellaneda, Santa Fe.</p>
          <p><u>Teléfono:</u> +54-1234-567890</p>
          <p><u>Email:</u> contacto@restinbeer.com</p>
          
          <div className="flex justify-center space-x-6 mt-4">
            <a href="" className="p-2 rounded-full hover:scale-110">
              <img src="src/assets/whatsapp.png" alt="WhatsApp" className="h-10 w-10" />
            </a>
            
            <a href="" className="p-2 rounded-full hover:scale-110">
              <img src="src/assets/instagram.png" alt="Instagram" className="h-10 w-10" />
            </a>
            
            <a href="" className="p-2 rounded-full hover:scale-110">
              <img src="src/assets/facebook.png" alt="Facebook" className="h-10 w-10" />
            </a>
          </div>
        </div>
      </Slide>
    </div>
  )
}

export default Contact