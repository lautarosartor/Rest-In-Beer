import { AddIcon } from "@chakra-ui/icons"
import { Button } from "@chakra-ui/react"

function BtnAgregar({...props}) {
  return (
    <Button {...props} leftIcon={<AddIcon />} variant='solid' colorScheme='green'>
      Agregar
    </Button>
  )
}

export default BtnAgregar