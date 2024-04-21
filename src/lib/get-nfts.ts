export const getNfts = async () => {
  const response = await fetch("http://localhost:3000/api/get-nfts", {
    method: "POST",
    cache: "no-store",
    body: JSON.stringify({}),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch nfts data");
  }

  return response.json();
};
