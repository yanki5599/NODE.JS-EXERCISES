var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { isUserIdExist } from "../services/usersService.js";
import { MissingToken, } from "../ErrorsModels/errorTypes.js";
export const authenticateId = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userid = req.body.userid || req.query.userid;
        if (!userid) {
            throw new MissingToken();
        }
        // check if the userid is in the database
        if (!(yield isUserIdExist(userid))) {
            throw new MissingToken("invalid token (userid)");
            return;
        }
    }
    catch (err) {
        next(err);
    }
    next();
});
