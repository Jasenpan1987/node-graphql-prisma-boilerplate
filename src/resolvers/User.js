import getUserId from "../utils/getUserId";

const userIdFragment = `
fragment userId on User {
  id
}
`;

// field resolver
const User = {
  email: {
    fragment: userIdFragment,
    resolve: (parent, args, { prisma, req }, info) => {
      const userId = getUserId(req, false);
      if (parent.id === userId) {
        return parent.email;
      }
      return null;
    }
  }
};

export default User;
