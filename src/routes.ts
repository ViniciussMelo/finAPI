import { Router } from 'express';
import { CustomerController } from './controllers/CustomerController';
import { StatmentController } from './controllers/StatmentController';
import { CustomerMiddleware } from './middlewares/CustomerMiddleware';

const router = Router();

const customerMiddleware = new CustomerMiddleware();

const customerController = new CustomerController();
const statmentController = new StatmentController();

router.post("/account", customerController.create);

router.post("/deposit", customerMiddleware.verifyIfExisitsAccountCPF, statmentController.create);
router.get("/statment", customerMiddleware.verifyIfExisitsAccountCPF, statmentController.index);

export { router };