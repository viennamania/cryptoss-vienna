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

  const {
    clientid,
    agentcode,
    storecode,
    limit,
    page,
    walletAddress,
    searchMyOrders,
    searchOrderStatusCancelled,
    searchOrderStatusCompleted,

    searchStoreName,

    privateSale,

    searchBuyer,
    searchDepositName,

    searchStoreBankAccountNumber,

    fromDate,
    toDate,


  } = body;


  console.log("getAllBuyOrders fromDate", fromDate);
  console.log("getAllBuyOrders toDate", toDate);



  

  ///console.log("getAllBuyOrders body", body);



  // when fromDate is "" or undefined, set it to 30 days ago
  if (!fromDate || fromDate === "") {
    const date = new Date();
    date.setDate(date.getDate() - 30);
    body.fromDate = date.toISOString().split("T")[0]; // YYYY-MM-DD format
  }

  // when toDate is "" or undefined, set it to today
  if (!toDate || toDate === "") {
    const date = new Date();
    body.toDate = date.toISOString().split("T")[0]; // YYYY-MM-DD format
  }


  const stableUrl = clientid === "213e1813510d42bf66a4136dcc90b032" ? stableUrl1
    : clientid === "95034cfeb204ef7777ecfe26c110a6ca" ? stableUrl2
    : clientid === "95034cfeb204ef7777ecfe26c110a6ca" ? stableUrl3
    : clientid === "95034cfeb204ef7777ecfe26c110a6ca" ? stableUrl4
    : clientid === "95034cfeb204ef7777ecfe26c110a6ca" ? stableUrl5
    : clientid === "95034cfeb204ef7777ecfe26c110a6ca" ? stableUrl6
    : stableUrl1; // default to stableUrl1 if no match


  // call api
  const apiUrl = `${stableUrl}/api/order/getAllBuyOrders`;


  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching buy orders:", error);
    return NextResponse.json({ error: "Failed to fetch buy orders" }, { status: 500 });
  }
  
}
