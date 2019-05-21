"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
class UsuariosController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const usuarios = yield database_1.default.query('SELECT * FROM USUARIO');
            res.json(usuarios);
        });
    }
    getOne(req, res) {
        res.json({ text: 'este es el usuario' + req.params.id });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('INSERT INTO USUARIO set ?', [req.body]);
            res.json({ message: 'usuario guardado' });
        });
    }
    delete(req, res) {
        res.json({ text: 'eliminando un usuario' });
    }
    update(req, res) {
        res.json({ text: 'actualizando un usuario' + req.params.id });
    }
}
exports.usuariosController = new UsuariosController();
