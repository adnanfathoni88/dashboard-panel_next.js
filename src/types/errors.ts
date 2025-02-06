interface ErrorMessage {
  code: string;
  minimum: number;
  type: string;
  inclusive: boolean;
  exact: boolean;
  message: string[];
}

export default ErrorMessage;
