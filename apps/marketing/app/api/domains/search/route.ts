import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get("query") || "example"

  const results = [
    { domain: `${query}.ai`, available: true, price: 24.99, currency: "USD" },
    { domain: `${query}.com`, available: false, price: 12.99, currency: "USD" },
    { domain: `${query}.studio`, available: true, price: 9.99, currency: "USD" },
    { domain: `${query}.dev`, available: true, price: 14.99, currency: "USD" },
  ]

  return NextResponse.json({ query, results })
}

// TODO: Integrate with real domain search provider.
