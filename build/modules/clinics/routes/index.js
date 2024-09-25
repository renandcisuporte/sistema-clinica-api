"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerClinics = void 0;
const prisma_1 = __importDefault(require("@/database/prisma"));
const express_1 = require("express");
const clinics_prisma_1 = require("../repositories/prisma/clinics-prisma");
const find_all_clinics_controller_1 = require("../use-cases/find-all-clinics.controller");
const find_all_clinics_use_case_1 = require("../use-cases/find-all-clinics.use-case");
const find_first_clinics_use_case_1 = require("../use-cases/find-first-clinics.use-case");
const find_firts_clinics_controller_1 = require("../use-cases/find-firts-clinics.controller");
const routerClinics = (0, express_1.Router)();
exports.routerClinics = routerClinics;
const clinicsRepository = new clinics_prisma_1.ClinicsRepository(prisma_1.default);
const findAllClinicsController = new find_all_clinics_controller_1.FindAllClinicsController(new find_all_clinics_use_case_1.FindAllClinicsUseCase(clinicsRepository));
const findFirstClinicsController = new find_firts_clinics_controller_1.FindFirstClinicsController(new find_first_clinics_use_case_1.FindFirstClinicsUseCase(clinicsRepository));
routerClinics
    .get('/', (req, rep) => findAllClinicsController.handle(req, rep))
    .get('/:code', (req, rep) => findFirstClinicsController.handle(req, rep));
