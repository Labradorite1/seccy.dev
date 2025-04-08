export default class NoValidTokensError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "NoValidTokensError";
  }
}
