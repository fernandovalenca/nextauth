import { v4 as uuid } from "uuid";

type SignInRequestData = {
  email: string;
  password: string;
};

type RecoverUserInformation = {
  token: string;
};

const delay = (amount = 750) => new Promise((resolve) => setTimeout(resolve, amount));

export const signInRequest = async ({ email, password }: SignInRequestData) => {
  await delay();

  return {
    token: uuid(),
    user: {
      name: "Fernando Valença",
      email: "fernandovalenca@gmail.com",
      avatar_url: "https://github.com/fernandovalenca.png",
    },
  };
};

export const recoverUserInformation = async ({ token }: RecoverUserInformation) => {
  await delay();

  return {
    user: {
      name: "Fernando Valença",
      email: "fernandovalenca@gmail.com",
      avatar_url: "https://github.com/fernandovalenca.png",
    },
  };
};
