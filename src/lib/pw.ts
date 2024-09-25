import zxcvbn from 'zxcvbn';

export type T_CheckPasswordStrengthResult = ReturnType<typeof zxcvbn>;

export function checkPasswordStrength(password: string): T_CheckPasswordStrengthResult {
	return zxcvbn(password);
}
