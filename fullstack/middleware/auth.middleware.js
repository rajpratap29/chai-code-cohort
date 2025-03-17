import jwt from "jsonwebtoken";
export const isLoggedIn = async (req, res, next) => {
  try {
    console.log(req.cookies);
    let token = req.cookies?.token;
    console.log("Token found", token ? "YES" : "NO");

    if (!token) {
      console.log("No token found");
      return res.status(401).json({
        success: false,
        message: "Authentication Failed",
      });
    }

    const decoded = await jwt.verify(token, process.env.JWT_SECRET)

    console.log("Decoded data: ", decoded);
    req.user = decoded

    next();

  } catch (error) {
    console.log("Auth middleware failure");
    res.status(500).json({
        success: false,
        message: "Internal Server Error",
    })
  }
};
