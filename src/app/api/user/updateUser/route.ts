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

  const { clientid, storecode, walletAddress, nickname } = body;

  console.log("walletAddress", walletAddress);
  console.log("nickname", nickname);

  const stableUrl = clientid === "9ed089930921bfaa1bf65aff9a75fc41" ? stableUrl1
    : stableUrl1; // default to stableUrl1 if no match


    
  // call api
  const apiUrl = `${stableUrl}/api/user/updateUser`;
  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        storecode,
        walletAddress,
        nickname
      }),
    });
    const data = await response.json();

    //console.log("API response:", data);

    return NextResponse.json({
      result: data,
    });

  } catch (error) {
    console.error("Error calling API:", error);
    return NextResponse.json({
      error: "Failed to update user",
    }, { status: 500 });
  }
  
}
