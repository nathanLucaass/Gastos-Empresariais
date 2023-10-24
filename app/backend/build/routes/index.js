"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userRoutes_1 = require("./userRoutes");
const router = (0, express_1.Router)();
router.use('/user', userRoutes_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map