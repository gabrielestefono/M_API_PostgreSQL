const fastify = require("fastify")
const BookingPostgreRepository = require("./bookings/BookingPostgreRepository")
const BookingService = require("./bookings/BookingService")
const BookingController = require("./bookings/BookingController")
const AuthService = require("./auth/AuthService")
const AuthController = require("./auth/AuthController")
const UserPostgreRepository = require("./auth/UserPostgreRepository")

const app = fastify({ logger: true })

const bookingPostgreRepository = new BookingPostgreRepository()
const bookingService = new BookingService(bookingPostgreRepository)
const bookingController = new BookingController(bookingService)
const userPostgreRepository = new UserPostgreRepository();
const authService = new AuthService(userPostgreRepository);
const authController = new AuthController(authService);

const authenticatedRouteOptions = {
  preHandler: async (request, reply) => {
    // Bearer seu-token....
    const token = request.headers.authorization?.replace(/^Bearer /, "");
    if (!token) reply.code(401).send({ message: "Unauthorized: token missing." });

    const user = await authService.verifyToken(token);
    if (!user) reply.code(404).send({ message: "Unauthorized: invalid token." });
    request.user = user;
  }
};

app.get("/hello", (request, reply) => {
  reply.send({ message: "Hello, world!!" })
})

app.get("/api/bookings", authenticatedRouteOptions, async (request, reply) => {
  const { code, body } = await bookingController.index(request)
  reply.code(code).send(body)
})

app.post("/api/bookings", authenticatedRouteOptions, async (request, reply) => {
  const { code, body } = await bookingController.save(request)
  reply.code(code).send(body)
});

app.post("/api/auth/register", async (request, reply) => {
  console.log(request)
  const { code, body } = await authController.register(request);
  reply.code(code).send(body);
});

app.post("/api/auth/login", async (request, reply) => {
  const { code, body } = await authController.login(request);
  reply.code(code).send(body);
});

module.exports = app