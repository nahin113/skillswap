import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { admin } from "better-auth/plugins";

const client = new MongoClient(process.env.MONGODB_URI);
const db = client.db("skillswap_db");

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client,
  }),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENTID,
      clientSecret: process.env.GOOGLE_SECRET,
    },
  },
  user: {
    additionalFields: {
      accountType: {
        // <-- Use a custom field name to avoid conflicts
        type: "string", // <-- Required by Better Auth
        required: false,
        default: "client",
      },
      bio: {
        type: "string",
        required: false,
      },
      rate: {
        type: "int",
        required: false,
      },
      skills: {
        type: "array",
        required: false,
      },
      // Note: If you plan to pass arrays, MongoDB handles it well,
      // but ensure your Better Auth client is configured to accept it.
    },
  },
  databaseHooks: {
    user: {
      create: {
        before: async (user) => {
          return {
            data: {
              ...user,
              // If accountType is missing or blank (like on Google Sign-In), force it to default to "client"
              accountType: user.accountType || "client",
            },
          };
        },
      },
    },
  },
  plugins: [admin()],
});
