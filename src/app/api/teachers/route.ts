// // src/app/api/teachers/route.ts
// import { prisma } from "@/lib/db"
// import { NextRequest, NextResponse } from "next/server"
// import { getServerSession } from "next-auth"
// import { authOptions } from "@/lib/auth"

// export async function GET() {
//   try {
//     const session = await getServerSession(authOptions)
    
//     if (!session || session.user.role !== "ADMIN") {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
//     }

//     const teachers = await prisma.teacherProfile.findMany({
//       include: {
//         user: true,
//         subjects: {
//           include: {
//             class: true,
//           },
//         },
//       },
//     })

//     return NextResponse.json(teachers)
//   } catch (error) {
//     console.error("Error fetching teachers:", error)
//     return NextResponse.json(
//       { error: "Internal server error" },
//       { status: 500 }
//     )
//   }
// }

// export async function POST(request: NextRequest) {
//   try {
//     const session = await getServerSession(authOptions)
    
//     if (!session || session.user.role !== "ADMIN") {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
//     }

//     const { email, name } = await request.json()

//     // Create user and teacher profile in a transaction
//     const teacher = await prisma.$transaction(async (tx) => {
//       // First create the user
//       const user = await tx.user.create({
//         data: {
//           email,
//           name,
//           role: "TEACHER",
//         },
//       })

//       // Then create the teacher profile
//       return await tx.teacherProfile.create({
//         data: {
//           userId: user.id,
//         },
//         include: {
//           user: true,
//         },
//       })
//     })

//     return NextResponse.json(teacher, { status: 201 })
//   } catch (error) {
//     console.error("Error creating teacher:", error)
//     return NextResponse.json(
//       { error: "Internal server error" },
//       { status: 500 }
//     )
//   }
// }