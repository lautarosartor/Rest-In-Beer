import { CloseIcon, SearchIcon } from "@chakra-ui/icons"
import { Button, Input, InputGroup, InputRightElement } from "@chakra-ui/react"
import PropTypes from "prop-types";
import { useState } from "react"

function InputBusqueda({ onSearch }) {
  const [query, setQuery] = useState("");
  const [show, setShow] = useState(false);

  const handleSearch = () => {
    if (show) {
      setQuery("");
      onSearch("");
    }
    else {
      onSearch(query);
    }
    setShow(!show);
  }

  return (
    <InputGroup width={250}>
      <Input
        pr='3rem'
        name="query"
        type="text"
        placeholder='Búsqueda'
        onChange={(e) => setQuery(e.target.value)}
      />
      <InputRightElement width='3rem'>
        <Button h='2rem' size='sm' onClick={handleSearch} isDisabled={!query}>
          {show
            ? <CloseIcon />
            : <SearchIcon />
          }
        </Button>
      </InputRightElement>
    </InputGroup>
  )
}

// Validacion de props
InputBusqueda.propTypes = {
  onSearch: PropTypes.string,
};

export default InputBusqueda