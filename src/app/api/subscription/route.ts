// import { auth } from "@clerk/nextjs/server";
// import { NextResponse } from "next/server";
// import prismadb from "@/lib/prismadb";
// import { addMonths } from "date-fns";

// export async function POST(req: Request) {
//   const { userId, redirectToSignIn } = await auth();
//   if (!userId) return redirectToSignIn();

//   try {
//     const userSubscription = await prismadb.userSubscription.findFirst({
//       where: {
//         userId: userId,
//         isActive: true,
//       },
//     });
//     if (!userSubscription) {
//       await prismadb.userSubscription.create({
//         data: {
//           userId: userId,
//           plan: "FREE",
//           credits: 5,
//           isActive: true,
//           endDate: addMonths(new Date(), 1),
//         },
//       });
//     }
//     return new NextResponse("OK");
//   } catch (error) {
//     console.error("[CODE_ROUTE] Error:", error);
//     return new NextResponse("Internal Server Error", { status: 500 });
//   }
// }
