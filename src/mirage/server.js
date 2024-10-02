import { createServer, Model } from "miragejs";
import { API_ROUTES, CONSTANT } from "../utility/constant";

const seedsData = [
  {
    id: 1,
    name: "Bibeka Sigh",
    email: "Bibeka@example.com",
    role: "Developer",
  },
  {
    id: 2,
    name: "Manasi Gupta",
    email: "Manasi@example.com",
    role: "Tester",
  },
  {
    id: 3,
    name: "Jayant Garu",
    email: "jayanta@example.com",
    role: "Team Lead",
  },
  {
    id: 4,
    name: "Lokesh Barik",
    email: "lokesh@example.com",
    role: "Project Manager",
  },
  {
    id: 5,
    name: "Jone Machine",
    email: "Jone@example.com",
    role: "Project Manager",
  },
  {
    id: 6,
    name: "Ervin Howell",
    email: "Shanna@example.com",
    role: "Developer",
  },
  {
    id: 7,
    name: "Clementine Bauch",
    email: "Clementine@example.com",
    role: "Developer",
  },
  {
    id: 8,
    name: "Patricia Lebsack",
    email: "Patricia@example.com",
    role: "Developer",
  },
  {
    id: 9,
    name: "Chelsey Dietrich",
    email: "Chelsey@example.com",
    role: "Developer",
  },
  {
    id: 10,
    name: "Dennis Schulist",
    email: "Dennis@example.com",
    role: "Developer",
  },
];
export function makeServer() {
  createServer({
    models: {
      employee: Model,
    },
    seeds(server) {
      seedsData.forEach((element) => {
        server.create(CONSTANT.EMPLOYEE, element);
      });
    },
    routes() {
      this.namespace = "api";
      this.get(API_ROUTES.EMPLOYEES, (schema) => {
        return schema.all(CONSTANT.EMPLOYEE);
      });
      this.post(API_ROUTES.EMPLOYEES, (schema, request) => {
        const newEmployee = JSON.parse(request.requestBody);
        return schema.create(CONSTANT.EMPLOYEE, newEmployee);
      });
      this.put(API_ROUTES.EMPLOYEES_ID, (schema, request) => {
        const id = request.params.id;
        const employeeData = JSON.parse(request.requestBody);
        const employee = schema.find(CONSTANT.EMPLOYEE, id);
        employee.update(employeeData);
        return employee;
      });
      this.delete(API_ROUTES.EMPLOYEES_ID, (schema, request) => {
        const id = request.params.id;
        return schema.find(CONSTANT.EMPLOYEE, id).destroy();
      });
    },
  });
}
