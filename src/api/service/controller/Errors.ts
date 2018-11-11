export default class Errors {
  public static createError(code: number, message: string) {
    return {
      thrown: true,
      status: code,
      message: message
    }
  }
}
