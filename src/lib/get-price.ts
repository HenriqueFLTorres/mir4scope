export const getPrice = async () => {
  const response = await fetch("http://localhost:3000/api/get-price")

  if (!response.ok) {
    throw new Error("Failed to fetch price data")
  }

  return response.json()
}
