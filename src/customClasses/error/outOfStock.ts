class OutOfStockError extends Error {
  statusCode: number;
  constructor(message: string) {
    super(message);
    this.name = 'OutOfStockError';
    this.statusCode = 400;
  }
}

export { OutOfStockError };
