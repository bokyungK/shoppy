import { useQuery } from '@tanstack/react-query'
import { getDetailProduct } from "../api/firebase";

export default function useItem({ state, productId }) {
  const itemQuery = useQuery({
    queryKey: ['item', !state || ''],
    queryFn: () => getDetailProduct(productId),
    enabled: Boolean(!state),
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
  })

  return { itemQuery };
}

