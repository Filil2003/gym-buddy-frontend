import { describe, it, expect } from 'vitest';
import { deepMerge } from './index.ts';

describe('deepMerge', (): void => {
	describe('with objects', (): void => {
		it('should merge two simple objects', (): void => {
			const obj1 = { a: 1, b: 2 };
			const obj2 = { b: 3, c: 4 };

			const result = deepMerge(obj1, obj2);

			expect(result).toStrictEqual({
				a: 1,
				b: 3, // Value from obj2 overwrites the value from obj1
				c: 4
			});
		});

		it('should merge multiple objects', (): void => {
			const obj1 = { a: 1, b: { x: 10 } };
			const obj2 = { b: { y: 20 }, c: 3 };
			const obj3 = { d: 4 };

			const result = deepMerge(obj1, obj2, obj3);

			expect(result).toStrictEqual({
				a: 1,
				b: { x: 10, y: 20 }, // Objects inside 'b' should be merged
				c: 3,
				d: 4
			});
		});

		it('should overwrite values when the same keys exist', (): void => {
			const obj1 = { a: 1, b: { x: 10 } };
			const obj2 = { a: 3, b: 4 };

			const result = deepMerge(obj1, obj2);

			expect(result).toStrictEqual({
				a: 3, // Value from obj2 overwrites the value from obj1
				b: 4
			});
		});

		it('should handle deep merging of nested objects', (): void => {
			const obj1 = { a: { x: 1, y: 2 } };
			const obj2 = { a: { y: 3, z: 4 } };

			const result = deepMerge(obj1, obj2);

			expect(result).toStrictEqual({
				a: { x: 1, y: 3, z: 4 } // 'y' is overwritten, 'z' is added
			});
		});

		it('should return an empty object when no objects are passed', (): void => {
			const result = deepMerge();

			expect(result).toStrictEqual({});
		});

		it('should not modify original objects', (): void => {
			const obj1 = { a: 1, b: 2 };
			const obj2 = { b: 3, c: 4 };

			deepMerge(obj1, obj2);

			expect(obj1).toStrictEqual({ a: 1, b: 2 });
			expect(obj2).toStrictEqual({ b: 3, c: 4 });
		});
	});
});
