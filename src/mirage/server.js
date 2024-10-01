import { createServer, Model } from "miragejs";

export function makeServer() {
  createServer({
    models: {
      employee: Model,
    },

    seeds(server) {
      server.create("employee", {
        id: 1,
        name: "Bibeka Sigh",
        email: "Bibeka@example.com",
        role: "Developer",
      });
      server.create("employee", {
        id: 2,
        name: "Manasi Gupta",
        email: "Manasi@example.com",
        role: "Tester",
      });
      server.create("employee", {
        id: 3,
        name: "Jayant Garu",
        email: "jayanta@example.com",
        role: "Team Lead",
      });
      server.create("employee", {
        id: 4,
        name: "Lokesh Barik",
        email: "lokesh@example.com",
        role: "Project Manager",
      });
    },

    routes() {
      this.baseUrl = "api";

      this.get("/employees", (schema) => {
        return schema.all("employee");
      });

      this.post("/employees", (schema, request) => {
        const newEmployee = JSON.parse(request.requestBody);
        return schema.create("employee", newEmployee);
      });

      this.put("/employees/:id", (schema, request) => {
        const id = request.params.id;
        const employeeData = JSON.parse(request.requestBody);
        const employee = schema.find("employee", id);
        employee.update(employeeData);
        return employee;
      });

      this.delete("/employees/:id", (schema, request) => {
        const id = request.params.id;
        return schema.find("employee", id).destroy();
      });
    },
  });
}
