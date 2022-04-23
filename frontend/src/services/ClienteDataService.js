import http from "../http-common";
class ClienteDataService {
  getAll() {
    return http.get("/clientes");
  }
  create(data) {
    return http.post("/clientes", data);
  }
  update(cpf, data) {
    return http.put(`/clientes/${cpf}`, data);
  }
  delete(cpf) {
    return http.delete(`/clientes/${cpf}`);
  }
  // findByNome(nome) {
  //   return http.get(`/clientes?nome=${nome}`);
  // }
}
export default new ClienteDataService();