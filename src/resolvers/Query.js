import getUserId from "../utils/getUserId";

const Query = {
  users: (parent, { query, skip, first, after, orderBy }, { prisma }, info) => {
    const operationArgs = {
      skip,
      first,
      after,
      orderBy
    };

    if (query) {
      operationArgs.where = {
        OR: [{ name_contains: query }]
      };
    }

    return prisma.query.users(operationArgs, info);
  },
  me: async (parent, arg, { prisma, req }, info) => {
    const userId = getUserId(req);
    return await prisma.query.user({ where: { id: userId } });
  }
};

export default Query;
