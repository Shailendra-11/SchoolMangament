import jwt from "jsonwebtoken"

const userLoggedIn = async (req, res, next) => {
     try {
          const { token } = req.cookies;
          if (!token) {
               return res.status(401).json({
                    message: "Token is empty",
                    success: false,
               });
          }
          const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
          console.log(`Decoded Token in Email :- ${decodedToken.email}`);
          console.log(`Decoded Token in _id :- ${decodedToken._id}`);

          req.user = decodedToken;

          next();


     } catch (error) {
          console.log("Internel server error :- ", error);
          return res.status(500).json({
               message: "Internel server error",
               success: false,
               error: error.message,
          });
     }
}

export default userLoggedIn;