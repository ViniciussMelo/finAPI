import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { AppError } from "../errors/AppError";
import { CustomerRepository } from "../repositories/CustomerRepository";
import BalanceService from "../services/BalanceService";

class CustomerController {
  async create(request: Request, response: Response) {
    const { cpf, name } = request.body;
    const customerRepository = getCustomRepository(CustomerRepository);

    const customer = customerRepository.create({
      cpf,
      name
    });

    const customerAlreadyExists = await customerRepository.customerExists(cpf);

    if (customerAlreadyExists) {
      throw new AppError('Customer already exists!');
    }

    await customerRepository.save(customer);

    return response.status(201).json(customer);
  }

  async index(request: Request, response: Response) {
    const customerRepository = getCustomRepository(CustomerRepository);

    const customers = await customerRepository.find();

    return response.json(customers);
  }

  async update(request: Request, response: Response) {
    const { name } = request.body;
    const { customer } = request;
    const customerRepository = getCustomRepository(CustomerRepository);

    customer.name = name;
    await customerRepository.save(customer);

    return response.json(customer);
  }

  async delete(request: Request, response: Response) {
    const { customer } = request;
    const customerRepository = getCustomRepository(CustomerRepository);

    await customerRepository.delete(customer);

    return response.status(200).send();
  }

  async balance(request: Request, response: Response) {
    const { customer } = request;
    const balance = await BalanceService.getBalance(customer.id);

    return response.json(balance);
  }
}

export { CustomerController }