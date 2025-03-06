"use strict";
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Event = void 0;
var graphql_1 = require("@nestjs/graphql");
var order_entity_1 = require("src/order/entities/order.entity");
var typeorm_1 = require("typeorm");
var Event = function () {
    var _classDecorators = [(0, graphql_1.ObjectType)(), (0, typeorm_1.Entity)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _id_decorators;
    var _id_initializers = [];
    var _id_extraInitializers = [];
    var _name_decorators;
    var _name_initializers = [];
    var _name_extraInitializers = [];
    var _date_decorators;
    var _date_initializers = [];
    var _date_extraInitializers = [];
    var _ticketsAvailable_decorators;
    var _ticketsAvailable_initializers = [];
    var _ticketsAvailable_extraInitializers = [];
    var _orders_decorators;
    var _orders_initializers = [];
    var _orders_extraInitializers = [];
    var Event = _classThis = /** @class */ (function () {
        function Event_1() {
            this.id = __runInitializers(this, _id_initializers, void 0);
            this.name = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _name_initializers, void 0));
            this.date = (__runInitializers(this, _name_extraInitializers), __runInitializers(this, _date_initializers, void 0));
            this.ticketsAvailable = (__runInitializers(this, _date_extraInitializers), __runInitializers(this, _ticketsAvailable_initializers, void 0));
            this.orders = (__runInitializers(this, _ticketsAvailable_extraInitializers), __runInitializers(this, _orders_initializers, void 0));
            __runInitializers(this, _orders_extraInitializers);
        }
        return Event_1;
    }());
    __setFunctionName(_classThis, "Event");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _id_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Int; }), (0, typeorm_1.PrimaryGeneratedColumn)()];
        _name_decorators = [(0, graphql_1.Field)(), (0, typeorm_1.Column)()];
        _date_decorators = [(0, graphql_1.Field)(), (0, typeorm_1.Column)()];
        _ticketsAvailable_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Int; }), (0, typeorm_1.Column)()];
        _orders_decorators = [(0, graphql_1.Field)(function () { return [order_entity_1.Order]; }), (0, typeorm_1.OneToMany)(function () { return order_entity_1.Order; }, function (order) { return order.event; })];
        __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: function (obj) { return "id" in obj; }, get: function (obj) { return obj.id; }, set: function (obj, value) { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
        __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: function (obj) { return "name" in obj; }, get: function (obj) { return obj.name; }, set: function (obj, value) { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
        __esDecorate(null, null, _date_decorators, { kind: "field", name: "date", static: false, private: false, access: { has: function (obj) { return "date" in obj; }, get: function (obj) { return obj.date; }, set: function (obj, value) { obj.date = value; } }, metadata: _metadata }, _date_initializers, _date_extraInitializers);
        __esDecorate(null, null, _ticketsAvailable_decorators, { kind: "field", name: "ticketsAvailable", static: false, private: false, access: { has: function (obj) { return "ticketsAvailable" in obj; }, get: function (obj) { return obj.ticketsAvailable; }, set: function (obj, value) { obj.ticketsAvailable = value; } }, metadata: _metadata }, _ticketsAvailable_initializers, _ticketsAvailable_extraInitializers);
        __esDecorate(null, null, _orders_decorators, { kind: "field", name: "orders", static: false, private: false, access: { has: function (obj) { return "orders" in obj; }, get: function (obj) { return obj.orders; }, set: function (obj, value) { obj.orders = value; } }, metadata: _metadata }, _orders_initializers, _orders_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Event = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Event = _classThis;
}();
exports.Event = Event;
