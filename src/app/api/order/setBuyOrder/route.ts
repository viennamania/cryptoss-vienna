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
    nickname,
    usdtAmount,
    krwAmount,
    rate,
    privateSale,
    buyer
  } = body;




  // api call

  try {

    const stableUrl = clientid === "213e1813510d42bf66a4136dcc90b032" ? stableUrl1
      : clientid === "95034cfeb204ef7777ecfe26c110a6ca" ? stableUrl2
      : clientid === "5940b4b6011fd9f3302f40912883c1fc" ? stableUrl3
      : clientid === "95034cfeb204ef7777ecfe26c110a6ca" ? stableUrl4
      : clientid === "95034cfeb204ef7777ecfe26c110a6ca" ? stableUrl5
      : clientid === "95034cfeb204ef7777ecfe26c110a6ca" ? stableUrl6
      : stableUrl1; // default to stableUrl1 if no match


      
    const apiUrl = `${stableUrl}/api/order/setBuyOrder`;
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        storecode,
        walletAddress,
        nickname,
        usdtAmount,
        krwAmount,
        rate,
        privateSale,
        buyer
      }),
    });



    if (!response.ok) {
      
      console.error("Failed to insert buy order:", response.status, response.statusText);
      console.error("Response body:", await response.text());

      
      //const errorData = await response.json();


      return NextResponse.json({
        result: null,
        error: `Failed to insert buy order: ${response.status} ${response.statusText}`,
      }, { status: response.status });
      

    }

    const result = await response.json();
    console.log("setBuyOrder =====  result", result);

    /*
    {
      result: {
        _id: '6843c74d7861b46551a752f2',
        walletAddress: '0x42bFaD5BC8B3469B57604Ef72b92d0fa218E60dC'
      }
    }
    */


    return NextResponse.json({
      result: result.result,
    });


  } catch (error) {
    console.error("Error in setBuyOrder:", error);
    return NextResponse.json({
      result: null,
      error: "Failed to insert buy order",
    }, { status: 500 });
  }


  
}
