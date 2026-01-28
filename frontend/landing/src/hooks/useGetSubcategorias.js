import { useToast } from '@chakra-ui/react';
import { getAllSubcategories } from '../services/api';
import useQuery from './useQuery';
import { showErrorToastify } from 'utils';

const useGetSubcategorias = () => {
  const toast = useToast();

  const { data, refetch } = useQuery({
    autoFetch: true,
    queryFn: getAllSubcategories,
    onError: (err) => showErrorToastify({ toast, err }),
  });

  const subcategorias = data?.data?.subcategorias;
  const subcategoriasOptions = subcategorias?.map(s => ({
    value: s.id,
    label: s.nombre,
  }));

  return {
    subcategorias,
    subcategoriasOptions,
    fetchSubcategorias: refetch,
  }
}

export default useGetSubcategorias;