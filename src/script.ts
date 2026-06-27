import { prisma } from "./lib/prisma";

async function main() {
  // Create a new user with a post
  //   const user = await prisma.user.create({
  //     data: {
  //       name: "Alice",
  //       email: "alice3@prisma.io",
  //       posts: {
  //         create: {
  //           title: "Hello World",
  //           content: "This is my third post!",
  //           published: true,
  //         },
  //       },
  //     },
  //     include: {
  //       posts: true,
  //     },
  //   });

  const newPost = await prisma.post.create({
    data: {
      authorId: 4,
      title: "Duplicate Post",
      content: "This checking post as 4th user",
      published: true,
    },
  });
  console.log("Created user:", newPost);

  // Fetch all users with their posts
  const allUsers = await prisma.user.findMany({
    include: {
      posts: true,
    },
  });
  console.log("All users:", JSON.stringify(allUsers, null, 2));
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
