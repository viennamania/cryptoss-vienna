import { NextResponse, type NextRequest } from "next/server";

import {
  stableUrl1,
  stableUrl2,
  stableUrl3,
  stableUrl4,
  stableUrl5,
  stableUrl6,
} from "../../../config/stable";

export async function POST(request: NextRequest) {

  const body = await request.json();

  const{
    clientid,
    orderId,
  } = body;

  /*
  const result = await getOneBuyOrder({
    orderId: body.orderId,
    limit: 100,
    page: 1,
  });

 
  return NextResponse.json({

    result,
    
  });
  */

  const stableUrl = clientid === "9ed089930921bfaa1bf65aff9a75fc41" ? stableUrl1
    : clientid === "e44dd15d66fc317d1cc7e3f71975373d" ? stableUrl2
    : clientid === "421a733ddd491ddc0c2a7a8c4040d782" ? stableUrl3
    : clientid === "213e1813510d42bf66a4136dcc90b032" ? stableUrl4
    : clientid === "150b53f165222304af7c45dc45c73863" ? stableUrl5
    : clientid === "48c74c35d9afd606ea0329c61898fa00" ? stableUrl6
    : stableUrl1; // default to stableUrl1 if no match

  // api call to get order details
  const apiUrl = `${stableUrl}/api/order/getOneBuyOrder`;
  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        orderId: orderId,
        limit: 100,
        page: 1,
      }),
    });
    const data = await response.json();

    //console.log("API response:", data);

    return NextResponse.json({
      result: data.result,
    });

  } catch (error) {
    console.error("Error fetching order details:", error);
    return NextResponse.json({ error: "Failed to fetch order details" }, { status: 500 });
  }
  
}
