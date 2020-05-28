class CheckAuth {
  constructor({ allowedGroups, jwt }) {
    this.allowedGroups = allowedGroups;
    this.jwt = jwt;
  }

  execute({ token }) {
    try {
      const payload = this.jwt.verify(token, process.env.JWT_SECRET);
      return (
        Boolean(payload) &&
        Boolean(payload.groups) &&
        payload.groups.some(g => this.allowedGroups.includes(g))
      );
    } catch (err) {
      return false;
    }
  }
}
module.exports = CheckAuth;
