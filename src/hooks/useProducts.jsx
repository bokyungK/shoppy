import { addProducts, getProducts } from "../api/firebase";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

export default function useProducts() {
  const queryClient = useQueryClient();

  const productsQuery = useQuery({
    queryKey: ['products'],
    queryFn: getProducts,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  })

  const addProductsMutation= useMutation({
    mutationFn: (product) => addProducts(product),
    onSuccess: () => queryClient.invalidateQueries({queryKey: ['products']}),
  })

  return { productsQuery, addProductsMutation };
}

