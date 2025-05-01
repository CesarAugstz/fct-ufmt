export function formatLoginApiError(result: any) {
  switch (result?.error) {
    case "CredentialsSignin":
      return "E-mail ou senha inválidos";

    default:
      return result?.error || "An error occurred while logging in.";
  }
}
