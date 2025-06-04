import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      name: string;
      email: string;
      avatar?: string;
    };
    userToken?: string;
  }

  interface JWT {
    name: string;
    email: string;
    avatar?: string;
    userToken?: string;
  }

  interface User {
    name: string;
    email: string;
    avatar?: string;
    userToken?: string;
  }
}
