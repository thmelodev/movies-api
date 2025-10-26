export class TypeErrorException extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'TypeErrorException'
  }
}