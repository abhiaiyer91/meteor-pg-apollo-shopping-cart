export default function dispatchCartMutation(productId, mutation, refetch) {
  return mutation(`${productId}`).then(() => {
    if (refetch) {
      return refetch();
    }
  });
}
