class HomeController {
  async index(req, res) {
    return res.json({ message: 'HelloWorld' });
  }
}

export default new HomeController();
