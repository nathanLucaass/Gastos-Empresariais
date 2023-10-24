import { Request, Response, Router } from 'express'
import BillController from '../controller/BillController'
import NewBillValidator from '../middlewares/newBillValidator'

const billController = new BillController();
const router = Router();

router.post('/new', NewBillValidator, (req: Request, res: Response) => billController.createBill(req, res));

export default router;