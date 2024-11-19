type Success<T> = [undefined, T];
type Failure<E> = [E, undefined];

export type Result<E, T> = Success<T> | Failure<E>;

export async function to<T, E extends Error = Error>(
	expression: () => T | Promise<T>
): Promise<Result<E, T>> {
	try {
		const result: Awaited<T> = await expression();
		return [undefined, result];
	} catch (error: unknown) {
		if (error instanceof Error) return [error as E, undefined];
		return [new Error('Unknown error') as E, undefined];
	}
}
