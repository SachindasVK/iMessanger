import { getAuth, clerkClient } from "@clerk/express";
import User from "../models/User.js";

export const protectRoute = async (req, res, next) => {
  try {
    const { userId } = getAuth(req);

    if (!userId) {
      res.status(401).json({ message: "unauthorized" });
      return;
    }

    let user = await User.findOne({ clerkId: userId });

    if (!user) {
      const clerkUser = await clerkClient.users.getUser(userId);

      const email =
        clerkUser.emailAddresses?.find(
          (e) => e.id === clerkUser.primaryEmailAddressId,
        )?.emailAddress ?? clerkUser.emailAddresses?.[0]?.emailAddress;

      const fullName =
        [clerkUser.firstName, clerkUser.lastName].filter(Boolean).join(" ") ||
        clerkUser.username ||
        email?.split("@")[0] ||
        "User";

      user = await User.create({
        clerkId: userId,
        email,
        fullName,
        profilePic: clerkUser.imageUrl || "",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Error in protectRoute middleware", error.message);
    res.status(500).json({ message: "something went wrong" });
  }
};
