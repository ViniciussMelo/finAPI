import { EntityRepository, Repository } from "typeorm";
import { Statment } from "../models/Statment";

@EntityRepository(Statment)
class StatmentRepository extends Repository<Statment> {
}

export { StatmentRepository }