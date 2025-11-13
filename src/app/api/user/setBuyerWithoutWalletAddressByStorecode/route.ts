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
    storecode,
    walletAddress,
    userCode,
    userPassword,
    userName,
    userBankName,
    userBankAccountNumber,
    userType,
  } = body;


  console.log("setBuyerWithoutWalletAddressByStorecode request body:", body);

  
  const stableUrl = clientid === "213e1813510d42bf66a4136dcc90b032" ? stableUrl1
    : clientid === "95034cfeb204ef7777ecfe26c110a6ca" ? stableUrl2
    : clientid === "5940b4b6011fd9f3302f40912883c1fc" ? stableUrl3
    : clientid === "95034cfeb204ef7777ecfe26c110a6ca" ? stableUrl4
    : clientid === "95034cfeb204ef7777ecfe26c110a6ca" ? stableUrl5
    : clientid === "95034cfeb204ef7777ecfe26c110a6ca" ? stableUrl6
    : stableUrl1; // default to stableUrl1 if no match

    
  // call api

  const apiUrl = `${stableUrl}/api/user/setBuyerWithoutWalletAddressByStorecode`;
  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        storecode,
        walletAddress,
        userCode,
        userPassword,
        userName,
        userBankName,
        userBankAccountNumber,
        userType,
      }),
    });
    const data = await response.json();

    
    //console.log("API response:", data);


    return NextResponse.json(data);

  } catch (error) {
    console.error("Error fetching user data:", error);
    return NextResponse.json({ error: "Failed to fetch user data" }, { status: 500 });
  }

  
}
