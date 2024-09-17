import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useUserContext } from '../context/UserContext';
import { addCart, getCart, removeCart, updateCart } from '../api/firebase';

export default function useCart() {
  const queryClient = useQueryClient();
  const { uid } = useUserContext();

  const cartQuery = useQuery({
    queryKey: ['cart', uid || ''],
    queryFn: () => getCart(uid),
    enabled: Boolean(uid),
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
  });

  const addCartMutation = useMutation({
    mutationFn: ({uid, productId, productInfo}) => addCart(uid, productId, productInfo),
    onSuccess: () => queryClient.invalidateQueries({queryKey: ['cart', uid || '']}),
  })

  const updateCartMutation = useMutation({
    mutationKey: ['cart', uid || ''],
    mutationFn: ({uid, cartInfo}) => updateCart(uid, cartInfo),
    onSuccess: () => queryClient.invalidateQueries({queryKey: ['cart', uid || '']}),
  })

  const removeCartMutation = useMutation({
    mutationKey: ['cart', uid || ''],
    mutationFn: ({uid, productId}) => removeCart(uid, productId),
    onSuccess: () => queryClient.invalidateQueries({queryKey: ['cart', uid || '']}),
  })

  return { cartQuery, addCartMutation, updateCartMutation, removeCartMutation };
}

