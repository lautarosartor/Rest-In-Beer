import { Card, CardBody, Heading, Image, ScaleFade, Slide, Spinner, Stack, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import JsonData from '../private/data.json';
import img from '../../assets/img.jpg';

function Menu() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(true);
  const [category, setCategory] = useState("");

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

  // Función para cambiar la categoría
  const handleChangeCategory = (newCategory) => {
    setOpen(false); // Cierra la animación para volver a aplicar la transición
    setTimeout(() => {
      setOpen(true); // Vuelve a abrir la animación
      setCategory(newCategory); // Cambia la categoría
    }, 200);
  };

  // Función para filtrar los datos según la categoría seleccionada
  const filteredCategory = data.Menu?.filter((item) => {
    if (category === "") {
      return true; // Mostrar todo si la categoría esta vacia
    }
    return item.category === category; // Mostrar solo los elementos de la categoría seleccionada
  });

  if (loading) {
    return <Spinner size="xl" />;
  }

  return (
    <div id="menu" className="relative">
      <Slide direction="bottom" in={true} style={{ position: 'sticky' }}>
        <div className="flex justify-center flex-wrap gap-8 mb-8 mx-8 md:justify-evenly">
          <h2 className="text-6xl font-black bg-[#3B341F] text-[#EFFFC8] p-2 inline-block -skew-x-12">
            Menú
          </h2>
          <div className="bg-[#3B341F] text-[#EFFFC8] flex flex-wrap justify-center gap-2 p-2 rounded">
            <button
              onClick={() => handleChangeCategory("")}
              className={`${category === "" && "active"} p-4 text-xl font-bold rounded hover:bg-[#85CB33] hover:text-[#EFFFC8]`}
            >
              Todos
            </button>
            <button
              onClick={() => handleChangeCategory("comidas")}
              className={`${category === "comidas" && "active"} p-4 text-xl font-bold rounded hover:bg-[#85CB33] hover:text-[#EFFFC8]`}
            >
              Comidas
            </button>
            <button
              onClick={() => handleChangeCategory("bebidas")}
              className={`${category === "bebidas" && "active"} p-4 text-xl font-bold rounded hover:bg-[#85CB33] hover:text-[#EFFFC8]`}
            >
              Bebidas
            </button>
          </div>
        </div>

        {/* Renderiza los datos filtrados */}
        <ScaleFade initialScale={0.9} in={open} className="flex flex-wrap justify-center gap-10">
          {filteredCategory?.map((m, index) => (
            <Card maxW={250} key={index}>
              <CardBody className="bg-[#3B341F] text-[#EFFFC8]" p={0}>
                <div className="relative">
                  <Text fontSize='2xl' className="text-[#85CB33] bg-[#A5CBC350] font-bold absolute w-full text-center">
                    ${m.price}
                  </Text>
                  <Stack direction="row" className="absolute bottom-0 m-2 px-1 bg-[#ffffff70] text-[#000] font-bold rounded">
                    <img src="src/assets/star.png" alt="star" width={15} className="object-contain" />
                    <small>5.0</small>
                  </Stack>
                  <Image
                    objectFit="cover"
                    boxSize="250px"
                    src={m.image ? m.image : img} // Mostrar imagen predeterminada si no hay imagen
                    alt={m.title}
                  />
                </div>
                <Stack spacing='3' p={5}>
                  <Heading size='md'>{m.title}</Heading>
                  <Text className="text-sm">{m.ingredients}</Text>
                </Stack>
              </CardBody>
            </Card>
          ))}
        </ScaleFade>
      </Slide>
    </div>
  );
}

export default Menu;
