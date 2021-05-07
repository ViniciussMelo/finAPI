import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { StatmentRepository } from "../repositories/StatmentRepository";

class StatmentController {
  async create(request: Request, response: Response) {
    const { description, amount, type } = request.body;
    const { customer } = request;

    const statmentRepository = getCustomRepository(StatmentRepository);

    const statment = statmentRepository.create({
      description,
      amount,
      type,
      customer_id: customer.id
    });

    await statmentRepository.save(statment);

    return response.status(201).json(customer);
  }

  async index(request: Request, response: Response) {
    const { customer } = request;
    const statmentRepository = getCustomRepository(StatmentRepository);
    const statments = await statmentRepository.find({ where: { customer_id: customer.id } });

    return response.json(statments);
  }
}

export { StatmentController }