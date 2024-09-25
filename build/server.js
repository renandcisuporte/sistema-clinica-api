"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const application_1 = __importDefault(require("./application"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
require("./routes");
const PORT = process.env.PORT || 9000;
application_1.default.use('/docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(undefined, {
    swaggerOptions: {
        url: '/swagger.json'
    }
}));
application_1.default.listen(PORT, () => console.log(`Server is runing port http://localhost:${PORT}`));
