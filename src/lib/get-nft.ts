export const getNft = async (seq: string) => {
  const res = await fetch("http://localhost:3000/api/get-nft", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ seq }),
  });

  return await res.json();
};
