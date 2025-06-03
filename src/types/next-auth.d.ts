import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      email: string;
      avatar?: string;
    };
    userToken?: string;
  }

  interface JWT {
    email: string;
    avatar?: string;
    userToken?: string;
  }

  interface User {
    email: string;
    avatar?: string;
    userToken?: string;
  }
}
