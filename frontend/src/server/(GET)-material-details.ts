"use client"

export default async function servicesGetMaterialDetails(
  materialId: string
) {
  const token = localStorage.getItem("token")

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/medconnect/mat_med/${materialId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  )

  if (!response.ok) {
    return {
      isError: true,
      status: response.status,
    }
  }

  return await response.json()
}