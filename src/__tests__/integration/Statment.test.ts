import request from 'supertest';
import { getConnection } from 'typeorm';
import { app } from '../../app';
import { format } from 'date-fns'

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
  });

  it("Should be able to create a deposit", async () => {
    const customerResponse = await request(app).post("/account")
      .send({
        name: "Random name",
        cpf
      });

    expect(customerResponse.status).toBe(201);
    expect(customerResponse.body).toHaveProperty("id");

    const response = await request(app).post("/deposit")
      .set({
        cpf
      })
      .send({
        "description": "Depósito do Ignite III",
        "amount": 1500.00,
        "type": "credit"
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
  });

  it("Should be able to create a withdraw", async () => {
    const response = await request(app).post("/withdraw")
      .set({
        cpf
      })
      .send({
        "description": "Pagamento do Ignite III",
        "amount": 1500.00,
        "type": "debit"
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
  });

  it("Should be able to get all statments by customer", async () => {
    const response = await request(app)
      .get("/statment")
      .set({
        cpf
      });

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(2);
  });

  it("Should be able to get statments by date and customer", async () => {
    const response = await request(app)
      .get("/statment/date")
      .set({
        cpf
      })
      .query({
        date: format(new Date(), 'yyyy-MM-dd')
      });

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(2);
  });
});