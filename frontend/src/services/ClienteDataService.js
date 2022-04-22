import http from "../http-common";
class ClienteDataService {
  getAll() {
    return http.get("/clientes");
  }
  get(cpf) {
    return http.get(`/clientes/${cpf}`);
  }
  create(data) {
    return http.post("/clientes", data);
  }
}
export default new ClienteDataService();