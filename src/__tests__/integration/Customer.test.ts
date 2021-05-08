import request from 'supertest';
import { getConnection } from 'typeorm';
import { app } from '../../app';

import createConnection from "../../database";

describe("Customer", () => {
  const cpf = "12345678912";

  beforeAll(async () => {
    const connection = await createConnection();
    await connection.runMigrations();
  });

  afterAll(async () => {
    const connection = getConnection();
    await connection.dropDatabase();
    await connection.close();
  })

  it("Should be able to create a new customer", async () => {
    const response = await request(app).post("/account")
      .send({
        name: "Random name",
        cpf
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
  });

  it("Should be able to get all customers", async () => {
    const response = await request(app).get("/account");

    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it("Should be able to update a customer", async () => {
    const newName = "Random name II";
    const response = await request(app)
      .put("/account")
      .set({
        cpf
      })
      .send({
        name: newName,
      });

    expect(response.status).toBe(200);
    expect(response.body.name).toMatch(newName);
  });

  it("Should be able to get a balance", async () => {
    const response = await request(app)
      .get("/balance")
      .set({
        cpf
      });

    expect(response.status).toBe(200);
  });

  it("Should be able to delete a customer", async () => {
    const response = await request(app)
      .delete("/account")
      .set({
        cpf
      });

    expect(response.status).toBe(200);

    const getResponse = await request(app).get("/account");

    expect(getResponse.body.length).toBe(0);
  });
});