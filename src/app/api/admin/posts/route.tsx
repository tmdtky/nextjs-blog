import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient()

export const GET = async (request: NextRequest) => {
	try {
		const posts = await prisma.post.findMany({
			include: {
				postCategories: {
					include: {
						category: {
							select: {
								id: true,
								name: true,
							},
						},
					},
				},
			},
			orderBy: {
				createdAt: 'desc',
			},
		})

		return NextResponse.json({ status: 'OK', posts: posts }, { status: 200 })
	} catch (error ) {
		if (error instanceof Error)
			return NextResponse.json({ status: error.message}, { status: 400})
	}
}

export const POST = async (request: NextRequest) => {
  try {
    const { title, content, thumbnailUrl, categories } = await request.json()
     const post = await prisma.post.create({
      data: {
        title,
        content,
        thumbnailUrl,
        postCategories: {
          create: categories.map((category: { id: number }) => ({
            categoryId: category.id
          }))
        }
      }
    })

    return NextResponse.json({ id: post.id }, { status: 201 })
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json({ status: error.message }, { status: 400 })
  }
}