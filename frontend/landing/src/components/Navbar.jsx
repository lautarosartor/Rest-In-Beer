import { Box, Flex, Grid, GridItem, ListItem, UnorderedList } from "@chakra-ui/react"
import PropTypes from "prop-types";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronUpIcon, ChevronDownIcon } from '@chakra-ui/icons'

function Navbar({ children }) {
  const navigate = useNavigate();
  const [showAdministrar, setShowAdministrar] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  }

  return (
    <Grid
      minH="100vh"
      flexGrow={1}
      templateRows='repeat(1, 1fr)'
      templateColumns='repeat(6, 1fr)'
      backgroundColor="#fff"
    >
      {/*NAV*/}
      <GridItem
        as="nav"
        p={4}
        rowSpan={2}
        colSpan={1}
        minW={280}
        className="nav-admin hidden xl:block"
      >
        <Flex direction="column" h="full">
          <a href="/" className="flex justify-center font-black text-2xl mb-10 text-[#8DDBE0]">
            Rest In Beer
          </a>

          <UnorderedList display="flex" flexDirection="column" gap="4" listStyleType="none">
            <ListItem>
              <a
                className={location.pathname === "/admin/dashboard" ? "active-link" : ""}
                onClick={() => navigate("/admin/dashboard")}
              >
                Dashboard
              </a>
            </ListItem>

            <ListItem>
              <a
                className={location.pathname === "/admin/pedidos" ? "active-link" : ""}
                onClick={() => navigate("/admin/pedidos")}
              >
                Pedidos
              </a>
            </ListItem>

            <ListItem>
              <a onClick={() => setShowAdministrar(!showAdministrar)}>
                Administrar
                {showAdministrar ? <ChevronUpIcon fontSize={25} /> : <ChevronDownIcon fontSize={25} />}
              </a>
            </ListItem>

            {showAdministrar &&
              <Box display="flex" flexDirection="column" gap="2" paddingLeft="4">
                <ListItem>
                  <a
                    className={location.pathname === "/admin/mesas" ? "active-link" : ""}
                    onClick={() => navigate("/admin/mesas")}
                  >
                    Mesas
                  </a>
                </ListItem>

                <ListItem>
                  <a
                    className={location.pathname === "/admin/productos" ? "active-link" : ""}
                    onClick={() => navigate("/admin/productos")}
                  >
                    Productos
                  </a>
                </ListItem>

                <ListItem>
                  <a
                    className={location.pathname === "/admin/sesiones" ? "active-link" : ""}
                    onClick={() => navigate("/admin/sesiones")}
                  >
                    Sesiones
                  </a>
                </ListItem>

                <ListItem>
                  <a
                    className={location.pathname === "/admin/promociones" ? "active-link" : ""}
                    onClick={() => navigate("/admin/promociones")}
                  >
                    Promociones
                  </a>
                </ListItem>

                <ListItem>
                  <a
                    className={location.pathname === "/admin/usuarios" ? "active-link" : ""}
                    onClick={() => navigate("/admin/usuarios")}
                  >
                    Usuarios
                  </a>
                </ListItem>
              </Box>
            }
          </UnorderedList>

          <a
            className="text-center mt-auto cursor-pointer hover:bg-[#85CB3350]"
            onClick={() => handleLogout()}
          >
            Cerrar Sesión
          </a>
        </Flex>
      </GridItem>
      
      {/*MAIN*/}
      <GridItem as="main" colSpan={{base: 6, xl: 5}} p={4}>
        {children}
      </GridItem>
    </Grid>
  )
}

// Validacion de props
Navbar.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Navbar