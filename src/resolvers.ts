import { IResolvers } from "graphql-middleware/dist/types";
import { GraphQLBoolean } from "graphql";
import { v1 } from "uuid";
import { User } from "./entities/User";
import { chainResolvers } from "graphql-tools";
import { getRepository } from "typeorm";
import { getOrMakeOneUpUserId } from "./oneup";

const ONEUP_DEMOWEBAPPLOCAL_CLIENTID =
  process.env.ONEUP_DEMOWEBAPPLOCAL_CLIENTID;
const ONEUP_DEMOWEBAPPLOCAL_CLIENTSECRET =
  process.env.ONEUP_DEMOWEBAPPLOCAL_CLIENTSECRET;

export const resolvers: IResolvers = {
  //   Mutation: {
  //     register: (
  //       _: any,
  //       { email, password }: GQL.IRegisterOnMutationArguments
  //     ) => {
  //       User.create({
  //         email,
  //         password
  //       }).save();
  //       return true;
  //     }
  //   },
  Query: {
    dupa: async () => {
      const z = await User.findOne();
      console.log(z);
      return z;
    }
  },
  Mutation: {
    createUser: (_: any, { id, email }: any) => {
      console.log("dupa");
      getOrMakeOneUpUserId(email).then(x => {
        console.log("dupadupaxxx", x);
      });
      return User.create({
        id: v1(),
        email: "dupa"
      });
      // .then(user => user.save())
      // .catch(err => {
      //   throw new Error("dupa");
      // });
    }
  }
};
