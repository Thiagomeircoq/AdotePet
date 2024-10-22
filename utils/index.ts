/**
 * Valida se o CPF é válido.
 * @param cpf - CPF em formato de string.
 * @returns Retorna true se o CPF for válido, false caso contrário.
 */
export function validarCPF(cpf: string): boolean {
    cpf = cpf.replace(/\D/g, "");

    if (cpf.length !== 11) return false;

    if (/^(\d)\1+$/.test(cpf)) return false;

    let soma = 0;
    for (let i = 0; i < 9; i++) {
        soma += Number(cpf[i]) * (10 - i);
    }
    let primeiroDigitoVerificador = 11 - (soma % 11);
    if (primeiroDigitoVerificador >= 10) primeiroDigitoVerificador = 0;

    if (primeiroDigitoVerificador !== Number(cpf[9])) return false;

    soma = 0;
    for (let i = 0; i < 10; i++) {
        soma += Number(cpf[i]) * (11 - i);
    }
    let segundoDigitoVerificador = 11 - (soma % 11);
    if (segundoDigitoVerificador >= 10) segundoDigitoVerificador = 0;

    if (segundoDigitoVerificador !== Number(cpf[10])) return false;

    return true;
}


/**
 * Converte uma data entre os formatos BR (dd/mm/yyyy) e US (yyyy-mm-dd).
 * Se a data estiver no formato BR, converte para o formato US, e vice-versa.
 * @param inputDate - Data em formato string.
 * @returns Retorna a data no formato convertido.
 * @throws Erro se o formato da data for inválido.
 */
export function formatDate(inputDate: string): string {
    inputDate = inputDate.replace(/[^\d/-]/g, "");

    const brPattern = /^\d{2}\/\d{2}\/\d{4}$/;

    const usPattern = /^\d{4}-\d{2}-\d{2}$/;

    if (brPattern.test(inputDate)) {
        const [day, month, year] = inputDate.split('/');
        return `${year}-${month}-${day}`;
    }

    if (usPattern.test(inputDate)) {
        const [year, month, day] = inputDate.split('-');
        return `${day}/${month}/${year}`;
    }

    throw new Error('Formato de data inválido');
}

/**
 * Valida uma senha de acordo com critérios predefinidos.
 * A senha deve conter pelo menos uma letra maiúscula, uma letra minúscula,
 * um número, um caractere especial e não deve conter sequências de caracteres.
 * @param password - A senha a ser validada.
 * @returns Uma lista de mensagens de erro caso a senha não atenda aos requisitos.
 */
export function passwordValidation(password: string): string[] {
    const errors: string[] = [];

    if (password.length < 8)
        errors.push("A senha deve ter pelo menos 8 caracteres");

    if (!/[A-Z]/.test(password))
        errors.push("A senha deve conter pelo menos uma letra maiúscula");

    if (!/[0-9]/.test(password))
        errors.push("A senha deve conter pelo menos um número");

    if (!/[^A-Za-z0-9]/.test(password))
        errors.push("A senha deve conter pelo menos um caractere especial");

    return errors;
}

/**
 * Formata o CPF, removendo todos os caracteres que não são dígitos.
 * @param cpf - CPF em formato de string.
 * @returns Retorna o CPF contendo apenas números.
 */
export function formatCPF(cpf: string): string {
    return cpf.replace(/\D/g, '');
}