import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { AppError } from "../errors/AppError";
import { CustomerRepository } from "../repositories/CustomerRepository";

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
}

export { CustomerController }