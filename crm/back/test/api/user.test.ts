import request from "supertest";
import app from "../../src/infrastructure/server";

describe("User API Endpoints", () => {
    describe("POST /api/user/register", () => {
        it("should register a new user", async () => {
            const res = await request(app).post("/api/user/register").send({
                firstName: "Test",
                email: "test@example.com",
                password: "password123",
                passwordConfirm: "password123",
            });

            expect(res.statusCode).toEqual(201);
            expect(res.body.message).toEqual("User registration successful");
        });

        it("should return 400 if required fields are missing", async () => {
            const res = await request(app).post("/api/user/register").send({
                firstName: "Test",
                email: "test@example.com",
            });

            expect(res.statusCode).toEqual(400);
            expect(res.body.message).toEqual("All fields are required.");
        });

        it("should return 400 if passwords do not match", async () => {
            const res = await request(app).post("/api/user/register").send({
                firstName: "Test",
                email: "test@example.com",
                password: "password123",
                passwordConfirm: "differentPassword",
            });

            expect(res.statusCode).toEqual(400);
            expect(res.body.message).toEqual("Passwords do not match.");
        });

        // it("should return 500 if internal server error", async () => {
        //     // Simulate internal error
        //     jest.spyOn(console, "error").mockImplementation(() => {});
        //     const res = await request(app).post("/api/user/register").send({
        //         firstName: undefined,
        //         email: "test@example.com",
        //         password: "password123",
        //         passwordConfirm: "password123",
        //     });

        //     expect(res.statusCode).toEqual(500);
        //     expect(res.body.message).toBeTruthy();
        //     jest.restoreAllMocks();
        // });
    });

    describe("POST /api/user/login", () => {
        it("should log in a user", async () => {
            const res = await request(app).post("/api/user/login").send({
                email: "test@example.com",
                password: "password123",
            });

            expect(res.statusCode).toEqual(200);
            expect(res.body.message).toEqual("Login successful");
            expect(res.body.userToken).toBeTruthy();
            expect(res.body.firstName).toBeTruthy();
        });

        it("should return 400 if email or password is missing", async () => {
            const res = await request(app).post("/api/user/login").send({
                email: "test@example.com",
            });

            expect(res.statusCode).toEqual(400);
            expect(res.body.message).toEqual(
                "Email and password are required."
            );
        });

        // it("should return 500 if internal server error", async () => {
        //     // Simulate internal error
        //     jest.spyOn(console, "error").mockImplementation(() => {});
        //     const res = await request(app).post("/api/user/login").send({
        //         email: undefined,
        //         password: "password123",
        //     });

        //     expect(res.statusCode).toEqual(500);
        //     expect(res.body.message).toBeTruthy();
        //     jest.restoreAllMocks();
        // });
    });

    describe("GET /api/user/profile", () => {
        it("should get user profile", async () => {
            const res = await request(app).get("/api/user/profile");

            expect(res.statusCode).toEqual(200);
            expect(res.body.firstName).toBeTruthy();
        });
        // it("should return 500 if internal server error", async () => {
        //     // Simulate internal error
        //     jest.spyOn(console, "error").mockImplementation(() => {});
        //     jest.spyOn(
        //         require("../../src/controllers/userController"),
        //         "getUserProfile"
        //     ).mockImplementation(() => {
        //         throw new Error("Fake error");
        //     });
        //     const res = await request(app).get("/api/user/profile");

        //     expect(res.statusCode).toEqual(500);
        //     expect(res.body.message).toBeTruthy();
        //     jest.restoreAllMocks();
        // });
    });
});
